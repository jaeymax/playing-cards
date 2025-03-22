import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";

interface PlayNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlayNowModal: React.FC<PlayNowModalProps> = ({ isOpen, onClose }) => {
  const [searchTime, setSearchTime] = useState(0);
  const [matchFound, setMatchFound] = useState(false);

  useEffect(() => {
    if (isOpen && !matchFound) {
      const timer = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);

      // Simulate finding a match after 5 seconds
      const matchTimer = setTimeout(() => {
        setMatchFound(true);
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(matchTimer);
      };
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Finding Match">
      <div className="flex flex-col items-center space-y-6 py-8">
        {!matchFound ? (
          <>
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-lg text-gray-300">Searching for players...</p>
              <p className="text-sm text-gray-400">
                Time elapsed: {formatTime(searchTime)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-2xl text-green-400">Match Found!</div>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-2 mx-auto flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="text-sm">You</div>
              </div>
              <div className="text-2xl">vs</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-2 mx-auto flex items-center justify-center text-2xl">
                  👤
                </div>
                <div className="text-sm">Opponent</div>
              </div>
            </div>
            <div className="pt-4">
              <button
                className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition"
                onClick={() => {
                  // Handle game start
                  console.log("Starting game...");
                }}
              >
                Start Game
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PlayNowModal;
