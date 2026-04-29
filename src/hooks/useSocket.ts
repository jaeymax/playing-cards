import { useEffect, useCallback, useState } from "react";
import { getSocket } from "../socket";
import { Socket } from "socket.io-client";

export const useSocket = () => {
  const socket = getSocket() as Socket
  const [isConnected, setIsConnected] = useState(socket?.connected);
  const [lastMessage, setLastMessage] = useState<any>(null);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
      console.log("Connected to server");
      
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    };

    const onMessage = (message: any) => {
      setLastMessage(message);
      console.log("New message received:", message);
    };

    socket?.on("connect", onConnect);
    socket?.on("disconnect", onDisconnect);
    socket?.on("message", onMessage);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      socket?.off("message", onMessage);
    };
  }, []);

  const sendMessage = useCallback((event: string, ...args: any[]) => {
    socket?.emit(event, ...args);
  }, []);

  const joinRoom = useCallback((room: string) => {
    socket?.emit("join_room", room);
  }, []);

  const leaveRoom = useCallback((room: string) => {
    socket?.emit("leave_room", room);
  }, []);

  return {
    isConnected,
    lastMessage,
    sendMessage,
    joinRoom,
    leaveRoom,
    socket,
  };
};
