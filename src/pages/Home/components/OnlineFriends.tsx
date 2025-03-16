import React from "react";

const OnlineFriends: React.FC = () => {
  const friends = [
    { id: 1, name: "Alex", status: "online", activity: "In Game" },
    { id: 2, name: "Emma", status: "online", activity: "In Lobby" },
    { id: 3, name: "John", status: "away", activity: "Idle" },
    { id: 4, name: "Sarah", status: "online", activity: "In Tournament" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Online Friends</h2>
      </div>
      <div className="p-4 space-y-4">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${
                friend.status === "online" ? "bg-green-500" : "bg-yellow-500"
              }`}
            />
            <div className="flex-1">
              <div className="text-white">{friend.name}</div>
              <div className="text-sm text-gray-400">{friend.activity}</div>
            </div>
            <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm">
              Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineFriends;
