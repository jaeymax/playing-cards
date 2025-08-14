import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { baseUrl } from "@/config/api";
import { useSocket } from "@/contexts/SocketProvider";

interface PlayNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Player {
  id: number;
  username: string;
  image_url: string;
  is_dealer: boolean;
  position: number;
}

const PlayNowModal: React.FC<PlayNowModalProps> = ({ isOpen, onClose }) => {
  const { socket } = useSocket();
  const { user } = useAppContext();
  const [searchTime, setSearchTime] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  //const [players, setPlayers] = useState<[]>([]);
  const [gameCode, setGameCode] = useState<string>("");
  const [gameId, setGameId] = useState<number | null>(null);
  const [you, setYou] = useState<Player | null>(null);
  const [opponent, setOpponent] = useState<Player | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  //const [startAnimation, setStartAnimation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setSearchTime(0);
      setMatchFound(false);
    }

    if (isOpen && !matchFound) {
      const timer = setInterval(() => {
        setSearchTime((prev) => prev + 1);
      }, 1000);

      // Simulate finding a match after 5 seconds
      // const matchTimer = setTimeout(() => {
      //   setMatchFound(true);
      // }, 5000);

      return () => {
        clearInterval(timer);
        // clearTimeout(matchTimer);
      };
    }
  }, [isOpen]);

  const matchFoundCallback = (data: any) => {
    setMatchFound(true);
    console.log("Match found:", data);
    setGameCode(data.gameCode);
    setGameId(data.gameId);

    console.log("players", data.players);
    if (data.players[0].id === user?.id) {
      setYou(data.players[0]);
      setOpponent(data.players[1]);
    } else {
      setYou(data.players[1]);
      setOpponent(data.players[0]);
    }
  };

  const gameStartCallback = ({ gameCode }: { gameCode: string }) => {
    console.log("Game started:", gameCode);
    navigate(`/game/${gameCode}`);
  };

  useEffect(() => {
    socket?.on("matchFound", matchFoundCallback);

    socket?.on("gameStarted", gameStartCallback);

    return () => {
      socket?.off("matchFound", matchFoundCallback);
      socket?.off("gameStarted", gameStartCallback);
    };
  }, [user, socket]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStartGame = async () => {
    if (!gameCode || !gameId) {
      console.error("Game code or ID is not set");
      return;
    }

    setIsStarting(true);
    //setStartAnimation(true);

    try {
      const response = await fetch(
        `${baseUrl}/matchmaking/games/${gameId}/start`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameCode, userId: user?.id }),
        }
      );

      if (response.ok) {
        //await new Promise((resolve) => setTimeout(resolve, 2000));
        //navigate(`/game/${gameCode}`);
      } else {
        console.error("Failed to start the game");
        setIsStarting(false);
        //setStartAnimation(false);
      }
    } catch (error) {
      console.error("Error starting game:", error);
      setIsStarting(false);
      //setStartAnimation(false);
    }
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
                  <img className="rounded-full" src={you?.image_url} alt="" />
                  {/* 👤 */}
                </div>
                <div className="text-sm">You</div>
              </div>
              <div className="text-2xl">vs</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mb-2 mx-auto flex items-center justify-center text-2xl">
                  <img
                    className="rounded-full"
                    src={opponent?.image_url}
                    alt=""
                  />
                </div>
                <div className="text-sm">{opponent?.username}</div>
              </div>
            </div>
            <div className="pt-4 flex flex-col items-center gap-3">
              {you?.is_dealer ? (
                <>
                  <div className="flex items-center gap-2 text-green-400 font-medium">
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
                        d="M9 12l2 2 4-4M7.835 4.697A3.42 3.42 0 001.5 7.5c0 2.876 3.235 6.264 6.74 8.27.657.377 1.37.377 2.027 0C13.765 13.764 17 10.376 17 7.5a3.42 3.42 0 00-6.335-2.803z"
                      />
                    </svg>
                    <span>You are the Dealer</span>
                  </div>
                  <button
                    onClick={handleStartGame}
                    disabled={isStarting}
                    className="group relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-center gap-2">
                      {isStarting ? (
                        <>
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                          <span className="font-medium tracking-wide text-white">
                            STARTING GAME
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium tracking-wide text-white">
                            START GAME
                          </span>
                          <svg
                            className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </>
                      )}
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-blue-400 font-medium">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Waiting for Dealer to Start</span>
                  </div>
                  <button
                    disabled
                    className="px-8 py-3 bg-gray-600 rounded-lg transition-all duration-300 opacity-70 cursor-not-allowed min-w-[200px] flex items-center justify-center gap-2"
                  >
                    <span className="font-medium tracking-wide text-gray-300">
                      GAME STARTING SOON
                    </span>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-ping" />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PlayNowModal;
