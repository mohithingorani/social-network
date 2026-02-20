import { Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../utils/logger";

// get Post
export const getPosts = async (req:Request, res:Response) => {
  const userId = parseInt(req.query.userId as string); // e.g., /getposts?userId=1

  if (!userId) {
    return res.status(400).json({ message: "Missing or invalid userId" });
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
            picture: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
        likes: {
          where: {
            userId: userId,
          },
          select: {
            userId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const updatedPosts = posts.map((post) => {
      return {
        ...post,
        isLikedByUser: post.likes.length > 0,
        likes: undefined, // remove likes array, only use _count and boolean
      };
    });

    res.status(200).json({
      message: "Get Posts Successful",
      posts: updatedPosts,
    });
  } catch (err) {
    console.error("Could not fetch posts.", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const postCount = async (req:Request, res:Response) => {
  const userId = req.query.userId;
  try {
    if (!userId) {
      logger.error("userid not sumbitted");
      res
        .json({
          error: "Empty user id",
        })
        .status(500);
    }
    const numPosts = await prisma.post.findMany({
      where: {
        userId: Number(userId),
      },
    });
    res
      .json({
        count: numPosts.length,
      })
      .status(200);
  } catch (err) {
    logger.error(err);
    res
      .json({
        err,
      })
      .status(500);
  }
};

export const likePost = async (req:Request, res:Response) => {
  const username = req.body.username;
  const postId = req.body.postId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: username },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    if (existingLike) {
      return res.status(409).json({ message: "User already liked this post" });
    }

    const like = await prisma.like.create({
      data: {
        userId: user.id,
        postId: postId,
      },
    });

    res.json({
      like,
      message: `Liked the post with id ${postId}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deletePost = async (req:Request, res:Response) => {
  const postId = req.body.postId;
  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  res.json({
    message: "Deleted Post with PostId" + postId,
    post,
  });
};

export const unlikePost = async (req:Request, res:Response) => {
  const { userId, postId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await prisma.like.delete({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    res.status(200).json({
      message: `Unliked the post with id ${postId}`,
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ message: "Like not found for this user and post" });
    }

    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};



export const uploadPost = async (req:Request, res:Response) => {
  logger.info("got image post request");

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
  const caption = req.body.caption;
  const userId = parseInt(req.body.userId);

  try {
    const post = await prisma.post.create({
      data: {
        image: imageUrl,
        caption,
        user: {
          connect: { id: userId },
        },
      },
    });
    logger.info(post);
    res.status(200).json({
      post,
      url: imageUrl,
      message: "Post uploaded!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not post!" });
  }
};

export const uploadWithoutImage = async (req:Request, res:Response) => {

  const caption = req.body.caption;
  const userId = parseInt(req.body.userId);

  try {
    const post = await prisma.post.create({
      data: {
        caption,
        user: {
          connect: { id: userId },
        },
      },
    });
    logger.info(post);
    res.status(200).json({
      post,
      message: "Post uploaded!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not post!" });
  }
}


