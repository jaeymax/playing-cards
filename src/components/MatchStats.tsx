import { useState } from "react";

interface MatchStatsProps {
  game: any;
  players: any[];
}

const MatchStats = ({ game, players }: MatchStatsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Calculate cards dealt (not in deck)
  const cardsDealt =
    game?.cards?.filter((c: any) => c.status !== "in_deck").length || 0;

  // Get current player name
  const currentPlayer = players?.[game?.current_player_position];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full bg-gray-800 text-white px-4 py-3 rounded-lg font-semibold mb-4 flex justify-between items-center"
      >
        <span>Match Stats</span>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
          
        </span>
      </button>

      {/* Stats Container */}
      <div
        className={`bg-gray-800 bg-opacity-50 rounded-lg p-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <h3 className="text-lg font-bold mb-4 border-b border-gray-600 pb-2 hidden md:block">
          Match Stats
        </h3>

        <div className="space-y-3">
          {/* Current Turn */}
          <div className="text-sm">
            <p className="text-gray-400">Current Turn</p>
            <p className="font-semibold text-yellow-400">
              {currentPlayer?.user?.username || "Waiting..."}
            </p>
          </div>

          {/* Player Scores */}
          <div className="text-sm">
            <p className="text-gray-400 mb-2">Scores</p>
            <div className="space-y-1">
              {players.map((player, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-xs truncate">
                    {player.user.username}
                  </span>
                  <span className="font-bold text-white">{player.score}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Game Status */}
          <div className="text-sm">
            <p className="text-gray-400">Players</p>
            <p className="font-semibold">
              {players.length}/{game?.player_count}
            </p>
          </div>

          {/* Cards in Play */}
          <div className="text-sm">
            <p className="text-gray-400">Cards Dealt</p>
            <p className="font-semibold">{cardsDealt}</p>
          </div>

          {/* Round & Hand Info */}
          <div className="text-sm">
            <p className="text-gray-400">Round / Hand</p>
            <p className="font-semibold">
              {game?.round_number} / {game?.current_hand_number}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchStats;
