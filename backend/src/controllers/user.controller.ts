import { Request, Response } from "express";
import prisma from "../prisma/client"
import logger from "../utils/logger";

export const getUser = async (req:Request, res:Response) => {
  const userEmail = req.query.email as string;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    logger.info("User existence check successful", userEmail);
    if (userExists) {
      logger.info("User exists", userEmail);
      return res.send(true);
    } else {
      logger.info("User does not exist", userEmail);
      return res.send(false);
    }
  } catch (err: any) {
    console.error("Error checking user existence", err.message);
    logger.error("Error checking user existence", { email: userEmail, error: err });
    return res.status(500).send({ message: "Error checking user existence" });
  }


}

export const getDetails= async (req:Request, res:Response) => {
  const email = req.query.email as string;
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    logger.info("User details fetched successfully");
    res.send(userDetails).status(200);
  } catch (err) {
    logger.info(err);
    res.send({ message: "Error fetching user details" }).status(500);
  }
};

export const createUser = async (req:Request, res:Response) => {
  const email = req.body.email;
  const name = req.body.name;
  const picture = req.body.picture;

  let randomNumber = Math.floor(Math.random() * 1000);
  let userName = name.split(" ")[0].toLowerCase() + randomNumber;

  const userNameExists = await prisma.user.findFirst({
    where: {
      username: userName,
    },
  });

  if (userNameExists) {
    randomNumber = Math.floor(Math.random() * 1000 + 1);
    userName = name.split(" ")[0].toLowerCase() + randomNumber;
  }
  try {
    const user = await prisma.user.create({
      data: {
        picture: picture,
        email: email,
        name: name,
        username: userName,
      },
    });
    logger.info("User created successfully");
    res.send({ message: "User created successfully", user: user }).status(200);
  } catch (e) {
    logger.info(e);
    logger.info("Error creating user");
    res.send({ message: "Error creating user" }).status(500);
  }
};

export const updatePicture = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const picture = req.body.picture;

  if (!userId || !picture) {
    return res.status(400).send({ message: "userId and picture are required" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { picture },
    });
    res.send({ message: "Profile picture updated", user }).status(200);
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error updating profile picture" });
  }
};

export const updateUsername = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const username = req.body.username;

  if (!userId || !username) {
    return res.status(400).send({ message: "userId and username are required" });
  }

  const trimmed = username.trim().toLowerCase();
  if (trimmed.length < 3 || trimmed.length > 30) {
    return res.status(400).send({ message: "Username must be between 3 and 30 characters" });
  }

  if (!/^[a-z0-9_]+$/.test(trimmed)) {
    return res.status(400).send({ message: "Username can only contain letters, numbers, and underscores" });
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { username: trimmed },
    });

    if (existing && existing.id !== userId) {
      return res.status(409).send({ message: "Username is already taken" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const oldUsername = user.username;
    if (oldUsername === trimmed) {
      return res.send({ message: "Username unchanged" });
    }

    await prisma.$transaction(async (tx) => {
      const friends = await tx.friend.findMany({
        where: { userId },
        select: { friend: { select: { username: true } } },
      });

      await tx.chat.updateMany({
        where: { userName: oldUsername },
        data: { userName: trimmed },
      });

      for (const { friend } of friends) {
        const oldRoomName = [oldUsername, friend.username].sort().join("-");
        const newRoomName = [trimmed, friend.username].sort().join("-");
        if (oldRoomName === newRoomName) continue;

        await tx.chat.updateMany({
          where: { roomName: oldRoomName },
          data: { roomName: newRoomName },
        });
        await tx.chatReadState.updateMany({
          where: { roomName: oldRoomName },
          data: { roomName: newRoomName },
        });
      }

      await tx.user.update({
        where: { id: userId },
        data: { username: trimmed },
      });
    });

    logger.info(`Username updated from ${oldUsername} to ${trimmed} — chat rooms migrated`);
    res.send({ message: "Username updated" }).status(200);
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error updating username" });
  }
};


