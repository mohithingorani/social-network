"use client";

import Image from "next/image";
import { formatDate } from "../lib/formatDate";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataAtom, openCommentsPostIdAtom } from "../atoms";
import { Send, MessageCircle, Heart, Reply, MoreHorizontal, Loader2 } from "lucide-react";

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return formatDate(dateString);
}

interface Comment {
  commentId: number;
  text: string;
  userId: number;
  createdAt: string;
  user: {
    username: string;
    picture: string;
  };
  _count?: {
    likes: number;
  };
  isLikedByUser?: boolean;
}

export default function Post({
  image,
  caption,
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  username,
  picture,
  likePost,
  postId,
  isLikedByUser,
  userId,
}: {
  image: string | null;
  caption: string;
  likesCount?: number;
  createdAt: string;
  commentsCount: number;
  postId: number;
  username: string;
  picture: string;
  likePost: () => Promise<void>;
  isLikedByUser: boolean;
  userId: number;
}) {
  const userDataValue = useRecoilValue(userDataAtom);
  const [numLikes, setNumLikes] = useState(likesCount);
  const [liked, setLiked] = useState(isLikedByUser);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [currentUserPicture, setCurrentUserPicture] = useState<string>("");
  const commentInputRef = useRef<HTMLInputElement>(null);
  
  const openCommentsPostId = useRecoilValue(openCommentsPostIdAtom);
  const setOpenCommentsPostId = useSetRecoilState(openCommentsPostIdAtom);
  const showComments = openCommentsPostId === postId;

  useEffect(() => {
    if (showComments && commentInputRef.current) {
      setTimeout(() => commentInputRef.current?.focus(), 100);
    }
  }, [showComments]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showComments) {
        setOpenCommentsPostId(null);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showComments, setOpenCommentsPostId]);

  const handleLikeClick = async () => {
    try {
      await likePost();
      setLiked((prev) => !prev);
      setNumLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error updating like:", err);
    }
  };

  const fetchComments = async (id: number) => {
    setIsLoadingComments(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/all`,
        { postId: id }
      );
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const handleCommentToggle = async () => {
    if (openCommentsPostId === postId) {
      setOpenCommentsPostId(null);
    } else {
      if (comments.length === 0) {
        await fetchComments(postId);
      }
      setOpenCommentsPostId(postId);
    }
  };

  const postComment = async () => {
    if (newComment.trim() === "") return;
    setIsPostingComment(true);
    
    const optimisticComment: Comment = {
      commentId: Date.now(),
      text: newComment,
      userId,
      createdAt: new Date().toISOString(),
      user: {
        username: userDataValue.username,
        picture: userDataValue.picture,
      },
    };
    
    setComments((prev) => [optimisticComment, ...prev]);
    setNewComment("");
    
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/comments/add`,
        { 
          userId, 
          text: newComment, 
          postId 
        }
      );
    } catch (error) {
      setComments((prev) => prev.filter((c) => c.commentId !== optimisticComment.commentId));
      console.error("Error posting comment:", error);
    } finally {
      setIsPostingComment(false);
    }
  };

  useEffect(() => {
    if (userDataValue.picture) {
      setCurrentUserPicture(userDataValue.picture);
    }
  }, [userDataValue]);

  return (
    <div className="bg-[#181818] p-3 rounded-2xl border border-white/10">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <Image
          className="rounded-full w-9 h-9"
          src={picture}
          width={36}
          height={36}
          alt="profile"
        />
        <div>
          <div className="text-sm font-medium text-white">{username}</div>
          <div className="text-xs text-white/30">{formatDate(createdAt)}</div>
        </div>
      </div>

      {/* Post Image */}
      {image && (
        <div className="flex justify-center items-center mb-3">
          <Image
            className="rounded-xl max-h-[500px] object-contain"
            src={image}
            alt="Post Image"
            width={500}
            height={500}
          />
        </div>
      )}

      {/* Caption */}
      <div className="text-sm text-white/80 mb-3">
        {caption}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <div className="flex items-center gap-1">
          <button 
            onClick={handleLikeClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all group"
          >
            <Heart 
              className={`w-5 h-5 transition-all group-hover:scale-110 ${liked ? 'fill-rose-500 text-rose-500' : 'text-white/40'}`}
            />
            <span className={`text-sm font-medium ${liked ? 'text-rose-400' : 'text-white/40'}`}>
              {numLikes}
            </span>
          </button>

          <button 
            onClick={handleCommentToggle}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all ${showComments ? 'bg-white/5' : ''}`}
          >
            <MessageCircle className={`w-5 h-5 transition-colors ${showComments ? 'text-white' : 'text-white/40'}`} />
            <span className="text-sm text-white/40">{commentsCount}</span>
          </button>
        </div>
      </div>

      {/* Inline Comments Section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-white/10">
          {/* Comments Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-white/80">
              Comments ({comments.length})
            </span>
            <button
              onClick={() => setOpenCommentsPostId(null)}
              className="text-white/30 hover:text-white/50 text-xs"
            >
              Hide
            </button>
          </div>

          {/* Loading State */}
          {isLoadingComments ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-white/30 animate-spin" />
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-white/20" />
              </div>
              <p className="text-white/40 text-sm font-medium">No comments yet</p>
              <p className="text-white/20 text-xs mt-1">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
              {comments.map((comment, index) => (
                <div key={index} className="group flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Image
                    className="rounded-full w-8 h-8 flex-shrink-0 ring-1 ring-white/10"
                    src={comment.user.picture}
                    alt={comment.user.username}
                    width={32}
                    height={32}
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
                    <p className="text-sm text-white/80 break-words mt-0.5 leading-relaxed">
                      {comment.text}
                    </p>
                    {/* Comment Actions */}
                    <div className="flex items-center gap-4 mt-1.5">
                      <button className="text-xs text-white/40 hover:text-rose-400 transition-colors flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>Like</span>
                      </button>
                      <button className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1">
                        <Reply className="w-3 h-3 rotate-180" />
                        <span>Reply</span>
                      </button>
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-white/50 transition-opacity self-center">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Input */}
          <div className="flex items-center gap-3 bg-[#0f0f0f] border border-white/10 rounded-full px-4 py-2.5 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10 transition-all">
            {currentUserPicture ? (
              <Image
                className="rounded-full w-7 h-7 flex-shrink-0"
                src={currentUserPicture}
                alt="Your avatar"
                width={28}
                height={28}
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-white/50">U</span>
              </div>
            )}
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  postComment();
                }
              }}
              placeholder="Write a comment..."
              ref={commentInputRef}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
            <button
              onClick={postComment}
              disabled={newComment.trim() === "" || isPostingComment}
              className={`p-1.5 rounded-full transition-all ${
                newComment.trim() === "" || isPostingComment
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
      )}
    </div>
  );
}