import { useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

interface BottomBarProps {
  game: any;
  players: any[];
  gameCode?: string;
}

const SpectateMatchButtomBar = ({ game, players, gameCode }: BottomBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "share">("stats");
  const [copied, setCopied] = useState(false);

  // Calculate cards dealt (not in deck)
  const cardsDealt =
    game?.cards?.filter((c: any) => c.status !== "in_deck").length || 0;

  // Get current player name
  const currentPlayer = players?.[game?.current_player_position];

  const handleCopyLink = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    const text = `Watch me play! Join game ${gameCode}: ${link}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleShareFacebook = () => {
    const link = `${window.location.origin}/spectate/${gameCode}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        link
      )}`,
      "_blank"
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 flex items-center justify-between rounded-t-2xl border-t border-blue-500 transition-all duration-300"
      >
        <span className="font-semibold text-sm">
          {isOpen ? "Hide" : "Show"} Info
        </span>
        <ChevronUpIcon
          className={`h-5 w-5 transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Content Panel */}
      <div
        className={`bg-black bg-opacity-95 text-white border-t border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[60vh]" : "max-h-0"
        }`}
      >
        {/* Tab Buttons */}
        <div className="flex gap-2 p-4 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === "stats"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveTab("share")}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition ${
              activeTab === "share"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            Share
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(60vh-60px)] p-4">
          {/* Stats Tab */}
          {activeTab === "stats" && (
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
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xs truncate">
                        {player.user.username}
                      </span>
                      <span className="font-bold text-white">
                        {player.score}
                      </span>
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
          )}

          {/* Share Tab */}
          {activeTab === "share" && (
            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition"
              >
                {copied ? "✓ Copied!" : "Copy Link"}
              </button>

              <button
                onClick={handleShareX}
                className="w-full px-4 py-2 bg-black hover:bg-gray-900 rounded-lg font-semibold text-sm transition border border-gray-600"
              >
                Share on X
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full px-4 py-2 bg-blue-900 hover:bg-blue-800 rounded-lg font-semibold text-sm transition"
              >
                Share on Facebook
              </button>

              {gameCode && (
                <div className="mt-4 p-3 bg-gray-700 rounded text-center">
                  <p className="text-xs text-gray-400">Game Code</p>
                  <p className="font-mono font-bold text-lg">{gameCode}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpectateMatchButtomBar;
