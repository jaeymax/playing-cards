import React from "react";
import Modal from "./Modal";

interface MatchForfeitModalProps {
  isOpen: boolean;
  onClose: () => void;
  forfeitedPlayer: any;
  currentPlayer: any;
}

const MatchForfeitModal: React.FC<MatchForfeitModalProps> = ({
  isOpen,
  onClose,
  forfeitedPlayer,
  currentPlayer,
}) => {
  onClose;

  const isCurrentPlayerForfeited =
    forfeitedPlayer?.user.id === currentPlayer?.user.id;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Match Forfeited">
      <div className="flex flex-col items-center space-y-6 py-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-red-500 p-1">
          <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
            {forfeitedPlayer?.user?.image_url ? (
              <img
                src={forfeitedPlayer?.user?.image_url}
                alt={forfeitedPlayer?.user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                alt="default avatar"
                className="w-full h-full object-cover rounded-full"
              />
            )}
          </div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-red-400">
            {isCurrentPlayerForfeited
              ? "You Forfeited"
              : `${forfeitedPlayer?.user.username} Forfeited`}
          </h3>
          <div className="text-gray-400 sm:text-sm text-xs">
            <p>
              {isCurrentPlayerForfeited
                ? "Better luck next time!"
                : "Congratulations on your victory!"}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 
              hover:from-blue-500 hover:to-blue-400 text-white rounded-lg 
              transition-all duration-300"
        >
          <span className="text-sm">Continue</span>
        </button>
      </div>
    </Modal>
  );
};

export default MatchForfeitModal;
