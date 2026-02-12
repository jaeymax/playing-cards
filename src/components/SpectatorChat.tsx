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
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-black border-t border-blue-500/30 px-4 py-4 lg:px-8 lg:py-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-lg font-bold mb-3">Spectator Chat</h2>

        {/* Messages Container */}
        <div className="bg-slate-900/50 rounded-lg p-4 h-48 overflow-y-auto mb-3 border border-gray-700">
          {chatMessages.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">
              No messages yet. Be the first to chat!
            </p>
          ) : (
            <div className="space-y-2">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="text-sm">
                  <span className="text-blue-300 font-semibold">
                    {msg.username}:
                  </span>
                  <span className="text-gray-300 ml-2">{msg.message}</span>
                  <span className="text-gray-500 text-xs ml-2">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
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
            className="flex-1 px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={sendChatMessage}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpectatorChat;
