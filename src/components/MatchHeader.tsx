import { useNavigate } from "react-router-dom";

interface MatchHeaderProps {
  gameCode?: string;
  player1?: {
    name: string;
    rating: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };
  player2?: {
    name: string;
    rating: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };
  player3?: {
    name: string;
    rating: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };
  player4?: {
    name: string;
    rating: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };
  eventName?: string;
  viewers?: number;
}

const MatchHeader = ({
  gameCode,
  player1,
  player2,
  player3,
  player4,
  eventName,
  viewers,
}: MatchHeaderProps) => {
  const navigate = useNavigate();

  const PlayerCard = ({
    player,
    playerNumber,
  }: {
    player?: typeof player1;
    playerNumber: number;
  }) => (
    <div className="text-center flex flex-col items-center">
      <img
        src={player?.user.image_url}
        alt={player?.user.username}
        className="w-12 h-12 lg:w-20 lg:h-20 rounded-full object-cover mb-2 lg:mb-3 border-2 border-blue-400 shadow-lg"
      />
      <p className="text-xs lg:text-sm font-bold text-white truncate max-w-[80px] lg:max-w-[120px]">
        {player?.user.username || `PLAYER ${playerNumber}`}
      </p>
      <p className="text-xs text-blue-300 font-semibold">
        {player?.user.rating || "0"} rating
      </p>
    </div>
  );

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-black text-white px-4 py-4 lg:px-8 lg:py-6 shadow-2xl border-b border-blue-500/30">
      {/* Top row - Title and Spectator Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-4 lg:mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg lg:text-2xl font-bold">
            {eventName || "Live Match"}
          </h1>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-400/50 rounded-full">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            <span className="text-xs lg:text-sm font-semibold text-amber-300">
              SPECTATING
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="px-3 py-2 lg:px-5 lg:py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition text-sm lg:text-base shadow-lg hover:shadow-xl w-full lg:w-auto"
        >
          Exit
        </button>
      </div>

      {/* Player Matchup */}
      <div className="flex items-center justify-center gap-3 lg:gap-8 mb-5 lg:mb-6">
        <PlayerCard player={player1} playerNumber={1} />

        <div className="text-gray-400 text-lg lg:text-2xl font-bold">VS</div>

        <PlayerCard player={player2} playerNumber={2} />

        {player3 && (
          <>
            <div className="text-gray-400 text-lg lg:text-2xl font-bold">
              VS
            </div>
            <PlayerCard player={player3} playerNumber={3} />
          </>
        )}

        {player4 && (
          <>
            <div className="text-gray-400 text-lg lg:text-2xl font-bold">
              VS
            </div>
            <PlayerCard player={player4} playerNumber={4} />
          </>
        )}
      </div>

      {/* Event details and viewers */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-xs lg:text-sm text-gray-400">Game Code:</span>
          <span className="text-xs lg:text-sm font-mono font-bold text-blue-300">
            {gameCode || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-semibold text-xs lg:text-sm">
              LIVE
            </span>
          </span>
          {viewers && (
            <span className="text-gray-300 text-xs lg:text-sm font-medium">
              👁️ {viewers.toLocaleString()} watching
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default MatchHeader;
