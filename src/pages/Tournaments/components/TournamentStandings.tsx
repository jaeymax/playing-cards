import React from "react";

interface TournamentStandingsProps {
  tournamentFormat?: string;
  loading?: boolean;
}

const TournamentStandings: React.FC<TournamentStandingsProps> = ({
  tournamentFormat,
  loading = false,
}) => {

  (tournamentFormat === "Swiss") && true;

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-700 rounded animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-gray-400">
      <p className="text-base md:text-lg">📊 Standings coming soon...</p>
    </div>
  );
};

export default TournamentStandings;
