import { io } from "socket.io-client";
//import BaseUrl from "@/config/api";

// https://playing-cards-api.onrender.com
// http://192.168.43.218:5000

export const socket = io("https://playing-cards-api.onrender.com", {
  autoConnect: true,
});
