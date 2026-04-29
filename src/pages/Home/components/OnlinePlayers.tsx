import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";
import React, { useEffect, useState } from "react";

interface Player {
  user_id: number;
  username: string;
  status: string; // "In Game", "Active", "Idle"
  activity: string; // "In Game", "Active", "Idle"
}

const OnlinePlayers: React.FC = () => {
    // const players = [
    //   { user_id: 1, username: "Alex", status: "In Game", activity: "In Game" },
    //   { user_id: 2, username: "Emma", status: "Active", activity: "Active" },
    //   { user_id: 3, username: "John", status: "Idle", activity: "Idle" },
    //   { user_id: 4, username: "Sarah", status: "Active", activity: "Active" },
    //   { user_id: 5, username: "Alex", status: "In Game", activity: "In Game" },
    //   { user_id: 6, username: "Emma", status: "Active", activity: "Active" },
    //   { user_id: 7, username: "John", status: "Idle", activity: "Idle" },
    //   { user_id: 4, username: "Sarah", status: "Active", activity: "Active" },

    // ];

  const {socket} = useSocket();
  const {user} = useAppContext();

   const [players, setPlayers] = useState<Player[]>([]);


  const filteredPlayers = players.filter((player) => player.user_id !== user?.id);
  console.log('Filtered Players:', filteredPlayers);

  useEffect(() => {
    if(!socket)return;
    console.log('socket in OnlinePlayers:', socket);
    socket?.emit("getOnlineUsers");
    socket?.on("onlineUsers", (data) => {
      console.log("Online Users:", data);

      // Update your state with the received data
      setPlayers(data);
    });

    socket?.on("onlineUsersStatusChanged", (data) => {
      console.log("Online Users Status Changed:", data);
      // Update your state with the received data
      setPlayers(data);
    });

    return () => {
      socket?.off("onlineUsers");
      socket?.off("onlineUsersStatusChanged");
    };
  }, [socket]);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Online Players</h2>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto max-h-64 custom-scroll">
        {
         filteredPlayers.length === 0 ? (
          <div className="text-gray-400 text-center">No other players online</div>
        ) : (
        
        filteredPlayers.map((player) => (
          <div key={player.user_id} className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                player.status === "In Game" ? "bg-red-500" : player.status === "Idle" ? "bg-yellow-500" : "bg-green-500"
              }`}
            />
            <div className="flex-1">
              <div className="text-white">{player.username}</div>
              <div className="text-sm text-gray-400">{player.status}</div>
            </div>
            {(player.status === "Idle" || player.status === "Active") && (
               
               <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              Challenge
            </button>
            )}

          </div>
        )

        ))}
      </div>
    </div>
  );
};

export default OnlinePlayers;