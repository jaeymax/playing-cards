import { useSocket } from "@/contexts/SocketProvider";
import { useEffect, useState } from "react";

const ConnectionStatusIndicator = () => {
  const { isConnected } = useSocket();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    if (isConnected) {
      const timer = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  if (!show && isConnected) return null;

  return (
    <div
      className={`
        fixed bottom-4 left-1/2 -translate-x-1/2 z-50
        px-4 py-1.5 rounded-full text-sm font-medium
        transition-all duration-300 flex items-center gap-2
        ${
          isConnected
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "bg-red-500/10 text-red-400 border border-red-500/20"
        }
      `}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isConnected ? "bg-green-400" : "bg-red-400 animate-pulse"
        }`}
      />
      {isConnected ? "Connected" : "Reconnecting..."}
    </div>
  );
};

export default ConnectionStatusIndicator;
