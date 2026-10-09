import { useMemo, useState } from "react";
import {
  Users,
  Zap,
  Swords,
  Eye,
  Circle,
  Search,
  RefreshCw,
  ArrowLeft,
  SlidersHorizontal,
  Wifi,
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useOnlinePlayers } from "@/hooks/useOnlinePlayers";

type PlayerStatus =
  | "idle"
  | "looking_for_game"
  | "in_lobby"
  | "in_match";

type OnlinePlayer = {
  id: number | string;
  username: string;
  image?: string | null;
  rating?: number;
  division?: string;
  status?: PlayerStatus;
};

interface OnlinePlayersPageProps {
  players?: OnlinePlayer[];
  onPlay?: (player: OnlinePlayer) => void;
  onSpectate?: (player: OnlinePlayer) => void;
  onPlayOnline?: () => void;
  onBack?: () => void;
  loading?: boolean;
}

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

const getInitials = (username: string) =>
  username.slice(0, 2).toUpperCase();



export default function OnlinePlayersPage({
  onPlay,
  onSpectate,
  onPlayOnline,
  onBack,
}: OnlinePlayersPageProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "available" | "in_game"
  >("all");

   const { players, count, loading, refreshing,  refresh } =
      useOnlinePlayers();
  const onlineCount = count || players.length;

  const availablePlayers = players.filter(
    (player) =>
      player.status === "idle" ||
      player.status === "looking_for_game" ||
      player.status === "in_lobby" ||
      !player.status
  );

  

  const filteredPlayers = useMemo(() => {
    let result = players;

    if (filter === "available") {
      result = result.filter(
        (player) =>
          player.status === "idle" ||
          player.status === "looking_for_game" ||
          player.status === "in_lobby" ||
          !player.status
      );
    }

    if (filter === "in_game") {
      result = result.filter(
        (player) => player.status === "in_match"
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();

      result = result.filter((player) =>
        player.username.toLowerCase().includes(query)
      );
    }

    return result;
  }, [players, search, filter]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-full flex flex-col">
      <NavBar showSignUps={true} />

      <main className="container mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        {/* Page Header */}
        <div className="mb-6">
          <button
            type="button"
            onClick={onBack}
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
                  <Users className="h-5 w-5 text-emerald-400" />
                </div>

                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  LIVE
                </span>
              </div>

              <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Players Online
              </h1>

              <p className="mt-1 max-w-lg text-xs leading-relaxed text-gray-500 sm:text-sm">
                See who's online, challenge players, and jump
                into a game.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="rounded-xl border border-white/[0.06] bg-gray-800/60 px-4 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Online
                </p>

                <p className="mt-0.5 text-sm font-semibold text-white">
                  {loading ? "—" : onlineCount}
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-gray-800/60 px-4 py-2.5">
                <p className="text-[10px] uppercase tracking-wider text-gray-600">
                  Ready
                </p>

                <p className="mt-0.5 text-sm font-semibold text-emerald-400">
                  {loading ? "—" : availablePlayers.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Play */}
        <div className="relative mb-6 overflow-hidden rounded-2xl border border-indigo-400/20 bg-indigo-500/[0.07]">
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 ring-1 ring-indigo-400/10">
                <Zap className="h-5 w-5 text-indigo-300" />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Looking for a game?
                </p>

                <p className="mt-0.5 text-[11px] text-gray-500">
                  Let SparPlay find an opponent for you.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onPlayOnline}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/15 px-4 py-2.5 text-xs font-semibold text-indigo-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/20 hover:text-indigo-200"
            >
              <Swords className="h-4 w-4" />
              Play Online
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="h-10 w-full rounded-xl border border-white/[0.07] bg-gray-800/60 pl-9 pr-4 text-xs text-gray-200 outline-none placeholder:text-gray-600 transition focus:border-indigo-400/30 focus:bg-gray-800"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-[10px] font-semibold transition ${
                filter === "all"
                  ? "border-indigo-400/20 bg-indigo-500/10 text-indigo-300"
                  : "border-white/[0.07] bg-gray-800/60 text-gray-500 hover:text-gray-300"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              All
            </button>

            <button
              type="button"
              onClick={() => setFilter("available")}
              className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-[10px] font-semibold transition ${
                filter === "available"
                  ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
                  : "border-white/[0.07] bg-gray-800/60 text-gray-500 hover:text-gray-300"
              }`}
            >
              <Circle className="h-3 w-3 fill-current" />
              Ready
            </button>

            <button
              type="button"
              onClick={() => setFilter("in_game")}
              className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-[10px] font-semibold transition ${
                filter === "in_game"
                  ? "border-white/[0.10] bg-white/[0.05] text-gray-300"
                  : "border-white/[0.07] bg-gray-800/60 text-gray-500 hover:text-gray-300"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              In Game
            </button>

            <button
              type="button"
              onClick={refresh}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-gray-800/60 text-gray-500 transition hover:bg-gray-800 hover:text-gray-300"
              title="Refresh players"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading || refreshing ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-3 flex items-center justify-between px-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-600">
              {filter === "all"
                ? "Everyone Online"
                : filter === "available"
                  ? "Ready to Play"
                  : "Currently In Game"}
            </p>

            {!loading && (
              <p className="mt-0.5 text-[10px] text-gray-700">
                {filteredPlayers.length}{" "}
                {filteredPlayers.length === 1
                  ? "player"
                  : "players"}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
            <Wifi className="h-3 w-3 text-emerald-400" />
            Live presence
          </div>
        </div>

        {/* Player Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.05] bg-gray-800/50 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 animate-pulse rounded-full bg-gray-700" />

                  <div className="flex-1">
                    <div className="h-3 w-28 animate-pulse rounded bg-gray-700" />
                    <div className="mt-2 h-2 w-36 animate-pulse rounded bg-gray-700/70" />
                  </div>

                  <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {filteredPlayers.map((player) => {
              const rank = player.rank;

              const status: PlayerStatus =
                player.status || "idle";

              const isInGame = status === "in_match";

              const canPlay =
                status === "idle" ||
                status === "looking_for_game" ||
                status === "in_lobby";

              return (
                <div
                  key={player.id}
                  className="group rounded-2xl border border-white/[0.06] bg-gray-800/60 p-3.5 transition hover:border-white/[0.10] hover:bg-gray-800/80"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      {player.image_url ? (
                        <img
                          src={player.image_url}
                          alt={player.username}
                          className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-700 text-xs font-bold text-gray-300 ring-1 ring-white/10">
                          {getInitials(player.username)}
                        </div>
                      )}

                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gray-800 ring-1 ring-gray-800">
                        <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
                      </span>
                    </div>

                    {/* Player Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-200">
                        {player.username}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[10px] font-medium ${
                            statusStyles[status]
                          }`}
                        >
                          {statusLabels[status]}
                        </span>

                        <span className="text-gray-700">•</span>

                        <span
                          className={`text-[10px] font-medium`}
                          style={{color:player.rank_color}}
                        >
                          {rank}
                        </span>

                        {player.rating !== undefined && (
                          <>
                            <span className="text-gray-700">
                              •
                            </span>

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
                          onClick={() => onSpectate?.(player)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3 py-2 text-[10px] font-semibold text-gray-400 transition hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-gray-200"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="hidden xs:inline">
                            Spectate
                          </span>
                        </button>
                      ) : canPlay ? (
                        <button
                          type="button"
                          onClick={() => onPlay?.(player)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-400/20 bg-indigo-500/10 px-3 py-2 text-[10px] font-semibold text-indigo-300 transition hover:border-indigo-400/30 hover:bg-indigo-500/[0.16] hover:text-indigo-200"
                        >
                          <Swords className="h-3.5 w-3.5" />
                          <span>Play</span>
                        </button>
                      ) : null}
                    </div>
                  </div>

                  {/* Status indicator */}
                  {status === "looking_for_game" && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-indigo-400/10 bg-indigo-500/[0.05] px-2.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                      <span className="text-[9px] text-indigo-300/80">
                        Looking for someone to play
                      </span>
                    </div>
                  )}

                  {status === "in_lobby" && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-400/10 bg-amber-500/[0.05] px-2.5 py-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />

                      <span className="text-[9px] text-amber-300/80">
                        Currently in a lobby
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-white/[0.06] bg-gray-800/40 px-6 py-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-700/40 ring-1 ring-white/[0.05]">
              {search ? (
                <Search className="h-6 w-6 text-gray-500" />
              ) : (
                <Users className="h-6 w-6 text-gray-500" />
              )}
            </div>

            <p className="text-sm font-semibold text-gray-300">
              {search
                ? "No players found"
                : filter === "available"
                  ? "Nobody is ready to play"
                  : filter === "in_game"
                    ? "Nobody is currently in a game"
                    : "No players online"}
            </p>

            <p className="mx-auto mt-1.5 max-w-sm text-xs leading-relaxed text-gray-600">
              {search
                ? `No online player matches "${search}". Try searching for another username.`
                : filter === "available"
                  ? "You can still use Play Online to find an opponent automatically."
                  : filter === "in_game"
                    ? "Check back soon. Players may join a game at any moment."
                    : "Invite a friend to SparPlay or check back soon. Players could join at any moment."}
            </p>

            {filter !== "all" && !search && (
              <button
                type="button"
                onClick={() => setFilter("all")}
                className="mt-4 rounded-lg border border-white/[0.07] bg-white/[0.035] px-3.5 py-2 text-[10px] font-semibold text-gray-400 transition hover:bg-white/[0.06] hover:text-gray-200"
              >
                Show All Players
              </button>
            )}
          </div>
        )}

        {/* Bottom Hint */}
        {!loading && filteredPlayers.length > 0 && (
          <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-gray-700">
            <SlidersHorizontal className="h-3 w-3" />
            Player statuses update automatically
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}