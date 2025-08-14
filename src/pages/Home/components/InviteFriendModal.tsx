import React, { useState } from "react";
import Modal from "../../../components/Modal";

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    numHands: 10,
    includeAces: true,
    includeSixes: false,
    isRated: true,
    numPlayers: 2,
  });

  const handleCreateGame = async () => {
    setIsCreatingGame(true);
    try {
      console.log("Game configuration:", gameConfig);
      // Implement game creation logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
    } catch (error) {
      console.error("Failed to create game:", error);
    } finally {
      setIsCreatingGame(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Game Configuration">
      <div className="space-y-6 p-2">
        <div className="text-center text-gray-400 text-sm">
          Configure your game settings
        </div>

        {/* Game Configuration Form */}
        <div className="space-y-6">
          {/* Number of Hands */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex justify-between">
              Number of Hands
              <span className="text-blue-400">{gameConfig.numHands}</span>
            </label>
            <input
              type="range"
              min={1}
              max={50}
              value={gameConfig.numHands}
              onChange={(e) =>
                setGameConfig((prev) => ({
                  ...prev,
                  numHands: parseInt(e.target.value),
                }))
              }
              className="w-full bg-gray-700 rounded-lg appearance-none h-2 accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>50</span>
            </div>
          </div>

          {/* Number of Players */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Number of Players
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setGameConfig((prev) => ({ ...prev, numPlayers: num }))
                  }
                  className={`p-3 rounded-lg border ${
                    gameConfig.numPlayers === num
                      ? "border-blue-500 bg-blue-500/20 text-blue-400"
                      : "border-gray-700 hover:border-gray-600 text-gray-300"
                  } transition-all`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Card Settings */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Card Settings
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setGameConfig((prev) => ({
                    ...prev,
                    includeAces: !prev.includeAces,
                  }))
                }
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  gameConfig.includeAces
                    ? "border-blue-500 bg-blue-500/20 text-blue-400"
                    : "border-gray-700 hover:border-gray-600 text-gray-300"
                } transition-all`}
              >
                <span>Aces</span>
                {gameConfig.includeAces && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={() =>
                  setGameConfig((prev) => ({
                    ...prev,
                    includeSixes: !prev.includeSixes,
                  }))
                }
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  gameConfig.includeSixes
                    ? "border-blue-500 bg-blue-500/20 text-blue-400"
                    : "border-gray-700 hover:border-gray-600 text-gray-300"
                } transition-all`}
              >
                <span>Sixes</span>
                {gameConfig.includeSixes && (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Match Type */}
          {/* <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Match Type (Rated or Unrated)
            </label>
            <button
              onClick={() =>
                setGameConfig((prev) => ({ ...prev, isRated: !prev.isRated }))
              }
              className={`w-full p-3 rounded-lg border flex items-center justify-between ${
                gameConfig.isRated
                  ? "border-blue-500 bg-blue-500/20 text-blue-400"
                  : "border-gray-700 hover:border-gray-600 text-gray-300"
              } transition-all`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>{gameConfig.isRated ? "Rated" : "Unrated"}</span>
              </div>
              {gameConfig.isRated ? "" : ""}
            </button>
            <p className="text-center text-sm">
              {gameConfig.isRated
                ? "Rating will be affected"
                : "Practice match"}
            </p>
          </div> */}
        </div>

        {/* Create Game Button */}
        <button
          onClick={handleCreateGame}
          disabled={isCreatingGame}
          className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 
                   text-white font-medium rounded-lg transform transition disabled:opacity-70 disabled:cursor-not-allowed
                   flex items-center justify-center gap-2"
        >
          {isCreatingGame ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Game...</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Create Game
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
