import React, { useState } from "react";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { ensureGuest, getToken } from "@/utils/Functions";

interface PlayVsComputerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DifficultyLevel {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const difficultyLevels: DifficultyLevel[] = [
  {
    id: "easy",
    name: "Easy",
    description: "Perfect for learning the basics",
    icon: "🌱",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "medium",
    name: "Medium",
    description: "For experienced players",
    icon: "⚡",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: "hard",
    name: "Hard",
    description: "Advanced AI strategies",
    icon: "🔥",
    color: "from-red-500 to-pink-500",
  },
];

const PlayVsComputerModal: React.FC<PlayVsComputerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("medium");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAppContext();
  const { user } = useAppContext();
  const handleStartGame = () => {
    setShowConfirmation(true);
  };

  const createBotGame = async () => {

    const authToken = getToken();
    let guest = null;
    if (!authToken) {
      const user = await ensureGuest();
      if(user){
        updateUser(user);
        guest = user;
      }
    }
    console.log(`Creating game with bot`);
    try{
      const response = await fetch(`${baseUrl}/games/create-bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user?.id || guest?.id }),
      });
      const data = await response.json();
      console.log("Game created:", data);
        if (!response.ok) {
          console.error('Failed to create game:', response.statusText);
          return;
        }
      return data;
    } catch (error) {
      console.error("Error creating game:", error);
      return null;
    }
  };

  const handleConfirmStart = async () => {
    console.log(`Starting game with ${selectedDifficulty} difficulty`);
    
    const data = await createBotGame();
    if(!data)return;
    const gameCode = data.game.code;
    navigate(`/game/${gameCode}`, { state: { gameType: "playVsComputer" } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Play vs Computer">
      {!showConfirmation ? (
        <div className="space-y-6 py-4">
          <p className="text-gray-300 text-center">
            Select difficulty level to start the game
          </p>

          <div className="grid gap-4">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedDifficulty(level.id)}
                className={`flex items-center p-4 rounded-lg border-2 transition-all
                  ${
                    selectedDifficulty === level.id
                      ? "border-blue-500 bg-gray-700"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${level.color} 
                    flex items-center justify-center text-2xl mr-4`}
                >
                  {level.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-white">{level.name}</h3>
                  <p className="text-sm text-gray-400">{level.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={handleStartGame}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div className="py-6 text-center space-y-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-3xl">
            {difficultyLevels.find((l) => l.id === selectedDifficulty)?.icon}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Ready to Play?</h3>
            <p className="text-gray-400 mt-2">
              Starting game with{" "}
              {difficultyLevels.find((l) => l.id === selectedDifficulty)?.name}{" "}
              difficulty
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
            >
              Back
            </button>
            <button
              onClick={handleConfirmStart}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              Confirm & Start
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PlayVsComputerModal;
