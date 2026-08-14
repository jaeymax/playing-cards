import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { ensureGuest, getToken } from "@/utils/Functions";
import { analytics, logEvent } from "@/firebase/config";

interface InviteFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isCreatingGame, setIsCreatingGame] = useState(false);

  const [matchType, setMatchType] = useState<"friendly" | "stake">("friendly");

  const [stake, setStake] = useState<number>(10);

  const [gameConfig, setGameConfig] = useState({
    winPoints: 10,
    includeAces: true,
    includeSixes: false,
    isRated: false,
    numPlayers: 2,
  });

  const { user, updateUser } = useAppContext();
  

  const navigate = useNavigate();

  const prizePool = stake * gameConfig.numPlayers;
  const platformFee = prizePool * 0.05;
  const winnerPrize = prizePool - platformFee;

  const handleCreateGame = async () => {
    const authToken = getToken();

    let guest = null;

    if (!authToken) {
      const user = await ensureGuest();

      if (user) {
        updateUser(user);
        guest = user;
      }
    }

    try {
      setIsCreatingGame(true);

      const payload = {
        ...gameConfig,
        isStakeGame: matchType === "stake",
        stake: matchType === "stake" ? stake : 0,
        userId: user?.id || guest?.id,
      };

      console.log("Creating game with payload:", payload);
      

      const response = await fetch(`${baseUrl}/games/create`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed creating game", data);

        return;
      }

      logEvent(analytics, "invited_friend", {
        numPlayers: gameConfig.numPlayers,
        winPoints: gameConfig.winPoints,
        includeAces: gameConfig.includeAces,
        includeSixes: gameConfig.includeSixes,
        isRated: gameConfig.isRated,
        isStakeGame: matchType === "stake",
        stake,
      });

      if(payload.isStakeGame){
        navigate(`/cash-game/${data.game.code}`);
        return;
      }

      navigate(`/game/${data.game.code}`, {
        state: {
          gameType: "playWithFriend",
        },
      });
    } catch (error) {
      console.error("Failed to create game:", error);
    } finally {
      setIsCreatingGame(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Challenge a Friend">
      <div className="space-y-6 p-2">
        <div className="text-center text-gray-400 text-sm">
          Choose how you want to play
        </div>

        {/* MATCH TYPE */}

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMatchType("friendly")}
            className={`rounded-xl border p-4 text-left transition

${
  matchType === "friendly"
    ? "border-blue-500 bg-blue-500/10"
    : "border-gray-700 hover:border-gray-600"
}

`}
          >
            <div className="text-2xl">🎮</div>

            <p className="text-white font-semibold mt-2">Friendly</p>

            <p className="text-xs text-gray-400">Play without money</p>
          </button>

          <button
            onClick={() => setMatchType("stake")}
            className={`rounded-xl border p-4 text-left transition

${
  matchType === "stake"
    ? "border-blue-500 bg-blue-500/10"
    : "border-gray-700 hover:border-gray-600"
}

`}
          >
            <div className="text-2xl">💰</div>

            <p className="text-white font-semibold mt-2">Cash Challenge</p>

            <p className="text-xs text-gray-400">Winner takes prize</p>
          </button>
        </div>

        {/* STAKE SECTION */}

        {matchType === "stake" && (
          <div className="space-y-4">
            <label className="text-sm text-gray-300 font-medium">
              Stake Amount
            </label>

            <div className="relative">
              <span className="absolute left-4 top-3 text-green-400">GH₵</span>

              <input
                type="number"
                min={5}
                value={stake}
                onChange={(e) => setStake(Number(e.target.value))}
                className="
w-full
bg-gray-900
border
border-gray-700
rounded-xl
py-3
pl-14
text-white
outline-none
focus:border-green-500
"
              />
            </div>

            <div className="flex gap-2">
              {[5, 10, 20, 50].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStake(amount)}
                  className={`px-3 py-1 rounded-full text-xs

${stake === amount ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"}

`}
                >
                  GH₵{amount}
                </button>
              ))}
            </div>

            <div
              className="
rounded-xl
bg-gray-900
border
border-green-500/30
p-4
space-y-3
"
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Potential Win</span>

                <span className="text-white">GH₵{prizePool}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Platform Fee(5%)</span>

                <span className="text-red-400">
                  GH₵{platformFee.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="font-semibold text-white">Winner Gets</span>

                <span className="font-bold text-green-400">
                  GH₵{winnerPrize.toFixed(2)}
                </span>
              </div>
            </div>

            <div
              className="
bg-yellow-500/10
border
border-yellow-500/30
rounded-lg
p-3
text-xs
text-gray-300
"
            >
              🔒 Funds are held securely until the match ends.
            </div>
          </div>
        )}

        {/* GAME SETTINGS */}

        <div className="space-y-3">
          <label className="text-sm text-gray-300">Win Points</label>

          <input
            type="range"
            min={1}
            max={50}
            value={gameConfig.winPoints}
            onChange={(e) =>
              setGameConfig((prev) => ({
                ...prev,

                winPoints: Number(e.target.value),
              }))
            }
            className="
w-full
accent-blue-500
"
          />

          <div className="text-center text-blue-400">
            {gameConfig.winPoints}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm text-gray-300">Number of Players</label>

          <div className="flex justify-center gap-6">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() =>
                  setGameConfig((prev) => ({
                    ...prev,

                    numPlayers: num,
                  }))
                }
                className={`

w-9
h-9
rounded-full

${
  gameConfig.numPlayers === num
    ? "bg-blue-500 text-white"
    : "bg-gray-700 text-gray-300"
}

`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateGame}
          disabled={isCreatingGame}
          className="
w-full
py-3
rounded-xl
bg-gradient-to-r
from-blue-500
to-indigo-500
text-white
font-semibold
disabled:opacity-50
"
        >
          {isCreatingGame
            ? "Creating..."
            : matchType === "stake"
              ? "Create Cash Challenge"
              : "Create Friendly Match"}
        </button>
      </div>
    </Modal>
  );
};

export default InviteFriendModal;
