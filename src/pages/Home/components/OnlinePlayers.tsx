import { OnlinePlayer, useOnlinePlayers } from "@/hooks/useOnlinePlayers";
import {
  Users,
  Zap,
  Swords,
  Eye,
  Circle,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export type PlayerStatus = "idle" | "looking_for_game" | "in_lobby" | "in_match";




const statusStyles: Record<PlayerStatus, string> = {
  idle: "text-emerald-400",
  looking_for_game: "text-indigo-300",
  in_lobby: "text-amber-300",
  in_match: "text-gray-400",
};

const statusLabels: Record<PlayerStatus, string> = {
  idle: "Idle",
  looking_for_game: "Looking for game",
  in_lobby: "In lobby",
  in_match: "In game",
};

const getInitials = (username: string) => username.slice(0, 2).toUpperCase();



export default function OnlinePlayers({}) {
  // const players: Array<{
  //   id: number;
  //   username: string;
  //   rating: number;
  //   status?: "looking_for_game" | "idle" | "in_match";
  // }> = [
  //   {
  //     id: 1,
  //     username: "Kojo",
  //     rating: 1284,
  //     status: "looking_for_game",
  //   },
  //   {
  //     id: 2,
  //     username: "Kwame",
  //     rating: 1172,
  //     status: "idle",
  //   },
  //   {
  //     id: 3,
  //     username: "Nana",
  //     rating: 1091,
  //     status: "looking_for_game",
  //   },
  //   {
  //     id: 4,
  //     username: "Kofi",
  //     rating: 1432,
  //     status: "in_match",
  //   },
  // ];
  const { players, count, loading, refreshing, error, refresh } =
    useOnlinePlayers();

  console.log('players: ', players);
  console.log('count', count);
  console.log('loading', loading);
  console.log('refreshing', refreshing);
  console.log('error', error);
  console.log('refresh', refresh)  

  const maxPlayers = 4;

  const visiblePlayers = players.slice(0, maxPlayers);

  const availablePlayers = players.filter(
    (player) =>
      player.status === "idle" ||
      player.status === "looking_for_game" ||
      !player.status,
  );

  const onlineCount = players.length;
  const navigate = useNavigate();

  const onPlay = () => {};

  const onSpectate = (player:OnlinePlayer) => {
    if (!player.game_code) {
      console.error("Player does not have a game code.");
      return;
    }
    navigate(`/game/${player.game_code}/spectate`);
  };

  const onPlayOnline = () => {};

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-gray-800/70 shadow-xl">
      {/* Header */}
      <div className="relative border-b border-white/[0.06] px-5 py-4">
        <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <Users className="h-5 w-5 text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-white">
                  Players Online
                </h3>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  LIVE
                </span>
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                {loading
                  ? "Finding players..."
                  : onlineCount === 0
                    ? "Nobody online right now"
                    : `${onlineCount} ${
                        onlineCount === 1 ? "player" : "players"
                      } online`}
              </p>
            </div>
          </div>

          <button
            onClick={refresh}
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/[0.05] hover:text-gray-300"
            title="Refresh players"
          >
            <RefreshCw className={`h-4 w-4 ${((loading || refreshing))? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Quick Play */}
      <div className="px-4 pt-4">
        <button
          type="button"
          onClick={onPlayOnline}
          className="group relative w-full overflow-hidden rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-left transition hover:border-indigo-400/30 hover:bg-indigo-500/[0.14]"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-indigo-500/10 blur-2xl transition group-hover:bg-indigo-500/20" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/15">
                <Zap className="h-4 w-4 text-indigo-300" />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Play Online
                </p>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  Find an opponent instantly
                </p>
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-gray-300" />
          </div>
        </button>
      </div>

      {/* Players */}
      <div className="px-4 pb-4 pt-3">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl px-2 py-2.5"
              >
                <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700" />

                <div className="flex-1">
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-700" />
                  <div className="mt-1.5 h-2 w-20 animate-pulse rounded bg-gray-700/70" />
                </div>
              </div>
            ))}
          </div>
        ) : visiblePlayers.length > 0 ? (
          <div className="space-y-1">
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-600">
                Players
              </span>

              {availablePlayers.length > 0 && (
                <span className="text-[10px] text-emerald-400/80">
                  {availablePlayers.length} ready
                </span>
              )}
            </div>

            {visiblePlayers.map((player) => {
              const rank = player.rank;

              const status: PlayerStatus = player.status;

              const isInGame = status === "in_match";

              const canPlay =
                status === "idle" ||
                status === "looking_for_game" ||
                status === "in_lobby";

              return (
                <div
                  key={player.id}
                  className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-white/[0.035]"
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {player.image_url ? (
                      <img
                        src={player.image_url}
                        alt={player.username}
                        className="h-9 w-9 rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-[11px] font-bold text-gray-300 ring-1 ring-white/10">
                        {getInitials(player.username)}
                      </div>
                    )}

                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-gray-800">
                      <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
                    </span>
                  </div>

                  {/* Player Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-gray-200">
                      {player.username}
                    </p>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span
                        className={`text-[10px] font-medium ${
                          statusStyles[status]
                        }`}
                      >
                        {statusLabels[status]}
                      </span>

                      <span className="text-gray-700">•</span>

                      <span
                        style={{color:player.rank_color}}
                        className={`text-[10px] font-medium`}
                      >
                        {rank}
                      </span>

                      {player.rating !== undefined && (
                        <>
                          <span className="text-gray-700">•</span>

                          <span className="text-[10px] text-gray-500">
                            {player.rating.toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {isInGame ? (
                      <button
                        type="button"
                        onClick={() => onSpectate(player)}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.035] px-2.5 py-1.5 text-[10px] font-semibold text-gray-400 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-gray-200"
                      >
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Spectate
                        </span>
                      </button>
                    ) : canPlay ? (
                      <button
                        type="button"
                        onClick={() => onPlay?.()}
                        className="rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-indigo-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/[0.16] hover:text-indigo-200"
                      >
                        <span className="flex items-center gap-1">
                          <Swords className="h-3 w-3" />
                          Play
                        </span>
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="py-5 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-700/50">
              <Users className="h-5 w-5 text-gray-500" />
            </div>

            <p className="text-xs font-medium text-gray-400">
              No players online
            </p>

            <p className="mx-auto mt-1 max-w-[190px] text-[10px] leading-relaxed text-gray-600">
              Invite a friend or check back soon. Players could join at any
              moment.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      {players.length > 0 && (
        <div className="border-t border-white/[0.05] px-4 py-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-1 text-[10px] font-medium text-gray-500 transition hover:text-gray-300"
            onClick={() => navigate("/online-players")}
          >
            View all players
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      )}
    </section>
  );
}
