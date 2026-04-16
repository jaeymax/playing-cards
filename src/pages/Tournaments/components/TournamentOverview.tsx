import React from "react";
import { Tournament } from "../types";

// interface Tournament {
//   id: string;
//   title: string;
//   format: string;
//   status: "upcoming" | "ongoing" | "completed";
//   start_date: string;
//   registration_fee: string;
//   prize: string;
//   registered_participants: number;
//   max_participants: number;
//   difficulty: string;
// }

interface TournamentOverviewProps {
  tournament: Tournament | undefined;
  loading: boolean;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  buttonConfig: {
    label: string;
    color: string;
    disabled: boolean;
  };
  onRegistration: () => void;
}

const TournamentOverviewSkeleton: React.FC = () => (
  <div className="space-y-4 md:space-y-6">
    {/* Main Overview Card Skeleton */}
    <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-lg p-4 md:p-6 border border-gray-700 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-4">
          <div>
            <div className="h-5 bg-gray-700 rounded w-1/3 mb-3 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
          <div>
            <div className="h-5 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <div className="h-5 bg-gray-700 rounded w-1/3 mb-2 animate-pulse"></div>
            <div className="p-3 md:p-4 bg-gray-900 bg-opacity-50 rounded space-y-2">
              <div className="h-4 bg-gray-700 rounded w-1/4 animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-8 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Important Notes Skeleton */}
    <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
      <div className="h-5 bg-gray-700 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-700 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  </div>
);

const TournamentOverview: React.FC<TournamentOverviewProps> = ({
  tournament,
  loading,
  timeLeft,
  buttonConfig,
  onRegistration,
}) => {
  if (loading) {
    return <TournamentOverviewSkeleton />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Main Overview Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-lg p-4 md:p-6 borde border-gray-700 shadow-g">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column - Tournament Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-base md:text-lg font-semibold mb-3 text-gray-300">
                Tournament Information
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 bg-opacity-50 rounded text-xs md:text-sm">
                  <span className="text-gray-400">Format</span>
                  <span className="font-semibold text-blue-400">
                    {tournament?.format}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 bg-opacity-50 rounded text-xs md:text-sm">
                  <span className="text-gray-400">Players</span>
                  <span className="font-semibold text-emerald-400">
                    {tournament?.registered_participants}/
                    {tournament?.max_participants}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 bg-opacity-50 rounded text-xs md:text-sm">
                  <span className="text-gray-400">Prize Pool</span>
                  <span className="font-semibold text-yellow-400">
                    {tournament?.prize} GHC
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 md:p-3 bg-gray-900 bg-opacity-50 rounded text-xs md:text-sm">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="font-semibold capitalize text-purple-400">
                    {tournament?.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Prize Distribution */}
            <div>
              <h3 className="text-sm md:text-base font-semibold mb-2 text-gray-300">
                Prize Distribution
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-yellow-900 bg-opacity-20 rounded border border-yellow-700 border-opacity-30 text-xs">
                  <span className="flex items-center gap-1 md:gap-2">
                    <span className="text-base md:text-xl">🏆</span>
                    <span>1st</span>
                  </span>
                  <span className="font-semibold text-yellow-400">
                    {tournament?.prize && parseInt(tournament.prize) * 1} GHC
                    {/* {parseInt(tournament?.prize) * 0.5} */}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-700 bg-opacity-30 rounded border border-gray-600 border-opacity-30 text-xs">
                  <span className="flex items-center gap-1 md:gap-2">
                    <span className="text-base md:text-xl">🥈</span>
                    <span>2nd</span>
                  </span>
                  <span className="font-semibold text-gray-300">
                    {/* {tournament?.prize && parseInt(tournament.prize) * 0} */}
                    {/* {parseInt(tournament.prize) * 0.3} */}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-orange-900 bg-opacity-20 rounded border border-orange-700 border-opacity-30 text-xs">
                  <span className="flex items-center gap-1 md:gap-2">
                    <span className="text-base md:text-xl">🥉</span>
                    <span>3rd</span>
                  </span>
                  <span className="font-semibold text-orange-400">
                    {/* {tournament?.prize && parseInt(tournament.prize) * 0} */}
                    {/* {parseInt(tournament.prize) * 0.2} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Action Area */}
          <div className="flex flex-col justify-between gap-4">
            <div>
              <h2 className="text-sm md:text-base font-semibold mb-2 text-gray-300">
                Start Time
              </h2>
              <div className="p-3 md:p-4 bg-gray-900 bg-opacity-50 rounded borde shadow-lg border-blue700 border-opacity-30">
                <p className="text-gray-400 text-xs mb-1">Starts at</p>
                {tournament && (
                  <p className="text-sm md:text-lg font-bold text-blue-400 mb-2 break-words">
                    {new Date(tournament.start_date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                )}
                {tournament?.status === "upcoming" && (
                  <div className="text-center">
                    <p className="text-gray-400 text-xs mb-1">Starts in</p>
                    <p className="text-lg md:text-2xl font-mono font-bold text-green-400">
                      {String(timeLeft.hours).padStart(2, "0")}:
                      {String(timeLeft.minutes).padStart(2, "0")}:
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Main Action Button */}
            <button
              onClick={onRegistration}
              disabled={buttonConfig.disabled}
              className={`w-full py-2.5 md:py-3 px-3 md:px-4 bg-gradient-to-r ${buttonConfig.color} 
                text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transform transition 
                hover:scale-[1.02] active:scale-[0.98] shadow-lg
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              {buttonConfig.label}
            </button>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-gray-700">
        <h2 className="text-base md:text-lg font-semibold mb-3 flex items-center gap-2">
          <span></span>
          Important Notes
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-gray-300">
          <li className="flex gap-2">
            <span className="text-blue-400 flex-shrink-0">✓</span>
            <span>Join 15 minutes before the tournament starts</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 flex-shrink-0">✓</span>
            <span>All players must follow tournament rules</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 flex-shrink-0">✓</span>
            <span>Matches in {tournament?.format} format</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 flex-shrink-0">✓</span>
            <span>Maintain stable internet connection</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TournamentOverview;
