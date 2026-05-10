"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ChatPane from "@/app/components/ChatPane";
import Spinner from "@/app/components/Spinner";

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

  const [myUserName, setMyUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyUser = async () => {
      if (!session?.user?.email) return;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/details?email=${session.user.email}`,
        );
        setMyUserName(data.username);
      } catch (e) {
        console.error("Failed to fetch user details", e);
      }
    };
    fetchMyUser();
  }, [session?.user?.email]);

  const friendName = myUserName
    ? roomName.split("-").filter((u) => u !== myUserName)[0] || "Friend"
    : "Friend";

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#18181A]">
        <Spinner />
      </div>
    );
  }

  if (!myUserName) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#18181A]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen bg-[#18181A] p-4">
      <div className="w-full max-w-3xl h-full">
        <div className="h-full border border-white/10 rounded-2xl bg-[#141414] overflow-hidden">
          <ChatPane roomName={roomName} myUserName={myUserName} friendName={friendName} />
        </div>
      </div>
    </div>
  );
}
