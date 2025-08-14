import { io, Socket } from "socket.io-client";
//import BaseUrl from "@/config/api";

// https://playing-cards-api.onrender.com
// http://192.168.43.218:5000

const sockerUrl = import.meta.env.VITE_ENV === "development"
  ? "http://192.168.43.218:5000"
  : "https://playing-cards-api.onrender.com";


let socket: Socket | null = null;
let currnetUserId:number | null = null;

export const initSocket = (userId:number) =>{
  currnetUserId = userId;
  
  socket = io(sockerUrl, {
    auth:{
      userId: currnetUserId
    },
    autoConnect:true,
  })

  socket.on('connection', ()=>{
    console.log('connected');
    
  })

  socket.io.on("reconnect_attempt", ()=>{
    if(currnetUserId && socket){
      socket.auth = {userId: currnetUserId}
    }
  })

  return socket
}

export const getSocket = (): Socket | null => socket;