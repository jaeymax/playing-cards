import { useAppContext } from "@/contexts/AppContext";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Add Message type
type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  avatar: string; // Add avatar field
};

const NavBar: React.FC = () => {
  // Add new loading state
  //const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [notificationCount, setNotificationCount] = useState(3);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [activeEmojiTab, setActiveEmojiTab] = useState("smileys");
  const { user, updateUser } = useAppContext();

  const { isLoading } = useAppContext();

  const navigate = useNavigate();

  const emojiCategories = {
    smileys: {
      icon: "😊",
      emojis: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🥸",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "😡",
        "🤬",
        "🤯",
        "😳",
        "🥵",
        "🥶",
      ],
    },
    gaming: {
      icon: "🎮",
      emojis: [
        "🎮",
        "🎲",
        "🎯",
        "🎳",
        "🎪",
        "🎨",
        "🎭",
        "🎪",
        "🎫",
        "🎟️",
        "🎬",
        "🃏",
        "🎴",
        "♠️",
        "♣️",
        "♥️",
        "♦️",
        "🀄",
        "🎯",
        "🎱",
        "🎸",
        "🔮",
        "🎵",
        "🎶",
        "🏆",
        "🥇",
        "🥈",
        "🥉",
        "🏅",
        "🎖️",
        "🏵️",
        "🎪",
        "🎭",
        "🎪",
      ],
    },
    hearts: {
      icon: "❤️",
      emojis: [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "🤎",
        "💔",
        "❤️‍🔥",
        "❤️‍🩹",
        "❣️",
        "💕",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
        "💝",
        "💟",
        "♥️",
        "💌",
        "💋",
        "👥",
        "💑",
        "💏",
        "👩‍❤️‍👨",
        "💘",
        "💝",
        "💖",
        "💗",
        "💓",
      ],
    },
    hands: {
      icon: "👋",
      emojis: [
        "👋",
        "🤚",
        "🖐️",
        "✋",
        "🖖",
        "👌",
        "🤌",
        "🤏",
        "✌️",
        "🤞",
        "🤟",
        "🤘",
        "🤙",
        "👈",
        "👉",
        "👆",
        "🖕",
        "👇",
        "☝️",
        "👍",
        "👎",
        "✊",
        "👊",
        "🤛",
        "🤜",
        "👏",
        "🙌",
        "👐",
        "🤲",
        "🤝",
        "🙏",
        "✍️",
        "💅",
        "🤳",
      ],
    },
    symbols: {
      icon: "💫",
      emojis: [
        "⭐",
        "🌟",
        "💫",
        "✨",
        "⚡",
        "☄️",
        "💥",
        "🔥",
        "🌈",
        "🌊",
        "🎇",
        "🎆",
        "🕯️",
        "💡",
        "🔮",
        "🎱",
        "🔯",
        "🎊",
        "🎉",
        "🎈",
        "🎎",
        "🎁",
        "🎀",
        "🎗️",
        "🏷️",
        "📝",
        "📈",
        "📉",
        "📊",
        "📋",
        "📌",
        "📍",
        "✅",
        "❌",
      ],
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: currentMessage,
        sender: "John Doe", // Replace with actual user name
        timestamp: new Date(),
        avatar: "👤", // Add default avatar - replace with actual user avatar
      };
      setMessages([...messages, newMessage]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("accessToken");
    // Clear user context
    updateUser(null);
    // Close profile dropdown
    setIsProfileOpen(false);
    // Redirect to signin page
    navigate("/signin");
  };

  // Add new LoadingBubbles component inside NavBar
  const LoadingBubbles = () => (
    <div className="flex space-x-2 items-center px-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 bg-gray-400 rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "0.8s",
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 borde">
          <div className="flex justify-between items-center h-16">
            {/* Left side - adjusted with additional spacing */}
            <div className="flex items-center gap-5 borde">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p- borde rounded-lg text-gray-400 hover:text-white md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 hidden sm:flex">
                  <img src="./cards.png" className="object-contain" alt="" />
                </div>
                <span className="text-2xl hidden sm:flex font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  PlaySpa
                </span>
              </Link>
            </div>

            {/* Middle section - for future nav items */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
                Play
              </a>
              <Link
                to="/tournaments"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                Tournaments
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                Leaderboard
              </Link>

              <a href="#" className="text-gray-300 hover:text-white px-3 py-2">
                Community
              </a>
            </div>

            {/* Right side - adjusted with additional spacing */}
            <div className="flex items-center gap- borde">
              {isLoading ? (
                <LoadingBubbles />
              ) : user ? (
                <>
                  {/* Chat Icon */}
                  <div className="relative">
                    <button
                      onClick={() => setIsChatOpen(true)}
                      className="p-2 borde rounded-lg text-gray-400 hover:text-white"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Friends Icon */}
                  <div className="relative">
                    <button
                      onClick={() => navigate("/friends")}
                      className="p-2 rounded-lg text-gray-400 hover:text-white"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Notification Bell */}
                  <div className="relative">
                    <button
                      className="p-2 rounded-lg text-gray-400 hover:text-white"
                      onClick={() => navigate("/notifications")}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      {notificationCount > 0 && (
                        <span className="absolute top-3 right-3 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                          {notificationCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="flex items-center space-x-3 focus:outline-none"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-lg">👤</span>
                        </div>
                      </div>
                      {/* <span className="hidden md:block text-white">
                        John Doe
                      </span> */}
                      {/* <svg
                        className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                          isProfileOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg> */}
                    </button>

                    {/* Dropdown Menu */}
                    {isProfileOpen && (
                      <div className="absolute z-20 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 border border-gray-700 ring-1 ring-black ring-opacity-5">
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          View Profile
                        </a>
                        <a
                          href="/avatar"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          Edit Avatar
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Settings
                        </a>
                        <button
                          onClick={() => setIsDarkMode(!isDarkMode)}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          <svg
                            className="mr-3 h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={
                                isDarkMode
                                  ? "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                  : "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                              }
                            />
                          </svg>
                          {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                        <div className="border-t border-gray-700">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                          >
                            <svg
                              className="mr-3 h-5 w-5 text-red-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate("/signin")}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ top: "64px" }}>
          {" "}
          {/* 64px is navbar height (h-16) */}
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black z- bg-opacity-50"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed left-0 h-[calc(100vh-64px)] w-64 bg-gray-800 shadow-lg">
            <div className="p-4">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Home
                </Link>
                <Link
                  to="#"
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Play
                </Link>
                <Link
                  to="/tournaments"
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Tournaments
                </Link>
                <Link
                  to="/leaderboard"
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Leaderboard
                </Link>
                <Link
                  to="/shop"
                  className="block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  Shop
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Sidebar */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-gray-800 shadow-lg z-50 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">Global Chat</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          <span className="text-sm">{message.avatar}</span>
                        </div>
                      </div>
                    </div>
                    {/* Message Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400 text-sm font-semibold">
                          {message.sender}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3 mt-1 w-fit">
                        <p className="text-gray-200">{message.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-700 p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* Emoji Button */}
                <button
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="p-2 rounded-lg bg-gray-700 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!currentMessage.trim()}
                >
                  <svg
                    className="h-5 w-5 rotate-90"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
              {/* Emoji Picker */}
              {showEmojis && (
                <div className="absolute bottom-20 right-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-72">
                  {/* Tabs */}
                  <div className="flex border-b border-gray-700">
                    {Object.entries(emojiCategories).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => setActiveEmojiTab(key)}
                        className={`flex-1 p-2 text-lg hover:bg-gray-700 transition-colors
                          ${activeEmojiTab === key ? "bg-gray-700" : ""}`}
                      >
                        {category.icon}
                      </button>
                    ))}
                  </div>
                  {/* Emoji Grid with custom scrollbar */}
                  <div className="p-2">
                    <div
                      className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto
                      scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 
                      hover:scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full"
                    >
                      {emojiCategories[
                        activeEmojiTab as keyof typeof emojiCategories
                      ].emojis.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => {
                            setCurrentMessage((prev) => prev + emoji);
                            setShowEmojis(false);
                          }}
                          className="hover:bg-gray-700 p-1 rounded text-lg"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
