"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Menu,
  X,
  Home,
  MessageCircle,
  Settings,
  Plus,
  User,
  Users,
  LogOut as LogOutIcon,
} from "lucide-react";
import { pageAtom, userDataAtom } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { useFriends } from "@/hooks/useFriends";
import axios from "axios";

export default function NavBar({
  userName,
  variant = "both",
  onFriendsClick,
}: {
  userName: string;
  variant?: "mobile" | "desktop" | "both";
  onFriendsClick?: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = useSession();
  const [currPage, setCurrPage] = useRecoilState(pageAtom);
  const { friends } = useFriends();
  const [currKey, setCurrKey] = useState(0);
  const [numPosts, setNumPosts] = useState<number | null>(null);
  const userData = useRecoilValue(userDataAtom);
  
  const [sheetTranslate, setSheetTranslate] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const [signOutOpen, setSignOutOpen] = useState(false);

  useEffect(() => {
    if (!signOutOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [signOutOpen]);


  const getNumPosts = async () => {
    if(userData.id!=0){

      const id = userData.id;
      const num = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/count?userId=${id}`
      );
      setNumPosts(num.data.count);
    }
  };
  useEffect(() => {
    getNumPosts();
  }, [userData]);

  useEffect(() => {
    // Keep the highlighted nav item in sync with the actual page.
    if (currPage === "home") setCurrKey(0);
    else if (currPage === "messages") setCurrKey(1);
    else if (currPage === "settings") setCurrKey(3);
  }, [currPage]);
  

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-full bg-white/30 backdrop-blur-md rounded-md">
        <svg />
      </div>
    );
  }

  const handleNavClick = (key: number) => {
    setCurrKey(key);
    setMenuOpen(false);
    setSheetTranslate(0);
    if (key === 0) {
      setCurrPage("home");
    } else if (key === 1) {
      setCurrPage("messages");
    } else if (key === 3) {
      setCurrPage("settings");
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      setSheetTranslate(diff);
    }
  };

  const handleTouchEnd = () => {
    if (sheetTranslate > 150) {
      setMenuOpen(false);
      setSheetTranslate(0);
    } else {
      setSheetTranslate(0);
    }
  };

  return (
    <>
      {/* Mobile header */}
      {variant !== "desktop" && (
        <div className="xl:hidden flex justify-between items-center p-4 text-white bg-[#18181A] z-40 relative">
          <div className="font-semibold text-lg">{session.data?.user?.name}</div>
          <div className="flex items-center gap-2">
            {onFriendsClick && (
              <button
                type="button"
                onClick={onFriendsClick}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Open friends"
              >
                <Users className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Open navigation"
            >
              {menuOpen ? (
                <X className="w-6 h-6 z-10" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sheet Modal */}
      {variant !== "desktop" && menuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden animate-in fade-in duration-200"
            onClick={() => setMenuOpen(false)}
          />
          
          {/* Bottom Sheet */}
          <div 
            ref={sheetRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-x-0 bottom-0 bg-[#18181A] z-[70] xl:hidden rounded-t-3xl shadow-2xl"
            style={{ transform: `translateY(${sheetTranslate}px)` }}
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1 touch-none">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>
            
            {/* Content */}
            <div className="px-5 pb-6 pt-2">
              {/* Profile Section */}
              <div className="flex flex-col items-center text-center mb-6">
                {session.data?.user?.image && (
                  <Image
                    src={session.data.user.image}
                    alt="profile"
                    width={80}
                    height={80}
                    className="rounded-full ring-2 ring-white/10"
                  />
                )}
                <div className="text-xl font-semibold mt-3 text-white">
                  {session.data?.user?.name}
                </div>
                <div className="text-sm text-white/50">College Student</div>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-12 mb-6">
                <div className="text-center">
                  <div className="font-bold text-2xl text-white">{numPosts ?? 0}</div>
                  <div className="text-xs text-white/40">Posts</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-white">{friends.length}</div>
                  <div className="text-xs text-white/40">Friends</div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {[
                  { name: "Feed", icon: Home, key: 0 },
                  { name: "Messages", icon: MessageCircle, key: 1 },
                  { name: "Settings", icon: Settings, key: 3 },
                ].map((item) => (
                  <button
                    onClick={() => handleNavClick(item.key)}
                    key={item.key}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      currKey === item.key
                        ? "bg-white/10 text-white"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                ))}
              </div>

              {/* Sign Out */}
              <div className="border-t border-white/5 mt-4 pt-4">
                <button
                  onClick={() => { setMenuOpen(false); setSheetTranslate(0); setSignOutOpen(true); }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-white/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200"
                >
                  <LogOutIcon className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar - Professional Design */}
      {variant !== "mobile" && (
        <div className="hidden xl:block text-white h-full w-full">
        <div className="sticky top-0 p-0 space-y-4 h-full flex flex-col">
          {/* Profile Card */}
          <div className="bg-[#181818] rounded-2xl p-4 border border-white/5 flex-shrink-0">
            <div className="flex flex-col items-center text-center">
              {/* Avatar */}
              <div className="relative">
                {session.data?.user?.image && (
                  <Image
                    src={session.data.user.image}
                    alt="profile"
                    width={80}
                    height={80}
                    className="rounded-full ring-3 ring-white/10"
                  />
                )}
              </div>

              {/* Name */}
              <div className="mt-3">
                <h2 className="text-lg font-semibold text-white">{session.data?.user?.name}</h2>
                <p className="text-sm text-white/40">@{userData.username || 'username'}</p>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-8 mt-4 pt-4 border-t border-white/5 w-full">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{numPosts ?? 0}</div>
                  <div className="text-xs text-white/40">Posts</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{friends.length}</div>
                  <div className="text-xs text-white/40">Friends</div>
                </div>
              </div>

              {/* Profile Button */}
              <button className="mt-4 w-full py-2.5 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-sm font-medium text-white/80 hover:text-white transition-all">
                View Profile
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-[#181818] rounded-2xl p-2 border border-white/5 flex-1">
            <div className="space-y-1">
              {[
                { name: "Feed", icon: Home, key: 0 },
                { name: "Messages", icon: MessageCircle, key: 1 },
                { name: "Settings", icon: Settings, key: 3 },
              ].map((item) => (
                <button
                  onClick={() => {
                    setCurrKey(item.key);
                    if (item.key === 0) setCurrPage("home");
                    if (item.key === 1) setCurrPage("messages");
                    if (item.key === 3) setCurrPage("settings");
                  }}
                  key={item.key}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currKey === item.key
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {item.key === 1 && (
                    <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </button>
              ))}

              <div className="border-t border-white/5 my-2" />

              {/* Sign Out */}
              <button
                onClick={() => setSignOutOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200"
              >
                <LogOutIcon className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-2 flex-shrink-0">
            <p className="text-xs text-white/20">v1.0</p>
          </div>
        </div>
        </div>
      )}
      {/* Sign Out Confirmation Modal */}
      {signOutOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm"
              onClick={() => setSignOutOpen(false)}
            />
            <div
              className="fixed left-1/2 top-1/2 z-[10000] -translate-x-1/2 -translate-y-1/2 bg-[#181818] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Sign out confirmation"
            >
              <h2 className="text-white text-xl font-semibold mb-2">Sign Out</h2>
              <p className="text-white/50 text-sm mb-6">Are you sure you want to sign out?</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setSignOutOpen(false)}
                  className="px-4 py-2 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors text-sm font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
