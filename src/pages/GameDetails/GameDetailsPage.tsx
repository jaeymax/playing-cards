import React from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type CardMove = {
  id: number;
  player: string;
  card: string;
  timestamp: Date;
  moveNumber: number;
};

const GameDetailsPage: React.FC = () => {
  const { id } = useParams();

  // Mock data - replace with real data fetch
  const gameDetails = {
    id: Number(id),
    date: new Date("2024-01-20T15:30:00"),
    player1: { name: "Alice Smith", avatar: "👩", rank: "Gold" },
    player2: { name: "You", avatar: "👤", rank: "Gold" },
    result: "win",
    score: "21 - 15",
    gameType: "Ranked",
    duration: "15 minutes",
    moves: [
      {
        id: 1,
        player: "Alice Smith",
        card: "♠️ Ace",
        timestamp: new Date("2024-01-20T15:30:00"),
        moveNumber: 1,
      },
      {
        id: 2,
        player: "You",
        card: "♥️ King",
        timestamp: new Date("2024-01-20T15:30:10"),
        moveNumber: 2,
      },
      {
        id: 3,
        player: "Alice Smith",
        card: "♦️ Queen",
        timestamp: new Date("2024-01-20T15:30:20"),
        moveNumber: 3,
      },
      {
        id: 4,
        player: "You",
        card: "♣️ Jack",
        timestamp: new Date("2024-01-20T15:30:30"),
        moveNumber: 4,
      },
      {
        id: 5,
        player: "Alice Smith",
        card: "♥️ 10",
        timestamp: new Date("2024-01-20T15:30:40"),
        moveNumber: 5,
      },
    ] as CardMove[],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {true} />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Game Details</h2>
            <div
              className={`text-sm font-medium px-2 py-1 rounded ${
                gameDetails.result === "win"
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {gameDetails.gameType}
            </div>
          </div>

          {/* Game Summary */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-xl">
                      {gameDetails.player1.avatar}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{gameDetails.player1.name}</h3>
                  <span className="text-sm text-gray-400">
                    {gameDetails.player1.rank}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{gameDetails.score}</div>
                <span className="text-sm text-gray-400">
                  {gameDetails.duration}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <h3 className="font-semibold">{gameDetails.player2.name}</h3>
                  <span className="text-sm text-gray-400">
                    {gameDetails.player2.rank}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-xl">
                      {gameDetails.player2.avatar}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Move History */}
          <div className="divide-y divide-gray-700">
            {gameDetails.moves.map((move) => (
              <div
                key={move.id}
                className="p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm">
                      #{move.moveNumber}
                    </span>
                    <span className="font-medium">{move.player}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{move.card}</span>
                    <span className="text-xs text-gray-500">
                      {move.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
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

export default GameDetailsPage;
