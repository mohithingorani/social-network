import { Request, Response } from "express";
import logger from "../utils/logger";
import prisma from "../prisma/client";


export const addStory = async (req:Request, res:Response) => {
  if (!req.file) {
    return res.json(400).json({
      message: "No file uploaded",
    });
  }
  try {
    const { userId }: { userId: string } = req.body;

    const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    const story = await prisma.story.create({
      data: {
        image: imageUrl,
        userId: parseInt(userId),
      },
    });

    logger.info("Story uploaded");
    res
      .json({
        message: "Story upload successfully",
        story,
      })
      .status(200);
  } catch (err) {
    logger.error(err);
    res
      .json({
        message: "Error uploading story",
        err,
      })
      .status(500);
  }
};

export const allStories = async (req:Request, res:Response) => {
  const { userId }: { userId: number } = req.body;
  logger.info(userId);

  try {
    // Finding all friends involving user
    const friendShips = await prisma.friend.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }],
      },
    });

    // Extracting all friendIds
    const friendIds = friendShips.map((f) =>
      f.userId === userId ? f.friendId : f.userId
    );
    logger.info("FriendshipIds", friendIds);

    // Get all stories from friends
    const stories = await prisma.story.findMany({
      where: {
        userId: {
          in: friendIds,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            picture: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    logger.info("Stories sent successfully");
    res.json({
      message: "Stories sent successfully",
      stories,
    });
  } catch (err) {
    logger.error(err);
    res.json({
      message: "Error extracting stories",
        err,
    });
  }
};


