"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ChatPane from "@/app/components/ChatPane";

export interface MessageObject {
  id: number;
  message: string;
  time: string;
  userName: string;
  roomName: string;
}

export default function Chats() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const roomName = searchParams.get("room") || "";
  const name = searchParams.get("name") || "";

  const friendName =
    roomName.split("-").filter((user) => user !== name)[0] || "Friend";

  return (
    <div className="flex justify-center h-screen bg-[#18181A] p-4">
      <div className="w-full max-w-3xl h-full">
        <div className="h-full border border-white/10 rounded-2xl bg-[#141414] overflow-hidden">
          <ChatPane roomName={roomName} myUserName={name} friendName={friendName} />
        </div>
      </div>
    </div>
  );
}
