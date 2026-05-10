"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Image as ImageIcon, Smile } from "lucide-react";

export const AddPost = ({
  userId,
  refreshPosts,
}: {
  userId: number;
  refreshPosts: (newPost?: any) => void;
}) => {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setPreview(previewUrl);
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleUpload = async () => {
    if (!caption.trim() && !file) return;

    try {
      setIsUploading(true);

      let imageUrl: string | null = null;

      if (file) {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/upload`,
          { fileName: file.name, fileType: file.type },
          { headers: { "Content-Type": "application/json" } }
        );

        await axios.put(data.url, file, {
          headers: { "Content-Type": file.type },
        });

        imageUrl = data.url.split("?")[0];
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/create`, {
        userId,
        image: imageUrl,
        caption,
      });

      const newPost = {
        ...response.data.post,
        _count: { likes: 0, comments: 0 },
        isLikedByUser: false,
      };

      setCaption("");
      setFile(null);
      setPreview(null);
      refreshPosts(newPost);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 rounded-2xl border border-white/10 bg-[#1a1a1a] w-full text-white shadow-lg shadow-black/20">
      {/* Profile and Input */}
      <div className="flex items-center gap-3">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="profile"
            width={44}
            height={44}
            className="rounded-full w-11 h-11 ring-2 ring-white/10"
          />
        )}

        <div className="flex-1 bg-[#0f0f0f] rounded-xl px-4 py-3 border border-white/5">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpload();
              }
            }}
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            type="text"
            placeholder="What's on your mind?"
            className="w-full text-base bg-transparent outline-none placeholder-white/30"
          />
        </div>
      </div>

      {/* Image Preview & Actions */}
      {(preview || file) && (
        <div className="mt-3 relative">
          <div className="relative inline-block">
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-lg max-h-40 object-contain"
              />
            )}
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80"
            >
              <span className="text-white text-xs">✕</span>
            </button>
          </div>
        </div>
      )}

      {/* Actions Row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div className="flex items-center gap-1">
          <button
            onClick={handleDivClick}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-white/10 rounded-xl transition-colors text-white/50 hover:text-white">
            <Smile className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={handleUpload}
          disabled={isUploading || (!caption.trim() && !file)}
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg ${
            caption.trim() || file
              ? "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Posting..." : "Post"}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};