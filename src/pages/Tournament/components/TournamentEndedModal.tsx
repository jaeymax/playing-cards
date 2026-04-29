import React from "react";

interface TournamentEndedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TournamentEndedModal: React.FC<TournamentEndedModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-sm mx-4 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Tournament Ended</h2>
        <p className="text-gray-300 mb-6">
          The tournament has been completed. Check out the results to see how
          you performed!
        </p>
        <div className="flex gap-4">
          {/* <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            Close
          </button> */}
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            View Standings
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentEndedModal;
