import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "./AppContext";

const sockerUrl = import.meta.env.VITE_ENV === "development"
  ? "http://192.168.43.218:5000"
  : "https://playing-cards-api.onrender.com";


interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
});

export const SocketProvider: React.FC<{children: React.ReactNode }> = ({children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

    const {user} = useAppContext();

  useEffect(() => {

    let newSocket: Socket | null = null;

    if(user){
        newSocket = io(sockerUrl, {
          auth: { userId: user?.id },
          autoConnect: true,
        });
    
        const onConnect = () => {
            setIsConnected(true);
            console.log("Connected to server");
            
          };
      
          const onDisconnect = () => {
            setIsConnected(false);
            console.log("Disconnected from server");
          };
      
        
        newSocket.on("connect", onConnect);
        newSocket.on("disconnect",onDisconnect);
    
        setSocket(newSocket);

    }

    return () => {
      newSocket?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
