import React from "react";
import { Tournament } from "../types";

interface TournamentCardProps {
  tournament: Tournament;
}

const TournamentCard: React.FC<TournamentCardProps> = ({ tournament }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500/10 text-blue-400";
      case "ongoing":
        return "bg-green-500/10 text-green-400";
      case "completed":
        return "bg-gray-500/10 text-gray-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-400";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-400";
      case "advanced":
        return "bg-orange-500/10 text-orange-400";
      case "pro":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-white">{tournament.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              tournament.status
            )}`}
          >
            {tournament.status.charAt(0).toUpperCase() +
              tournament.status.slice(1)}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Start Time</span>
            <span className="text-gray-300">
              {formatDate(tournament.startDate)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Entry Fee</span>
            <span className="text-gray-300">{tournament.entryFee} Gems</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Prize Pool</span>
            <span className="text-gray-300">{tournament.prizePool} Gems</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Players</span>
            <span className="text-gray-300">
              {tournament.registeredPlayers}/{tournament.maxPlayers}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Format</span>
            <span className="text-gray-300">{tournament.format}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Difficulty</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                tournament.difficulty
              )}`}
            >
              {tournament.difficulty.charAt(0).toUpperCase() +
                tournament.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-750 border-t border-gray-700">
        <button
          className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transform transition hover:scale-[1.02]"
          disabled={tournament.status !== "upcoming"}
        >
          {tournament.status === "upcoming" ? "Register Now" : "View Details"}
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
