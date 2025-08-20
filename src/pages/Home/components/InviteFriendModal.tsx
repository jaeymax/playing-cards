import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { ensureGuest, getToken } from "@/utils/Functions";

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
    winPoints: 10,
    includeAces: true,
    includeSixes: false,
    isRated: true,
    numPlayers: 2,
  });

  const {user, updateUser} = useAppContext();


  const navigate = useNavigate();
  const handleCreateGame = async () => {
    const authToken = getToken();
    let guest = null;
    if (!authToken) {
      const user = await ensureGuest();
      if(user){
        updateUser(user);
        guest = user;
      }
    }
   
    try {
      console.log("Game configuration:", gameConfig);
      setIsCreatingGame(true);
      const response = await fetch(`${baseUrl}/games/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...gameConfig, userId: user?.id || guest?.id }),
      }); 


      const data = await response.json();

      console.log('game data', data)
      if (!response.ok) {
        console.error('Failed to create game:', response.statusText);
        return;
      }
      navigate(`/game/${data.game.code}`, {
        state: { gameType: "playWithFriend" },
      });
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

        <div className="space-y-6">
          {/* Number of Hands Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-300">
                Number of Win points
              </label>
              <span className="text-sm font-medium text-blue-400">
                {gameConfig.winPoints}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={gameConfig.winPoints}
              onChange={(e) =>
                setGameConfig((prev) => ({
                  ...prev,
                  winPoints: parseInt(e.target.value),
                }))
              }
              className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Number of Players */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">
              Number of Players
            </label>
            <div className="flex gap-2">
              <div className="borde mx-auto flex gap-10">

              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() =>
                    setGameConfig((prev) => ({ ...prev, numPlayers: num }))
                  }
                  className={`flex-  py- w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 
                    ${
                      gameConfig.numPlayers === num
                        ? "bg-blue-500 text-white shadow-l shadow-blue-500/20"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                >
                  {num}
                </button>
              ))}
              </div>
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
                className={`group relative px-4 py-3 rounded-lg border transition-all duration-200
                  ${
                    gameConfig.includeAces
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">A</span>
                    <div className="flex flex-col text-left">
                      <span
                        className={`text-sm font-medium ${
                          gameConfig.includeAces
                            ? "text-blue-400"
                            : "text-gray-300"
                        }`}
                      >
                        Aces
                      </span>
                      <span className="text-xs text-gray-500">
                        Worth 1 point
                      </span>
                    </div>
                  </div>
  
                </div>
              </button>

              <button
                onClick={() =>
                  setGameConfig((prev) => ({
                    ...prev,
                    includeSixes: !prev.includeSixes,
                  }))
                }
                className={`group relative px-4 py-3 rounded-lg border transition-all duration-200
                  ${
                    gameConfig.includeSixes
                      ? "border-blue-500/50 bg-blue-500/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">6</span>
                    <div className="flex flex-col text-left">
                      <span
                        className={`text-sm font-medium ${
                          gameConfig.includeSixes
                            ? "text-blue-400"
                            : "text-gray-300"
                        }`}
                      >
                        Sixes
                      </span>
                      <span className="text-xs text-gray-500">
                        Worth 3 points
                      </span>
                    </div>
                  </div>

                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Create Game Button */}
        <button
          onClick={handleCreateGame}
          disabled={isCreatingGame}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                   rounded-lg font-medium transition-all duration-300 hover:from-blue-600 hover:to-indigo-600
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2
                   shadow-l hadow-blue-500/25"
        >
          {isCreatingGame ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
