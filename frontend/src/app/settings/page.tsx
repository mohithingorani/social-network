"use client";

import { useEffect, useRef, useState } from "react";
import {
  Camera,
  User,
  ArrowLeft,
  Upload,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { pageAtom } from "../atoms";

type SettingsTab = "profile" | "username";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [, setCurrPage] = useRecoilState(pageAtom);
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [userId, setUserId] = useState<number>(0);
  const [currentPicture, setCurrentPicture] = useState<string>("");
  const [currentUsername, setCurrentUsername] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [usernameInput, setUsernameInput] = useState("");
  const [usernameSaving, setUsernameSaving] = useState(false);
  const [usernameSuccess, setUsernameSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs = [
    { id: "profile" as SettingsTab, label: "Profile Photo", icon: Camera },
    { id: "username" as SettingsTab, label: "Username", icon: User },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.email) return;
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/details?email=${session.user.email}`,
        );
        setUserId(data.id);
        setCurrentPicture(data.picture);
        setCurrentUsername(data.username);
        setUsernameInput(data.username);
      } catch (e) {
        console.error("Failed to fetch user", e);
      }
    };
    fetchUser();
  }, [session?.user?.email]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handlePictureUpload = async () => {
    if (!file || !userId) return;
    setUploading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/upload`,
        { fileType: file.type },
        { headers: { "Content-Type": "application/json" } },
      );

      await axios.put(data.signedUrl, file, {
        headers: { "Content-Type": file.type },
      });

      const publicUrl = data.publicUrl.split("?")[0];

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updatePicture`, {
        userId,
        picture: publicUrl,
      });

      setCurrentPicture(publicUrl);
      setFile(null);
      setPreview(null);
      toast.success("Profile picture updated!");
    } catch (e) {
      console.error("Upload failed", e);
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleUsernameSave = async () => {
    if (!usernameInput.trim() || !userId) return;
    if (usernameInput === currentUsername) {
      setActiveTab("profile");
      return;
    }
    setUsernameSaving(true);
    setUsernameSuccess(false);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/updateUsername`, {
        userId,
        username: usernameInput.trim().toLowerCase(),
      });
      setCurrentUsername(usernameInput.trim().toLowerCase());
      setUsernameSuccess(true);
      setTimeout(() => {
        setUsernameSuccess(false);
        setActiveTab("profile");
      }, 1500);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message || "Failed to update username";
      toast.error(msg);
    } finally {
      setUsernameSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/feed"
          onClick={() => setCurrPage("home")}
          aria-label="Back"
          className="p-2 rounded-xl hover:bg-white/5 text-white/50 hover:text-white transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-semibold text-white">Account Settings</h1>
      </div>

      <div className="flex gap-2 p-1 bg-[#0f0f0f] rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white/10 text-white shadow-sm"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            <tab.icon className="w-4 h-4 hidden sm:block" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">
              {tab.id === "profile" && <Camera className="w-4 h-4" />}
              {tab.id === "username" && <User className="w-4 h-4" />}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-[#181818] border border-white/5 rounded-2xl p-6">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Profile Photo</h2>
              <p className="text-sm text-white/40">Update your profile picture</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white/5 border-2 border-white/10">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : currentPicture ? (
                  <Image
                    src={currentPicture}
                    alt="Current"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Camera className="w-10 h-10 text-white/30 absolute inset-0 m-auto" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {file ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePictureUpload}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading…
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Choose Photo
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === "username" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">Change Username</h2>
              <p className="text-sm text-white/40">Your username is how others find you</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Username</label>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/5 rounded-xl text-white placeholder-white/30 outline-none focus:border-white/10 transition-colors"
                  placeholder="Enter new username"
                />
              </div>
              <button
                onClick={handleUsernameSave}
                disabled={usernameSaving || !usernameInput.trim()}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50"
              >
                {usernameSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : usernameSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  "Update Username"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
