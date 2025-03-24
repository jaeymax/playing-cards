import { io } from "socket.io-client";

export const socket = io("https://playing-cards-api.onrender.com", {
  autoConnect: true,
});
