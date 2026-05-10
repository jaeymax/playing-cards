import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/hooks/useSocket";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { removeToken } from "@/utils/Functions";
import {
  Home,
  Info,
  ScrollText,
  Mail,
  Medal,
  Trophy,
  Settings,
  Sun,
} from "lucide-react";

// Add Message type
type Message = {
  id: number;
  text: string;
  sender_id: number | undefined;
  sender_name: string;
  timestamp: Date;
  avatar: string; // Add avatar field
};

interface NavBarProps {
  showSignUps: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ showSignUps }) => {
  // Add new loading state
  //const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  //const [isDarkMode, setIsDarkMode] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [activeEmojiTab, setActiveEmojiTab] = useState("smileys");
  const { user, updateUser } = useAppContext();
  const { lastMessage, sendMessage } = useSocket();

  const { isLoading } = useAppContext();
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);

  const { notifications } = useAppContext();
  //customLog("NavBar Notifications:", notifications);
  const notificationCount = notifications.filter((n) => !n.is_read).length;

  notificationCount && true;

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

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // const getGlobalChatMessages = async () => {
  //   try {
  //     setIsMessagesLoading(true);
  //     const response = await fetch(`${baseUrl}/messages/global`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }
  //     const data = await response.json();
  //     setMessages(data);
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   } finally {
  //     setIsMessagesLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getGlobalChatMessages();
  // }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        text: currentMessage,
        sender_id: user?.id,
        sender_name: user?.username || "John Doe", // Replace with actual user name
        timestamp: new Date(),
        avatar: user?.image_url || "👤", // Add default avatar - replace with actual user avatar
      };
      setMessages([...messages, newMessage]);
      sendMessage("message", newMessage);
      setCurrentMessage("");
      console.log("Message sent:", newMessage);
    }
  };

  //console.log(messages);

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

  useEffect(() => {
    if (lastMessage) {
      const socketMessage: Message = {
        id: lastMessage.id,
        text: lastMessage.text,
        sender_id: lastMessage.sender_id,
        sender_name: lastMessage.sender_name,
        timestamp: new Date(lastMessage.timestamp),
        avatar: lastMessage.avatar,
      };
      setMessages((prevMessages) => [...prevMessages, socketMessage]);
    }
  }, [lastMessage]);

  const handleLogout = () => {
    // Clear session storage
    removeToken();
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
          className={`w-2 h-2 bg-blue-500 rounded-full animate-bounce`}
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
      <nav className="bg-gray-800 border-b z-50 border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 borde">
          <div className="flex justify-between items-center h-16">
            {/* Left side - adjusted with additional spacing */}
            <div className="flex items-center gap-5 borde">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p- borde rounded-lg text-gray-400 hover:text-white md:hidden"
              >
                {isMenuOpen ? (
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
                ) : (
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
                )}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 hidden sm:flex">
                  <img src="./cards.png" className="object-contain" alt="" />
                </div>
                <div className="text-2xl hidden sm:flex font-extrabold tracking-tight">
                  <span
                    style={{ fontFamily: "Great Vibes" }}
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white opacity-6 bg-clip-text text-transparent"
                  >
                    Spar
                  </span>
                  <span
                    style={{ fontFamily: "Great Vibes" }}
                    className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-white text-transparent"
                  >
                    play
                  </span>
                  <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-white text-transparent"></span>
                </div>
              </Link>
            </div>

            {/* Middle section - for future nav items */}
            <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">
                Home
              </Link>
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
              <Link
                to="/about"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                About
              </Link>

              <Link
                to="/rules"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                Rules
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white px-3 py-2"
              >
                Contact
              </Link>
            </div>

            {/* Right side - adjusted with additional spacing */}
            <div className="flex items-center gap-3">
              {isLoading ? (
                <LoadingBubbles />
              ) : user ? (
                <>
                  {/* Chat Icon */}
                  {/* <div className="relative">
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
                  </div> */}

                  {/* Wallet Icon */}
                  <div className="relative">
                    <button
                      onClick={() => navigate("/wallet")}
                      className="mt-3 rounded-lg text-gray-400 hover:text-white"
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
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Friends Icon */}
                  {/* <div className="relative">
                    <button
                      onClick={() => navigate("/friends")}
                      className="mt-2 rounded-lg text-gray-400 hover:text-white"
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
                  </div> */}

                  {/* Notification Bell */}
                  <div className="relative">
                    <button
                      className="borde mt-2 rounded-lg text-gray-400 hover:text-white"
                      onClick={() => navigate("/notifications")}
                    >
                      <svg
                        className="h-7 w-7"
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
                        <span className="absolute top-3 right-2 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                          {notificationCount > 9 ? "9+" : notificationCount}
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[0px]">
                        <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                          {user?.image_url ? (
                            <img
                              className="rounded-full w-full h-full object-cover"
                              src={user?.image_url}
                              alt=""
                            />
                          ) : (
                            <img
                              className="rounded-full w-full h-full object-cover"
                              src={
                                "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                              }
                              alt=""
                            />
                          )}
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
                      <div
                        className={`md:absolute md:top-full md:right-0 md:mt-3 md:w-72 md:rounded-2xl md:shadow-2xl fixed bottom-0 left-0 right-0 h-3/4 w-full rounded-t-3xl shadow-2xl py-6 bg-gray-800 md:border md:border-gray-700 ring-1 ring-black ring-opacity-5 md:z-20 z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${isProfileOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"}`}
                      >
                        <div className="md:hidden flex justify-between items-center px-6 mb-5">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                              Profile menu
                            </p>
                            <h3 className="text-lg font-semibold text-white">
                              Your account
                            </h3>
                          </div>
                          <button
                            onClick={() => setIsProfileOpen(false)}
                            className="text-gray-400 hover:text-white"
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
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-6 py-3 rounded-xl text-base text-gray-100 hover:bg-gray-800 transition-colors"
                        >
                          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                            {user?.image_url ? (
                              <img
                                src={user.image_url}
                                alt="Profile"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full bg-gray-700 flex items-center justify-center text-sm text-white">
                                {user?.username?.charAt(0) ?? "U"}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              View Profile
                            </p>
                            <p className="text-xs text-gray-400">
                              Manage your profile
                            </p>
                          </div>
                        </Link>
                        <div className="mt-3 border-t border-gray-700"></div>
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-6 py-3 text-base text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          <Settings className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">Settings</p>
                            <p className="text-xs text-gray-500">
                              Account preferences
                            </p>
                          </div>
                        </Link>
                        <Link
                          to="/settings#appearance"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-6 py-3 text-base text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          <Sun className="h-5 w-5 text-yellow-400" />
                          <div>
                            <p className="font-medium">Appearance</p>
                            <p className="text-xs text-gray-500">
                              Theme and display mode
                            </p>
                          </div>
                        </Link>
                        <div className="mt-4 border-t border-gray-700 pt-4">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-base text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors"
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
                showSignUps && (
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigate("/signin")}
                      className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Sign Up
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" style={{ top: "65px" }}>
          {" "}
          {/* 64px is navbar height (h-16) */}
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black  bg-opacity-40"
            onClick={() => setIsMenuOpen(false)}
            style={{ top: "65px" }}
          />
          {/* Sidebar */}
          <div className="fixed left-0 h-[calc(100vh-65px)] w-64 bg-gray-800 shadow-lg">
            <div className="p-4">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <Home className="w-5 h-5" />
                  Home
                </Link>
                <Link
                  to="/tournaments"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <Trophy className="w-5 h-5" />
                  Tournaments
                </Link>
                <Link
                  to="/leaderboard"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <Medal className="w-5 h-5" />
                  Leaderboard
                </Link>
                <Link
                  to="/rules"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <ScrollText className="w-5 h-5" />
                  Rules
                </Link>
                <Link
                  to="/about"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <Info className="w-5 h-5" />
                  About
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700"
                >
                  <Mail className="w-5 h-5" />
                  Contact
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
              {isMessagesLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="flex gap-3">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                            {/*<span className="text-sm">{message.avatar}</span>*/}
                            <img
                              src={message.avatar}
                              className="w-full h-full object-contain rounded-full"
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      {/* Message Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-400 text-sm font-semibold">
                            {message.sender_name}
                          </span>
                          <span className="text-gray-500 text-xs">
                            {new Date(message.timestamp).toLocaleString()}
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
              )}
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
