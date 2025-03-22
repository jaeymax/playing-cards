import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <div className="containe max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Match History</h2>
          </div>

          <div className="divide-y divide-gray-700">
            {games.map((game) => (
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
                      {game.time}
                    </span>
                  </div>
                  <Link
                    to={`/game-details/${game.id}`}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecentGamesPage;
