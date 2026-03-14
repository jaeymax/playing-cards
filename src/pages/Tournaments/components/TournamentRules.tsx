import React from "react";

interface TournamentRulesProps {
  tournamentFormat?: string;
  loading?: boolean;
}

const TournamentRules: React.FC<TournamentRulesProps> = ({
  tournamentFormat,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-6 bg-gray-700 rounded animate-pulse w-40"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg md:text-xl font-semibold mb-4">
        Tournament Rules
      </h2>
      <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Format: {tournamentFormat}
          </h3>
          <p>
            Follow all guidelines specific to {tournamentFormat} tournaments.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">Conduct</h3>
          <p>
            Any form of cheating will result in immediate disqualification and
            loss of entry fee.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Connection Requirements
          </h3>
          <p>
            Players must maintain a stable internet connection throughout the
            tournament.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentRules;
