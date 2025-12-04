import { useEffect, useState } from "react";

interface ChatNotificationProps {
  message: {
    username?: string;
    message: string;
  };
  onClose: () => void;
}

const ChatNotification = ({ message, onClose }: ChatNotificationProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`z-[100000000000000000000000000000] fixed md:top-4 top-2 md:right-4 mx-2 md:max-w-sm w-[calc(100%-16px)] bg-gradient-to-r from-gray-900/50 viaslate-800/20 to-gray-900/50 backdrop-blur-s text-white p-4 rounded-lg shadow-lg border border-gray-700/20 transform transition-all duration-300 ${
        isClosing
          ? "md:opacity-0 md:translate-x-full opacity-0 -translate-y-full"
          : "md:opacity-100 md:translate-x-0 opacity-100 translate-y-0"
      }`}
      style={{
        animation: `${
          isClosing ? "mobileSlideOut" : "mobileSlideIn"
        } 0.3s ease-out forwards`,
      }}
    >
      <style>
        {`
          @media (max-width: 768px) {
            @keyframes mobileSlideIn {
              from {
                opacity: 0;
                transform: translateY(-100%);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes mobileSlideOut {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(-100%);
              }
            }
          }
        `}
      </style>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <p className="font-semibold text-sm text-blue-400">
            {message.username}
          </p>
          <p className="text-sm text-gray-100">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatNotification;
