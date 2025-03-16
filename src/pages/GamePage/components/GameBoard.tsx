import React from "react";
import { Card } from "../../../types/card";

interface GameBoardProps {
  gameId: string;
  className?: string;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameId, className }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg p-4 md:p-6 grid grid-rows-[1fr_2fr_1fr] ${className}`}
    >
      <div className="opponent-area flex justify-center items-center">
        <div className="flex gap-1 md:gap-2 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-20 md:w-16 md:h-24 flex-shrink-0 bg-blue-500 rounded-lg transform hover:-translate-y-1 transition-transform"
            />
          ))}
        </div>
      </div>

      <div className="play-area flex justify-center items-center gap-4 md:gap-10">
        <div className="deck w-12 h-20 md:w-16 md:h-24 flex-shrink-0 bg-green-600 rounded-lg cursor-pointer hover:shadow-lg transition-shadow" />
        <div className="played-cards w-12 h-20 md:w-16 md:h-24 flex-shrink-0 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600" />
      </div>

      <div className="player-area flex justify-center items-center">
        <div className="flex gap-1 md:gap-2 overflow-x-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-12 h-20 md:w-16 md:h-24 flex-shrink-0 bg-red-500 rounded-lg transform hover:-translate-y-2 transition-transform cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
