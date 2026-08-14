import { useEffect } from "react";
import Modal from "./Modal";
import confetti from "canvas-confetti";

interface PlayCashGameOverProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  currentPlayer: any;
  stake: number;
  winnerPayout: number;
  onLeaveGame: () => void;
}

const PlayCashGameOver = ({
  isOpen,
  onClose,
  winningPlayer,
  currentPlayer,
  stake,
  winnerPayout,
  onLeaveGame,
}: PlayCashGameOverProps) => {
  const isWinner = winningPlayer?.id === currentPlayer?.id;

  const profit = Math.max(winnerPayout - stake, 0);

  useEffect(() => {
    if (!isOpen || !isWinner) return;

    // Fire confetti burst
    confetti({
      particleCount: 160,
      spread: 800,
      origin: { y: 0.0 },
      colors: ["#facc15", "#eab308", "#fde047", "#ffffff"],
    });
    // Optional second burst (feels premium)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 500,
        origin: { y: 0.2 },
      });
    }, 3000);
  }, [isOpen, isWinner]);

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Game Over!">
      <div className="flex flex-col items-center gap-5 py-3">
        {/* Winner Avatar */}
        <div className="relative">
          {winningPlayer?.user?.image_url ? (
            <img
              src={winningPlayer.user.image_url}
              alt={winningPlayer?.user?.username || "Winner"}
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-700 border-2 border-yellow-400 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          {/* Winner crown */}
          {
            isWinner && (
              <div className="absolute -top-3 -right-2 text-xl">
                👑
              </div>
            )

          }
        </div>

        {/* Result */}
        <div className="text-center">
          <h3
            className={`text-2xl font-bold ${
              isWinner ? "text-yellow-400" : "text-gray-200"
            }`}
          >
            {isWinner ? "You Won!" : "You Lost"}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {isWinner
              ? "Congratulations! You won the cash challenge."
              : "Better luck next time!"}
          </p>
        </div>

        {/* Cash Result */}
        <div className="w-full max-w-sm bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              {isWinner ? "Your Payout" : "Challenge Result"}
            </p>

            <p
              className={`text-3xl font-bold mt-1 ${
                isWinner ? "text-green-400" : "text-gray-200"
              }`}
            >
              GH₵{isWinner ? winnerPayout.toFixed(2) : "0.00"}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Stake</span>
              <span className="text-gray-200">
                GH₵{stake.toFixed(2)}
              </span>
            </div>

            {isWinner && (
              <div className="flex justify-between">
                <span className="text-gray-400">Your winnings</span>
                <span className="text-green-400 font-medium">
                  +GH₵{profit.toFixed(2)}
                </span>
              </div>
            )}

            {!isWinner && (
              <div className="flex justify-between">
                <span className="text-gray-400">Amount lost</span>
                <span className="text-gray-300">
                  -GH₵{stake.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Winner-specific message */}
        {isWinner && (
          <div className="flex items-center gap-2 text-sm text-green-400">
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

            <span>Your winnings have been added to your wallet.</span>
          </div>
        )}

        {/* Loser-specific message */}
        {!isWinner && (
          <p className="text-gray-500 text-xs text-center max-w-xs">
            The challenge is over. Your stake has been settled according to
            the game result.
          </p>
        )}

        {/* Leave Game */}
        <button
          onClick={onLeaveGame}
          className="
            w-full max-w-sm
            px-6 py-2.5
            bg-gray-700
            hover:bg-gray-600
            text-gray-200
            font-medium
            rounded-lg
            transition-colors duration-200
          "
        >
          Leave Game
        </button>
      </div>
    </Modal>
  );
};

export default PlayCashGameOver;