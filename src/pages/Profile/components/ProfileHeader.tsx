import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { authHeaders, getDivision } from "@/utils/Functions";
import React, { useEffect, useRef, useState } from "react";
import Toast from "@/components/Toast";

const ProfileHeader: React.FC = () => {
  const { user, updateUser } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  //console.log("User data in ProfileHeader:", user);
  const division = getDivision(user?.rating as number);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement image upload logic here
      console.log("Selected file:", file);
      setFile(file);
    }
  };

  useEffect(() => {
    if (file) {
      handleImageUpload();
    }
  }, [file]);

  const getUserProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/users/me`, {
        headers: { ...authHeaders(), "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      const data = await response.json();
      console.log("Fetched user profile:", data);
      updateUser(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const handleImageUpload = async () => {
    console.log("handleImageUpload called");
    console.log("File to upload:", file);
    setUploading(true);
    try {
      console.log("Uploading file:", file);
      const data = new FormData();
      data.append("file", file as Blob);
      console.log("formData:", data);

      const resonse = await fetch(`${baseUrl}/profile/upload`, {
        headers: { ...authHeaders() },
        method: "POST",
        body: data,
      });

      if (!resonse.ok) {
        throw new Error("Upload failed");
      }

      const result = await resonse.json();
      console.log("Upload result:", result);
      showToast("Image uploaded successfully!", "success");
      await getUserProfile();
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  const getJoinedDate = (date: string) => {
    const joinedDate = new Date(date);
    return joinedDate.toLocaleDateString();
  };

  return (
    <>
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-5xl">
                  {user?.image_url ? (
                    <img
                      src={user.image_url}
                      alt="User Avatar"
                      className="rounded-full w-full h-full"
                    />
                  ) : (
                    // <div className="flex flex-col items-center justify-center w-full h-full text-sm text-gray-400 text-center p-2">
                    //   <svg
                    //     className="w-8 h-8 mb-1"
                    //     fill="none"
                    //     stroke="currentColor"
                    //     viewBox="0 0 24 24"
                    //   >
                    //     <path
                    //       strokeLinecap="round"
                    //       strokeLinejoin="round"
                    //       strokeWidth={2}
                    //       d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    //     />
                    //   </svg>
                    //   <span>No photo</span>
                    //   <span>Click to upload</span>
                    // </div>
                    <img
                    src={"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"}
                    alt="User Avatar"
                    className="rounded-full w-full h-full"
                  />
                  )}
                </div>
              </div>
              <div className="absolute bottom-2 right-2">
                <button
                  onClick={handleImageClick}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  disabled={uploading}
                >
                  {uploading ? (
                    <svg
                      className="w-5 h-5 text-gray-300 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  )}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="text-center md:text-left flex-grow">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                  {user?.username}
                </h1>
                <div className="flex gap-2">
                  <span className={`${division.badgeClasses}`}>
                    {division.name}
                  </span>
                  {/* <span className="px-3 py-1 text-sm bg-purple-500/10 text-purple-400 rounded-full">
                    Tournament Winner
                  </span> */}
                </div>
              </div>
              <p className="text-gray-400 mt-2">
                Joined {getJoinedDate(user?.created_at ?? "")}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">#{user?.rank}</div>
                <div className="text-sm text-gray-400">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {user?.games_won
                    ? ((user.games_won / user.games_played) * 100).toFixed(2)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-400">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {user?.games_played}
                </div>
                <div className="text-sm text-gray-400">Matches</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </>
  );
};

export default ProfileHeader;
