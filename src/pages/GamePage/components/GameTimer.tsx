import React, { useState, useEffect } from "react";

interface GameTimerProps {
  isYourTurn: boolean;
}

const GameTimer: React.FC<GameTimerProps> = ({ isYourTurn }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (!isYourTurn) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isYourTurn]);

  return (
    <div
      className={`px-4 py-2 rounded-lg ${
        isYourTurn ? "bg-green-600" : "bg-gray-700"
      }`}
    >
      <span className="text-white font-medium">
        {isYourTurn ? "Your turn: " : "Opponent's turn: "}
        {timeLeft}s
      </span>
    </div>
  );
};

export default GameTimer;
