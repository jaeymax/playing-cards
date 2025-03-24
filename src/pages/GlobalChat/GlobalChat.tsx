import React, { useState} from "react";
import { Message } from "./types";
import MessageList from "./components/MessageList";
import OnlineUsers from "./components/OnlineUsers";
import MessageInput from "./components/MessageInput";

const GlobalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
const [onlineUsers] = useState<string[]>([
    "Alice Smith",
    "Bob Johnson",
    "Carol Williams",
    "David Brown",
    "Emma Davis",
    "Frank Wilson",
    "Grace Taylor",
    "Henry Anderson",
    "Isabel Martinez",
    "Jack Thompson"
]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "Current User", // Replace with actual user
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-900 p-4">
      <div className="flex-1 flex flex-col bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">Global Chat</h1>
        </div>

        <div className="flex flex-1">
          <div className="flex-[3] flex flex-col">
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>

          <div className="w-64 border-l border-gray-700">
            <OnlineUsers users={onlineUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
