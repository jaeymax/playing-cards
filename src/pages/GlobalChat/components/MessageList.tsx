import React from "react";
import { Message } from "../types";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-blue-400 font-medium">{message.sender}</span>
            <span className="text-gray-500 text-sm">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-white">{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
