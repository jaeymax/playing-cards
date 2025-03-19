import React from "react";
import type { Friend } from "../types";

const OnlineFriends: React.FC = () => {
  const onlineFriends: Friend[] = [
    {
      id: "1",
      username: "CardMaster123",
      status: "online",
      avatar: "👑",
      lastSeen: "Now",
      rank: "#2",
      matchesPlayed: 156,
      currentActivity: "In Tournament Match",
    },
    {
      id: "2",
      username: "PokerQueen",
      status: "online",
      avatar: "♠️",
      lastSeen: "Now",
      rank: "#5",
      matchesPlayed: 132,
      currentActivity: "In Practice Mode",
    },
    {
      id: "3",
      username: "AceHunter",
      status: "online",
      avatar: "🎭",
      lastSeen: "Now",
      rank: "#8",
      matchesPlayed: 98,
      currentActivity: "In Lobby",
    },
    {
      id: "4",
      username: "DiamondKing",
      status: "online",
      avatar: "♦️",
      lastSeen: "Now",
      rank: "#15",
      matchesPlayed: 245,
      currentActivity: "Spectating Match",
    },
  ] as const;

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "In Tournament Match":
        return "text-purple-400";
      case "In Practice Mode":
        return "text-green-400";
      case "Spectating Match":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {onlineFriends.map((friend) => (
        <div
          key={friend.id}
          className="bg-gray-750 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl">
                  {friend.avatar}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-800" />
            </div>

            <div>
              <h3 className="text-white font-medium">{friend.username}</h3>
              <p
                className={`text-sm ${getActivityColor(
                  friend.currentActivity
                )}`}
              >
                {friend.currentActivity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-400">Rank {friend.rank}</p>
              <p className="text-xs text-gray-500">
                {friend.matchesPlayed} matches
              </p>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500">
                Challenge
              </button>
              <button className="px-3 py-1.5 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-600">
                Spectate
              </button>
            </div>
          </div>
        </div>
      ))}

      {onlineFriends.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No friends currently online</p>
        </div>
      )}
    </div>
  );
};

export default OnlineFriends;
