import { Request, Response } from "express";
import logger from "../utils/logger";
import prisma from "../prisma/client";


export const createMessage = async (req:Request, res:Response) => {
  const message = req.body.message;
  const userName = req.body.userName;
  const roomName = req.body.roomName;
  logger.info("create/message body:", req.body);
  const time = req.body.time;
  try {
    const chat = await prisma.chat.create({
      data: {
        message,
        userName,
        roomName,
        time,
      },
    });
    res.status(200).send({ message: "Message created successfully", chat });
  } catch (e) {
    logger.info("Prisma error", e);
    res.status(500).send({ message: "Error creating message" });
  }
};


export const getAllMessages = async (req:Request, res:Response) => {
  const roomName = req.query.roomName as string;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        roomName,
      },
    });
    res.status(200).send({ message: "Messages fetched successfully", chats });
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error fetching messages" });
  }
};