import React, { useState } from "react";

const MatchHistory: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "ranked" | "casual" | "tournament"
  >("all");

  const matches = [
    {
      id: "1",
      type: "ranked",
      opponent: "PokerQueen",
      result: "win",
      score: "21-18",
      rating: "+25",
      time: "2h ago",
    },
    {
      id: "2",
      type: "tournament",
      opponent: "CardMaster123",
      result: "loss",
      score: "15-21",
      rating: "-20",
      time: "3h ago",
    },
    // Add more matches...
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {["all", "ranked", "casual"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.id} className="bg-gray-750 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.result === "win"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {match.result.toUpperCase()}
                </span>
                <div>
                  <p className="text-white">vs {match.opponent}</p>
                  <p className="text-sm text-gray-400">{match.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white">{match.score}</p>
                <p
                  className={`text-sm ${
                    match.rating.startsWith("+")
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {match.rating} Rating
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchHistory;
