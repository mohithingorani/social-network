"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import TextMessage from "@/app/components/TextMessage";
import Spinner from "@/app/components/Spinner";

export interface ChatPaneMessageObject {
  id: number;
  message: string;
  time: string;
  userName: string;
  roomName: string;
}

export default function ChatPane({
  roomName,
  myUserName,
  friendName,
  onMarkRead,
}: {
  roomName: string;
  myUserName: string;
  friendName: string;
  onMarkRead?: (lastReadChatId: number) => void;
}) {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [inbox, setInbox] = useState<ChatPaneMessageObject[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [messagesLoading, setMessagesLoading] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hasInitialScroll = useRef(false);
  const onMarkReadRef = useRef<typeof onMarkRead>(onMarkRead);

  useEffect(() => {
    onMarkReadRef.current = onMarkRead;
  }, [onMarkRead]);

  function convertDateToTime(date: Date) {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    const fetchMessages = async () => {
      if (!roomName) return;
      setMessagesLoading(true);
      hasInitialScroll.current = false;

      // Avoid a 1s "glitch" flicker on fast loads.
      setShowLoader(false);
      const loaderTimer = setTimeout(() => setShowLoader(true), 200);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/allMessages?roomName=${roomName}&userName=${myUserName}`,
        );
        const chats = response.data.chats || [];
        setInbox(chats);

        const lastId = chats.length ? chats[chats.length - 1].id : 0;
        if (lastId && onMarkReadRef.current) onMarkReadRef.current(lastId);
      } catch (err) {
        console.error("Error fetching messages", err);
      } finally {
        clearTimeout(loaderTimer);
        setMessagesLoading(false);
        setShowLoader(false);
      }
    };

    fetchMessages();
  }, [roomName]);

  const createMessage = async (text: string) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/create`, {
        message: text,
        userName: myUserName,
        roomName,
        time: convertDateToTime(new Date()),
      });
    } catch (err) {
      console.error("Error storing message", err);
    }
  };

  const handleSendMessage = async () => {
    if (!roomName) return;
    if (message.trim() === "" || !socket) return;

    const text = message;
    setMessage("");

    const tempId = Date.now();
    const t = convertDateToTime(new Date());
    socket.emit("message", text, roomName, tempId, t, myUserName);

    await createMessage(text);
  };

  useEffect(() => {
    if (!roomName) return;

    const socketInstance = io(
      process.env.NEXT_PUBLIC_BACKEND_WEBSOCKET_URL || "ws://localhost:3000",
    );

    socketInstance.on("connect", () => {
      setError(false);
      setSocket(socketInstance);
      socketInstance.emit("joinRoom", roomName, myUserName);
    });

    socketInstance.on("message", (msg, id, time, userName) => {
      if (typeof msg !== "string" || msg.trim() === "") return;
      setInbox((prev) => {
        const next = [...prev, { message: msg, id, time, userName, roomName }];
        const lastId = next.length ? next[next.length - 1].id : 0;
        if (lastId && onMarkReadRef.current) onMarkReadRef.current(lastId);
        return next;
      });
    });

    socketInstance.on("connect_error", () => {
      setError(true);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomName]);

  useLayoutEffect(() => {
    if (messagesLoading) return;
    if (hasInitialScroll.current) return;
    if (!scrollContainerRef.current) return;

    // Jump to bottom before paint so opening a chat doesn't visually scroll.
    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    hasInitialScroll.current = true;
  }, [messagesLoading, inbox.length]);

  useEffect(() => {
    if (messagesLoading) return;
    if (!hasInitialScroll.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    // Only smooth-scroll if user is already near the bottom.
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom < 120) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesLoading, inbox.length]);

  if (!roomName) {
    return (
      <div className="h-full flex items-center justify-center text-white/40">
        Select a conversation
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-white/60">
        Can&apos;t connect. Retry.
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-start px-4 py-3 border-b border-white/10 bg-[#141414]">
        <div className="min-w-0">
          <div className="text-white font-semibold truncate">{friendName}</div>
          <div className="text-xs text-white/40 truncate">{roomName}</div>
        </div>
      
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3">
        <div ref={scrollContainerRef} className="h-full overflow-y-auto">
        {messagesLoading ? (
          showLoader ? (
            <div className="h-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="h-full" />
          )
        ) : (
          inbox.map((messageObject, index) => (
            <TextMessage
              key={`${messageObject.id}-${index}`}
              messageObject={messageObject as any}
              myUserName={myUserName}
            />
          ))
        )}
        <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-white/10 bg-[#141414]">
        <div className="flex gap-3 items-end">
          <input
            autoFocus
            type="text"
            value={message}
            className="flex-1 outline-none px-3 py-2 text-white bg-[#0f0f0f] border border-white/5 rounded-xl placeholder-white/30 focus:border-white/10"
            placeholder="Write a message…"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            type="button"
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
