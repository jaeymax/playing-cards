import React, { useState, useEffect, useRef } from "react";
import { X, Send, LoaderCircle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";
import { baseUrl } from "@/config/api";

interface Message {
  id: string;
  tournament_id: string;
  user_id: number;
  avatar:string;
  username: string;
  message: string;
  timestamp: string;
}

interface LobbyChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  tournamentId: string;
}

const LobbyChatModal: React.FC<LobbyChatModalProps> = ({
  isOpen,
  onClose,
  tournamentId,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    //{
    //   id: "1",
    //   user_id: 2,
    //   username: "PlayerOne",
    //   message: "Hey everyone! Excited for the tournament!",
    //   timestamp: new Date().toISOString()
    // },
    //   {
    //       id: "2",
    //       user_id: 3,
    //       username: "GamerGirl",
    //       message: "Good luck to all participants!",
    //       timestamp: new Date().toISOString()
    //   },
    //   {
    //       id: "3",
    //       user_id: 4,
    //       username: "NoobMaster",
    //       message: "Can anyone share tips for the first round?",
    //       timestamp: new Date().toISOString()
    //   },
    //   {
    //       id: "4",
    //       user_id: 5,
    //       username: "ProGamer",
    //       message: "Focus on your strengths and adapt to your opponents!",
    //       timestamp: new Date().toISOString()
    //   },
    //   {
    //       id: "5",
    //       user_id: 6,
    //       username: "CasualPlayer",
    //       message: "Just here to have fun, good luck everyone!",
    //       timestamp: new Date().toISOString(),
    //   },
    //   {
    //       id: "6",
    //       user_id: 7,
    //       username: "StrategyMaster",
    //       message: "Remember to communicate with your team if it's a team tournament!",
    //       timestamp: new Date().toISOString(),
    //   },
    //   {
    //       id: "7",
    //       user_id: 8,
    //       username: "RookiePlayer",
    //       message: "This is my first tournament, any advice?",
    //       timestamp: new Date().toISOString(),
    //   },
    //   {
    //       id: "8",
    //       user_id: 9,
    //       username: "VeteranGamer",
    //       message: "Stay calm and focus on your gameplay, you'll do great!",
    //       timestamp: new Date().toISOString(),
    //   },
    //   {
    //       id: "9",
    //       user_id: 10,
    //       username: "FunPlayer",
    //       message: "Let's make this tournament memorable, good luck everyone!",
    //       timestamp: new Date().toISOString()
    //   },
    //   {
    //       id: "10",
    //       user_id: 11,
    //       username: "CompetitiveGamer",
    //       message: "May the best player win! Looking forward to some great matches!",
    //       timestamp: new Date().toISOString(),
    //   },
    //   {
    //       id: "11",
    //       user_id: 12,
    //       username: "ChillGamer",
    //       message: "Just here to enjoy the games, good luck to all!",
    //       timestamp: new Date().toISOString(),
    //   }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<{ username: string , user_id: number, avatar:string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAppContext();
  const { socket } = useSocket();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch messages for the tournament page realistically this would be an API call to get the chat history for the tournament
    const fetchMessages = async () => {
      setLoading(true);
      try {
        // Simulate API call to fetch messages
        const response = await fetch(
          `${baseUrl}/messages/tournaments/${tournamentId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();
        console.log("data", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen, tournamentId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket || !isOpen) return;

    // Join tournament chat room
    socket.emit("joinTournamentChat", { tournamentId, userId: user?.id });

    // Listen for messages
    socket.on("tournamentChatMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing indicators
    socket.on(
      "typingTournamentChat",
      (data: { user_id: number; username: string, avatar:string }) => {
        if (data.user_id !== user?.id) {
          setIsTyping(true);
          setTypingUser({ username: data.username, user_id: data.user_id, avatar:data.avatar });
          setTimeout(() => setIsTyping(false), 2000);
        }
      },
    );

    return () => {
      socket.off("tournamentChatMessage");
      socket.off("userTypingTournament");
      socket.emit("leaveTournamentChat", {
        tournament_id: tournamentId,
        user_id: user?.id,
      });
    };
  }, [socket, isOpen, tournamentId, user?.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    const messageData = {
      tournament_id: tournamentId,
      user_id: user.id,
      avatar: user.image_url,
      username: user.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    // update local state immediately for better UX
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), ...messageData },
    ]);

    socket.emit("tournamentChatMessage", messageData);
    setNewMessage("");
  };

  const handleTyping = () => {
    if (!socket || !user) return;

    console.log("Emitting typing event for tournament", tournamentId);

    socket.emit("typingTournamentChat", {
      tournament_id: tournamentId,
      user_id: user.id,
      avatar: user.image_url,
      username: user.username,
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;
  {
    /* Mobile Overlay */
  }
  {
    /* <div
    className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
    onClick={onClose}
  /> */
  }

  {
    /* Modal */
  }

  return (
    <div
      className={`flex flex-col justify-between overflow-y-hidden
        fixed z-50 bg-gray-900 md:border border-gray-700 shadow-2xl
        md:right-0 md:top-0 md:h-full md:w-96
        w-full h-full bottom-0 md:bottom-0
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0 md:translate-x-0" : "translate-x-full md:translate-x-full"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
        <h3 className="text-lg font-semibold text-white">Lobby Chat</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 relative overflow-y-auto custom-scroll p-4 borde bg-gray-900 space-y-3 max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-180px)]">
        {loading ? (
          // <div className="flex justify-center items-center py-8">
          //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          // </div>
          <div className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center py-8">
          <LoaderCircle className="animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p>No messages yet. Be the first to chat!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="flex items-start gap-3 p-3 b-gray-800/50 hover:bg-gray-800/50 rounded-lg"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {msg.avatar ? (
                  <img src={msg.avatar} alt={msg.username} className="w-full h-full object-cover rounded-full" />
                ) : (
                  msg.username.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {msg.username}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-200">
                  {msg.message}
                </p>
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex items-start gap-3 p-3 border">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {typingUser ? (
                <img src={typingUser.avatar} alt={typingUser.username} className="w-full h-full object-cover rounded-full" />
              ) : (
                "?"
              )}
            </div>
            <div className="flex-1 mt-5">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {user ? (
        <div className="p-4 mb-10 md:mb-0 border-t border-gray-700  bg-gray-800">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleTyping}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div className="p-4 border-t mb-10 md:mb-0 border-gray-700 bg-gray-800 text-center text-gray-400">
          <p>Login to send chat messages</p>
        </div>
      )}
    </div>
  );
};

export default LobbyChatModal;
