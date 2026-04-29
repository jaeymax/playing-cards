import Modal from "./Modal";

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  winningPlayer: any;
  currentPlayer: any;
  onRematch: () => void;
  onLeaveGame: () => void;
}

const GameOverModal = ({
  isOpen,
  onClose,
  winningPlayer,
  currentPlayer,
  onRematch,
  onLeaveGame,
}: GameOverModalProps) => {

  (onClose)
  
  return (
    <Modal isOpen={isOpen} onClose={()=>{}} title="Game Over!">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
          {winningPlayer?.user?.image_url? ( <img
              src={winningPlayer?.user?.image_url}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />) : ( <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png" alt="" className="w-full h-full object-cover rounded-full" />)}
           
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-yellow-400">
            {winningPlayer?.id === currentPlayer?.id
              ? "You Won!"
              : "You Lost!"}
          </h3>
          <div className="text-gray-400 sm:text-sm text-xs">
            {/* <p>Final Score: {winningPlayer?.score}</p> */}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onRematch}
            className="px-3 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 
                hover:from-green-500 hover:to-green-400 text-white rounded-lg 
                transition-all duration-300 flex items-center gap-2"
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
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span className="text-xs sm:text-sm">Rematch</span>
          </button>

          <button
            onClick={onLeaveGame}
            className="px-3 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 
                text-gray-300 rounded-lg transition-all duration-300"
          >
            <span className="text-xs sm:text-normal">Leave Game</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameOverModal;
