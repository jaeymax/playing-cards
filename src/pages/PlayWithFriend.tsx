import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "@/contexts/SocketProvider";
import { useAppContext } from "@/contexts/AppContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Card from "@/components/Card";
// import {
//   extractDealingSequence,
//   shuffleCards,
//   dealSequenceToPositions,
// } from "@/utils/Functions";

const ShareOverlay = ({
  gameCode,
  onClose,
}: {
  gameCode: string;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/game/${gameCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[url('./assets/background1.jpg')] backdrop-blur-sm z-[100000000] flex items-start justify-center p-4">
      <div
        className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 w-[95%] sm:max-w-md 
                    space-y-4 sm:space-y-6 border border-white/10 shadow-2xl mt-4 sm:mt-20
                    ring-1 ring-white/20"
      >
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Share Game Link
          </h3>
          <p className="text-xs sm:text-sm text-gray-200/80">
            Send this link to your friends to join the game
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div
            className="flex-1 bg-black/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 
                        font-mono text-xs sm:text-sm text-white/80 overflow-x-auto 
                        border border-white/5 break-all"
          >
            {shareUrl}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg 
                     transition-all duration-200 flex items-center justify-center gap-2
                     backdrop-blur-sm border border-white/10 hover:border-white/20
                     sm:min-w-[100px]"
          >
            {copied ? (
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied!
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
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
              </>
            )}
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-white/60 hover:text-white/90 transition-colors py-2"
          >
            Continue to Game
          </button>
        </div>
      </div>
    </div>
  );
};

const ParticipantsModal = ({
  players,
  maxPlayers,
}: {
  players: any[];
  maxPlayers: number;
}) => {
  return (
    <div className="fixed inset-x-0 bottom-4 z-[100000000] flex justify-center p-4">
      <div
        className="bg-gray-800/40 backdrop-blur-md rounded-xl p-4 sm:p-6 w-[95%] sm:max-w-md 
                    border border-white/10 shadow-2xl ring-1 ring-white/20"
      >
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">
              Waiting for Players ({players.length}/{maxPlayers})
            </h3>
          </div>

          <div className="space-y-3">
            {/* Connected Players */}
            {players.map((player) => (
              <div
                key={`player-${player.id}`}
                className="flex items-center gap-3 p-2 rounded-lg bg-black/20 border border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                    <img
                      src={player.user.image_url}
                      alt=""
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {player.user.username}
                  </div>
                  {player.is_dealer && (
                    <div className="text-xs text-blue-400">Host</div>
                  )}
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full" />
              </div>
            ))}

            {/* Waiting Slots */}
            {[...Array(maxPlayers - players.length)].map((_, i) => (
              <div
                key={`waiting-${players.length + i}`}
                className="flex items-center gap-3 p-2 rounded-lg bg-black/10 border border-white/5"
              >
                <div className="w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-500">
                    Waiting for player...
                  </div>
                </div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayerInfo = ({
  name,
  avatar,
  points,
  styles,
}: {
  name: string;
  avatar: string;
  points: number;
  styles: string;
}) => (
  <div
    className={`player-info absolute ${styles} w-fit mx-auto flex flex-col items-center`}
  >
    <Avatar className="w-12 h-12 avatar-image">
      <AvatarImage src={avatar} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
    <div className="text-center">
      <div className="font-medium player-name">{name}</div>
      <div className="text-sm font-semibold player-score">{points} pts</div>
    </div>
  </div> 
);

const simulatedPlayers = [
  {
    id: "2", // Changed to string to match initial player id type
    user: {
      id: 2,
      username: "Player 2",
      image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    },
    is_dealer: false,
    score: 0,
  },
  {
    id: "3",
    user: {
      id: 3,
      username: "Player 3",
      image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    },
    is_dealer: false,
    score: 0,
  },
  {
    id: "4",
    user: {
      id: 4,
      username: "Player 4",
      image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    is_dealer: false,
    score: 0,
  },
];

const PlayWithFriend = () => {
  // Existing modal states
  const [showShareOverlay, setShowShareOverlay] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [players, setPlayers] = useState<any[]>([
    {
      id: "1",
      user: { username: "You", image_url: "https://github.com/shadcn.png" },
      is_dealer: true,
    },
  ]);
  const [maxPlayers] = useState(4);

  // Game states (similar to PlayTest)
  // const [isDealing, setIsDealing] = useState(false);
  // const [isShuffling, setIsShuffling] = useState(false);
  // const [gameCards, setGameCards] = useState<any[]>([]);
  // const [game, setGame] = useState<any>(null);
  // const [me, setMe] = useState<any>(null);
  const [firstOpponent] = useState<any>(null);
  // const [secondOpponent, setSecondOpponent] = useState<any>(null);
  // const [thirdOpponent, setThirdOpponent] = useState<any>(null);
  const [message, ] = useState<string>("Waiting for players...");


  // Refs for card positions
  // const deckRef = useRef<HTMLDivElement>(null);
  // const playerHandRef = useRef<HTMLDivElement>(null);
  // const playerPlayAreaRef = useRef<HTMLDivElement>(null);
  // const opponentOneHandRef = useRef<HTMLDivElement>(null);
  // const opponentTwoHandRef = useRef<HTMLDivElement>(null);
  // const opponentThreeHandRef = useRef<HTMLDivElement>(null);
  // const opponentOnePlayAreaRef = useRef<HTMLDivElement>(null);
  // const opponentTwoPlayAreaRef = useRef<HTMLDivElement>(null);
  // const opponentThreePlayAreaRef = useRef<HTMLDivElement>(null);

  console.log(showParticipants);
  

  const { code } = useParams();
  const { socket } = useSocket();
  const { user } = useAppContext();
  
  // Simplified player simulation
  useEffect(() => {
    if (players.length >= maxPlayers) {
      setShowShareOverlay(false);
      setShowParticipants(false);
      return;
    }

    const timer = setTimeout(() => {
      const nextPlayer = simulatedPlayers[players.length - 1];
      if (nextPlayer) {
        setPlayers((prev) => [...prev, nextPlayer]);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [players.length]);

  useEffect(() => {
    // Only show share overlay if user is host
    const isHost = true;
    setShowShareOverlay(isHost);

    socket?.on("playerJoined", (data: { players: any[] }) => {
      setPlayers(data.players);
      if (data.players.length >= maxPlayers) {
        setShowShareOverlay(false);
        setShowParticipants(false);
      }
    });

    return () => {
      socket?.off("playerJoined");
    };
  }, [socket, maxPlayers, players, user]);

  return (
    <div className="min-h-screen relative bg-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-between">
      {/* Overlays */}
      {code && players.length < maxPlayers && (
        <>
          {showShareOverlay && (
            <ShareOverlay
              gameCode={code}
              onClose={() => setShowShareOverlay(false)}
            />
          )}
          <ParticipantsModal players={players} maxPlayers={maxPlayers} />
        </>
      )}

      {/* Game Board - Similar structure to PlayTest */}
      <PlayerInfo
        name={firstOpponent?.user.username || "Waiting..."}
        avatar={firstOpponent?.user.image_url || ""}
        points={firstOpponent?.score || 0}
        styles="left-1/2 -translate-x-1/2 top-1"
      />

      {/* Add opponent areas */}
      {/* Add play areas */}
      {/* Add player area */}
      {/* Add deck area */}
      {/* Add card components */}

      {/* Message display */}
      <div className="absolute bottom-32 sm:bottom-52 left-1/2 -translate-x-1/2 text-white/80 text-sm">
        {message}
      </div>
    </div>
  );
};

export default PlayWithFriend;
