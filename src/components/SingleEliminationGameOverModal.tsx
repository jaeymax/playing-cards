import Modal from "./Modal";

interface SingleEliminationGameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  currentPlayer: any;
  onContinue: () => void;
}

const SingleEliminationGameOverModal = ({
  isOpen,
  onClose,
  winningPlayer,
  currentPlayer,
  onContinue,
}: SingleEliminationGameOverModalProps) => {
  const isCurrentPlayerWinner = winningPlayer?.id === currentPlayer?.id;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
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
              <h3 className="text-3xl font-bold text-yellow-400">
                Congratulations!
              </h3>
              <p className="text-gray-300 text-sm">
                You advanced to the next round
              </p>
            </>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-red-400">Eliminated</h3>
              <p className="text-gray-300 text-sm">
                {winningPlayer?.user?.username} has knocked you out of the
                tournament
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
              <span>Continue to Next Match</span>
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
