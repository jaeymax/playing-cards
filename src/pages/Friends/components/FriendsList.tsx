import React, { useState } from "react";
import { Friend } from "../types";

const FriendsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const friends: Friend[] = [
    {
      id: "1",
      username: "CardMaster123",
      status: "online",
      avatar: "👑",
      lastSeen: "Now",
      rank: "#2",
      matchesPlayed: 156,
    },
    // Add more friends...
  ];

  const filteredFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Friends List */}
      <div className="divide-y divide-gray-700">
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className="py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl">
                    {friend.avatar}
                  </div>
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    friend.status === "online" ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>
              <div>
                <h3 className="text-white font-medium">{friend.username}</h3>
                <p className="text-sm text-gray-400">
                  {friend.status === "online"
                    ? "Online"
                    : `Last seen ${friend.lastSeen}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Rank {friend.rank}</p>
                <p className="text-xs text-gray-500">
                  {friend.matchesPlayed} matches
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Challenge
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
