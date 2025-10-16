import { useState, useRef, useEffect } from "react";

interface Message {
  user_id: number | undefined;
  username: string | undefined;
  avatar: string | undefined;
  message: string;
  timestamp: string;
}

interface GameChatProps {
  socket: any;
  gameCode: string;
  currentUser: any;
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const GameChat = ({
  socket,
  gameCode,
  currentUser,
  isOpen,
  onClose,
  messages,
  onSendMessage,
}: GameChatProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  let typingTimeout: NodeJS.Timeout;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleTyping = () => {
    socket?.emit("typing", { gameCode, username: currentUser.username });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket?.emit("stopTyping", { gameCode, username: currentUser.username });
    }, 1000);
  };

  useEffect(() => {
    socket?.on("userTyping", (username: string) => {
      if (username !== currentUser.username) setIsTyping(true);
    });
    socket?.on("userStoppedTyping", () => setIsTyping(false));

    return () => {
      socket?.off("userTyping");
      socket?.off("userStoppedTyping");
      clearTimeout(typingTimeout);
    };
  }, [socket]);

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed md:bottom-24 bottom-0 md:right-4 right-0 md:w-[400px] w-full md:h-[500px] h-full z-[1000000000000000000000] bg-gray-800/40 backdrop-blur-sm md:rounded-lg shadow-2xl border border-gray-700 flex flex-col transform transition-all duration-300 ease-out ${
        isClosing ? "animate-slide-out" : "animate-slide-in"
      }`}
      style={{
        animation: `${
          isClosing ? "slideOut" : "slideIn"
        } 0.3s ease-out forwards`,
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes slideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(100%);
            }
          }

          @media (max-width: 768px) {
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(100%);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes slideOut {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(100%);
              }
            }
          }

          @keyframes messageAppear {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Custom Scrollbar Styles */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(107, 114, 128, 0.5);
            border-radius: 20px;
            border: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(107, 114, 128, 0.7);
          }

          /* For Firefox */
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: rgba(107, 114, 128, 0.5) transparent;
          }
        `}
      </style>

      <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/90">
        <h3 className="font-semibold text-gray-100 text-lg">Game Chat</h3>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-200 transition-colors md:text-2xl text-3xl"
        >
          ×
        </button>
      </div>
      <div className="px-4 py-2 text-center text-sm text-gray-400 border-b border-gray-700/50 bg-gray-800/30">
        Please be respectful and keep the chat friendly 😊
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`group flex items-start gap-2 p-2 ${
              index % 2 === 0
                ? "bg-gradient-to-r from-slate-800/30 via-slate-900/30 to-slate-800/30"
                : "bg-gradient-to-r from-gray-900/20 via-slate-800/20 to-gray-900/20"
            } hover:bg-gradient-to-r hover:from-slate-700/40 hover:to-slate-800/40 transition-all duration-300 rounded-lg animate-[messageAppear_0.3s_ease-out] border border-gray-700/20`}
          >
            <img
              src={msg.avatar}
              alt={msg.username}
              className="flex-shrink-0 w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`font-medium text-sm ${
                    msg.user_id === currentUser.id
                      ? "text-blue-400"
                      : "text-gray-200"
                  }`}
                >
                  {msg.username}
                </span>
              </div>
              <p className="text-xs md:text-sm text-gray-100 break-words">
                {msg.message}
              </p>
            </div>
            <span className="flex-shrink-0 text-[10px] text-gray-400 mt-1">
              {formatTime(msg.timestamp)}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-2">
            <div className="w-8 h-8 rounded-full bg-gray-700/50 overflow-hidden">
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                alt="typing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-1">
              <div
                className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-3 border-t border-gray-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-gray-700/50 text-gray-100 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-md transition-all duration-200 flex items-center justify-center hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GameChat;
