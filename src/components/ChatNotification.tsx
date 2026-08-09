import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ChatNotificationProps {
  message: {
    username?: string;
    avatar?: string;
    message: string;
    type?: "text" | "audio";
  };
  onClose: () => void;
  onClick?: () => void;
}

const ChatNotification = ({
  message,
  onClose,
  onClick,
}: ChatNotificationProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Start closing after 3 seconds
    const closeTimer = setTimeout(() => {
      setIsClosing(true);

      // Wait for the 300ms exit animation
      const removeTimer = setTimeout(() => {
        onClose();
      }, 300);

      return () => clearTimeout(removeTimer);
    }, 3000);

    return () => clearTimeout(closeTimer);
  }, []); // IMPORTANT: don't depend on onClose

  const isAudio = message.type === "audio";

  const handleClick = () => {
    if (isClosing) return;

    setIsClosing(true);

    setTimeout(() => {
      onClick?.();
      onClose();
    }, 300);
  };

  if (!message) return null;

  return (
    <div
      onClick={handleClick}
      className={`
        fixed
        z-[999999]
        md:top-4
        top-2
        md:right-4
        right-0
        mx-2
        md:max-w-sm
        w-[calc(100%-16px)]
        bg-green-900
        backdrop-blur-sm
        text-white
        p-4
        rounded-lg
        shadow-lg
        border
        border-gray-700/20
        cursor-pointer
        transition-all
        duration-300
        ease-out

        ${
          isClosing
            ? "opacity-0 translate-y-[-100%] md:translate-y-0 md:translate-x-full"
            : "opacity-100 translate-y-0 md:translate-x-0"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarImage
            src={
              message.avatar ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            alt={`${message.username ?? "User"} avatar`}
          />
        </Avatar>

        <div className="min-w-0">
          <p className="font-semibold">
            {message.username}
          </p>

          <p className="text-sm text-gray-200 truncate">
            {isAudio
              ? "🎤 Sent a voice message"
              : message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatNotification;
