import { useAppContext } from "@/contexts/AppContext";
import { LoaderCircle, Send } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

interface SpectatorChatProps {
  user_id: number;
  socket: Socket | null;
  gameCode: string;
  loading: boolean;
  username: string;
  chatMessages: ChatMessage[];
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

interface ChatMessage {
  id: string;
  game_code: string;
  user_id: number;
  avatar: string;
  username: string;
  message: string;
  timestamp: string;
  image_url?: string;
}

const SpectatorChat = ({
  socket,
  gameCode,
  user_id,
  username,
  chatMessages,
  setChatMessages,
  loading,
}: SpectatorChatProps) => {
  const [newMessage, setNewMessage] = useState("");

  // create a useRef to scroll to the bottom of the chat when a new message is added
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const {user} = useAppContext();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    const messageData: ChatMessage = {
      id: `${user_id}-${Date.now()}`,
      game_code: gameCode,
      avatar: user?.image_url as string,
      user_id: user_id,
      username: username,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket?.emit("spectatorChatMessage", messageData);

    setChatMessages((prev) => [...prev, messageData]);

    setNewMessage("");
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-m border-t border-blue-400/20 px-4 py-4 lg:px-8 lg:py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-lg font-bold mb-3">Spectator Chat</h2>

        {/* Messages Container */}
        <div
          ref={messagesEndRef}
          className="bg-slate-900/30 relative backdrop-blur-sm rounded-lg p-4 h-48 overflow-y-auto custom-scroll mb-3 border border-gray-700/30"
        >
          {loading ? (
            //   <div className="flex justify-center items-center py-8">
            //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            // </div>
            <div className="flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center py-8">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : chatMessages.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              No messages yet. Be the first to chat!
            </p>
          ) : (
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="text-sm flex items-start gap-2">
                  <img
                    src={
                      msg.avatar ||
                      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                    }
                    alt={msg.username}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-blue-400/50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-blue-300 font-semibold truncate">
                        {msg.user_id === user_id ? "You" : msg.username}
                      </span>
                      <span className="text-gray-500 text-xs flex-shrink-0">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <span className="text-gray-300">{msg.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50"
          />
          <button
            onClick={sendChatMessage}
            disabled={!newMessage.trim()}
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpectatorChat;
