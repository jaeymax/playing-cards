import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";

interface Message {
  id: string;
  user_id: number;
  username: string;
  message: string;
  timestamp: string;
  type: "text" | "audio";
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
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    user_id: 2,
    username: "PlayerOne",
    message: "Hey everyone! Excited for the tournament!",
    timestamp: new Date().toISOString(),
    type: "text",
  },
    {
        id: "2",
        user_id: 3,
        username: "GamerGirl",
        message: "Good luck to all participants!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "3",
        user_id: 4,
        username: "NoobMaster",
        message: "Can anyone share tips for the first round?",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "4",
        user_id: 5,
        username: "ProGamer",
        message: "Focus on your strengths and adapt to your opponents!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "5",
        user_id: 6,
        username: "CasualPlayer",
        message: "Just here to have fun, good luck everyone!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "6",
        user_id: 7,
        username: "StrategyMaster",
        message: "Remember to communicate with your team if it's a team tournament!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "7",
        user_id: 8,
        username: "RookiePlayer",
        message: "This is my first tournament, any advice?",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "8",
        user_id: 9,
        username: "VeteranGamer",
        message: "Stay calm and focus on your gameplay, you'll do great!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "9",
        user_id: 10,
        username: "FunPlayer",
        message: "Let's make this tournament memorable, good luck everyone!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "10",
        user_id: 11,
        username: "CompetitiveGamer",
        message: "May the best player win! Looking forward to some great matches!",
        timestamp: new Date().toISOString(),
        type: "text",
    },
    {
        id: "11",
        user_id: 12,
        username: "ChillGamer",
        message: "Just here to enjoy the games, good luck to all!",
        timestamp: new Date().toISOString(),
        type: "text",
    }
]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user} = useAppContext();
  const {socket} = useSocket();

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
      "userTypingTournament",
      (data: { userId: number; username: string }) => {
        if (data.userId !== user?.id) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }
      },
    );

    return () => {
      socket.off("tournamentChatMessage");
      socket.off("userTypingTournament");
      socket.emit("leaveTournamentChat", { tournamentId, userId: user?.id });
    };
  }, [socket, isOpen, tournamentId, user?.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket || !user) return;

    const messageData = {
      tournamentId,
      userId: user.id,
      username: user.username,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: "text" as const,
    };

    socket.emit("sendTournamentChatMessage", messageData);
    setNewMessage("");
  };

  const handleTyping = () => {
    if (!socket || !user) return;

    socket.emit("typingTournament", {
      tournamentId,
      userId: user.id,
      username: user.username,
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!isOpen) return null;
  {/* Mobile Overlay */}
  {/* <div
    className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
    onClick={onClose}
  /> */}

  {/* Modal */}
  
  return (
    
      <div
        className={`flex flex-col justify-between overflow-y-hidden
        fixed z-50 bg-gray-900 md:border border-gray-700 shadow-2xl
        md:right-0 md:top-0 md:h-full md:w-96
        w-full h-full bottom-0
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
        <div className="flex-1 overflow-y-auto custom-scroll p-4 borde space-y-3 max-h-[calc(100vh-140px)] md:max-h-[calc(100vh-180px)]">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>No messages yet. Be the first to chat!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.user_id === user?.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.user_id === user?.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{msg.username}</span>
                    <span className="text-xs opacity-70">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
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
        <div className="p-4 border-t border-gray-700 bg-gray-800">
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
      </div>
    
  );
};

export default LobbyChatModal;
