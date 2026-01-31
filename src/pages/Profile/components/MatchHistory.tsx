import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface MatchHistoryProps {
   opponent_name:string,
   opponent_score: number,
   player_score: number,
   ended_at: string,
   is_rated: boolean,
   winner:boolean,
   rating_change:number | null,
}

const MatchHistory: React.FC = () => {
  const [filter, setFilter] = useState<
    "all" | "ranked" | "casual" | "tournament"
  >("all");




  const [matches, setMatches] = useState<MatchHistoryProps[]>([]);

  // const matches = [
  //   {
  //     id: "1",
  //     type: "ranked",
  //     opponent: "PokerQueen",
  //     result: "win",
  //     score: "21-18",
  //     rating: "+25",
  //     time: "2h ago",
  //   },
  //   {
  //     id: "2",
  //     type: "tournament",
  //     opponent: "CardMaster123",
  //     result: "loss",
  //     score: "15-21",
  //     rating: "-20",
  //     time: "3h ago",
  //   },
  //   // Add more matches...
  // ];

  const formatRating = (rating_change: number | null) => {
    if (rating_change === null) return "Unrated";
    return rating_change > 0 ? `+${rating_change} Rating` : `${rating_change} Rating`;
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${baseUrl}/matchhistory`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders()
          },
        });
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

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
        {matches.map((match,index) => (
          <div key={index} className="bg-gray-750 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.winner === true
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {match.winner === true ? "Win" : "Loss"}
                </span>
                <div>
                  <p className="text-white">vs {match.opponent_name}</p>
                  <p className="text-sm text-gray-400">
                    {formatDistanceToNow(new Date(match.ended_at))}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white">{`${match.player_score} - ${match.opponent_score}`}</p>
                <p
                  className={`text-sm ${
                   match.rating_change == null?
                      "text-gray-400"
                      : match.rating_change > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {formatRating(match.rating_change)}
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
