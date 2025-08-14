import { useAppContext } from "@/contexts/AppContext";
import React, { useState } from "react";

const ProfileSettings: React.FC = () => {
  const { user } = useAppContext();
  const [settings, setSettings] = useState({
    username: user?.username || "Player",
    email: user?.email || "player@example.com",
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

  return (
    <div className="space-y-8">
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
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={settings.email}
              disabled={!isEditing}
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-4 py-2 text-white disabled:opacity-60"
            />
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
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
      </div>

      {/* Privacy Settings */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
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
      </div>

      {/* Danger Zone */}
      <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
        <h3 className="text-lg font-bold text-red-400 mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
