import React from "react";

interface MatchForfeitedModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const MatchForfeitedModal: React.FC<MatchForfeitedModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null;

  const isUserForfeited = message.includes("You have forfeited");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-10 max-w-sm mx-4 border border-gray-700">
        {/* <div className="flex items-center justify-center mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isUserForfeited ? "bg-red-900" : "bg-green-900"
            }`}
          >
            <span className="text-2xl">{isUserForfeited ? "⚠️" : "✓"}</span>
          </div>
        </div> */}

        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          {isUserForfeited ? "Match Forfeited" : "Match Won"}
        </h2>

        <p className="text-gray-300 mb-6 text-center text-sm md:text-base leading-relaxed">
          {isUserForfeited
            ? "You have forfeited your match. Unfortunately, you are now out of the tournament. Better luck next time!"
            : "Your opponent has forfeited the match. Congratulations! You have advanced to the next stage of the tournament."}
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Acknowledged
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchForfeitedModal;
