import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { authHeaders, removeToken } from "@/utils/Functions";
import Toast from "@/components/Toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileSettings: React.FC = () => {
  const { user } = useAppContext();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [settings, setSettings] = useState({
    username: user?.username || "Player",
    email: user?.email || "player@example.com",
    phone: user?.phone || "",
    avatar: "👑",
    notifications: {
      gameInvites: true,
      friendRequests: true,
      tournamentUpdates: true,
      newsAndUpdates: false,
    },
    privacy: {
      showOnline: true,
      allowFriendRequests: true,
      showMatchHistory: true,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { updateUser } = useAppContext();

  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogout = () => {
    // Implement logout logic here (e.g., clear auth tokens, redirect to login page)
    // Clear session storage
    removeToken();
    // Clear user context
    updateUser(null);
    // Redirect to signin page
    navigate("/signin");
  };

  const updateProfile = async () => {
    // Implement profile update logic here (e.g., send updated settings to backend)
    // For now, just toggle editing mode off
    setIsEditing(!isEditing);
  if (!isEditing) return;
    try {
      // Simulate API call to update profile
      setIsUpdatingProfile(true);
      const response = await fetch(`${baseUrl}/users/${user?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ phone: settings.phone }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setShowToast(true);
      } else {
        console.error(
          "Failed to update profile:",
          responseData.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <div className="space-y-8">
      <Toast
        message="Profile updated successfully"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      {/* Profile Settings */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              value={settings.username}
              disabled={true}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white disabled:opacity-60"
            />
            <p className="text-xs text-gray-400 mt-1">
              Username cannot be changed
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              disabled={true}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white disabled:opacity-60"
            />
            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={settings.phone}
              disabled={!isEditing}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white disabled:opacity-60"
            />
          </div>
          <button
            onClick={updateProfile}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            {
              isUpdatingProfile ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : isEditing? "Save Changes": "Edit Profile"
            }
{/* 
            {isEditing ? "Save Changes" : "Edit Profile"} */}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      {/* <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Notification Settings
        </h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  className="sr-only peer"
                  onChange={() => {
                    setSettings((prev) => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [key]: !value,
                      },
                    }));
                  }}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Privacy Settings */}
      {/* <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  className="sr-only peer"
                  onChange={() => {
                    setSettings((prev) => ({
                      ...prev,
                      privacy: {
                        ...prev.privacy,
                        [key]: !value,
                      },
                    }));
                  }}
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div> */}

      {/* Logout */}
      <div className="bg-gray-750 rounded-lg p- borde border-gray-700 borde">
        <button
          onClick={handleLogout}
          className="w-full px- py-2 bg-blue-600 text-white rounded-lg hove:bg-yellow-700"
        >
          Logout
        </button>
      </div>

      {/* Danger Zone */}
      {/* <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileSettings;
