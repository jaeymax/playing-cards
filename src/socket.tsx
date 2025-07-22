import { io } from "socket.io-client";
//import BaseUrl from "@/config/api";

export const socket = io("http://192.168.43.218:5000", {
  autoConnect: true,
});
