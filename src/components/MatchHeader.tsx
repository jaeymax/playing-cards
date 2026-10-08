
import { useNavigate } from "react-router-dom";
import { memo } from "react";

interface MatchHeaderProps {
  gameCode?: string;

  player1?: {
    name: string;
    rating: number;
    score: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };

  player2?: {
    name: string;
    rating: number;
    score: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };

  player3?: {
    name: string;
    rating: number;
    score: number;
    image_url: string;
    user: { username: string; image_url: string; rating: number };
  };

  player4?: {
    name: string;
    rating: number;
    score: number;
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

  const players = [player1, player2, player3, player4].filter(
    Boolean
  ) as NonNullable<typeof player1>[];

  const Player = ({
    player,
    position,
  }: {
    player?: typeof player1;
    position: number;
  }) => {
    const username =
      player?.user?.username || `PLAYER ${position}`;

    const avatar =
      player?.user?.image_url ||
      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png";

    return (
      <div className="flex min-w-0 flex-1 flex-col items-center">
        {/* Avatar */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-blue-500/20 blur-md" />

          <img
            src={avatar}
            alt={username}
            className="relative h-12 w-12 rounded-full border-2 border-slate-600 object-cover shadow-xl sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          />

          {/* Player number */}
          {/* <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-[9px] font-bold text-slate-300">
            {position}
          </div> */}
        </div>

        {/* Name */}
        <p className="mt-2 max-w-[90px] truncate text-xs font-bold text-white sm:max-w-[120px] sm:text-sm">
          {username}
        </p>

        {/* Rating */}
        <p className="mt-0.5 text-[10px] font-medium text-slate-400 sm:text-xs">
          {player?.user?.rating ?? 0} rating
        </p>
      </div>
    );
  };

  return (
  <header className="relative overflow-hidden border-b border-white/[0.06] bg-black/30 text-white backdrop-blur-s shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
    {/* Subtle ambient light */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-72 -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />

    <div className="relative mx-auto max-w-6xl px-3 py-3 sm:px-5 lg:px-8 lg:py-4">

      {/* ================= TOP BAR ================= */}
      <div className="mb-3 flex items-center justify-between sm:mb-4">

        {/* Event */}
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04]">
              <span className="text-sm opacity-80">♠</span>
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white sm:text-sm">
                {eventName || "Live Match"}
              </p>

              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-300 sm:text-[10px]">
                SparPlay Match
              </p>
            </div>
          </div>
        </div>

        {/* Live + Viewers + Exit */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Live */}
          <div className="flex items-center gap-1.5 rounded-full border border-green-500/[0.08] bg-green-500/[0.09] px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">
              Live
            </span>
          </div>

          {/* Viewers */}
          {viewers !== undefined && (
            <div className="hidden items-center gap-1.5 text-slate-400 sm:flex">
              <span className="text-xs opacity-70">👁</span>

              <span className="text-xs font-semibold">
                {viewers.toLocaleString()}
              </span>
            </div>
          )}

          {/* Exit */}
          <button
            onClick={() => navigate(-1)}
            className="rounded-2xl border border-red-500/40 bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 transition hover:border-white/[0.15] hover:bg-white/[0.08] hover:text-white"
          >
            Exit
          </button>
        </div>
      </div>

      {/* ================= MATCH SCOREBOARD ================= */}
      <div className="relative rounded-2xl border border-white/[0.07] bg-black/0 p-3 shadow-inner backdrop-blur-xs sm:p-4 lg:p-5">

        {/* Center VS */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-black/40 shadow-xl backdrop-blur-md sm:h-10 sm:w-10">
            <span className="text-[10px] font-black text-slate-500">
              VS
            </span>
          </div>
        </div>

        <div
          className={`grid items-center gap-2 ${
            players.length === 2
              ? "grid-cols-2"
              : players.length === 3
              ? "grid-cols-3"
              : "grid-cols-4"
          }`}
        >
          {players.map((player, index) => (
            <div key={index} className="relative">

              {/* Player */}
              <Player
                player={player}
                position={index + 1}
              />

              {/* Score */}
              <div className="mt-3 text-center">
                <div className="inline-flex min-w-[42px] items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] px-2.5 py-1.5 backdrop-blur-sm">
                  <span className="text-lg font-black leading-none text-white sm:text-xl">
                    {player.score ?? 0}
                  </span>
                </div>

                <p className="mt-1 text-[8px] font-bold uppercase tracking-widest text-slate-300">
                  Score
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM INFO ================= */}
      <div className="mt-3 flex items-center justify-between">

        {/* Game Code */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-300">
            Game
          </span>

          <span className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-400">
            {gameCode || "N/A"}
          </span>
        </div>

        {/* Spectator Count */}
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-200">
          <span>Watching</span>

          {viewers !== undefined && (
            <span className="font-bold text-slate-300">
              {viewers.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  </header>
);
};

export default memo(MatchHeader);
