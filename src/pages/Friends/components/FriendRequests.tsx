import React from "react";
import { FriendRequest } from "../types";

const FriendRequests: React.FC = () => {
  const requests: FriendRequest[] = [
    {
      id: "1",
      username: "DragonSlayer",
      avatar: "🐉",
      mutualFriends: 3,
      rank: "#45",
      timeSent: "2h ago",
    },
    {
      id: "2",
      username: "SpadeQueen",
      avatar: "♠️",
      mutualFriends: 5,
      rank: "#23",
      timeSent: "4h ago",
    },
    {
      id: "3",
      username: "MagicMaster",
      avatar: "🎭",
      mutualFriends: 1,
      rank: "#89",
      timeSent: "1d ago",
    },
  ];

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <div
          key={request.id}
          className="bg-gray-750 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-xl">
                {request.avatar}
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium">{request.username}</h3>
              <p className="text-sm text-gray-400">
                {request.mutualFriends} mutual friends • Rank {request.rank}
              </p>
              <p className="text-xs text-gray-500">{request.timeSent}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
              Accept
            </button>
            <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
