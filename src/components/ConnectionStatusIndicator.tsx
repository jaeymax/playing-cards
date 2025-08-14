import { useSocket } from "@/contexts/SocketProvider";
import { useEffect, useState } from "react";

const ConnectionStatusIndicator = () => {
  const { isConnected } = useSocket();
  const [showIndicator, setShowIndicator] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setShowIndicator(true);
    setIsVisible(true);

    // Only set timer to hide when connected
    if (isConnected) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setShowIndicator(false);
        }, 500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  // Always show when disconnected
  if (!isConnected) {
    return (
      <div className="fixed bottom-0 left-0 py-1 px-2 font-semibold w-full text-center text-xs bg-red-500">
        Reconnecting...
      </div>
    );
  }

  if (!showIndicator) return null;

  return (
    <div
      className={`bg-green-600 fixed bottom-0 left-0 py-1 px-2 font-semibold w-full text-center text-xs
      transition-all duration-500 ease-in-out transform
      ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      Connected
    </div>
  );
};

export default ConnectionStatusIndicator;
