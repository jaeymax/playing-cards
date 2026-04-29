import confetti from "canvas-confetti";
import { useEffect } from "react";

import Modal from "./Modal";
import { customLog } from "@/utils/Functions";

interface SingleEliminationGameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  losingPlayer: any;
  currentPlayer: any;
  onContinue: () => void;
  isFinalMatch: boolean;
}

const SingleEliminationGameOverModal = ({
  isOpen,
  onClose,
  winningPlayer,
  losingPlayer,
  currentPlayer,
  onContinue,
  isFinalMatch = true,
}: SingleEliminationGameOverModalProps) => {
  const isCurrentPlayerWinner = winningPlayer?.id === currentPlayer?.id;
  const isFinalWinner = isFinalMatch && isCurrentPlayerWinner;
  const isFinalRunnerUp = isFinalMatch && !isCurrentPlayerWinner;

  onClose;

  useEffect(() => {
    if (!isOpen || !isFinalWinner) return;

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
  }, [isOpen, isFinalWinner]);

  customLog("losingPlayer", losingPlayer);
  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div
          className={`w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1 ${
            isFinalWinner ? "shadow-[0_0_30px_rgba(250,204,21,0.6)]" : ""
          } `}
        >
          <div className="w-full relative h-full rounded-full bg-gray-800 flex items-center justify-center">
            {isFinalWinner && (
              <div className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full p-1">
                👑
              </div>
            )}
            {!isFinalMatch ? (
              winningPlayer?.user?.image_url ? (
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
              )
            ) : isFinalWinner ? (
              winningPlayer?.user?.image_url ? (
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
              )
            ) : losingPlayer?.user?.image_url ? (
              <img
                src={losingPlayer?.user?.image_url}
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

            {/* // {winningPlayer?.user?.image_url ? (
            //   <img
            //     src={winningPlayer?.user?.image_url}
            //     alt=""
            //     className="w-full h-full rounded-full object-cover"
            //   />
            // ) : (
            //   <img
            //     src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            //     alt=""
            //     className="w-full h-full object-cover rounded-full"
            //   />
            // )} */}
          </div>
        </div>

        <div className="text-center space-y-2">
          {/* FINAL MATCH – WINNER */}
          {isFinalWinner && (
            <>
              <h3 className="text-3xl font-bold text-yellow-400">
                🏆 Tournament Champion!
              </h3>
              <p className="text-gray-300 text-sm">
                Congratulations! You finished{" "}
                <span className="font-semibold">1st place</span> and won the
                tournament. An outstanding performance!
              </p>
            </>
          )}

          {/* FINAL MATCH – RUNNER UP */}
          {isFinalRunnerUp && (
            <>
              <h3 className="text-3xl font-bold text-blue-400">
                🥈 Well Played!
              </h3>
              <p className="text-gray-300 text-sm">
                You finished <span className="font-semibold">2nd place</span> in
                the tournament. A strong run all the way to the finals — return
                to the lobby to view your performance in the standings.
              </p>
            </>
          )}

          {/* NOT FINAL – NORMAL WIN */}
          {!isFinalMatch && isCurrentPlayerWinner && (
            <>
              <h3 className="text-3xl font-bold text-yellow-400">
                Congratulations!
              </h3>
              <p className="text-gray-300 text-sm">
                You advanced to the next round
              </p>
            </>
          )}

          {/* NOT FINAL – ELIMINATED */}
          {!isFinalMatch && !isCurrentPlayerWinner && (
            <>
              <h3 className="text-3xl font-bold text-red-400">Eliminated</h3>
              <p className="text-gray-300 text-sm">
                {winningPlayer?.user?.username} has knocked you out of the
                tournament. Better luck next time.
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
          {isCurrentPlayerWinner ? (
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
              <span>
                {isFinalMatch ? "Return to Lobby" : "Continue to Next Match"}
              </span>
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
                  d="M3 12a9 9 0 0110 0m6.293-6.293a1 1 0 011.414 1.414l-12 12a1 1 0 01-1.414-1.414l12-12z"
                />
              </svg>
              <span>Return to Lobby</span>
            </>
          )}
        </button>
      </div>
    </Modal>
  );
};

export default SingleEliminationGameOverModal;
