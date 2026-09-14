import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface GamePlayer {
  id: number;
  username: string;
  score: number;
  position: number;
  is_dealer?: boolean;
  player_status?: "active" | "left";
  is_you: boolean;
}

interface RecentGame {
  id: number;
  code: string;
  status:
    | "waiting"
    | "in_progress"
    | "completed"
    | "expired"
    | "cancelled"
    | "forfeited";

  //is_stake_game: boolean;
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

const RecentGames: React.FC = () => {
  const navigate = useNavigate();

  const [recentGames, setRecentGames] = useState<RecentGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /*
   * Used to refresh the countdown every second.
   */
  const [, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRecentGames = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/games`,
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

      customLog("created games", data);

      const games = Array.isArray(data)
        ? data
        : Array.isArray(data.games)
        ? data.games
        : [];

      setRecentGames(games);
    } catch (error: any) {
      console.error(
        "Error fetching created games:",
        error
      );

      setError(
        error.message ||
          "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecentGames();
  }, []);

  /*
   * -----------------------------------------
   * HELPERS
   * -----------------------------------------
   */

  const getMe = (game: RecentGame) => {
    return game.players.find(
      (player) => player.is_you
    );
  };

  const getOpponents = (game: RecentGame) => {
    return game.players.filter(
      (player) => !player.is_you
    );
  };

  const getStatusLabel = (game: RecentGame) => {
    switch (game.status) {
      case "waiting":
        return "Waiting";

      case "in_progress":
        return "In Progress";

      case "completed":
        return game.winner === true
          ? "You Won"
          : game.winner === false
          ? "You Lost"
          : "Completed";

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
    status: RecentGame["status"]
  ) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "waiting":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

      case "completed":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";

      case "forfeited":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "expired":
      case "cancelled":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";

      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
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
    )}:${String(seconds).padStart(2, "0")}`;
  };

  /*
   * -----------------------------------------
   * CONTINUE GAME
   * -----------------------------------------
   */

  const handleContinueGame = (
    game: RecentGame
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
    <div className="p-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="w-24 h-4 rounded bg-gray-700" />
          <div className="w-32 h-3 rounded bg-gray-700" />
        </div>

        <div className="w-20 h-7 rounded-lg bg-gray-700" />
      </div>

      <div className="mt-4 h-14 rounded-xl bg-gray-700" />
    </div>
  );

  /*
   * -----------------------------------------
   * RENDER
   * -----------------------------------------
   */

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">
        <div>
          <h2 className="text-lg font-bold text-white">
            Your Games
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            
          </p>
        </div>

        {recentGames.length > 0 && (
          <span className="rounded-full bg-gray-700 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
            {recentGames.length}
          </span>
        )}
      </div>


      {/* CONTENT */}

      <div className="divide-y divide-gray-700">

        {/* LOADING */}

        {isLoading && (
          <>
            <GameSkeleton />
            <GameSkeleton />
            <GameSkeleton />
          </>
        )}


        {/* ERROR */}

        {!isLoading && error && (
          <div className="px-6 py-10 text-center">

            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-red-400">
                !
              </span>
            </div>

            <p className="text-sm text-gray-400">
              {error}
            </p>

            <button
              onClick={getRecentGames}
              className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-gray-600"
            >
              Try again
            </button>

          </div>
        )}


        {/* EMPTY */}

        {!isLoading &&
          !error &&
          recentGames.length === 0 && (
            <div className="px-6 py-12 text-center">

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700/60">
                🎴
              </div>

              <p className="font-semibold text-gray-300">
                No games yet
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Create a game and it will appear here.
              </p>

            </div>
          )}


        {/* GAMES */}

        {!isLoading &&
          !error &&
          recentGames.map((game) => {

            const me = getMe(game);
            const opponents =
              getOpponents(game);

            const countdown =
              game.status === "in_progress"
                ? getCountdown(
                    game.forfeit_at
                  )
                : null;

            const isMyTurn =
              game.current_turn_user_id !==
                null &&
              me &&
              Number(
                game.current_turn_user_id
              ) === Number(me.id);

            return (
              <div
                key={game.id}
                className="
                  group
                  px-4 py-4
                  transition
                  hover:bg-white/[0.02]
                "
              >

                {/* TOP ROW */}

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    {/* TYPE */}

                    <div className="flex flex-wrap items-center gap-2">

                      {game.stake ? (
                        <span className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-emerald-500/20
                          bg-emerald-500/10
                          px-2.5 py-1
                          text-[10px]
                          font-bold
                          text-emerald-400
                        ">
                          💰 Cash Challenge
                        </span>
                      ) : (
                        <span className="
                          rounded-full
                          border
                          border-gray-600
                          bg-gray-700/50
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          text-gray-400
                        ">
                          {game.is_rated
                            ? "Ranked"
                            : "Friendly"}
                        </span>
                      )}

                      <span
                        className={`
                          rounded-full
                          border
                          px-2.5 py-1
                          text-[10px]
                          font-semibold
                          ${getStatusClasses(
                            game.status
                          )}
                        `}
                      >
                        {getStatusLabel(game)}
                      </span>

                    </div>


                    {/* TIME */}

                    <p className="mt-2 text-[11px] text-gray-600">
                      {formatDistanceToNow(
                        new Date(
                          game.created_at
                        ),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>

                  </div>


                  {/* MONEY */}

                  {game.stake &&
                    game.stake !== null && (
                      <div className="shrink-0 text-right">

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          Stake
                        </p>

                        <p className="text-sm font-bold text-emerald-400">
                          ₵
                          {game.stake.toFixed(
                            2
                          )}
                        </p>

                      </div>
                    )}

                </div>


                {/* PLAYERS */}

                <div className="mt-4 rounded-xl border border-gray-700/70 bg-gray-900/40 p-3">

                  <div className="flex items-center justify-between gap-3">

                    {/* YOU */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-xs text-gray-500">
                        You
                      </p>

                      <p className="truncate text-sm font-bold text-white">
                        {me?.username ||
                          "You"}
                      </p>

                    </div>


                    {/* SCORES */}

                    <div className="shrink-0 text-center">

                      <div className="flex items-center gap-2">

                        <span className="text-lg font-black text-white">
                          {me?.score ??
                            0}
                        </span>

                        <span className="text-xs text-gray-600">
                          :
                        </span>

                        <span className="text-lg font-black text-gray-400">
                          {opponents.length ===
                          1
                            ? opponents[0]
                                .score
                            : "—"}
                        </span>

                      </div>

                      <p className="text-[9px] uppercase tracking-wider text-gray-600">
                        Score
                      </p>

                    </div>


                    {/* OPPONENTS */}

                    <div className="min-w-0 flex-1 text-right">

                      {opponents.length ===
                      1 ? (
                        <>
                          <p className="truncate text-xs text-gray-500">
                            Opponent
                          </p>

                          <p className="truncate text-sm font-bold text-white">
                            {
                              opponents[0]
                                .username
                            }
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-gray-500">
                            Opponents
                          </p>

                          <p className="truncate text-sm font-bold text-white">
                            {opponents
                              .map(
                                (player) =>
                                  player.username
                              )
                              .join(", ")}
                          </p>
                        </>
                      )}

                    </div>

                  </div>


                  {/* MULTIPLAYER SCORES */}

                  {opponents.length >
                    1 && (
                    <div className="mt-3 border-t border-gray-700 pt-3">

                      <div className="grid grid-cols-2 gap-2">

                        {game.players.map(
                          (player) => (
                            <div
                              key={
                                player.id
                              }
                              className={`
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                px-2.5 py-2
                                ${
                                  player.is_you
                                    ? "bg-blue-500/10 border border-blue-500/10"
                                    : "bg-gray-800"
                                }
                              `}
                            >

                              <span className="truncate text-[11px] text-gray-400">
                                {player.is_you
                                  ? "You"
                                  : player.username}
                              </span>

                              <span className="ml-2 text-xs font-bold text-white">
                                {
                                  player.score
                                }
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>


                {/* IN PROGRESS INFO */}

                {game.status ===
                  "in_progress" && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-blue-500/10 bg-blue-500/5 px-3 py-2.5">

                    <div className="flex min-w-0 items-center gap-2">

                      <span className="
                        relative
                        flex
                        h-2
                        w-2
                        shrink-0
                      ">
                        <span className="
                          absolute
                          inline-flex
                          h-full
                          w-full
                          animate-ping
                          rounded-full
                          bg-blue-400
                          opacity-50"
                        />

                        <span className="
                          relative
                          inline-flex
                          h-2
                          w-2
                          rounded-full
                          bg-blue-400"
                        />
                      </span>

                      <span className="truncate text-[11px] text-gray-400">

                        {isMyTurn
                          ? "Your turn"
                          : "Opponent's turn"}

                      </span>

                    </div>


                    {countdown && (
                      <div
                        className={`
                          shrink-0
                          font-mono
                          text-xs
                          font-bold
                          ${
                            countdown ===
                            "00:00"
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        `}
                      >
                        ⏱ {countdown}
                      </div>
                    )}

                  </div>
                )}


                {/* CASH PRIZE */}

                {game.stake &&
                  game.prize !== null &&
                  (game.status ===
                    "in_progress" ||
                    game.status ===
                      "waiting") && (
                    <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-500/5 px-3 py-2">

                      <span className="text-[11px] text-gray-500">
                        Winner receives
                      </span>

                      <span className="text-xs font-bold text-emerald-400">
                        ₵
                        {game.prize.toFixed(
                          2
                        )}
                      </span>

                    </div>
                  )}


                {/* RESULT */}

                {game.status ===
                  "completed" && (
                  <div
                    className={`
                      mt-3
                      rounded-xl
                      px-3 py-2.5
                      ${
                        game.winner ===
                        true
                          ? "bg-emerald-500/5 border border-emerald-500/10"
                          : "bg-red-500/5 border border-red-500/10"
                      }
                    `}
                  >

                    <div className="flex items-center justify-between">

                      <span className="text-xs text-gray-400">
                        {game.winner ===
                        true
                          ? "🏆 You won"
                          : "You lost"}
                      </span>

                      {game.stake &&
                        game.winner ===
                          true &&
                        game.prize !==
                          null && (
                          <span className="text-xs font-bold text-emerald-400">
                            +₵
                            {game.prize.toFixed(
                              2
                            )}
                          </span>
                        )}

                    </div>

                  </div>
                )}


                {/* FORFEITED */}

                {game.status ===
                  "forfeited" && (
                  <div className="mt-3 rounded-xl border border-red-500/10 bg-red-500/5 px-3 py-2.5">

                    <p className="text-xs text-red-400">
                      {game.forfeited_by &&
                      me &&
                      Number(
                        game.forfeited_by
                      ) ===
                        Number(me.id)
                        ? "You forfeited this game."
                        : "The game was forfeited by your opponent."}
                    </p>

                  </div>
                )}


                {/* ACTION */}

                {(
                  game.status ===
                    "in_progress" ||
                  game.status === "waiting"
                ) && (
                  <button
                    onClick={() =>
                      handleContinueGame(
                        game
                      )
                    }
                    className="
                      mt-3
                      w-full
                      rounded-xl
                      border
                      border-blue-500/20
                      bg-blue-500/10
                      py-2.5
                      text-xs
                      font-bold
                      text-blue-400
                      transition
                      hover:bg-blue-500/15
                      hover:text-blue-300
                      active:scale-[0.98]
                    "
                  >
                    {game.status ===
                    "in_progress"
                      ? "Continue Game"
                      : "Open Game"}
                  </button>
                )}

              </div>
            );
          })}

      </div>


      {/* FOOTER */}

      {!isLoading &&
        !error &&
        recentGames.length > 0 && (
          <div className="border-t border-gray-700 px-4 py-3">

            <Link
              to="/recent-games"
              className="
                block
                text-center
                text-xs
                font-semibold
                text-gray-500
                transition
                hover:text-blue-400
              "
            >
              View all games →
            </Link>

          </div>
        )}

    </div>
  );
};

export default RecentGames;