import React, { useState } from "react";
import {
  Settings,
  Bell,
  Volume2,
  Mail,
  Lock,
  Eye,
  Shield,
  User,
  Globe,
  Moon,
  Sun,
  Toggle,
  RadioTower,
  MessageSquare,
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");

  // Mock settings state
  const [settings, setSettings] = useState({
    // General Settings
    theme: "dark",
    language: "en",
    soundEffects: true,
    musicVolume: 80,
    effectsVolume: 70,

    // Privacy Settings
    profileVisibility: "public",
    onlineStatus: true,
    allowFriendRequests: true,
    allowGameInvites: "friends",
    showRecentActivity: true,

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    notifyOnFriendRequest: true,
    notifyOnGameInvite: true,
    notifyOnTournament: true,
    notifyOnAchievement: true,

    // Chat Settings
    allowDirectMessages: "friends",
    chatNotifications: true,
    showTypingIndicator: true,
    messagePreview: true,
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        {/* ...existing navbar code... */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl">
          <div className="flex flex-col md:flex-row">
            {/* Settings Sidebar */}
            <div className="md:w-64 p-6 border-b md:border-b-0 md:border-r border-gray-700">
              <div className="flex items-center mb-6">
                <Settings className="w-6 h-6 text-blue-400 mr-2" />
                <h1 className="text-xl font-bold">Settings</h1>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`w-full px-4 py-2 rounded-lg text-left flex items-center ${
                    activeTab === "general"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  General
                </button>

                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full px-4 py-2 rounded-lg text-left flex items-center ${
                    activeTab === "privacy"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <Shield className="w-5 h-5 mr-3" />
                  Privacy
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full px-4 py-2 rounded-lg text-left flex items-center ${
                    activeTab === "notifications"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <Bell className="w-5 h-5 mr-3" />
                  Notifications
                </button>

                <button
                  onClick={() => setActiveTab("chat")}
                  className={`w-full px-4 py-2 rounded-lg text-left flex items-center ${
                    activeTab === "chat"
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Chat
                </button>
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1 p-6">
              {activeTab === "general" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">General Settings</h2>

                  {/* Theme Setting */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">Theme</label>
                        <p className="text-sm text-gray-400">
                          Choose your preferred theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateSetting("theme", "light")}
                          className={`p-2 rounded-lg ${
                            settings.theme === "light"
                              ? "bg-blue-600"
                              : "bg-gray-700"
                          }`}
                        >
                          <Sun className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => updateSetting("theme", "dark")}
                          className={`p-2 rounded-lg ${
                            settings.theme === "dark"
                              ? "bg-blue-600"
                              : "bg-gray-700"
                          }`}
                        >
                          <Moon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Sound Settings */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <label className="font-medium">Sound Settings</label>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">
                            Music Volume
                          </span>
                          <span className="text-sm text-gray-400">
                            {settings.musicVolume}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.musicVolume}
                          onChange={(e) =>
                            updateSetting(
                              "musicVolume",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">
                            Effects Volume
                          </span>
                          <span className="text-sm text-gray-400">
                            {settings.effectsVolume}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={settings.effectsVolume}
                          onChange={(e) =>
                            updateSetting(
                              "effectsVolume",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Language Setting */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">Language</label>
                        <p className="text-sm text-gray-400">
                          Select your preferred language
                        </p>
                      </div>
                      <select
                        value={settings.language}
                        onChange={(e) =>
                          updateSetting("language", e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Privacy Settings</h2>

                  {/* Profile Visibility */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">
                          Profile Visibility
                        </label>
                        <p className="text-sm text-gray-400">
                          Control who can view your profile
                        </p>
                      </div>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) =>
                          updateSetting("profileVisibility", e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  {/* Online Status */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">Online Status</label>
                        <p className="text-sm text-gray-400">
                          Show when you're online
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updateSetting("onlineStatus", !settings.onlineStatus)
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.onlineStatus ? "bg-blue-600" : "bg-gray-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                            settings.onlineStatus
                              ? "translate-x-7"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Game Invites */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">Game Invites</label>
                        <p className="text-sm text-gray-400">
                          Who can send you game invites
                        </p>
                      </div>
                      <select
                        value={settings.allowGameInvites}
                        onChange={(e) =>
                          updateSetting("allowGameInvites", e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="none">No One</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">
                    Notification Settings
                  </h2>

                  {/* Email Notifications */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">
                          Email Notifications
                        </label>
                        <p className="text-sm text-gray-400">
                          Receive updates via email
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          updateSetting(
                            "emailNotifications",
                            !settings.emailNotifications
                          )
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.emailNotifications
                            ? "bg-blue-600"
                            : "bg-gray-700"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                            settings.emailNotifications
                              ? "translate-x-7"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <label className="font-medium">
                          Push Notifications
                        </label>
                        <p className="text-sm text-gray-400">
                          Choose what you want to be notified about
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          key: "notifyOnFriendRequest",
                          label: "Friend Requests",
                        },
                        { key: "notifyOnGameInvite", label: "Game Invites" },
                        {
                          key: "notifyOnTournament",
                          label: "Tournament Updates",
                        },
                        { key: "notifyOnAchievement", label: "Achievements" },
                      ].map(({ key, label }) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <span className="text-gray-300">{label}</span>
                          <button
                            onClick={() => updateSetting(key, !settings[key])}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              settings[key] ? "bg-blue-600" : "bg-gray-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                settings[key]
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Chat Settings</h2>

                  {/* Direct Messages */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="font-medium">Direct Messages</label>
                        <p className="text-sm text-gray-400">
                          Who can send you messages
                        </p>
                      </div>
                      <select
                        value={settings.allowDirectMessages}
                        onChange={(e) =>
                          updateSetting("allowDirectMessages", e.target.value)
                        }
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="friends">Friends Only</option>
                        <option value="none">No One</option>
                      </select>
                    </div>
                  </div>

                  {/* Chat Preferences */}
                  <div className="bg-gray-750 rounded-lg border border-gray-700 p-4">
                    <div className="space-y-4">
                      {[
                        {
                          key: "chatNotifications",
                          label: "Chat Notifications",
                          desc: "Show notifications for new messages",
                        },
                        {
                          key: "showTypingIndicator",
                          label: "Typing Indicator",
                          desc: "Show when others are typing",
                        },
                        {
                          key: "messagePreview",
                          label: "Message Preview",
                          desc: "Show message preview in notifications",
                        },
                      ].map(({ key, label, desc }) => (
                        <div
                          key={key}
                          className="flex justify-between items-center"
                        >
                          <div>
                            <label className="font-medium">{label}</label>
                            <p className="text-sm text-gray-400">{desc}</p>
                          </div>
                          <button
                            onClick={() => updateSetting(key, !settings[key])}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              settings[key] ? "bg-blue-600" : "bg-gray-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                                settings[key]
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
