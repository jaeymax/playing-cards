import { useEffect } from "react";
import Modal from "./Modal";
import confetti from "canvas-confetti";

interface PlayCashForfeitModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  currentPlayer: any;
  stake: number;
  winnerPayout: number;
  onLeaveGame: () => void;
}

const PlayCashForfeitModal = ({
  isOpen,
  onClose,
  winningPlayer,
  currentPlayer,
  stake,
  winnerPayout,
  onLeaveGame,
}: PlayCashForfeitModalProps) => {
  const isWinner = winningPlayer?.id === currentPlayer?.id;

  const winnerProfit = Math.max(winnerPayout - stake, 0);

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
    <Modal isOpen={isOpen} onClose={() => {}} title="Match Forfeited">
      <div className="flex flex-col items-center gap-5 py-3">
        {/* Timer / Forfeit Icon */}
        <div
          className={`w-20 h-20 rounded-full flex items-center justify-center border-2 ${
            isWinner
              ? "bg-yellow-500/10 border-yellow-400"
              : "bg-gray-700 border-gray-600"
          }`}
        >
          <svg
            className={`w-10 h-10 ${
              isWinner ? "text-yellow-400" : "text-gray-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Result */}
        <div className="text-center">
          <h3
            className={`text-2xl font-bold ${
              isWinner ? "text-yellow-400" : "text-gray-200"
            }`}
          >
            {isWinner ? "You Won!" : "Time Expired"}
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            {isWinner
              ? "Your opponent ran out of time and forfeited the match."
              : "You ran out of time and forfeited the match."}
          </p>
        </div>

        {/* Forfeit Notice */}
        <div className="w-full max-w-sm bg-gray-800 rounded-xl border border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M10.29 3.86l-7.82 13.5A2 2 0 004.2 20.4h15.6a2 2 0 001.73-3.04l-7.82-13.5a2 2 0 00-3.42 0z"
                />
              </svg>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-200">
                {isWinner ? "Opponent's time expired" : "Your time expired"}
              </p>

              <p className="text-xs text-gray-500 mt-0.5">
                The match has been settled automatically.
              </p>
            </div>
          </div>
        </div>

        {/* Cash Result */}
        <div className="w-full max-w-sm bg-gray-800 rounded-xl border border-gray-700 p-4">
          <div className="text-center mb-4">
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              {isWinner ? "Your Payout" : "Amount Lost"}
            </p>

            <p
              className={`text-3xl font-bold mt-1 ${
                isWinner ? "text-green-400" : "text-gray-200"
              }`}
            >
              GH₵
              {isWinner ? winnerPayout.toFixed(2) : stake.toFixed(2)}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Challenge stake</span>
              <span className="text-gray-200">GH₵{stake.toFixed(2)}</span>
            </div>

            {isWinner && (
              <div className="flex justify-between">
                <span className="text-gray-400">Your winnings</span>
                <span className="text-green-400 font-medium">
                  +GH₵{winnerProfit.toFixed(2)}
                </span>
              </div>
            )}

            {!isWinner && (
              <div className="flex justify-between">
                <span className="text-gray-400">Forfeit loss</span>
                <span className="text-gray-300">-GH₵{stake.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Settlement confirmation */}
        <div
          className={`flex items-center gap-2 text-sm ${
            isWinner ? "text-green-400" : "text-gray-400"
          }`}
        >
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

          <span>
            {isWinner
              ? "Your winnings have been added to your wallet."
              : "The match has been settled."}
          </span>
        </div>

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

export default PlayCashForfeitModal;
