import { baseUrl } from "@/config/api";
//import { useAppContext } from "@/contexts/AppContext";
import { authHeaders, customLog } from "@/utils/Functions";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface RecentGame {
  opponent_name: string;
  opponent_score: number;
  player_score: number;
  ended_at: string;
  is_rated: boolean;
  winner: boolean;
   rating_change:number | null,
}

const RecentGames: React.FC = () => {
 // const { user } = useAppContext();
  const [recentGames, setRecentGames] = React.useState<RecentGame[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getRecentMatches = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/matchhistory/recent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });
      if (!response.ok) {
        throw new Error(
          response.status === 500
            ? "Network error. Please check your internet connection."
            : response.status === 403
            ? "Log in to view your recent matches"
            : "Failed to fetch games"
        );
      }
      const data = await response.json();
      customLog("recent games", data);
      setRecentGames(data);
    } catch (error: any) {
      console.error("Error fetching recent matches:", error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecentMatches();
  }, []);

  // const recentGamesMapped =
  //   recentGames.length > 0
  //     ? recentGames.map((game) => {
  //         let gameObj = {
  //           id: 0,
  //           player1: { name: "", score: 0 },
  //           player2: { name: "", score: 0 },
  //           result: "",
  //           time: "",
  //           type: "",
  //           endedAt: game.ended_at,
  //         };

  //         gameObj.result = game.winnerId === user?.id ? "win" : "loss";
  //         gameObj.player1.name = "You";
  //         gameObj.player1.score =
  //           game.players[0].username === user?.username
  //             ? game.players[0].score
  //             : game.players[1].score;
  //         gameObj.player2.name =
  //           game.players[0].username === user?.username
  //             ? game.players[1].username
  //             : game.players[0].username;
  //         gameObj.player2.score =
  //           game.players[0].username === user?.username
  //             ? game.players[1].score
  //             : game.players[0].score;
  //         gameObj.type = game?.is_rated ? "Ranked" : "Casual";
  //         gameObj.id = game.id;
  //         return gameObj;
  //       })
  //     : [];

  const GameSkeleton = () => (
    <div className="p-4 animate-pulse">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-600" />
          <div className="w-16 h-6 rounded bg-gray-600" />
        </div>
        <div className="flex-1 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-20 h-5 bg-gray-600 rounded" />
            <div className="w-16 h-5 bg-gray-600 rounded" />
            <div className="w-20 h-5 bg-gray-600 rounded" />
          </div>
          <div className="w-24 h-4 bg-gray-600 rounded mt-1 mx-auto" />
        </div>
        <div className="w-14 h-5 bg-gray-600 rounded" />
      </div>
    </div>
  );

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Recent Games</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {isLoading ? (
          <>
            <GameSkeleton />
            <GameSkeleton />
            <GameSkeleton />
          </>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 mb-4">{error}</p>
            {error.includes("log in") ? (
              <Link
                to="/signin"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors inline-block"
              >
                Login
              </Link>
            ) : error.includes("Network error") ? (
              <button
                onClick={getRecentMatches}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Retry
              </button>
            ) : null}
          </div>
        ) : recentGames.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400 font-semibold">No recent games to display</p>
            <p className="text-gray-500 mt-2">Play a game to see your match history</p>
          </div>
        ) : (
          recentGames.map((game, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      game.winner === true ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs font-medium px-2 py-1 rounded bg-gray-700 text-gray-300">
                    {game.is_rated ? "Ranked" : "Casual"}
                  </span>
                </div>
                <div className="flex-1 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-white font-medium">
                      You
                    </span>
                    <span className="text-gray-400 text-sm">
                      {game.player_score} - {game.opponent_score}
                    </span>
                    <span className="text-white font-medium">
                      {game.opponent_name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">
                    {formatDistanceToNow(new Date(game.ended_at), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                {/* <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Details
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-3 border-t border-gray-700">
        {/* {recentGamesMapped.length > 0 && ( <Link
          to="/recent-games"
          className="text-sm block text-blue-400 hover:text-blue-300 transition w-full text-center"
        >
          View Match History
        </Link>)} */}
       
      </div>
    </div>
  );
};

export default RecentGames;
