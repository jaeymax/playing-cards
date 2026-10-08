import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

const SpectatorPlayerInfo = ({
  name,
  avatar,
  player_position,
  current_player_position,
  points,
  remaining_time = 60,
  total_time = 60,
  is_typing = false,
  styles,
}: {
  name: string;
  avatar: string;
  player_position: number;
  current_player_position: number;
  points: number;
  remaining_time?: number;
  total_time?: number;
  is_typing?: boolean;
  styles: string;
}) => {
  const progress =
    total_time > 0
      ? Math.max(0, Math.min(1, remaining_time / total_time))
      : 0;

  const isCurrentPlayer =
    player_position === current_player_position;

  const radius = 23;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  const timerColor =
    remaining_time <= 5
      ? "#ef4444"
      : remaining_time <= 15
      ? "#f59e0b"
      : "#22c55e";

  return (
    <div
      className={`
        player-info
        absolute
        ${styles}
        z-40
        flex
        flex-col
        items-center
        select-none
      `}
    >
      {/* Player Badge */}
      <div
        className={`
          relative
          flex
          items-center
          gap-2
          rounded-2xl
          borde
          px-2
          py-1.5
          backdrop-blu-md
          transition-all
          duration-300
          sm:px-3
          sm:py-2
          ${
            isCurrentPlayer
              ? "border-yellow-400/40 b-slate-950/30 shadw-lg shadow-yellow-500/10"
              : "border-white/10 b-slate-950/30"
          }
        `}
      >
        {/* Avatar + Timer */}
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-11 sm:w-11">
          {/* Active player glow */}
          {isCurrentPlayer && (
            <div
              className="absolute inset-0 rounded-full blur-md opacity-30"
              style={{ backgroundColor: timerColor }}
            />
          )}

          {/* Timer Ring */}
          {isCurrentPlayer && (
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 56 56"
            >
              {/* Background ring */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="3"
              />

              {/* Progress */}
              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke={timerColor}
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-[stroke-dashoffset] duration-1000 linear"
              />
            </svg>
          )}

          {/* Avatar */}
          <Avatar className="relative h-7 w-7 border border-white/10 sm:h-9 sm:w-9 overflow-hidden rounded-full">
            <AvatarImage
              src={avatar}
              alt={name}
              className="object-cover"
            />

            <AvatarFallback className="bg-slate-800 text-xs font-bold text-white">
              {name?.charAt(0)?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>

          {/* Player position */}
          {/* <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-slate-900 bg-slate-700 text-[8px] font-bold text-slate-200">
            {player_position}
          </div> */}
        </div>

        {/* Player Details */}
        <div className="min-w-0 leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`
                max-w-[70px]
                truncate
                text-[10px]
                font-bold
                sm:max-w-[90px]
                sm:text-xs
                ${
                  isCurrentPlayer
                    ? "text-white"
                    : "text-slate-300"
                }
              `}
            >
              {name}
            </span>

            {isCurrentPlayer && (
              <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-yellow-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
                Turn
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-1">
            <span className="text-[9px] font-medium uppercase tracking-wide text-white-400">
              Score
            </span>

            <span className="text-[11px] font-black text-white sm:text-xs">
              {points}
            </span>
          </div>
        </div>
      </div>

      {/* Timer Text */}
      {isCurrentPlayer && (
        <div
          className="mt-1 rounded-full border border-white/5 bg-slate-950/80 px-2 py-0.5 text-[8px] font-bold tabular-nums"
          style={{ color: timerColor }}
        >
          {remaining_time}s
        </div>
      )}

      {/* Typing Indicator */}
      {is_typing && (
        <div className="mt-1 flex items-center gap-1 rounded-full border border-white/5 bg-slate-950/80 px-2 py-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />

          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: "0.1s" }}
          />

          <span
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
            style={{ animationDelay: "0.2s" }}
          />
        </div>
      )}
    </div>
  );
};

export default SpectatorPlayerInfo;