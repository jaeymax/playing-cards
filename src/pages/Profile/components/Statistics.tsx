import React from "react";

const Statistics: React.FC = () => {
  const stats = {
    totalGames: 1234,
    winRate: "68%",
    averageScore: 18.5,
    highestScore: 21,
    perfectGames: 45,
    tournaments: {
      participated: 28,
      won: 5,
      runnerUp: 8,
    },
    rankHistory: [
      { season: "Season 1", rank: 156 },
      { season: "Season 2", rank: 89 },
      { season: "Season 3", rank: 42 },
    ],
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* General Stats */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">
          General Statistics
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries({
            "Total Games": stats.totalGames,
            "Win Rate": stats.winRate,
            "Avg Score": stats.averageScore,
            "Perfect Games": stats.perfectGames,
          }).map(([label, value]) => (
            <div key={label} className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament Stats */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">
          Tournament Performance
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(stats.tournaments).map(([key, value]) => (
            <div key={key} className="bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank History */}
      <div className="lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4">Rank History</h3>
        <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
          <div className="flex items-end justify-between h-48">
            {stats.rankHistory.map((season, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-32 w-16 bg-blue-600/20 rounded-t-lg relative">
                  <div
                    className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all"
                    style={{ height: `${(1 - season.rank / 200) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">{season.season}</p>
                <p className="text-sm text-white">#{season.rank}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
