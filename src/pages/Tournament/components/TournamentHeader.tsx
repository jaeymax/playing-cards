import React from "react";

interface TournamentHeaderProps {
  name?: string;
  format?: string;
  status?: "upcoming" | "ongoing" | "completed";
  numberOfParticipants?: number;
  prize?: string;
  current_round_number?: number;
  loading?: boolean;
}

const TournamentHeader: React.FC<TournamentHeaderProps> = ({
  name,
  format,
  status,
  numberOfParticipants,
  prize,
  current_round_number,
  loading,
}) => {
  const currentRoundName = () => {
    const totalRounds = Math.ceil(Math.log2(numberOfParticipants!)); // Assuming a fixed total rounds for simplicity
    const roundsFromEnd = totalRounds - current_round_number!;
    if (roundsFromEnd === 0) return "Finals";
    if (roundsFromEnd === 1) return "Semi Finals";
    if (roundsFromEnd === 2) return "Quarter Finals";
    return "Round " + current_round_number;
  };

  const SkeletonLoader = () => (
    <div className="space-y-2">
      <div className="h-8 bg-gray-700 rounded animate-pulse w-48"></div>
      <div className="h-4 bg-gray-700 rounded animate-pulse w-96"></div>
    </div>
  );

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 md:gap-4">
          <div className="w-full lg:w-auto">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                <div className="flex items-center gap-2 md:gap-3">
                  <h1 className="text-lg md:text-2xl font-bold text-white">
                    {name}
                  </h1>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                    {status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  {numberOfParticipants} Players • {format} • {prize} GHC Prize
                  Pool
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full lg:w-auto">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
                <div className="h-6 bg-gray-700 rounded animate-pulse w-40"></div>
              </div>
            ) : (
              <div className="text-left md:text-right">
                <p className="text-xs md:text-sm text-gray-400">
                  Current Round
                </p>
                <p className="text-base md:text-lg font-medium text-white">
                  {currentRoundName()}
                </p>
              </div>
            )}
            <button
              className="px-3 md:px-4 py-2 text-sm md:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              View Your Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentHeader;
