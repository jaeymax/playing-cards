import React from "react";
import { Crown, Trophy } from "lucide-react";

interface TopPlayer {
  username: string;
  rating: number;
  image_url: string | null;
  global_rank: string;
  win_rate: number;
  rank?: string;
  rank_color?: string;
}

interface TopThreeProps {
  currentFilter: string;
  topPlayers: TopPlayer[];
}

const TopThree: React.FC<TopThreeProps> = ({
  topPlayers,
}) => {
  if (!topPlayers?.length) return null;

  const sorted = [...topPlayers].sort(
    (a, b) =>
      Number(a.global_rank) -
      Number(b.global_rank)
  );

  const first = sorted.find(
    (p) => Number(p.global_rank) === 1
  );

  const second = sorted.find(
    (p) => Number(p.global_rank) === 2
  );

  const third = sorted.find(
    (p) => Number(p.global_rank) === 3
  );

  const Avatar = ({
    player,
    size,
  }: {
    player: TopPlayer;
    size: "large" | "normal";
  }) => (
    <div
      className={`rounded-full bg-gradient-to-br from-gray-600 to-gray-800 p-[2px] ${
        size === "large"
          ? "h-24 w-24"
          : "h-20 w-20"
      }`}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-gray-800 bg-gray-700">
        {player.image_url ? (
          <img
            src={player.image_url}
            alt={player.username}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={
              size === "large"
                ? "text-3xl"
                : "text-2xl"
            }
          >
            👤
          </span>
        )}
      </div>
    </div>
  );

  const PlayerCard = ({
    player,
    place,
  }: {
    player: TopPlayer;
    place: 1 | 2 | 3;
  }) => {
    const isFirst = place === 1;

    const medal =
      place === 1
        ? "🥇"
        : place === 2
        ? "🥈"
        : "🥉";

    return (
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
          isFirst
            ? "border-yellow-500/30 bg-gradient-to-b from-yellow-500/[0.10] via-gray-800 to-gray-800 shadow-xl shadow-yellow-500/5"
            : place === 2
            ? "border-gray-600 bg-gray-800"
            : "border-orange-500/20 bg-gray-800"
        }`}
      >

        {/* Glow */}

        {isFirst && (
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-400/10 blur-3xl" />
        )}

        <div className="relative flex flex-col items-center px-5 pb-6 pt-7">

          {/* Medal */}

          <div className="absolute left-4 top-4 text-xl">
            {medal}
          </div>

          {/* Rank */}

          <div
            className={`absolute right-4 top-4 flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[10px] font-black ${
              isFirst
                ? "bg-yellow-500 text-gray-950"
                : place === 2
                ? "bg-gray-500 text-white"
                : "bg-orange-600 text-white"
            }`}
          >
            #{place}
          </div>

          {/* Crown */}

          {isFirst && (
            <Crown className="mb-2 h-5 w-5 text-yellow-400" />
          )}

          <Avatar
            player={player}
            size={isFirst ? "large" : "normal"}
          />

          <h3 className="mt-4 max-w-full truncate text-base font-black text-white">
            {player.username}
          </h3>

          {player.rank && (
            <span
              className="mt-1 text-[10px] font-bold uppercase tracking-wider"
              style={{
                color:
                  player.rank_color ||
                  "#9ca3af",
              }}
            >
              {player.rank}
            </span>
          )}

          <div className="mt-5 grid w-full grid-cols-2 gap-2">

            <div className="rounded-xl border border-gray-700 bg-gray-900/60 px-3 py-2.5 text-center">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-600">
                Rating
              </p>

              <p className="mt-1 text-sm font-black text-white">
                {player.rating}
              </p>
            </div>

            <div className="rounded-xl border border-gray-700 bg-gray-900/60 px-3 py-2.5 text-center">
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-600">
                Win Rate
              </p>

              <p className="mt-1 text-sm font-black text-white">
                {player.win_rate}%
              </p>
            </div>

          </div>

        </div>
      </div>
    );
  };

  return (
    <section>

      {/* Section heading */}

      <div className="mb-4 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-black text-white">
            Top Players
          </h2>

          <p className="mt-0.5 text-xs text-gray-600">
            The players currently leading the table
          </p>
        </div>

        <Trophy className="h-5 w-5 text-yellow-500/60" />

      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">

        {/* Second */}

        {second && (
          <div className="order-2 md:order-1">
            <PlayerCard
              player={second}
              place={2}
            />
          </div>
        )}

        {/* First */}

        {first && (
          <div className="order-1 md:order-2 md:-mt-8">
            <PlayerCard
              player={first}
              place={1}
            />
          </div>
        )}

        {/* Third */}

        {third && (
          <div className="order-3">
            <PlayerCard
              player={third}
              place={3}
            />
          </div>
        )}

      </div>
    </section>
  );
};

export default TopThree;