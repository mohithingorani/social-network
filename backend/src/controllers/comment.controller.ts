import { Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../utils/logger";

// Add a comment
export const addComment = async (req: Request, res: Response) => {
  const userId = req.body.userId as number;
  const text = req.body.text as string;
  const postId = req.body.postId as number;
  try {
    const comment = await prisma.comment.create({
      data: {
        text,
        postId,
        userId,
      },
    });
    logger.info(comment);
    res
      .json({
        message: "Comment added successfully",
        comment,
      })
      .status(200);
  } catch (err) {
    logger.info(err);
    res
      .json({
        err,
        message: "Cannot add comment",
      })
      .status(500);
  }
};

// Show all comments
export const getAllComments = async (req: Request, res: Response) => {
  const postId = req.body.postId;

  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            picture: true,
          },
        },
      },
    });
    res
      .json({
        comments,
        message: "Successfully fetched comments",
      })
      .status(200);
  } catch (error) {
    logger.error(error);
    res.json({ message: "Cannot fetch comments", error }).status(500);
  }
};
