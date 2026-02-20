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


