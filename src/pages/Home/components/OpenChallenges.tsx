import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface OpenChallenge {
  id: number;
  creator_id: number;
  creator_username: string | null;
  creator_avatar: string | null;
  game_id: number | null;
  game_code: string | null;
  stake: number | null;
  platform_fee: number | null;
  winner_payout: number | null;
  type: string;
  status:
    | "waiting"
    | "accepted"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "expired";

  expires_at: string | null;
  created_at: string;

  is_rated: boolean;

  win_points: number | null;
  include_sixes: boolean;
  include_aces: boolean;
  player_count: number;
}

const OpenChallenges: React.FC = () => {
  const navigate = useNavigate();

  const [challenges, setChallenges] =
    useState<OpenChallenge[]>([
         {
    id: 101,
    creator_id: 24,
    creator_username: "KofiSpar",
    creator_avatar: null,
    game_id: 4,
    game_code: "jeinvdhs",
    type: "friendly",
    status: "waiting",

    stake: null,
    platform_fee: null,
    winner_payout: null,

    is_rated: true,

    win_points: 20,
    include_sixes: true,
    include_aces: false,
    player_count: 2,

    expires_at: new Date(
      Date.now() + 1000 * 60 * 18
    ).toISOString(),

    created_at: new Date(
      Date.now() - 1000 * 60 * 2
    ).toISOString(),
  },

  {
    id: 102,
    creator_id: 31,
    creator_username: "YawKing",
    creator_avatar: null,
    game_id: 5,
    game_code: "ienneohe",

    type: "stake",
    status: "waiting",

    stake: 5.0,
    platform_fee: 0.5,
    winner_payout: 9.5,

    is_rated: true,

    win_points: 20,
    include_sixes: true,
    include_aces: true,
    player_count: 2,

    expires_at: new Date(
      Date.now() + 1000 * 60 * 12
    ).toISOString(),

    created_at: new Date(
      Date.now() - 1000 * 60 * 5
    ).toISOString(),
  },

  {
    id: 103,
    creator_id: 42,
    creator_username: "SparMaster",
    creator_avatar: null,
    game_id:4,
    game_code:"23jbjdhjs",
    type: "stake",
    status: "waiting",

    stake: 10.0,
    platform_fee: 1.0,
    winner_payout: 19.0,

    is_rated: false,

    win_points: 30,
    include_sixes: true,
    include_aces: false,
    player_count: 2,

    expires_at: new Date(
      Date.now() + 1000 * 60 * 25
    ).toISOString(),

    created_at: new Date(
      Date.now() - 1000 * 60 * 8
    ).toISOString(),
  },

    ]);

  const [isLoading, setIsLoading] =
    useState(false);

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
   * FETCH OPEN CHALLENGES
   * -----------------------------------------
   */

  const getOpenChallenges = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${baseUrl}/challenges/open?limit=5`,
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
            ? "Log in to view open challenges"
            : response.status >= 500
            ? "Network error. Please try again."
            : "Failed to fetch open challenges"
        );
      }

      const data = await response.json();

      customLog(
        "open challenges",
        data
      );

      const results =
        Array.isArray(data)
          ? data
          : Array.isArray(data.challenges)
          ? data.challenges
          : [];

      setChallenges(results);

    } catch (error: any) {
      console.error(
        "Error fetching open challenges:",
        error
      );

      setError(
        error.message ||
          "Failed to load open challenges."
      );
    } finally {
      setIsLoading(false);
    }
  };

//   useEffect(() => {
//     getOpenChallenges();
//   }, []);


  /*
   * -----------------------------------------
   * COUNTDOWN
   * -----------------------------------------
   */

  const getCountdown = (
    expiresAt: string | null
  ) => {
    if (!expiresAt) return null;

    const difference =
      new Date(expiresAt).getTime() -
      Date.now();

    if (difference <= 0) {
      return "Expired";
    }

    const totalSeconds =
      Math.floor(difference / 1000);

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    if (minutes > 59) {
      const hours =
        Math.floor(minutes / 60);

      const remainingMinutes =
        minutes % 60;

      return `${hours}h ${String(
        remainingMinutes
      ).padStart(2, "0")}m`;
    }

    return `${minutes}:${String(
      seconds
    ).padStart(2, "0")}`;
  };


  /*
   * -----------------------------------------
   * ACCEPT CHALLENGE
   * -----------------------------------------
   */

  const handleAcceptChallenge = async (
    challenge: OpenChallenge
  ) => {
    try {
      /*
       * Replace this endpoint with
       * your actual accept endpoint.
       */
      const response = await fetch(
        `${baseUrl}/challenges/${challenge.id}/accept`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(await authHeaders()),
          },
        }
      );

      if (!response.ok) {
        const data =
          await response.json().catch(
            () => null
          );

        throw new Error(
          data?.message ||
            "Unable to accept challenge"
        );
      }

      const data =
        await response.json();

      /*
       * Backend should return the
       * associated game.
       */
      const gameCode =
        data.game_code ||
        data.game?.code ||
        challenge.game_code;

      if (!gameCode) {
        throw new Error(
          "Challenge accepted but game could not be found."
        );
      }

      /*
       * Go directly into the game.
       */
      navigate(`/game/${gameCode}`, {
        state: {
          gameType:
            challenge.stake && challenge.stake > 0
              ? "cashChallenge"
              : "playWithFriend",
        },
      });

    } catch (error: any) {
      console.error(
        "Error accepting challenge:",
        error
      );

      /*
       * Refresh because the challenge
       * might have been accepted by
       * somebody else.
       */
      await getOpenChallenges();

      alert(
        error.message ||
          "Unable to accept challenge."
      );
    }
  };


  /*
   * -----------------------------------------
   * SKELETON
   * -----------------------------------------
   */

  const ChallengeSkeleton = () => (
    <div className="animate-pulse p-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-gray-700" />
          <div className="h-3 w-20 rounded bg-gray-700" />
        </div>

        <div className="h-8 w-24 rounded-xl bg-gray-700" />
      </div>

      <div className="mt-4 h-16 rounded-xl bg-gray-700" />
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
          <div className="flex items-center gap-2">

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>

            <h2 className="text-lg font-bold text-white">
              Open Challenges
            </h2>

          </div>

          <p className="mt-1 text-xs text-gray-500">
            Players ready to spar
          </p>
        </div>

        {challenges.length > 0 && (
          <span className="rounded-full bg-gray-700 px-2.5 py-1 text-[10px] font-semibold text-gray-400">
            {challenges.length}
          </span>
        )}

      </div>


      {/* CONTENT */}

      <div className="divide-y divide-gray-700">

        {/* LOADING */}

        {isLoading && (
          <>
            <ChallengeSkeleton />
            <ChallengeSkeleton />
            <ChallengeSkeleton />
          </>
        )}


        {/* ERROR */}

        {!isLoading &&
          error && (
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
                onClick={
                  getOpenChallenges
                }
                className="mt-4 rounded-lg bg-gray-700 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-gray-600"
              >
                Try again
              </button>

            </div>
          )}


        {/* EMPTY */}

        {!isLoading &&
          !error &&
          challenges.length === 0 && (
            <div className="px-6 py-10 text-center">

              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700/60 text-xl">
                🎴
              </div>

              <p className="font-semibold text-gray-300">
                No open challenges
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Be the first player to
                create one.
              </p>

            </div>
          )}


        {/* CHALLENGES */}

        {!isLoading &&
          !error &&
          challenges.map(
            (challenge) => {

              const countdown =
                getCountdown(
                  challenge.expires_at
                );

              const isCash =
                challenge.stake && challenge.stake > 0;

              return (
                <div
                  key={challenge.id}
                  className="
                    group
                    p-4
                    transition
                    hover:bg-white/[0.02]
                  "
                >

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      {/* CREATOR */}

                      <div className="flex items-center gap-2">

                        <div className="
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-gray-700
                          text-xs
                          font-bold
                          text-gray-300
                        ">
                          {challenge.creator_username
                            ?.charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold text-white">
                            {challenge.creator_username}
                          </p>

                          <p className="text-[10px] text-gray-600">
                            Created{" "}
                            {formatDistanceToNow(
                              new Date(
                                challenge.created_at
                              ),
                              {
                                addSuffix:
                                  true,
                              }
                            )}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* TYPE */}

                    {isCash ? (
                      <span className="
                        shrink-0
                        rounded-full
                        border
                        border-emerald-500/20
                        bg-emerald-500/10
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        text-emerald-400
                      ">
                        💰 Cash
                      </span>
                    ) : (
                      <span className="
                        shrink-0
                        rounded-full
                        border
                        border-gray-600
                        bg-gray-700/50
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        text-gray-400
                      ">
                        {challenge.is_rated
                          ? "Ranked"
                          : "Friendly"}
                      </span>
                    )}

                  </div>


                  {/* CHALLENGE DETAILS */}

                  <div className="
                    mt-4
                    rounded-xl
                    border
                    border-gray-700/70
                    bg-gray-900/40
                    p-3
                  ">

                    <div className="flex items-center justify-between gap-3">

                      {/* STAKE */}

                      <div className="min-w-0 flex-1">

                        {isCash ? (
                          <>
                            <p className="text-[9px] uppercase tracking-wider text-gray-600">
                              Entry
                            </p>

                            <p className="text-sm font-black text-emerald-400">
                              ₵
                              {challenge.stake && challenge.stake.toFixed(
                                2
                              )}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[9px] uppercase tracking-wider text-gray-600">
                              Game
                            </p>

                            <p className="text-sm font-bold text-white">
                              Friendly
                            </p>
                          </>
                        )}

                      </div>


                      {/* WIN POINTS */}

                      <div className="text-center">

                        <p className="text-[9px] uppercase tracking-wider text-gray-600">
                          Win
                        </p>

                        <p className="text-sm font-black text-white">
                          {challenge.win_points ??
                            20}
                        </p>

                      </div>


                      {/* PLAYERS */}

                      <div className="text-right">

                        <p className="text-[9px] uppercase tracking-wider text-gray-600">
                          Players
                        </p>

                        <p className="text-sm font-bold text-gray-300">
                          1/
                          {
                            challenge.player_count
                          }
                        </p>

                      </div>

                    </div>


                    {/* CASH PRIZE */}

                    {isCash &&
                      challenge.winner_payout !==
                        null && (
                        <div className="mt-3 flex items-center justify-between border-t border-gray-700 pt-3">

                          <span className="text-[10px] text-gray-500">
                            Winner receives
                          </span>

                          <span className="text-xs font-bold text-emerald-400">
                            ₵
                            {challenge.winner_payout.toFixed(
                              2
                            )}
                          </span>

                        </div>
                      )}

                  </div>


                  {/* BOTTOM */}

                  <div className="mt-3 flex items-center justify-between gap-3">

                    {/* EXPIRATION */}

                    <div className="flex items-center gap-1.5">

                      <span className="text-[11px] text-gray-600">
                        ⏱
                      </span>

                      <span
                        className={`text-[10px] font-medium ${
                          countdown ===
                          "Expired"
                            ? "text-red-400"
                            : "text-gray-500"
                        }`}
                      >
                        {countdown
                          ? `Expires in ${countdown}`
                          : "No expiry"}
                      </span>

                    </div>


                    {/* ACCEPT */}

                    <button
                      onClick={() =>
                        handleAcceptChallenge(
                          challenge
                        )
                      }
                      className="
                        rounded-xl
                        border
                        border-blue-500/20
                        bg-blue-500/10
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-blue-400
                        transition
                        hover:bg-blue-500/15
                        hover:text-blue-300
                        active:scale-[0.97]
                      "
                    >
                      Accept Challenge
                    </button>

                  </div>

                </div>
              );
            }
          )}

      </div>


      {/* FOOTER */}

      {!isLoading &&
        !error &&
        challenges.length > 0 && (
          <div className="border-t border-gray-700 px-4 py-3">

            <button
              onClick={() =>
                navigate("/challenges")
              }
              className="
                block
                w-full
                text-center
                text-xs
                font-semibold
                text-gray-500
                transition
                hover:text-blue-400
              "
            >
              View all open challenges →
            </button>

          </div>
        )}

    </div>
  );
};

export default OpenChallenges;