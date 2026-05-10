"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ChatPane from "./ChatPane";
import { useRouter } from "next/navigation";

function getLastSeen(lastOnline: string | null): string {
  if (!lastOnline) return "Unknown";

  const date = new Date(lastOnline);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatInboxTime(value: any): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  if (sameDay) {
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function MessagesPage({
  userId,
  userName,
}: {
  userId: number;
  userName: string;
}) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [inboxLoading, setInboxLoading] = useState(false);
  const [inboxItems, setInboxItems] = useState<any[] | null>(null);
  const [inboxError, setInboxError] = useState<string>("");

  const [selectedRoomName, setSelectedRoomName] = useState<string>("");
  const [selectedFriend, setSelectedFriend] = useState<any | null>(null);
  const [isXlUp, setIsXlUp] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsXlUp(mql.matches);
    update();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    mql.addListener(update);
    return () => mql.removeListener(update);
  }, []);

  const openChatRoom = (roomName: string) => {
    if (!roomName || !userName) return;
    router.push(`/chat/?room=${roomName}`);
  };

  async function getInbox() {
    if (!userId) return;
    setInboxLoading(true);
    setInboxError("");
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/inbox?userId=${userId}`,
      );
      const items = data.inbox || [];
      setInboxItems(items);

      // Auto-select first conversation on desktop.
      if (!selectedRoomName && items.length > 0) {
        setSelectedRoomName(items[0].roomName);
        setSelectedFriend(items[0].friend);
      }
    } catch (e) {
      console.error("Failed to fetch inbox", e);
      setInboxItems([]);
      setInboxError("Couldn’t load inbox. Check backend + migrations.");
    } finally {
      setInboxLoading(false);
    }
  }

  useEffect(() => {
    getInbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function markRoomRead(roomName: string, lastReadChatId: number) {
    if (!roomName || !userName) return;
    const alreadyZero =
      inboxItems?.find((it: any) => it.roomName === roomName)?.unreadCount === 0;
    if (alreadyZero) return;
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/markRead`, {
        userName,
        roomName,
        lastReadChatId,
      });
      setInboxItems((prev) =>
        prev
          ? prev.map((it) =>
              it.roomName === roomName ? { ...it, unreadCount: 0 } : it,
            )
          : prev,
      );
    } catch (e) {
      console.error("Failed to mark read", e);
    }
  }

  const filteredItems = useMemo(() => {
    const items = inboxItems || [];
    const q = searchInput.toLowerCase();
    if (!q) return items;
    return items.filter((it: any) => it.friend?.username?.toLowerCase().includes(q));
  }, [inboxItems, searchInput]);

  const recent = filteredItems.filter((it: any) => it.lastMessage);
  const friendsOnly = filteredItems.filter((it: any) => !it.lastMessage);

  if (!userId || !userName) {
    return (
      <div className="h-full flex items-center justify-center text-white/40 text-sm">
        Loading messages…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className=" bg-[#141414]/95 backdrop-blur border-b border-white/5 pb-3">
        <div className="flex items-center justify-between mb-3 gap-3">
          <div className="min-w-0 pl-2">
            <div className="text-base sm:text-lg font-semibold text-white">Messages</div>
            <div className="text-xs text-white/40">
              {inboxItems?.length ?? 0} conversations
            </div>
          </div>
          <button
            type="button"
            onClick={getInbox}
            className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-white/70 hover:text-white transition-colors shrink-0"
          >
            Refresh
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations…"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0f0f0f] border border-white/5 rounded-xl outline-none placeholder-white/30 focus:border-white/10 transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-4 mt-3">
        <div className="border border-white/5 rounded-xl bg-[#0f0f0f] overflow-hidden flex flex-col min-h-0">
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-white/5">
            <div className="text-sm font-medium text-white">Inbox</div>
            <div className="text-xs text-white/40">{inboxLoading ? "Loading…" : ""}</div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-3">
            {inboxError && (
              <div className="mb-2 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs">
                {inboxError}
              </div>
            )}

            {inboxLoading ? (
              <div className="space-y-3">
                <div>
                  <div className="px-2 pt-1 pb-2 text-[11px] tracking-wide text-white/35 uppercase">Recent</div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 animate-pulse"
                      >
                        <div className="w-11 h-11 rounded-full bg-white/5 shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex justify-between gap-3">
                            <div className="h-3 w-24 rounded bg-white/5" />
                            <div className="h-3 w-10 rounded bg-white/5" />
                          </div>
                          <div className="h-3 w-32 rounded bg-white/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="px-2 pt-1 pb-2 text-[11px] tracking-wide text-white/35 uppercase">Friends</div>
                  <div className="space-y-2">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-white/[0.04] border border-white/5 animate-pulse"
                      >
                        <div className="w-11 h-11 rounded-full bg-white/5 shrink-0" />
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex justify-between gap-3">
                            <div className="h-3 w-24 rounded bg-white/5" />
                            <div className="h-3 w-10 rounded bg-white/5" />
                          </div>
                          <div className="h-3 w-32 rounded bg-white/5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : !inboxItems || inboxItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <span className="text-xl">💬</span>
                </div>
                <p className="text-white/50 text-sm">No conversations yet</p>
                <p className="text-white/25 text-xs mt-1">Start a chat from your friends list</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.length > 0 && (
                  <div>
                    <div className="px-2 pt-1 pb-2 text-[11px] tracking-wide text-white/35 uppercase">
                      Recent
                    </div>
                    <div className="space-y-1">
                      {recent.map((it: any) => (
                        <InboxRow
                          key={it.roomName}
                          item={it}
                          isActive={it.roomName === selectedRoomName}
                          myUserName={userName}
                          onClick={() => {
                            if (!isXlUp) {
                              openChatRoom(it.roomName);
                              return;
                            }
                            setSelectedRoomName(it.roomName);
                            setSelectedFriend(it.friend);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {friendsOnly.length > 0 && (
                  <div>
                    <div className="px-2 pt-1 pb-2 text-[11px] tracking-wide text-white/35 uppercase">
                      Friends
                    </div>
                    <div className="space-y-1">
                      {friendsOnly.map((it: any) => (
                        <InboxRow
                          key={it.roomName}
                          item={it}
                          isActive={it.roomName === selectedRoomName}
                          myUserName={userName}
                          onClick={() => {
                            if (!isXlUp) {
                              openChatRoom(it.roomName);
                              return;
                            }
                            setSelectedRoomName(it.roomName);
                            setSelectedFriend(it.friend);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="hidden xl:block border border-white/5 rounded-xl bg-[#0f0f0f] overflow-hidden">
          <ChatPane
            roomName={selectedRoomName}
            myUserName={userName}
            friendName={selectedFriend?.username || "Chat"}
            onMarkRead={(lastId) => markRoomRead(selectedRoomName, lastId)}
          />
        </div>
      </div>
    </div>
  );
}

function InboxRow({
  item,
  isActive,
  myUserName,
  onClick,
}: {
  item: any;
  isActive: boolean;
  myUserName: string;
  onClick: () => void;
}) {
  const friend = item.friend;
  const isOnline = friend?.onlineStatus === true;
  const last = item.lastMessage;
  const preview = last?.message
    ? `${last.userName === myUserName ? "You: " : ""}${last.message}`
    : isOnline
      ? "Online"
      : getLastSeen(friend?.lastOnline ?? null);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border transition-colors ${
        isActive
          ? "bg-white/[0.06] border-white/10"
          : "bg-transparent border-transparent hover:bg-white/[0.04]"
      }`}
    >
      <div className="relative shrink-0">
        <Image
          src={friend.picture}
          alt={friend.username}
          width={44}
          height={44}
          className="rounded-full w-11 h-11"
        />
        <div
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f0f0f] ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-white truncate">{friend.username}</div>
          <div className="text-xs text-white/35 shrink-0">{formatInboxTime(last?.createdAt)}</div>
        </div>
        <div className="flex items-center justify-between gap-3 mt-0.5">
          <div
            className={`text-xs truncate ${
              item.unreadCount > 0 ? "text-white/70" : "text-white/40"
            }`}
          >
            {preview}
          </div>
          {item.unreadCount > 0 && (
            <div className="shrink-0 text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
              {item.unreadCount}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
