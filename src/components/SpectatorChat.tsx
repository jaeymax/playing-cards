import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

interface SpectatorChatProps {
  socket: Socket | null;
  gameCode?: string;
  username?: string;
}

interface ChatMessage {
  username: string;
  message: string;
  timestamp: Date;
  image_url?: string;
}

const SpectatorChat = ({ socket, gameCode, username }: SpectatorChatProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      username: "Jaey",
      message: "He will lose this match",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      username: "ProPlayer92",
      message: "Amazing play right there!",
      timestamp: new Date(Date.now() - 240000),
    },
    {
      username: "CardMaster",
      message: "Did you see that trick? Insane!",
      timestamp: new Date(Date.now() - 180000),
    },
    {
      username: "SpectatorX",
      message: "Player 2 is playing defensively",
      timestamp: new Date(Date.now() - 120000),
    },
    {
      username: "Jaey",
      message: "Yeah, smart move honestly",
      timestamp: new Date(Date.now() - 90000),
    },
    {
      username: "TwitchViewer",
      message: "This is the best match I've seen all season",
      timestamp: new Date(Date.now() - 60000),
    },
    {
      username: "GamerPete",
      message: "The strategy here is top tier",
      timestamp: new Date(Date.now() - 45000),
    },
    {
      username: "ProPlayer92",
      message: "What a comeback!",
      timestamp: new Date(Date.now() - 30000),
    },
    {
      username: "CardMaster",
      message: "Did NOT expect that move",
      timestamp: new Date(Date.now() - 15000),
    },
    {
      username: "SpectatorX",
      message: "This is intense!",
      timestamp: new Date(Date.now() - 5000),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket?.on("chatMessage", handleChatMessage);

    return () => {
      socket?.off("chatMessage", handleChatMessage);
    };
  }, [socket]);

  const handleChatMessage = (data: ChatMessage) => {
    console.log("New chat message (spectator):", data);
    setChatMessages((prev) => [...prev, data]);
  };

  const sendChatMessage = () => {
    if (!newMessage.trim()) return;

    socket?.emit("sendChat", {
      gameCode,
      message: newMessage,
      username,
      timestamp: new Date(),
    });

    setNewMessage("");
  };

  return (
    <div className="bg-slate-900/40 backdrop-blur-m border-t border-blue-400/20 px-4 py-4 lg:px-8 lg:py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-lg font-bold mb-3">Spectator Chat</h2>

        {/* Messages Container */}
        <div className="bg-slate-900/30 backdrop-blur-sm rounded-lg p-4 h-48 overflow-y-auto mb-3 border border-gray-700/30">
          {chatMessages.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              No messages yet. Be the first to chat!
            </p>
          ) : (
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="text-sm flex items-start gap-2">
                  <img
                    src={
                      msg.image_url ||
                      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                    }
                    alt={msg.username}
                    className="w-6 h-6 rounded-full object-cover flex-shrink-0 border border-blue-400/50"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-blue-300 font-semibold truncate">
                        {msg.username}
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
            className="px-3 py-2 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-sm rounded-lg text-white font-semibold transition flex items-center justify-center"
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
      </div>
    </div>
  );
};

export default SpectatorChat;
