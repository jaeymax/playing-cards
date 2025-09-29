import React from "react";

const Overview: React.FC = () => {
  const recentActivity = [
    { type: "tournament", title: "Won Weekend Championship", time: "2h ago" },
    { type: "achievement", title: "Perfect Game Master", time: "1d ago" },
    { type: "rank", title: "Reached Diamond Rank", time: "3d ago" },
  ];

  const favoriteCards = [
    { name: "Ace of Spades", winRate: "75%", timesPlayed: 156 },
    { name: "King of Hearts", winRate: "70%", timesPlayed: 143 },
    { name: "Queen of Diamonds", winRate: "68%", timesPlayed: 128 },
  ];

  const currentSeasonStats = {
    rank: "#42",
    rating: "2150",
    wins: 85,
    losses: 40,
    winRate: "68%",
    totalGames: 125,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      activity.type === "tournament"
                        ? "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        : activity.type === "achievement"
                        ? "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        : "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    }
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-white">{activity.title}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Season Stats */}
      <div className="bg-gray-750 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-bold text-white mb-4">Current Season</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {currentSeasonStats.rank}
            </div>
            <div className="text-sm text-gray-400">Global Rank</div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-white">
              {currentSeasonStats.rating}
            </div>
            <div className="text-sm text-gray-400">Rating</div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400">
              {currentSeasonStats.wins}
            </div>
            <div className="text-sm text-gray-400">Wins</div>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-red-400">
              {currentSeasonStats.losses}
            </div>
            <div className="text-sm text-gray-400">Losses</div>
          </div>
        </div>
      </div>

      {/* Favorite Cards */}
      {/* <div className="lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4">Favorite Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favoriteCards.map((card, index) => (
            <div
              key={index}
              className="bg-gray-750 rounded-lg p-4 border border-gray-700"
            >
              <h4 className="text-white font-medium mb-2">{card.name}</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-green-400">{card.winRate}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Times Played</span>
                <span className="text-gray-300">{card.timesPlayed}</span>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Overview;
