"use client";

import NavBar from "../components/AppBar";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  isOnlineAtom,
  modalOpenAtom,
  pageAtom,
  selectedFileAtom,
  selectedFileForStory,
  storyPreviewAtom,
  userDataAtom,
  userNameAtom,
} from "../atoms";

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

import { useRouter } from "next/navigation";
import Image from "next/image";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import { AddPost } from "../components/AddPost";
import { MessageCard } from "../components/MessageCard";
import { StoriesCard } from "../components/CircleStoriesCard";
import { useFriends } from "@/hooks/useFriends";
import { PostInterface, StoryInterface } from "@/types/types";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import StoryPage from "../components/StoryPage";
import MessagesPage from "../components/MessagesPage";
import { Search, UserPlus, UserCheck, Loader2 } from "lucide-react";
import SettingsPage from "../settings/page";


export interface userData {
  email: string;
  name: string;
  picture: string;
  username: string;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface searchedFriends {
  username: string;
  picture: string;
  id: number;
}

enum showFriendsMenu {
  showFriends = 0,
  showRequests = 1,
}

export default function Home() {
  const session = useSession();
  const [userData, setUserData] = useState<userData | null>(null);
  const [userDataValue, setUserDataValue] = useRecoilState(userDataAtom);
  const [userNameValue, setUserNameValue] = useRecoilState(userNameAtom);
  const [isOnline, setIsOnline] = useRecoilState(isOnlineAtom);
  const [menuOpen, setMenuOpen] = useState<0 | 1 | 2>(0);
  const [currPage, setCurrPage] = useRecoilState(pageAtom);
  const router = useRouter();
  
  const { friends, loading, refetch } = useFriends();
  const [friendRequests, setFriendRequests] = useState<any[] | null>(null);
  const [searchedFriends, setSearchedFriends] = useState<
    searchedFriends[] | null
  >(null);
  const [posts, setPosts] = useState<PostInterface[] | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const [searchFriendsInput, setSearchFriendsInput] = useState<string>("");
  const [suggestedFriendsInput, setSuggestedFriendsInput] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [friendsDrawerOpen, setFriendsDrawerOpen] = useState(false);
  const [discoverResults, setDiscoverResults] = useState<searchedFriends[]>([]);
  const [discoverInput, setDiscoverInput] = useState("");
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());
  // Messages page is extracted into a dedicated component.
  const [storyPreview, setStoryPreview] = useRecoilState(storyPreviewAtom);
  const filteredFriends = friends?.filter((f: any) =>
    f.username?.toLowerCase().includes(searchFriendsInput.toLowerCase()),
  );
  const [storyFile, setStoryFile] = useRecoilState(selectedFileForStory);
  const [groupedStories, setGroupedStories] = useState<Record<
    number,
    StoryInterface[]
  > | null>(null);
  const filteredSuggestFriends = searchedFriends?.filter((f: any) => {
    return f.username
      ?.toLowerCase()
      .includes(suggestedFriendsInput.toLocaleLowerCase());
  });

  useEffect(() => {
    const getInfo = async () => {
      try {
        console.log("Searching for user Data");
        if (session.data?.user?.email) {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/details?email=${session.data.user.email}`,
          );
          console.log("API response:", data);
          setUserData(data);
          setUserDataValue(data);
          if (data?.username) {
            setUserNameValue(data.username);
          } else {
            console.error("Username not found in API response.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInfo();
  }, [session.data?.user?.email]);

  async function getPosts() {
    setPostsLoading(true);
    try {
      if (userDataValue.id != 0) {
        await new Promise(resolve => setTimeout(resolve, 1200));
        const posts = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getPosts?userId=${userDataValue?.id}`,
        );
        console.log(posts);
        setPosts(posts.data.posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPostsLoading(false);
    }
  }

  const addNewPost = (newPost: any) => {
    setPosts((prev) => [newPost, ...(prev || [])]);
  }

  const updatePostLike = (postId: number, isLiked: boolean) => {
    setPosts((prev) => 
      prev?.map((post) => 
        post.id === postId 
          ? { 
              ...post, 
              isLikedByUser: isLiked, 
              _count: { 
                ...post._count, 
                likes: isLiked ? post._count.likes + 1 : post._count.likes - 1 
              } 
            }
          : post
      ) || null
    );
  };
  useEffect(() => {
    getPosts();
    getStories();
  }, [userDataValue]);

  async function searchFriends(name: string) {
    const friends = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/search`,
      {
        username: name,
        selfUserName: userData?.username,
      },
    );
    if (friends) {
      console.log("====================================");
      console.log("Friends searched");
      console.log(friends.data);
      console.log("====================================");
      setSearchedFriends(friends.data);
    }
  }

  useEffect(() => {
    searchFriends("");
  }, []);

  async function searchDiscover(name: string) {
    if (!userDataValue.id) return;
    setDiscoverLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/suggestions`,
        {
          username: name,
          selfUserName: userData?.username,
          userId: userDataValue.id,
        },
      );
      setDiscoverResults(res.data);
    } catch (e) {
      console.error("Discover search failed", e);
    } finally {
      setDiscoverLoading(false);
    }
  }

  useEffect(() => {
    if (userDataValue.id) searchDiscover("");
  }, [userDataValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchDiscover(discoverInput);
    }, 300);
    return () => clearTimeout(timer);
  }, [discoverInput]);

  async function sendDiscoverRequest(friendId: number) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/friend/request`, {
        fromUserId: userDataValue.id,
        toUserId: friendId,
      });
      setSentRequests((prev) => new Set(Array.from(prev).concat(friendId)));
      toast.success("Friend request sent!");
    } catch (e: any) {
      toast.error(e?.response?.data?.message || "Failed to send request");
    }
  }

  async function getFriendRequests() {
    if (userDataValue.id != 0) {
      const friendRequests = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/requests`,
        {
          userId: userDataValue.id,
        },
      );
      setFriendRequests(friendRequests.data.requests);
    }
  }

  useEffect(() => {
    getFriendRequests();
  }, [userDataValue]);

  useEffect(() => {
    const updateLastActive = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/onlinestatus`,
          {
            email: userData?.email,
          },
        );
        return data;
      } catch (err) {
        console.log("Error updating last active");
        console.log(err);
      }
    };
    updateLastActive();
    const interval = setInterval(() => {
      console.log(friends);
      updateLastActive();
    }, 25000);

    return () => clearInterval(interval);
  }, [userData?.email]);

  useEffect(() => {
    if (session.data?.user && session.status === "authenticated") {
      setLoggedIn(true);
      console.log("Session data:", session.data);
    } else if (session.status === "unauthenticated") {
      console.log("No session data found");
      router.push("/signin");
    }
  }, [session]);

  if (!loggedIn) {
    return (
      <div className="text-white flex h-screen w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }
  function openChat(friend: any) {
    const room = [userDataValue.username, friend.username].sort().join("-");
    router.push(`/chat/?room=${room}`);
  }

  async function sendFriendRequest(friendId: number) {
    const friendRequest = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/friend/request`,
      {
        fromUserId: userDataValue.id,
        toUserId: friendId,
      },
    );
    const notify = () => toast(friendRequest.data.message);

    notify();
    return friendRequest;
  }

  async function acceptFriendRequest(senderId: number, requestId: number) {
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/friends/accept`,
      {
        senderId,
        receiverId: userDataValue.id,
        requestId,
      },
    );
    const notify = () => toast(request.data.message);
    getFriendRequests();
    notify();
    refetch();
    return acceptFriendRequest;
  }

  async function getStories() {
    if (!userDataValue) return;

    const response = await axios.post<{ stories: StoryInterface[] }>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/stories/all`,
      { userId: userDataValue.id },
    );

    const storiesData: StoryInterface[] = response.data.stories;

    const grouped = storiesData.reduce(
      (acc: Record<number, StoryInterface[]>, story: StoryInterface) => {
        if (!acc[story.userId]) acc[story.userId] = [];
        acc[story.userId].push(story);
        return acc;
      },
      {},
    );

    setGroupedStories(grouped);
  }



  return (
    
  <div className="max-h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-3 md:gap-4 px-2 sm:px-3 lg:px-4 xl:px-8 2xl:px-12 py-2 sm:py-3 lg:py-4 mx-auto w-full max-w-screen-xl 2xl:max-w-screen-2xl">
          {/* Friends drawer for mid breakpoints (when right sidebar is collapsed) */}
          {friendsDrawerOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
                onClick={() => setFriendsDrawerOpen(false)}
              />
               <div className="fixed right-0 top-0 bottom-0 w-[24rem] max-w-[90vw] bg-[#141414] border-l border-white/10 z-[70] xl:hidden">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">Friends</span>
                      <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                        {friends?.length || 0}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="text-white/60 hover:text-white transition-colors"
                      onClick={() => setFriendsDrawerOpen(false)}
                      aria-label="Close friends"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4 overflow-y-auto flex-1 min-h-0">
                    {/* Search */}
                    <div className="relative mb-3">
                      <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchFriendsInput}
                        onChange={(e) => setSearchFriendsInput(e.target.value)}
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

                    {/* Tabs */}
                    <div className="flex gap-1 w-full mb-4 p-1 bg-[#0f0f0f] rounded-xl">
                      <button
                        onClick={() => setMenuOpen(0)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          menuOpen === 0
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        Friends
                      </button>
                      <button
                        onClick={() => setMenuOpen(1)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                          menuOpen === 1
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        Requests
                        {friendRequests && friendRequests.length > 0 && (
                          <span className="text-xs bg-rose-500 text-white px-1.5 rounded-full">
                            {friendRequests.length}
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => setMenuOpen(2)}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          menuOpen === 2
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        Find People
                      </button>
                    </div>

                    {/* Content */}
                    {menuOpen === 0 && (
                      <div>
                        {loading ? (
                          <div className="flex items-center justify-center h-24">
                            <div className="w-6 h-6 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
                          </div>
                        ) : filteredFriends && filteredFriends.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-40 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                              <span className="text-xl">👥</span>
                            </div>
                            <p className="text-white/40 text-sm">No friends found</p>
                            <p className="text-white/20 text-xs mt-1">Search to add friends</p>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            {filteredFriends?.map((friend: any, index: number) => {
                              const isOnline = friend.onlineStatus === true;
                              return (
                                <div
                                  className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                                  key={index}
                                  onClick={() => {
                                    setFriendsDrawerOpen(false);
                                    openChat(friend);
                                  }}
                                >
                                  <div className="relative">
                                    <Image
                                      src={friend.picture}
                                      alt={friend.username}
                                      width={44}
                                      height={44}
                                      className="rounded-full w-11 h-11"
                                    />
                                    <div
                                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414] ${
                                        isOnline ? "bg-green-500" : "bg-gray-500"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                      {friend.username || "Unknown"}
                                    </div>
                                    <div
                                      className={`text-xs ${
                                        isOnline ? "text-green-400" : "text-white/40"
                                      }`}
                                    >
                                      {isOnline
                                        ? "Online"
                                        : getLastSeen(friend.lastOnline)}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                    {menuOpen === 1 && (
                      <div>
                        {!friendRequests || friendRequests.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-40 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                              <span className="text-xl">📭</span>
                            </div>
                            <p className="text-white/40 text-sm">No pending requests</p>
                            <p className="text-white/20 text-xs mt-1">
                              Friend requests will appear here
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {friendRequests?.map((request: any, index: number) => (
                              <div
                                className="p-3 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-colors"
                                key={index}
                              >
                                <div className="flex items-center gap-3 mb-3">
                                  <Image
                                    src={request.sender.picture}
                                    alt={request.sender.username}
                                    width={40}
                                    height={40}
                                    className="rounded-full w-10 h-10"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                      {request.sender.username || "Unknown"}
                                    </div>
                                    <div className="text-xs text-white/30">
                                      Wants to connect
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() =>
                                    acceptFriendRequest(request.sender.id, request.id)
                                  }
                                  className="w-full py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                                >
                                  Accept
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {menuOpen === 2 && (
                      <div className="flex-1 overflow-y-auto min-h-0 -mx-2 px-2">
                        <div className="relative mb-3">
                          <input
                            type="text"
                            placeholder="Search people..."
                            value={discoverInput}
                            onChange={(e) => setDiscoverInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0f0f0f] border border-white/5 rounded-xl outline-none placeholder-white/30 focus:border-white/10 transition-colors"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        </div>

                        {discoverLoading ? (
                          <div className="space-y-2">
                            {[0, 1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.04] animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                                <div className="flex-1 h-3 w-24 rounded bg-white/5" />
                                <div className="w-16 h-7 rounded-lg bg-white/5" />
                              </div>
                            ))}
                          </div>
                        ) : discoverResults.length === 0 ? (
                          <div className="flex flex-col items-center justify-center h-40 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                              <span className="text-xl">🔍</span>
                            </div>
                            <p className="text-white/40 text-sm">No people found</p>
                            <p className="text-white/20 text-xs mt-1">Try a different search</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {discoverResults.map((person: any) => {
                              const isSent = sentRequests.has(person.id);
                              return (
                                <div
                                  key={person.id}
                                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                                >
                                  <Image
                                    src={person.picture}
                                    alt={person.username}
                                    width={40}
                                    height={40}
                                    className="rounded-full w-10 h-10 shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-white truncate">
                                      {person.username}
                                    </div>
                                    {person.name && person.name !== person.username && (
                                      <div className="text-xs text-white/30 truncate">{person.name}</div>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => sendDiscoverRequest(person.id)}
                                    disabled={isSent}
                                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                      isSent
                                        ? "bg-white/5 text-white/30 cursor-default"
                                        : "bg-blue-600 hover:bg-blue-500 text-white"
                                    }`}
                                  >
                                    {isSent ? (
                                      <>
                                        <UserCheck className="w-3.5 h-3.5" />
                                        Sent
                                      </>
                                    ) : (
                                      <>
                                        <UserPlus className="w-3.5 h-3.5" />
                                        Add
                                      </>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
          {storyPreview && storyFile && (
            <StoryPage
              storyFile={storyFile}
              onClickClose={() => {
                setStoryPreview(undefined);
                setStoryFile(undefined);
              }}
              userName={userDataValue.username}
              userId={userDataValue.id}
              userImage={userDataValue.picture}
              storyImage={storyPreview}
            />
          )}
           <div className="hidden lg:block lg:sticky lg:top-0 lg:w-0 xl:w-64 overflow-hidden opacity-0 xl:opacity-100 transition-[width,opacity] duration-300 ease-out">
             <div className="w-64">
               <NavBar userName={userNameValue} variant="desktop" />
             </div>
           </div>
 <div className="border border-white/5 max-h-max text-white rounded-xl bg-[#141414] shadow-lg shadow-black/20">
             <div className="w-full flex rounded-xl h-[95vh]">
               <div className="flex-1 min-w-0 flex h-[95vh] flex-col overflow-hidden">
                 <div className="sticky top-0 z-30 xl:hidden">
                  <NavBar
                    userName={userNameValue}
                    variant="mobile"
                    onFriendsClick={() => setFriendsDrawerOpen(true)}
                  />
                </div>
                 <div className="flex-1 min-h-0 p-4 flex flex-col overflow-y-auto">
                 {currPage === "home" && (
                   <div>
               
                    <div>
                      {userDataValue.id != 0 && (
                        <AddPost
                          userId={userDataValue.id}
                          refreshPosts={addNewPost}
                        />
                      )}
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                      {postsLoading ? (
                        <>
                          <PostSkeleton />
                          <PostSkeleton />
                          <PostSkeleton />
                        </>
                      ) : (
                        posts?.map((post, index) => {
                          return (
                            <Post
                              postId={post.id}
                              isLikedByUser={post.isLikedByUser}
                              userId={userDataValue.id}
                              likePost={async () => {
                                const wasLiked = post.isLikedByUser;
                                updatePostLike(post.id, !wasLiked);
                                try {
                                  if (wasLiked) {
                                    await axios.post(
                                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/unlikePost`,
                                      {
                                        userId: userDataValue.id,
                                        postId: post.id,
                                      },
                                    );
                                  } else {
                                    await axios.post(
                                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/likePost`,
                                      {
                                        username: userDataValue.id,
                                        postId: post.id,
                                      },
                                    );
                                  }
                                } catch (error) {
                                  updatePostLike(post.id, wasLiked);
                                  console.error("Like/unlike failed:", error);
                                }
                              }}
                              likesCount={post._count.likes}
                              commentsCount={post._count.comments}
                              username={post.user.username}
                              picture={post.user.picture}
                              createdAt={post.createdAt}
                              key={post.id}
                              image={post.image || null}
                              caption={post.caption}
                            />
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
                {currPage === "messages" && (
                  <MessagesPage userId={userDataValue.id} userName={userDataValue.username} />
                )}
                {currPage === "settings" && <SettingsPage />}
              </div>
               </div>

               <div className="hidden lg:flex lg:w-0 lg:p-0 lg:border-0 xl:w-72 2xl:w-80 overflow-hidden opacity-0 xl:opacity-100 rounded-r-xl xl:p-4 xl:border-l xl:border-white/10 flex flex-col h-[95vh] xl:bg-[#141414] shrink-0 transition-[width,opacity] duration-300 ease-out">
                   {/* Header */}
                   <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg text-white">Friends</span>
                      <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                        {friends?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative mb-3">
                    <input
                      type="text"
                      placeholder="Search friends..."
                      value={searchFriendsInput}
                      onChange={(e) => setSearchFriendsInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0f0f0f] border border-white/5 rounded-xl outline-none placeholder-white/30 focus:border-white/10 transition-colors"
                    />
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 w-full mb-4 p-1 bg-[#0f0f0f] rounded-xl">
                    <button
                      onClick={() => setMenuOpen(0)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        menuOpen === 0 
                          ? "bg-white/10 text-white shadow-sm" 
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      Friends
                    </button>
                    <button
                      onClick={() => setMenuOpen(1)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        menuOpen === 1 
                          ? "bg-white/10 text-white shadow-sm" 
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      Requests
                      {friendRequests && friendRequests.length > 0 && (
                        <span className="text-xs bg-rose-500 text-white px-1.5 rounded-full">
                          {friendRequests.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setMenuOpen(2)}
                      className={`flex-1 py-2 px-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        menuOpen === 2
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      Find People
                    </button>
                  </div>

                  {/* Content */}
                  {menuOpen === 0 && (
                    <div className="flex-1 overflow-y-auto min-h-0 -mx-2 px-2">
                      {loading ? (
                        <div className="flex items-center justify-center h-24">
                          <div className="w-6 h-6 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
                        </div>
                      ) : filteredFriends && filteredFriends.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                            <span className="text-xl">👥</span>
                          </div>
                          <p className="text-white/40 text-sm">No friends found</p>
                          <p className="text-white/20 text-xs mt-1">Search to add friends</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {filteredFriends.map((friend: any, index: number) => {
                            const isOnline = friend.onlineStatus === true;
                            return (
                            <div
                              className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors"
                              key={index}
                              onClick={() => openChat(friend)}
                            >
                              <div className="relative">
                                <Image
                                  src={friend.picture}
                                  alt={friend.username}
                                  width={44}
                                  height={44}
                                  className="rounded-full w-11 h-11"
                                />
                                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414] ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-white truncate">
                                  {friend.username || "Unknown"}
                                </div>
                                <div className={`text-xs ${isOnline ? 'text-green-400' : 'text-white/40'}`}>
                                  {isOnline ? 'Online' : getLastSeen(friend.lastOnline)}
                                </div>
                              </div>
                            </div>
                          )})}
                        </div>
                      )}
                    </div>
                  )}
                  {menuOpen === 1 && (
                    <div className="flex-1 overflow-y-auto min-h-0 -mx-2 px-2">
                      {!friendRequests || friendRequests.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                            <span className="text-xl">📭</span>
                          </div>
                          <p className="text-white/40 text-sm">No pending requests</p>
                          <p className="text-white/20 text-xs mt-1">Friend requests will appear here</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {friendRequests?.map((request: any, index: number) => (
                            <div
                              className="p-3 bg-white/5 rounded-xl hover:bg-white/[0.07] transition-colors"
                              key={index}
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <Image
                                  src={request.sender.picture}
                                  alt={request.sender.username}
                                  width={40}
                                  height={40}
                                  className="rounded-full w-10 h-10"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-white truncate">
                                    {request.sender.username || "Unknown"}
                                  </div>
                                  <div className="text-xs text-white/30">Wants to connect</div>
                                </div>
                              </div>
                              <button
                                onClick={() => acceptFriendRequest(request.sender.id, request.id)}
                                className="w-full py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                              >
                                Accept
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {menuOpen === 2 && (
                    <div className="flex-1 overflow-y-auto min-h-0 -mx-2 px-2">
                      <div className="mb-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search people..."
                            value={discoverInput}
                            onChange={(e) => setDiscoverInput(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#0f0f0f] border border-white/5 rounded-xl outline-none placeholder-white/30 focus:border-white/10 transition-colors"
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                        </div>
                      </div>

                      {discoverLoading ? (
                        <div className="space-y-2">
                          {[0, 1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.04] animate-pulse">
                              <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                              <div className="flex-1 h-3 w-24 rounded bg-white/5" />
                              <div className="w-20 h-7 rounded-lg bg-white/5" />
                            </div>
                          ))}
                        </div>
                      ) : discoverResults.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                            <span className="text-xl">🔍</span>
                          </div>
                          <p className="text-white/40 text-sm">No people found</p>
                          <p className="text-white/20 text-xs mt-1">Try a different search</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {discoverResults.map((person: any) => {
                            const isSent = sentRequests.has(person.id);
                            return (
                              <div
                                key={person.id}
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
                              >
                                <Image
                                  src={person.picture}
                                  alt={person.username}
                                  width={40}
                                  height={40}
                                  className="rounded-full w-10 h-10 shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-white truncate">
                                    {person.username}
                                  </div>
                                  {person.name && person.name !== person.username && (
                                    <div className="text-xs text-white/30 truncate">{person.name}</div>
                                  )}
                                </div>
                                <button
                                  onClick={() => sendDiscoverRequest(person.id)}
                                  disabled={isSent}
                                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                    isSent
                                      ? "bg-green-500/10 text-green-400 cursor-default border border-green-500/20"
                                      : "bg-blue-600 hover:bg-blue-500 text-white"
                                  }`}
                                >
                                  {isSent ? (
                                    <>
                                      <UserCheck className="w-3.5 h-3.5" />
                                      Sent
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus className="w-3.5 h-3.5" />
                                      Add
                                    </>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    
  );
}
