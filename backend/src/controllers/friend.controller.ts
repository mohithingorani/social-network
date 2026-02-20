import { Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../utils/logger";

export const getFriendRequests = async (req:Request, res:Response) => {
  const userId = parseInt(req.body.userId);
  // logger.info("username is " + username);
  try {
    const users = await prisma.friendRequest.findMany({
      where: {
        receiver: {
          id: userId,
        },
        status: "pending",
      },
      select: {
        status: true,
        id: true,
        sender: {
          select: {
            username: true,
            picture: true,
            id: true,
          },
        },
        receiver: {
          select: {
            username: true,
            picture: true,
            id: true,
          },
        },
      },
    });
    logger.info(users);
    res.send({
      message: "Recieved Requests",
      requests: users,
    });
  } catch (e) {
    logger.info(e);
    res.send({ message: "Error fetching requests" }).status(500);
  }
}


export const acceptFriendRequest = async (req: Request, res: Response) => {
  const { senderId, receiverId, requestId } = req.body;

  if (!senderId || !receiverId || !requestId) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    // Update friend request status
    const friendRequest = await prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: "accepted" },
      include: { sender: true, receiver: true },
    });

    // Check if the friend entries already exist
    const friendExists = await prisma.friend.findFirst({
      where: {
        OR: [
          { userId: senderId, friendId: receiverId },
          { userId: receiverId, friendId: senderId },
        ],
      },
    });

    if (!friendExists) {
      // Add bidirectional friendship
      await prisma.friend.createMany({
        data: [
          { userId: senderId, friendId: receiverId },
          { userId: receiverId, friendId: senderId },
        ],
      });
    }

    res.status(200).send({
      message: "Accepted Friend Request",
      friendRequest,
    });
  } catch (e) {
    logger.error("Error accepting friend request:", e);
    res.status(500).send({ message: "Error accepting friend request" });
  }
};


export const removeFriend = async (req: Request, res: Response) => {
  const myUserName = req.body.myUserName as string;
  const friendUserName = req.body.friendUserName as string;
  try {
    const removeFriend = prisma.friend.deleteMany({
      where: {
        OR: [
          {
            user: {
              username: myUserName,
            },
            friend: {
              username: friendUserName,
            },
          },
          {
            user: {
              username: friendUserName,
            },
            friend: {
              username: myUserName,
            },
          },
        ],
      },
    });
    res.json({ message: "Friend removed", removeFriend });
  } catch (err) {
    logger.info("Error deleting friend", err);
  }
}




export const searchUsers = async (req: Request, res: Response) => {
  const username = req.body.username as string;
  const selfUsername = req.body.selfUsername as string;
  logger.info("username is " + username);
  logger.info("self username is " + selfUsername);
  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
        NOT: {
          username: selfUsername,
        },
      },
      select: {
        username: true,
        picture: true,
        id: true,
      },
    });

    logger.info("Users fetched successfully");
    res.status(200).send(users);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error fetching users" });
  }
}

export const getSuggestions = async (req: Request, res: Response) => {
  const username = req.body.username as string;
  const selfUsername = req.body.selfUsername as string;
  const userId = parseInt(req.body.userId);
  logger.info("username is " + username);
  logger.info("self username is " + selfUsername);

  try {
    const self = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!self) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all friends (both directions)
    const friendsList = await prisma.friend.findMany({
      where: {
        OR: [{ userId: userId }, { friendId: userId }],
      },
    });

    // Properly extract the friend IDs
    const friendIds = friendsList.map((f) =>
      f.userId === userId ? f.friendId : f.userId
    );

    // Find users matching username, excluding self and friends
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
        NOT: {
          id: {
            in: [userId, ...friendIds], // Exclude self + friends
          },
        },
      },
      select: {
        id: true,
        username: true,
        picture: true,
      },
    });

    logger.info("Users fetched successfully");
    res.status(200).send(users);
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error fetching users" });
  }
}


export const getFriends = async (req: Request, res: Response) => {
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send({ message: "User ID is required" });
  }

  try {
    const friends = await prisma.friend.findMany({
      where: {
        userId: Number(userId),
      },
      select: {
        friend: {
          select: {
            username: true,
            picture: true,
            id: true,
            name: true,
            onlineStatus: true,
          },
        },
      },
    });

    const formattedFriends = friends.map((friend) => friend.friend); // Extract the friend details

    res.status(200).send({
      message: "Friends fetched successfully",
      friends: formattedFriends,
    });
  } catch (e) {
    logger.error("Error fetching friends:", e);
    res.status(500).send({ message: "Error fetching friends" });
  }
}


export const updateOnlineStatus = async (req: Request, res: Response) => {
  const date = new Date();
  const email = req.body.email;

  try {
    const lastActive = prisma.user.update({
      where: {
        email: email,
      },
      data: {
        lastOnline: date,
        onlineStatus: true,
      },
    });

    res
      .json({
        lastActive,
      })
      .status(200);
  } catch (error) {
    logger.info(error);
    res.status(500).send({ message: "Error updating online status" });
  }
}


export const sendFriendRequest = async (req: Request, res: Response) => {
  const fromUserId = parseInt(req.body.fromUserId);
  const toUserId = parseInt(req.body.toUserId);
  const fromUser = await prisma.user.findFirst({
    where: { id: fromUserId },
  });
  const toUser = await prisma.user.findFirst({
    where: { id: toUserId },
  });

  const friendRequestExists = await prisma.friendRequest.findFirst({
    where: {
      AND: [
        {
          sender: {
            id: fromUserId,
          },
        },
        {
          receiver: {
            id: toUserId,
          },
        },
      ],
    },
  });
  if (friendRequestExists) {
    logger.info("Friend request already exists");
    res
      .send({ message: "Friend request already exists", exists: true })
      .status(400);
  } else if (fromUser && toUser) {
    const friendRequest = await prisma.friendRequest.create({
      data: {
        senderId: fromUser.id,
        receiverId: toUser.id,
      },
    });
    if (friendRequest) {
      logger.info("Friend request sent successfully");
      res
        .send({ message: "Friend request sent successfully", friendRequest })
        .status(200);
    }
  }
};

