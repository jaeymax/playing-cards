import confetti from "canvas-confetti";
import { useEffect } from "react";

import Modal from "./Modal";
import { customLog } from "@/utils/Functions";

interface SwissGameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  currentPlayer: any;
  isFinalMatch?: boolean;
  onContinue: () => void;
}

const SwissGameOverModal = ({
  isOpen,
  onClose,
  winningPlayer,
  currentPlayer,
  isFinalMatch,
  onContinue,
}: SwissGameOverModalProps) => {
  const isCurrentPlayerWinner = winningPlayer?.id === currentPlayer?.id;

  onClose;

  useEffect(() => {
    if (!isOpen || !isCurrentPlayerWinner) return;

    // Fire confetti burst
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#facc15", "#eab308", "#fde047", "#ffffff"],
    });
    // Optional second burst (feels premium)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.4 },
      });
    }, 300);
  }, [isOpen, isCurrentPlayerWinner]);

  customLog("winningPlayer", winningPlayer);

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1`}
        >
          <div className="w-full relative h-full rounded-full bg-gray-800 flex items-center justify-center">

            {winningPlayer?.user?.image_url ? (
              <img
                src={winningPlayer?.user?.image_url}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          {isCurrentPlayerWinner ? (
            <>
              <h3 className="text-3xl font-bold text-yellow-400">Match Won!</h3>
              <p className="text-gray-300 text-sm">
                {isFinalMatch ? (
                  <>
                    Excellent play! You've claimed
                    victory in your final match and earned a point!  Return to the lobby to view
                    your performance in the standings.
                  </>
                ) : (
                  <>
                    Excellent play! You won this match and earned{" "}
                    <span className="font-semibold">+1 point</span>. Keep the
                    momentum going!
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-gray-300">Match Lost</h3>
              <p className="text-gray-300 text-sm">
                {isFinalMatch ? (
                  <>
                    You've lost your final match and earned 0 points. Return to the
                    lobby to view your final standings.
                  </>
                ) : (
                  <>
                    {winningPlayer?.user?.username} won this match. You earned{" "}
                    <span className="font-semibold">0 points</span>. Stay
                    focused — there are more matches to come!
                  </>
                )}
              </p>
            </>
          )}
        </div>

        <button
          onClick={onContinue}
          className={`px-6 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 text-white font-semibold
            ${
              isCurrentPlayerWinner
                ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
            }
          `}
        >
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
            <span>{isFinalMatch ? "Return to Lobby" : "Next Match"}</span>
          </>
        </button>
      </div>
    </Modal>
  );
};

export default SwissGameOverModal;
