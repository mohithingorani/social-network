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
      orderBy: {
        id: "asc",
      },
    });
    res.status(200).send({ message: "Messages fetched successfully", chats });
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error fetching messages" });
  }
};

export const getInbox = async (req: Request, res: Response) => {
  const userName = (req.query.userName as string) || "";
  const userIdRaw = (req.query.userId as string) || "";
  const userId = userIdRaw ? Number(userIdRaw) : 0;
  if (!userName && !userId) {
    return res.status(400).send({ message: "userName or userId is required" });
  }

  try {
    const self = await prisma.user.findUnique({
      where: userId ? { id: userId } : { username: userName },
      select: { id: true, username: true },
    });

    if (!self) {
      return res.status(404).send({ message: "User not found" });
    }

    const resolvedUserName = self.username;

    const friends = await prisma.friend.findMany({
      where: { userId: self.id },
      select: {
        friend: {
          select: {
            username: true,
            name: true,
            picture: true,
            onlineStatus: true,
            lastOnline: true,
          },
        },
      },
    });

    const friendUsers = friends.map((f) => f.friend);
    const rooms = friendUsers.map((f) => {
      const roomName = [resolvedUserName, f.username].sort().join("-");
      return { friend: f, roomName };
    });

    if (rooms.length === 0) {
      return res.status(200).send({ message: "Inbox fetched", inbox: [] });
    }

    const roomNames = rooms.map((r) => r.roomName);

    // Fetch the most recent chat per room using groupBy + max(id)
    const latestByRoom = await prisma.chat.groupBy({
      by: ["roomName"],
      where: {
        roomName: { in: roomNames },
      },
      _max: { id: true },
    });

    const latestIds = latestByRoom
      .map((g) => g._max.id)
      .filter((id): id is number => typeof id === "number");

    const latestChats = latestIds.length
      ? await prisma.chat.findMany({
          where: { id: { in: latestIds } },
          select: {
            id: true,
            roomName: true,
            message: true,
            userName: true,
            createdAt: true,
            time: true,
          },
        })
      : [];

    const latestMap = new Map(latestChats.map((c) => [c.roomName, c]));

    const readStates = await prisma.chatReadState.findMany({
      where: {
        userName: resolvedUserName,
        roomName: { in: roomNames },
      },
      select: {
        roomName: true,
        lastReadChatId: true,
      },
    });

    const readMap = new Map(readStates.map((s) => [s.roomName, s.lastReadChatId]));

    // Compute unread counts per room (only messages from others)
    // Compute unread counts per room using per-room lastReadChatId.
    const unreadWhereOr = rooms
      .map((r) => ({
        roomName: r.roomName,
        userName: { not: resolvedUserName },
        id: { gt: readMap.get(r.roomName) ?? 0 },
      }))
      .filter((x) => x);

    const unreadCountsRaw = unreadWhereOr.length
      ? await prisma.chat.groupBy({
          by: ["roomName"],
          where: {
            OR: unreadWhereOr as any,
          },
          _count: { _all: true },
        })
      : [];

    const unreadCountsMap = new Map(
      unreadCountsRaw.map((g) => [g.roomName, g._count._all]),
    );

    const inbox = rooms
      .map((r) => {
        const last = latestMap.get(r.roomName) || null;
        const unreadCount = unreadCountsMap.get(r.roomName) ?? 0;

        return {
          roomName: r.roomName,
          friend: r.friend,
          lastMessage: last
            ? {
                id: last.id,
                message: last.message,
                userName: last.userName,
                createdAt: last.createdAt,
                time: last.time,
              }
            : null,
          unreadCount,
        };
      })
      .sort((a, b) => {
        const at = a.lastMessage?.createdAt
          ? new Date(a.lastMessage.createdAt).getTime()
          : 0;
        const bt = b.lastMessage?.createdAt
          ? new Date(b.lastMessage.createdAt).getTime()
          : 0;
        return bt - at;
      });

    res.status(200).send({ message: "Inbox fetched", inbox });
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error fetching inbox" });
  }
};

export const markRead = async (req: Request, res: Response) => {
  const { userName, roomName, lastReadChatId } = req.body as {
    userName?: string;
    roomName?: string;
    lastReadChatId?: number;
  };

  if (!userName || !roomName || typeof lastReadChatId !== "number") {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const state = await prisma.chatReadState.upsert({
      where: {
        userName_roomName: {
          userName,
          roomName,
        },
      },
      create: {
        userName,
        roomName,
        lastReadChatId,
      },
      update: {
        lastReadChatId,
      },
      select: { userName: true, roomName: true, lastReadChatId: true },
    });

    res.status(200).send({ message: "Marked read", state });
  } catch (e) {
    logger.info(e);
    res.status(500).send({ message: "Error marking read" });
  }
};
