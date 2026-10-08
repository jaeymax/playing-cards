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
  const [isChatOpen, setIsChatOpen] = useState(false);

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
  <>
    {/* Mobile chat backdrop */}
    {isChatOpen && (
      <div
        className="fixed inset-0 z-[999] b-black/40 backdrop-blu-[2px] lg:hidden"
        onClick={() => setIsChatOpen(false)}
      />
    )}

    {/* Mobile Chat */}
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-[1000] lg:hidden
        bg-slate-950/30 backdrop-blur-exl
        border-t border-white/[0.08]
        shadow-[0_-10px_40px_rgba(0,0,0,0.35)]
        transition-all duration-300 ease-out
        ${isChatOpen ? "h-[55vh] rounded-t-2xl" : "h-14 rounded-t-xl"}
      `}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        className="w-full h-14 px-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="text-base">💬</span>

            {chatMessages.length > 0 && (
              <span className="absolute -right-1 -top-1 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white border border-white/10">
                {chatMessages.length > 99
                  ? "99+"
                  : chatMessages.length}
              </span>
            )}
          </div>

          <div className="text-left">
            <div className="text-sm font-semibold text-white">
              Live Chat
            </div>

            {!isChatOpen && (
              <div className="text-[11px] text-slate-400">
                {chatMessages.length === 0
                  ? "Join the conversation"
                  : `${chatMessages.length} ${
                      chatMessages.length === 1
                        ? "message"
                        : "messages"
                    }`}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          {isChatOpen ? (
            <span className="text-xs">Close</span>
          ) : (
            <span className="text-xs">Open</span>
          )}

          <svg
            className={`h-5 w-5 transition-transform duration-300 ${
              isChatOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>

      {/* Expanded Mobile Chat */}
      {isChatOpen && (
        <div className="flex h-[calc(100%-56px)] flex-col">
          {/* Handle */}
          <div className="flex justify-center pb-2">
            <div className="h-1 w-10 rounded-full bg-white/15" />
          </div>

          {/* Messages */}
          <div
            ref={messagesEndRef}
            className="custom-scroll flex-1 overflow-y-auto px-4 pb-3"
          >
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <LoaderCircle className="h-7 w-7 animate-spin text-white/50" />
              </div>
            ) : chatMessages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.06]">
                  <span className="text-xl">💬</span>
                </div>

                <p className="text-sm font-medium text-slate-300">
                  No messages yet
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Be the first to say something.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5"
                  >
                    <img
                      src={
                        msg.avatar ||
                        "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                      }
                      alt={msg.username}
                      className="h-8 w-8 flex-shrink-0 rounded-full object-cover border border-white/10"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`max-w-[65%] truncate text-xs font-semibold ${
                            msg.user_id === user_id
                              ? "text-white"
                              : "text-slate-300"
                          }`}
                        >
                          {msg.user_id === user_id
                            ? "You"
                            : msg.username}
                        </span>

                        <span className="flex-shrink-0 text-[10px] text-slate-400">
                          {new Date(
                            msg.timestamp
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div
                        className={`mt-1 inline-block max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                          msg.user_id === user_id
                            ? "rounded-tl-md bg-white/[0.08] text-white border border-white/[0.08]"
                            : "rounded-tl-md bg-black/20 text-slate-300 border border-white/[0.05]"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Composer */}
          <div className="border-t border-white/[0.06] bg-black/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/20 p-1.5 backdrop-blur-md focus-within:border-white/[0.15]">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendChatMessage();
                  }
                }}
                placeholder="Say something..."
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-slate-500 outline-none"
              />

              <button
                onClick={sendChatMessage}
                disabled={!newMessage.trim()}
                type="button"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.08] text-white border border-white/[0.08] transition hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Desktop Chat */}
    <div className="hidden border-t border-white/[0.08] bg-black/20 backdrop-blur-xl lg:block">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Desktop Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] border border-white/[0.08]">
              <span className="text-sm">💬</span>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-white">
                Live Chat
              </h2>

              <p className="text-[11px] text-slate-500">
                {chatMessages.length}{" "}
                {chatMessages.length === 1
                  ? "message"
                  : "messages"}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Messages */}
        <div
          ref={messagesEndRef}
          className="custom-scroll mb-3 h-48 overflow-y-auto rounded-xl border border-white/[0.06] bg-black/10 p-4 backdrop-blur-sm"
        >
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <LoaderCircle className="h-7 w-7 animate-spin text-white/50" />
            </div>
          ) : chatMessages.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-slate-500">
                No messages yet. Be the first to chat!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5"
                >
                  <img
                    src={
                      msg.avatar ||
                      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                    }
                    alt={msg.username}
                    className="h-7 w-7 flex-shrink-0 rounded-full object-cover border border-white/10"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`truncate text-xs font-semibold ${
                          msg.user_id === user_id
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {msg.user_id === user_id
                          ? "You"
                          : msg.username}
                      </span>

                      <span className="text-[10px] text-slate-600">
                        {new Date(
                          msg.timestamp
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <p className="mt-0.5 break-words text-sm text-slate-400">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Composer */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendChatMessage();
              }
            }}
            placeholder="Type a message..."
            className="min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none backdrop-blur-sm transition focus:border-white/[0.15]"
          />

          <button
            onClick={sendChatMessage}
            disabled={!newMessage.trim()}
            type="button"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-white border border-white/[0.08] transition hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  </>
);
};

export default SpectatorChat;
