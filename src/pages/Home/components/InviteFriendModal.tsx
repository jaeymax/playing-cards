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

  const canView = user?.id == 18 || user?.id == 20 || user?.id == 48;

  return (
   <Modal isOpen={isOpen} onClose={onClose} title="Challenge a Friend">
  <div className="flex max-h-[80vh] flex-col p-1 sm:p-2">
    
    {/* SCROLLABLE CONTENT */}
    <div className="flex-1 overflow-y-auto pr-1 space-y-4 sm:space-y-6">

      <div className="text-center text-gray-400 text-xs sm:text-sm">
        Choose how you want to play
      </div>

      {/* MATCH TYPE */}
      {canView && (
        <div className="grid grid-cols-2 gap-2 sm:gap-3">

          <button
            onClick={() => setMatchType("friendly")}
            className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 text-left transition
              ${
                matchType === "friendly"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
          >
            <div className="text-xl sm:text-2xl">
              🎮
            </div>

            <p className="text-sm sm:text-base text-white font-semibold mt-1 sm:mt-2">
              Friendly
            </p>

            <p className="text-[10px] sm:text-xs text-gray-400">
              Play without money
            </p>
          </button>


          <button
            onClick={() => setMatchType("stake")}
            className={`rounded-lg sm:rounded-xl border p-3 sm:p-4 text-left transition
              ${
                matchType === "stake"
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-600"
              }`}
          >
            <div className="text-xl sm:text-2xl">
              💰
            </div>

            <p className="text-sm sm:text-base text-white font-semibold mt-1 sm:mt-2">
              Cash Challenge
            </p>

            <p className="text-[10px] sm:text-xs text-gray-400">
              Winner takes prize
            </p>
          </button>

        </div>
      )}


      {/* STAKE SECTION */}
      {canView && matchType === "stake" && (
        <div className="space-y-3 sm:space-y-4">

          <label className="text-xs sm:text-sm text-gray-300 font-medium">
            Stake Amount
          </label>


          {/* STAKE INPUT */}
          <div className="relative">

            <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-400 text-sm">
              GH₵
            </span>

            <input
              type="number"
              min={1}
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="
                w-full
                bg-gray-900
                border
                border-gray-700
                rounded-lg
                sm:rounded-xl
                py-2.5
                sm:py-3
                pl-12
                sm:pl-14
                pr-3
                text-sm
                sm:text-base
                text-white
                outline-none
                focus:border-blue-500
              "
            />

          </div>


          {/* QUICK STAKE BUTTONS */}
          <div className="flex gap-1.5 sm:gap-2">

            {[1, 5, 10, 20, 50].map((amount) => (

              <button
                key={amount}
                onClick={() => setStake(amount)}
                className={`flex-1 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] sm:text-xs transition
                  ${
                    stake === amount
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
              >
                GH₵{amount}
              </button>

            ))}

          </div>


          {/* PRIZE BREAKDOWN */}
          <div
            className="
              rounded-lg
              sm:rounded-xl
              bg-gray-900
              border
              border-green-500/30
              px-3
              py-2.5
              sm:p-4
              space-y-2
              sm:space-y-3
            "
          >

            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-400">
                Potential Win
              </span>

              <span className="text-white font-medium">
                GH₵{prizePool}
              </span>
            </div>


            <div className="flex justify-between text-xs sm:text-sm">

              <span className="text-gray-400">
                Platform Fee (5%)
              </span>

              <span className="text-red-400">
                GH₵{platformFee.toFixed(2)}
              </span>

            </div>


            <div className="border-t border-gray-700 pt-2 flex justify-between">

              <span className="text-xs sm:text-sm font-semibold text-white">
                Winner Gets
              </span>

              <span className="text-sm sm:text-base font-bold text-green-400">
                GH₵{winnerPrize.toFixed(2)}
              </span>

            </div>

          </div>


          {/* ESCROW */}
          <div
            className="
              bg-yellow-500/10
              border
              border-yellow-500/30
              rounded-lg
              px-3
              py-2
              text-[10px]
              sm:text-xs
              text-gray-300
            "
          >
            🔒 Funds are held securely until the match ends.
          </div>

        </div>
      )}


      {/* GAME SETTINGS */}

      <div className="space-y-2">

        <div className="flex items-center justify-between">

          <label className="text-xs sm:text-sm text-gray-300">
            Win Points
          </label>

          <span className="text-xs sm:text-sm font-semibold text-blue-400">
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
              winPoints: Number(e.target.value),
            }))
          }
          className="w-full accent-blue-500"
        />

      </div>


      {/* NUMBER OF PLAYERS */}

      <div className="space-y-2">

        <label className="text-xs sm:text-sm text-gray-300">
          Number of Players
        </label>


        <div className="flex justify-center gap-4 sm:gap-6">

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
                w-8
                h-8
                sm:w-9
                sm:h-9
                rounded-full
                text-xs
                sm:text-sm
                transition

                ${
                  gameConfig.numPlayers === num
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }
              `}
            >
              {num}
            </button>

          ))}

        </div>

      </div>

    </div>


    {/* STICKY CREATE BUTTON */}
    <div className="pt-3 sm:pt-4 mt-2 border-t border-gray-800">

      <button
        onClick={handleCreateGame}
        disabled={isCreatingGame}
        className="
          w-full
          py-2.5
          sm:py-3
          rounded-lg
          sm:rounded-xl
          bg-gradient-to-r
          from-blue-500
          to-indigo-500
          text-white
          text-sm
          sm:text-base
          font-semibold
          transition
          hover:from-blue-600
          hover:to-indigo-600
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >

        {isCreatingGame
          ? "Creating..."
          : matchType === "stake"
            ? "Create Cash Challenge"
            : "Create Friendly Match"}

      </button>

    </div>

  </div>
</Modal>
  );
};

export default InviteFriendModal;
