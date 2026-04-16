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
        {/* <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Format: {tournamentFormat}
          </h3>
          <p>
            Follow all guidelines specific to {tournamentFormat} tournaments.
          </p>
        </div> */}
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Format: {tournamentFormat}
          </h3>
          <p>
          Single elimination bracket. Each match is decided by one game. The winner advances to the next round. A single loss eliminates a player from the tournament
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Scoring & Winning
          </h3>
          <p>
            {'A match is won by the first player to gain 10 points. There is no fixed number of hands. Scoring follows standard Spar rules. 6 -> 3 points, 7 -> 2 points and All other cards score 1 point.'}
          </p>
        </div>
         <div>
          <h3 className="font-semibold text-blue-400 mb-1">
            Advancement
          </h3>
          <p>
            Winners move forward to the next round. Eliminated players do not re-enter the bracket. The last remaining player is declared the Tournament Champion.
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
        <div>
          <h3 className="font-semibold text-blue-400 mb-1">
         Timing and Forfeits
          </h3>
          <p>
          Players must make a move within the allowed turn time. 60 seconds of inactivity results in an automatic forfeit of the match. Matches are expected to last 15 minutes or less on average
          </p>
        </div>
      </div>
    </div>
  );
};

export default TournamentRules;
