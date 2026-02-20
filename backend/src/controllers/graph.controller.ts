import { Request, Response } from "express";
import prisma from "../prisma/client";

export const graph = async (req:Request, res:Response) => {
  try {
    const usernames = await prisma.user.findMany({
      select: { username: true },
    });

    const nodes = usernames.map((u) => ({
      data: { id: u.username, label: u.username },
    }));

    const friends = await prisma.friend.findMany({
      select: {
        user: { select: { username: true } },
        friend: { select: { username: true } },
      },
    });

    //  edge list, avoiding duplicates
    const edges:{data:{id:string,source:string,target:string}}[] = [];
    const addedPairs = new Set();

    friends.forEach(({ user, friend }) => {
      const pairKey = [user.username, friend.username].sort().join("-");
      if (!addedPairs.has(pairKey)) {
        edges.push({
          data: {
            id: pairKey,
            source: user.username,
            target: friend.username,
          },
        });
        addedPairs.add(pairKey);
      }
    });

    res.json({ nodes, edges });
  } catch (err) {
    console.error("Error building graph:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
