"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalOpenAtom, userDataAtom } from "../atoms";
import { X, Send, Heart, Reply, MoreHorizontal, Loader2 } from "lucide-react";

export interface User {
  id: number;
  username: string;
  picture: string;
}

export interface Comment {
  commentId: number;
  text: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  postId: number;
  user: User;
  _count?: {
    likes: number;
  };
  isLikedByUser?: boolean;
}

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function CommentsModal({
  username,
  postId,
  userId,
  currentPostImage,
}: {
  username: string;
  postId: number | null;
  userId: number;
  currentPostImage: string | null;
}) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [showCommentsModal, setShowCommentsModal] = useRecoilState(modalOpenAtom);
  const [text, setText] = useState<string>("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const userDataValue = useRecoilValue(userDataAtom);

  async function getCommentsByPostId(postId: number) {
    setIsLoadingComments(true);
    try {
      const comments = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/all`,
        { postId }
      );
      setComments(comments.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  }

  async function postComment() {
    if (text.trim() === "") return;
    setIsPostingComment(true);
    
    const optimisticComment: Comment = {
      commentId: Date.now(),
      text,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      postId: postId!,
      user: {
        id: userDataValue.id,
        username: userDataValue.username,
        picture: userDataValue.picture,
      },
    };
    
    setComments((prev) => prev ? [optimisticComment, ...prev] : [optimisticComment]);
    setText("");
    
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/add`,
        { userId, text, postId }
      );
    } catch (error) {
      setComments((prev) => prev?.filter((c) => c.commentId !== optimisticComment.commentId) || null);
      console.error("Error posting comment:", error);
    } finally {
      setIsPostingComment(false);
    }
  }

  useEffect(() => {
    if (postId) getCommentsByPostId(postId);
  }, [postId]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowCommentsModal(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [setShowCommentsModal]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className={`bg-[#151515] relative text-white border border-white/10 rounded-2xl shadow-xl w-[90%] max-w-3xl overflow-hidden ${currentPostImage ? "md:grid md:grid-cols-2" : ""}`}>
        {/* Close Button */}
        <button
          onClick={() => setShowCommentsModal(false)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white/50" />
        </button>

        {/* Post Image */}
        {currentPostImage && (
          <div className="hidden md:flex items-center justify-center border-r border-white/10 p-4 bg-[#0a0a0a]">
            <Image
              className="rounded-xl max-h-[400px] object-contain"
              src={currentPostImage}
              alt="Post Image"
              width={400}
              height={400}
            />
          </div>
        )}

        {/* Comments Section */}
        <div className="flex flex-col h-[500px] md:h-[600px]">
          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-white">{username}</span>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/40">
                {comments?.length || 0} {comments?.length === 1 ? 'comment' : 'comments'}
              </span>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {isLoadingComments ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-white/30 animate-spin" />
              </div>
            ) : !comments || comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-white/40 text-sm font-medium">No comments yet</p>
                <p className="text-white/20 text-xs mt-2">Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="group flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Image
                    className="rounded-full w-9 h-9 flex-shrink-0 ring-1 ring-white/10"
                    src={comment.user.picture}
                    alt={comment.user.username}
                    width={36}
                    height={36}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">
                        {comment.user.username}
                      </span>
                      <span className="text-xs text-white/30">
                        {getRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-white/80 break-words mt-1 leading-relaxed">
                      {comment.text}
                    </p>
                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 mt-2">
                      <button className="text-xs text-white/40 hover:text-rose-400 transition-colors flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5" />
                        <span>Like</span>
                      </button>
                      <button className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5">
                        <Reply className="w-3.5 h-3.5 rotate-180" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/50 transition-opacity self-center p-1">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 bg-[#0f0f0f] border border-white/10 rounded-full px-4 py-2.5 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10 transition-all">
              {userDataValue.picture ? (
                <Image
                  className="rounded-full w-8 h-8 flex-shrink-0 ring-1 ring-white/5"
                  src={userDataValue.picture}
                  alt="Your avatar"
                  width={32}
                  height={32}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white/50">U</span>
                </div>
              )}
              <input
                onChange={(e) => setText(e.target.value)}
                type="text"
                autoFocus
                value={text}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    postComment();
                  }
                }}
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                placeholder="Write a comment..."
              />
              <button
                onClick={postComment}
                disabled={text.trim() === "" || isPostingComment}
                className={`p-1.5 rounded-full transition-all ${
                  text.trim() === "" || isPostingComment
                    ? "text-white/20 cursor-not-allowed"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {isPostingComment ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}