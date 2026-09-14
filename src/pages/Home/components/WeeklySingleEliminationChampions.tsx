import React, { useEffect, useState } from "react";
import {
  Trophy,
  Crown,
  ChevronRight,
  Medal,
} from "lucide-react";
import { baseUrl } from "@/config/api";
import { useNavigate } from "react-router-dom";

interface Champion {
  id: string;
  name: string;
  wins: number;
  image_url: string;
  rank: "gold" | "silver" | "bronze";
}

const WeeklySingleEliminationChampions: React.FC =
  () => {
    const [loading, setLoading] =
      useState(true);

    const [error, setError] =
      useState<string | null>(null);

    const [champions, setChampions] =
      useState<Champion[]>([]);

    const [tournamentId, setTournamentId] =
      useState<number | null>(null);

    const navigate = useNavigate();

    /*
     * -----------------------------------------
     * FETCH
     * -----------------------------------------
     */

    const getWeeklyChampions = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${baseUrl}/tournaments/single-elimination/results`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            response.status >= 500
              ? "Network error. Please try again."
              : "Failed to fetch weekly champions."
          );
        }

        setChampions(
          Array.isArray(data.winners)
            ? data.winners
            : []
        );

        setTournamentId(
          data.tournamentId ?? null
        );
      } catch (err: any) {
        console.error(
          "Error fetching weekly champions:",
          err
        );

        setError(
          err.message ||
            "Failed to load champions."
        );
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      getWeeklyChampions();
    }, []);

    /*
     * -----------------------------------------
     * NAVIGATION
     * -----------------------------------------
     */

    const handleViewFullStandings = () => {
      if (!tournamentId) return;

      navigate(
        `/tournaments/${tournamentId}?tab=standings`
      );
    };

    /*
     * -----------------------------------------
     * RANK CONFIG
     * -----------------------------------------
     */

    const getRankConfig = (
      index: number
    ) => {
      switch (index) {
        case 0:
          return {
            medal: "🥇",
            label: "1st",
            accent:
              "text-yellow-400",
            border:
              "border-yellow-500/15",
            background:
              "bg-yellow-500/[0.04]",
          };

        case 1:
          return {
            medal: "🥈",
            label: "2nd",
            accent:
              "text-gray-300",
            border:
              "border-gray-600/30",
            background:
              "bg-gray-500/[0.03]",
          };

        case 2:
          return {
            medal: "🥉",
            label: "3rd",
            accent:
              "text-orange-400",
            border:
              "border-orange-500/10",
            background:
              "bg-orange-500/[0.03]",
          };

        default:
          return {
            medal: "",
            label: `${index + 1}th`,
            accent:
              "text-gray-400",
            border:
              "border-gray-700",
            background:
              "bg-gray-800/50",
          };
      }
    };

    /*
     * -----------------------------------------
     * LOADING
     * -----------------------------------------
     */

    if (
      loading &&
      champions.length === 0
    ) {
      return (
        <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

          {/* Header */}

          <div className="border-b border-gray-700 px-4 py-4">
            <div className="flex items-center gap-3">

              <div className="h-10 w-10 animate-pulse rounded-xl bg-gray-700" />

              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-700" />

                <div className="h-3 w-44 animate-pulse rounded bg-gray-700" />
              </div>

            </div>
          </div>

          {/* Skeleton rows */}

          <div className="divide-y divide-gray-700">

            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-4 py-4"
                >
                  <div className="h-8 w-8 animate-pulse rounded-lg bg-gray-700" />

                  <div className="h-9 w-9 animate-pulse rounded-full bg-gray-700" />

                  <div className="flex-1">
                    <div className="h-3.5 w-28 animate-pulse rounded bg-gray-700" />

                    <div className="mt-2 h-2.5 w-16 animate-pulse rounded bg-gray-700" />
                  </div>

                  <div className="h-7 w-12 animate-pulse rounded-lg bg-gray-700" />
                </div>
              )
            )}

          </div>

          <div className="p-4">
            <div className="h-10 animate-pulse rounded-xl bg-gray-700" />
          </div>

        </div>
      );
    }

    /*
     * -----------------------------------------
     * EMPTY / ERROR
     * -----------------------------------------
     */

    if (
      !loading &&
      !error &&
      champions.length === 0
    ) {
      return null;
    }

    return (
      <div className="overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

        {/* ===================================== */}
        {/* HEADER */}
        {/* ===================================== */}

        <div className="flex items-center justify-between border-b border-gray-700 px-4 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/10 bg-yellow-500/[0.07]">
              <Trophy
                className="h-5 w-5 text-yellow-400"
                strokeWidth={1.8}
              />
            </div>

            <div>
              <h2 className="text-sm font-bold text-white">
                Weekly Champions
              </h2>

              <p className="mt-0.5 text-[11px] text-gray-500">
                This week's tournament leaders
              </p>
            </div>

          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-gray-900/50 px-2.5 py-1">

            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />

            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
              Top 3
            </span>

          </div>

        </div>


        {/* ===================================== */}
        {/* ERROR */}
        {/* ===================================== */}

        {error && (
          <div className="px-5 py-8 text-center">

            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <span className="text-sm font-bold text-red-400">
                !
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {error}
            </p>

            <button
              onClick={
                getWeeklyChampions
              }
              className="mt-4 rounded-xl border border-gray-700 bg-gray-700/50 px-4 py-2 text-xs font-bold text-gray-400 transition hover:bg-gray-700 hover:text-gray-300"
            >
              Try again
            </button>

          </div>
        )}


        {/* ===================================== */}
        {/* CHAMPIONS */}
        {/* ===================================== */}

        {!error && (
          <div className="divide-y divide-gray-700">

            {champions
              .slice(0, 3)
              .map(
                (
                  champion,
                  index
                ) => {
                  const config =
                    getRankConfig(
                      index
                    );

                  const isFirst =
                    index === 0;

                  return (
                    <div
                      key={
                        champion.id
                      }
                      className={`
                        group
                        relative
                        flex
                        items-center
                        gap-3
                        px-4
                        py-4
                        transition
                        hover:bg-white/[0.02]
                        ${config.background}
                      `}
                    >

                      {/* FIRST PLACE ACCENT */}

                      {isFirst && (
                        <div className="absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-r-full bg-yellow-400/70" />
                      )}


                      {/* RANK */}

                      <div className="flex w-8 shrink-0 items-center justify-center">

                        {isFirst ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-yellow-500/10 bg-yellow-500/[0.06]">
                            <Crown
                              className="h-4 w-4 text-yellow-400"
                              strokeWidth={1.8}
                            />
                          </div>
                        ) : (
                          <span className="text-lg">
                            {config.medal}
                          </span>
                        )}

                      </div>


                      {/* AVATAR */}

                      <div
                        className={`
                          relative
                          h-9
                          w-9
                          shrink-0
                          overflow-hidden
                          rounded-full
                          border
                          ${config.border}
                          bg-gray-700
                        `}
                      >

                        {champion.image_url ? (
                          <img
                            src={
                              champion.image_url
                            }
                            alt={
                              champion.name
                            }
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm">
                            👤
                          </div>
                        )}

                      </div>


                      {/* PLAYER */}

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center gap-2">

                          <p
                            className={`
                              truncate
                              text-sm
                              font-bold
                              ${
                                isFirst
                                  ? "text-white"
                                  : "text-gray-300"
                              }
                            `}
                          >
                            {
                              champion.name
                            }
                          </p>

                          {isFirst && (
                            <span className="hidden rounded-full border border-yellow-500/10 bg-yellow-500/[0.06] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-yellow-500 sm:inline">
                              Champion
                            </span>
                          )}

                        </div>

                        <p className="mt-0.5 text-[10px] text-gray-600">
                          {config.label} place
                        </p>

                      </div>


                      {/* WINS */}

                      <div className="shrink-0 text-right">

                        <p
                          className={`
                            text-sm
                            font-black
                            ${
                              isFirst
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          `}
                        >
                          {
                            champion.wins
                          }
                        </p>

                        <p className="text-[8px] uppercase tracking-wider text-gray-600">
                          Wins
                        </p>

                      </div>

                    </div>
                  )
                }
              )}

          </div>
        )}


        {/* ===================================== */}
        {/* FOOTER */}
        {/* ===================================== */}

        {!error &&
          champions.length > 0 && (
            <div className="border-t border-gray-700 px-4 py-3">

              <button
                onClick={
                  handleViewFullStandings
                }
                disabled={
                  !tournamentId
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-gray-700
                  bg-gray-900/40
                  px-3
                  py-2.5
                  text-xs
                  font-bold
                  text-gray-400
                  transition
                  hover:border-gray-600
                  hover:bg-gray-700/40
                  hover:text-gray-200
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                <span className="flex items-center gap-2">

                  <Medal className="h-3.5 w-3.5 text-gray-500 transition group-hover:text-yellow-400" />

                  View full standings

                </span>

                <ChevronRight
                  className="
                    h-4
                    w-4
                    text-gray-600
                    transition
                    group-hover:translate-x-0.5
                    group-hover:text-gray-400
                  "
                />

              </button>

            </div>
          )}

      </div>
    );
  };

export default WeeklySingleEliminationChampions;