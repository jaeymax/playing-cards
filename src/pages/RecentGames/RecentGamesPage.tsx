import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { authHeaders } from "@/utils/Functions";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { formatDistanceToNow } from "date-fns";

type Game = {
  id: number;
  player1: { name: string; score: number };
  player2: { name: string; score: number };
  result: "win" | "loss" | "draw";
  time: string;
  type: string;
  date: Date;
};

const RecentGamesPage: React.FC = () => {
  const [games] = useState<Game[]>([
    {
      id: 1,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster123", score: 18 },
      result: "win",
      time: "15m ago",
      type: "Ranked",
      date: new Date("2024-01-20T15:30:00"),
    },
    {
      id: 2,
      player1: { name: "You", score: 18 },
      player2: { name: "CardMaster456", score: 21 },
      result: "loss",
      time: "30m ago",
      type: "Casual",
      date: new Date("2024-01-20T14:15:00"),
    },
    {
      id: 3,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster789", score: 12 },
      result: "win",
      time: "1h ago",
      type: "Tournament",
      date: new Date("2024-01-20T12:45:00"),
    },
    {
      id: 4,
      player1: { name: "You", score: 20 },
      player2: { name: "CardMaster101", score: 20 },
      result: "draw",
      time: "2h ago",
      type: "Ranked",
      date: new Date("2024-01-19T23:20:00"),
    },
    {
      id: 5,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster102", score: 19 },
      result: "win",
      time: "3h ago",
      type: "Tournament",
      date: new Date("2024-01-19T22:10:00"),
    },
    {
      id: 6,
      player1: { name: "You", score: 15 },
      player2: { name: "CardMaster103", score: 21 },
      result: "loss",
      time: "4h ago",
      type: "Ranked",
      date: new Date("2024-01-19T20:30:00"),
    },
    {
      id: 7,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster104", score: 17 },
      result: "win",
      time: "5h ago",
      type: "Casual",
      date: new Date("2024-01-19T19:15:00"),
    },
    {
      id: 8,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster105", score: 14 },
      result: "win",
      time: "6h ago",
      type: "Tournament",
      date: new Date("2024-01-19T18:00:00"),
    },
    {
      id: 9,
      player1: { name: "You", score: 16 },
      player2: { name: "CardMaster106", score: 21 },
      result: "loss",
      time: "7h ago",
      type: "Ranked",
      date: new Date("2024-01-19T16:45:00"),
    },
    {
      id: 10,
      player1: { name: "You", score: 21 },
      player2: { name: "CardMaster107", score: 21 },
      result: "draw",
      time: "8h ago",
      type: "Casual",
      date: new Date("2024-01-19T15:30:00"),
    },
  ]);
  (games && true)
  const { user } = useAppContext();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMatchHistory = async () => {
      // Fetch match history from API
      // Update state with fetched data
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/matchhistory`, {
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
              ? "Please log in to view your recent matches"
              : "Failed to fetch games"
          );
        }
        const data = await response.json();
        setMatches(data);
      } catch (error: any) {
        console.error("Error fetching recent matches:", error);
        setError(error.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getMatchHistory();
  }, []);

  const mappedMatches =
    matches.length > 0
      ? matches.map((game) => {
          let gameObj = {
            id: 0,
            player1: { name: "", score: 0 },
            player2: { name: "", score: 0 },
            result: "",
            time: "",
            type: "",
            endedAt: game.ended_at,
          };

          gameObj.result = game.winnerId === user?.id ? "win" : "loss";
          gameObj.player1.name = "You";
          gameObj.player1.score =
            game.players[0].username === user?.username
              ? game.players[0].score
              : game.players[1].score;
          gameObj.player2.name =
            game.players[0].username === user?.username
              ? game.players[1].username
              : game.players[0].username;
          gameObj.player2.score =
            game.players[0].username === user?.username
              ? game.players[1].score
              : game.players[0].score;
          gameObj.type = game?.isRanked ? "Ranked" : "Casual";
          gameObj.id = game.id;
          return gameObj;
        })
      : [];

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
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col borde">
      <NavBar />
      <div className="containe max-w-4xl mx-auto px-4 py-8 borde flex-1 w-full">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Match History</h2>
          </div>

          <div className="divide-y divide-gray-700">
            {loading ? (
              <>
                <GameSkeleton />
                <GameSkeleton />
                <GameSkeleton />
                <GameSkeleton />
                <GameSkeleton />
                <GameSkeleton />
              </>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 mb-4">{error}</p>
                {error.includes("log in") ? (
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors inline-block"
                  >
                    Login
                  </Link>
                ) : error.includes("Network error") ? (
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                  >
                    Retry
                  </button>
                ) : null}
              </div>
            ) : mappedMatches.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400 font-semibold">
                  No games to display
                </p>
                <p className="text-gray-500 mt-2">
                  Play a game to see your match history
                </p>
              </div>
            ) : (
              mappedMatches.map((game) => (
                <div
                  key={game.id}
                  className="p-4 hover:bg-gray-750 transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          game.result === "win" ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      <span className="text-xs font-medium px-2 py-1 rounded bg-gray-700 text-gray-300">
                        {game.type}
                      </span>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-white font-medium">
                          {game.player1.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {game.player1.score} - {game.player2.score}
                        </span>
                        <span className="text-white font-medium">
                          {game.player2.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {formatDistanceToNow(new Date(game.endedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecentGamesPage;
