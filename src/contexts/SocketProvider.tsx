import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "./AppContext";

const sockerUrl = import.meta.env.VITE_ENV === "development"
  ? "wss://192.168.43.218:5000"
  : "wss://api.sparplay.com";


interface SocketContextValue {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  isConnected: false,
});

export const SocketProvider: React.FC<{children: React.ReactNode }> = ({children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

    const {user} = useAppContext();

  useEffect(() => {

   

    if(user){
        
        if(!socketRef.current){
          socketRef.current = io(sockerUrl, {
            auth: { userId: user?.id },
            autoConnect: true,
          });
        }
    
        const onConnect = () => {
            setIsConnected(true);
            console.log("✅ Connected to server");
            
          };
      
          const onDisconnect = () => {
            setIsConnected(false);
            console.log("❌ Disconnected from server");
          };
      

        socketRef.current.on("connect", onConnect);
        socketRef.current.on("disconnect",onDisconnect);
    
        //setSocket(newSocket);

    }

    return () => {
     // socketRef.current?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket:socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
