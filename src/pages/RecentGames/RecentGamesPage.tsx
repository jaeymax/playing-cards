import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import NavBar from "@/components/NavBar";

interface GamePlayer {
  id: number;
  username: string;
  score: number;
  position: number;
  is_dealer?: boolean;
  player_status?: "active" | "left";
  is_you: boolean;
}

interface UserGame {
  id: number;
  code: string;

  status:
    | "waiting"
    | "in_progress"
    | "completed"
    | "expired"
    | "cancelled"
    | "forfeited";

  // is_stake_game: boolean;
  is_rated: boolean;

  players: GamePlayer[];

  winner: boolean | null;
  winner_id: number | null;

  challenge_id: number | null;
  challenge_status: string | null;

  stake: number | null;
  platform_fee: number | null;
  prize: number | null;

  challenge_expires_at: string | null;
  challenge_completed_at: string | null;

  win_points: number | null;
  include_sixes: boolean;
  include_aces: boolean;
  player_count: number;

  created_at: string;
  started_at: string | null;
  ended_at: string | null;

  current_player_position: number;
  current_turn_user_id: number | null;

  turn_started_at: string | null;
  turn_timeout_seconds: number | null;

  forfeit_at: string | null;
  forfeited_by: number | null;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

type StatusFilter =
  | "all"
  | "waiting"
  | "in_progress"
  | "completed"
  | "forfeited"
  | "expired"
  | "cancelled";

type TypeFilter =
  | "all"
  | "cash"
  | "ranked"
  | "friendly";

const GamesPage: React.FC = () => {
  const navigate = useNavigate();

  const [games, setGames] = useState<UserGame[]>([]);
  const [pagination, setPagination] =
    useState<Pagination | null>(null);

  const [page, setPage] = useState(1);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [typeFilter, setTypeFilter] =
    useState<TypeFilter>("all");

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  /*
   * Refresh countdown every second.
   */
  const [, setCurrentTime] =
    useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /*
   * -----------------------------------------
   * FETCH GAMES
   * -----------------------------------------
   */

  const getGames = async (
    requestedPage = page
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      params.set(
        "page",
        requestedPage.toString()
      );

      params.set("limit", "10");

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      if (typeFilter !== "all") {
        params.set("type", typeFilter);
      }

      const response = await fetch(
        `${baseUrl}/games?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 403
            ? "Log in to view your games"
            : response.status >= 500
            ? "Network error. Please try again."
            : "Failed to fetch games"
        );
      }

      const data = await response.json();

      customLog("filtered games", data);

      setGames(
        Array.isArray(data.games)
          ? data.games
          : []
      );

      setPagination(data.pagination);
    } catch (error: any) {
      console.error(
        "Error fetching games:",
        error
      );

      setError(
        error.message ||
          "Failed to load your games."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGames(page);
  }, [page, statusFilter, typeFilter]);

  /*
   * -----------------------------------------
   * FILTER HANDLERS
   * -----------------------------------------
   */

  const handleStatusFilter = (
    value: StatusFilter
  ) => {
    setPage(1);
    setStatusFilter(value);
  };

  const handleTypeFilter = (
    value: TypeFilter
  ) => {
    setPage(1);
    setTypeFilter(value);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setPage(1);
  };

  const hasActiveFilters =
    statusFilter !== "all" ||
    typeFilter !== "all";

  /*
   * -----------------------------------------
   * HELPERS
   * -----------------------------------------
   */

  const getMe = (game: UserGame) => {
    return game.players.find(
      (player) => player.is_you
    );
  };

  const getOpponents = (game: UserGame) => {
    return game.players.filter(
      (player) => !player.is_you
    );
  };

  const getStatusLabel = (
    game: UserGame
  ) => {
    switch (game.status) {
      case "waiting":
        return "Waiting";

      case "in_progress":
        return "In Progress";

      case "completed":
        if (game.winner === true)
          return "You Won";

        if (game.winner === false)
          return "You Lost";

        return "Completed";

      case "forfeited":
        return "Forfeited";

      case "expired":
        return "Expired";

      case "cancelled":
        return "Cancelled";

      default:
        return game.status;
    }
  };

  const getStatusClasses = (
    status: UserGame["status"]
  ) => {
    switch (status) {
      case "waiting":
        return "border-yellow-500/20 bg-yellow-500/10 text-yellow-400";

      case "in_progress":
        return "border-blue-500/20 bg-blue-500/10 text-blue-400";

      case "completed":
        return "border-gray-500/20 bg-gray-500/10 text-gray-400";

      case "forfeited":
        return "border-red-500/20 bg-red-500/10 text-red-400";

      case "expired":
      case "cancelled":
        return "border-gray-500/20 bg-gray-500/10 text-gray-500";

      default:
        return "border-gray-500/20 bg-gray-500/10 text-gray-400";
    }
  };

  /*
   * -----------------------------------------
   * COUNTDOWN
   * -----------------------------------------
   */

  const getCountdown = (
    forfeitAt: string | null
  ) => {
    if (!forfeitAt) return null;

    const difference =
      new Date(forfeitAt).getTime() -
      Date.now();

    if (difference <= 0) {
      return "00:00";
    }

    const totalSeconds = Math.floor(
      difference / 1000
    );

    const minutes = Math.floor(
      totalSeconds / 60
    );

    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  /*
   * -----------------------------------------
   * CONTINUE GAME
   * -----------------------------------------
   */

  const handleContinueGame = (
    game: UserGame
  ) => {
    navigate(`/game/${game.code}`, {
      state: {
        gameType: game.stake
          ? "cashChallenge"
          : "playWithFriend",
      },
    });
  };

  /*
   * -----------------------------------------
   * SKELETON
   * -----------------------------------------
   */

  const GameSkeleton = () => (
    <div className="animate-pulse rounded-2xl border border-gray-700 bg-gray-800 p-5">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-gray-700" />
          <div className="h-3 w-20 rounded bg-gray-700" />
        </div>

        <div className="h-7 w-20 rounded-full bg-gray-700" />
      </div>

      <div className="mt-5 h-20 rounded-xl bg-gray-700" />

      <div className="mt-4 h-10 rounded-xl bg-gray-700" />
    </div>
  );

  /*
   * -----------------------------------------
   * GAME CARD
   * -----------------------------------------
   */

  const GameCard = ({
    game,
  }: {
    game: UserGame;
  }) => {
    const me = getMe(game);
    const opponents = getOpponents(game);

    const countdown =
      game.status === "in_progress"
        ? getCountdown(game.forfeit_at)
        : null;

    const isMyTurn =
      game.current_turn_user_id !== null &&
      me &&
      Number(game.current_turn_user_id) ===
        Number(me.id);

    return (

      <div className="group rounded-2xl border border-gray-700 bg-gray-800 p-4 transition hover:border-gray-600 hover:bg-gray-800/90 sm:p-5">

        {/* Header */}

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">

              {game.stake ? (
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
                  💰 Cash Challenge
                </span>
              ) : (
                <span className="rounded-full border border-gray-600 bg-gray-700/50 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
                  {game.is_rated
                    ? "Ranked"
                    : "Friendly"}
                </span>
              )}

              <span
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  game.status
                )}`}
              >
                {getStatusLabel(game)}
              </span>

            </div>

            <p className="mt-2 text-[11px] text-gray-600">
              Created{" "}
              {formatDistanceToNow(
                new Date(game.created_at),
                {
                  addSuffix: true,
                }
              )}
            </p>

          </div>

          {game.stake &&
            game.stake !== null && (
              <div className="shrink-0 text-right">
                <p className="text-[9px] uppercase tracking-wider text-gray-600">
                  Stake
                </p>

                <p className="text-sm font-bold text-emerald-400">
                  ₵{game.stake.toFixed(2)}
                </p>
              </div>
            )}

        </div>

        {/* Players */}

        <div className="mt-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-3 sm:p-4">

          <div className="flex items-center gap-3">

            <div className="min-w-0 flex-1">

              <p className="text-[10px] text-gray-500">
                You
              </p>

              <p className="truncate text-sm font-bold text-white">
                {me?.username || "You"}
              </p>

            </div>

            <div className="shrink-0 text-center">

              <div className="flex items-center gap-2">

                <span className="text-lg font-black text-white">
                  {me?.score ?? 0}
                </span>

                <span className="text-xs text-gray-600">
                  :
                </span>

                <span className="text-lg font-black text-gray-400">
                  {opponents.length === 1
                    ? opponents[0].score
                    : "—"}
                </span>

              </div>

              <p className="text-[9px] uppercase tracking-wider text-gray-600">
                Score
              </p>

            </div>

            <div className="min-w-0 flex-1 text-right">

              <p className="text-[10px] text-gray-500">
                {opponents.length > 1
                  ? "Opponents"
                  : "Opponent"}
              </p>

              <p className="truncate text-sm font-bold text-white">
                {opponents.length === 0
                  ? "Waiting for player"
                  : opponents
                      .map(
                        (player) =>
                          player.username
                      )
                      .join(", ")}
              </p>

            </div>

          </div>

          {opponents.length > 1 && (
            <div className="mt-3 border-t border-gray-700 pt-3">

              <div className="grid grid-cols-2 gap-2">

                {game.players.map(
                  (player) => (
                    <div
                      key={`${game.id}-${player.id}-${player.position}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 ${
                        player.is_you
                          ? "border border-blue-500/10 bg-blue-500/10"
                          : "bg-gray-800"
                      }`}
                    >
                      <span className="truncate text-[11px] text-gray-400">
                        {player.is_you
                          ? "You"
                          : player.username}
                      </span>

                      <span className="ml-2 text-xs font-bold text-white">
                        {player.score}
                      </span>
                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        {/* In progress */}

        {game.status ===
          "in_progress" && (
          <div className="mt-3 flex items-center justify-between rounded-xl border border-blue-500/10 bg-blue-500/5 px-3 py-2.5">

            <div className="flex min-w-0 items-center gap-2">

              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>

              <span className="truncate text-[11px] text-gray-400">
                {isMyTurn
                  ? "Your turn"
                  : "Opponent's turn"}
              </span>

            </div>

            {countdown && (
              <span
                className={`font-mono text-xs font-bold ${
                  countdown === "00:00"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                ⏱ {countdown}
              </span>
            )}

          </div>
        )}

        {/* Cash prize */}

        {game.stake &&
          game.prize !== null &&
          (game.status === "waiting" ||
            game.status === "in_progress") && (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/5 px-3 py-2.5">
              <span className="text-[11px] text-gray-500">
                Winner receives
              </span>

              <span className="text-xs font-bold text-emerald-400">
                ₵{game.prize.toFixed(2)}
              </span>
            </div>
          )}

        {/* Completed */}

        {game.status === "completed" && (
          <div
            className={`mt-3 rounded-xl border px-3 py-2.5 ${
              game.winner === true
                ? "border-emerald-500/10 bg-emerald-500/5"
                : game.winner === false
                ? "border-red-500/10 bg-red-500/5"
                : "border-gray-700 bg-gray-700/20"
            }`}
          >
            <div className="flex items-center justify-between">

              <span className="text-xs text-gray-400">
                {game.winner === true
                  ? "🏆 You won"
                  : game.winner === false
                  ? "You lost"
                  : "Game completed"}
              </span>

              {game.stake &&
                game.winner === true &&
                game.prize !== null && (
                  <span className="text-xs font-bold text-emerald-400">
                    +₵{game.prize.toFixed(2)}
                  </span>
                )}

            </div>
          </div>
        )}

        {/* Forfeited */}

        {game.status === "forfeited" && (
          <div className="mt-3 rounded-xl border border-red-500/10 bg-red-500/5 px-3 py-2.5">
            <p className="text-xs text-red-400">
              {game.forfeited_by &&
              me &&
              Number(game.forfeited_by) ===
                Number(me.id)
                ? "You forfeited this game."
                : "The game was forfeited by your opponent."}
            </p>
          </div>
        )}

        {/* Expired */}

        {game.status === "expired" && (
          <div className="mt-3 rounded-xl border border-gray-700 bg-gray-700/20 px-3 py-2.5">
            <p className="text-xs text-gray-500">
              This challenge expired before
              the game started.
            </p>
          </div>
        )}

        {/* Cancelled */}

        {game.status === "cancelled" && (
          <div className="mt-3 rounded-xl border border-gray-700 bg-gray-700/20 px-3 py-2.5">
            <p className="text-xs text-gray-500">
              This game was cancelled.
            </p>
          </div>
        )}

        {/* Action */}

        {(game.status === "waiting" ||
          game.status === "in_progress") && (
          <button
            onClick={() =>
              handleContinueGame(game)
            }
            className="mt-3 w-full rounded-xl border border-blue-500/20 bg-blue-500/10 py-2.5 text-xs font-bold text-blue-400 transition hover:bg-blue-500/15 hover:text-blue-300 active:scale-[0.98]"
          >
            {game.status === "in_progress"
              ? "Continue Game"
              : "Open Game"}
          </button>
        )}

      </div>
    );
  };

  /*
   * -----------------------------------------
   * PAGINATION
   * -----------------------------------------
   */

  const goToPage = (newPage: number) => {
    if (
      newPage < 1 ||
      (pagination &&
        newPage > pagination.totalPages)
    ) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * -----------------------------------------
   * RENDER
   * -----------------------------------------
   */

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <NavBar showSignUps = {true} />
      <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-5">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Your Games
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                
              </p>
            </div>

            {pagination && (
              <div className="text-xs text-gray-600">
                {pagination.total}{" "}
                {pagination.total === 1
                  ? "game"
                  : "games"}
              </div>
            )}

          </div>

        </div>

        {/* =====================================
            FILTER BAR
        ====================================== */}

        <div className="mb-6 rounded-2xl border border-gray-700/80 bg-gray-800/70 p-3">

          <div className="flex flex-col gap-3">

            {/* Status */}

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 scrollbar-none">

              <span className="mr-1 shrink-0 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Status
              </span>

              {[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "in_progress",
                  label: "In Progress",
                },
                {
                  value: "waiting",
                  label: "Waiting",
                },
                {
                  value: "completed",
                  label: "Completed",
                },
                {
                  value: "forfeited",
                  label: "Forfeited",
                },
                {
                  value: "expired",
                  label: "Expired",
                },
                {
                  value: "cancelled",
                  label: "Cancelled",
                },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    handleStatusFilter(
                      filter.value as StatusFilter
                    )
                  }
                  className={`
                    shrink-0
                    rounded-lg
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    transition
                    ${
                      statusFilter ===
                      filter.value
                        ? "bg-gray-600 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-700/60 hover:text-gray-300"
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}

            </div>

            <div className="h-px bg-gray-700/60" />

            {/* Type */}

            <div className="flex min-w-0 items-center gap-2 overflow-x-auto pb-1 scrollbar-none">

              <span className="mr-1 shrink-0 text-[10px] font-bold uppercase tracking-wider text-gray-600">
                Type
              </span>

              {[
                {
                  value: "all",
                  label: "All Types",
                },
                {
                  value: "cash",
                  label: "💰 Cash",
                },
                {
                  value: "ranked",
                  label: "Ranked",
                },
                {
                  value: "friendly",
                  label: "Friendly",
                },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    handleTypeFilter(
                      filter.value as TypeFilter
                    )
                  }
                  className={`
                    shrink-0
                    rounded-lg
                    px-3
                    py-2
                    text-[11px]
                    font-semibold
                    transition
                    ${
                      typeFilter ===
                      filter.value
                        ? filter.value ===
                          "cash"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-gray-600 text-white"
                        : "text-gray-500 hover:bg-gray-700/60 hover:text-gray-300"
                    }
                  `}
                >
                  {filter.label}
                </button>
              ))}

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="ml-auto shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  Clear filters
                </button>
              )}

            </div>

          </div>

        </div>

        {/* ACTIVE FILTER SUMMARY */}

        {hasActiveFilters && !isLoading && (
          <div className="mb-4 flex items-center justify-between">

            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-300">
                {pagination?.total ?? games.length}
              </span>{" "}
              matching{" "}
              {pagination?.total === 1
                ? "game"
                : "games"}
            </p>

            <button
              onClick={clearFilters}
              className="text-[11px] font-semibold text-gray-600 transition hover:text-gray-400"
            >
              Reset
            </button>

          </div>
        )}

        {/* ERROR */}

        {!isLoading && error && (
          <div className="rounded-2xl border border-red-500/10 bg-gray-800 px-6 py-12 text-center">

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-lg text-red-400">
                !
              </span>
            </div>

            <p className="text-sm text-gray-400">
              {error}
            </p>

            <button
              onClick={() =>
                getGames(page)
              }
              className="mt-4 rounded-xl bg-gray-700 px-5 py-2.5 text-xs font-bold text-gray-300 transition hover:bg-gray-600"
            >
              Try again
            </button>

          </div>
        )}

        {/* LOADING */}

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            <GameSkeleton />
            <GameSkeleton />
            <GameSkeleton />
            <GameSkeleton />
          </div>
        )}

        {/* EMPTY */}

        {!isLoading &&
          !error &&
          games.length === 0 && (
            <div className="rounded-2xl border border-gray-700 bg-gray-800 px-6 py-16 text-center">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-700/60 text-2xl">
                {hasActiveFilters
                  ? "🔎"
                  : "🎴"}
              </div>

              <h2 className="font-bold text-gray-300">
                {hasActiveFilters
                  ? "No matching games"
                  : "No games yet"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {hasActiveFilters
                  ? "Try changing your filters to find other games."
                  : "Games you create will appear here."}
              </p>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-gray-700 px-4 py-2 text-xs font-bold text-gray-300 transition hover:bg-gray-600"
                >
                  Clear filters
                </button>
              )}

            </div>
          )}

        {/* GAMES */}

        {!isLoading &&
          !error &&
          games.length > 0 && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    game={game}
                  />
                ))}
              </div>

              {/* PAGINATION */}

              {pagination &&
                pagination.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">

                    <button
                      disabled={
                        !pagination.hasPreviousPage
                      }
                      onClick={() =>
                        goToPage(page - 1)
                      }
                      className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ← Previous
                    </button>

                    <div className="flex items-center gap-1">

                      {Array.from(
                        {
                          length:
                            pagination.totalPages,
                        },
                        (_, index) =>
                          index + 1
                      )
                        .filter(
                          (pageNumber) =>
                            pageNumber ===
                              1 ||
                            pageNumber ===
                              pagination.totalPages ||
                            Math.abs(
                              pageNumber - page
                            ) <= 1
                        )
                        .map(
                          (
                            pageNumber,
                            index,
                            visiblePages
                          ) => {
                            const previous =
                              visiblePages[
                                index - 1
                              ];

                            const showDots =
                              previous &&
                              pageNumber -
                                previous >
                                1;

                            return (
                              <React.Fragment
                                key={
                                  pageNumber
                                }
                              >
                                {showDots && (
                                  <span className="px-1 text-gray-600">
                                    …
                                  </span>
                                )}

                                <button
                                  onClick={() =>
                                    goToPage(
                                      pageNumber
                                    )
                                  }
                                  className={`h-9 min-w-9 rounded-xl px-3 text-xs font-bold transition ${
                                    pageNumber ===
                                    page
                                      ? "bg-blue-500 text-white"
                                      : "bg-gray-800 text-gray-500 hover:bg-gray-700 hover:text-gray-300"
                                  }`}
                                >
                                  {
                                    pageNumber
                                  }
                                </button>
                              </React.Fragment>
                            );
                          }
                        )}

                    </div>

                    <button
                      disabled={
                        !pagination.hasNextPage
                      }
                      onClick={() =>
                        goToPage(page + 1)
                      }
                      className="rounded-xl border border-gray-700 bg-gray-800 px-4 py-2.5 text-xs font-bold text-gray-300 transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      Next →
                    </button>

                  </div>
                )}

            </>
          )}

      </div>
    </div>
  );
};

export default GamesPage;