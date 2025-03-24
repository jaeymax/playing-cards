import { useState } from "react";
import {
  Crown,
  ChevronUp,
  Search,
  Trophy,
} from "lucide-react";

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("global");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock leaderboard data
  const players = [
    {
      id: 1,
      name: "CardMaster99",
      rank: 1,
      rating: 2345,
      wins: 342,
      losses: 89,
      winStreak: 12,
      avatar: "/api/placeholder/40/40",
      tier: "Master",
    },
    {
      id: 2,
      name: "SpaChamp",
      rank: 2,
      rating: 2280,
      wins: 289,
      losses: 102,
      winStreak: 5,
      avatar: "/api/placeholder/40/40",
      tier: "Diamond",
    },
    {
      id: 3,
      name: "AcePlayer",
      rank: 3,
      rating: 2210,
      wins: 256,
      losses: 98,
      winStreak: 3,
      avatar: "/api/placeholder/40/40",
      tier: "Diamond",
    },
    {
      id: 4,
      name: "KingOfCards",
      rank: 4,
      rating: 2185,
      wins: 234,
      losses: 112,
      winStreak: 0,
      avatar: "/api/placeholder/40/40",
      tier: "Diamond",
    },
    {
      id: 5,
      name: "SpaDemon",
      rank: 5,
      rating: 2150,
      wins: 198,
      losses: 89,
      winStreak: 4,
      avatar: "/api/placeholder/40/40",
      tier: "Diamond",
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Master":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Diamond":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Platinum":
        return "bg-gradient-to-r from-cyan-500 to-teal-500";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar - reusing from Game.tsx */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </h1>
            </div>

            {/* Currency and profile section - similar to Game.tsx */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center px-3 py-1 rounded-full bg-gray-800 border border-blue-900">
                  <span className="text-yellow-400 mr-1">⚡</span>
                  <span className="font-medium">15,420</span>
                </div>
                <div className="flex items-center px-3 py-1 rounded-full bg-gray-800 border border-purple-900">
                  <span className="text-purple-400 mr-1">💎</span>
                  <span className="font-medium">243</span>
                </div>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
              <h1 className="text-2xl font-bold">Leaderboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search players..."
                  className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
                <option>Season 9</option>
                <option>Season 8</option>
                <option>Season 7</option>
              </select>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "global"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("global")}
            >
              Global Rankings
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === "friends"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("friends")}
            >
              Friends
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Your Rank</div>
              <div className="text-2xl font-bold text-white">#1,234</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Rating</div>
              <div className="text-2xl font-bold text-yellow-400">1850</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Win Rate</div>
              <div className="text-2xl font-bold text-green-400">68%</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Win Streak</div>
              <div className="text-2xl font-bold text-blue-400">3</div>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 text-gray-400 font-medium">Rank</th>
                  <th className="pb-4 text-gray-400 font-medium">Player</th>
                  <th className="pb-4 text-gray-400 font-medium">Tier</th>
                  <th className="pb-4 text-gray-400 font-medium">Rating</th>
                  <th className="pb-4 text-gray-400 font-medium">Win/Loss</th>
                  <th className="pb-4 text-gray-400 font-medium">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {players.map((player) => (
                  <tr
                    key={player.id}
                    className="hover:bg-gray-750/50 transition"
                  >
                    <td className="py-4">
                      <div className="flex items-center">
                        {player.rank <= 3 ? (
                          <Crown
                            className={`w-6 h-6 mr-2 ${
                              player.rank === 1
                                ? "text-yellow-400"
                                : player.rank === 2
                                ? "text-gray-300"
                                : "text-amber-600"
                            }`}
                          />
                        ) : (
                          <span className="text-gray-400 font-medium w-6 mr-2 text-center">
                            {player.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getTierColor(
                          player.tier
                        )}`}
                      >
                        {player.tier}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-yellow-400 font-bold">
                        {player.rating}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className="text-green-400">{player.wins}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-red-400">{player.losses}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center">
                        {player.winStreak > 0 ? (
                          <>
                            <ChevronUp className="w-4 h-4 text-green-400 mr-1" />
                            <span className="text-green-400">
                              {player.winStreak}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              Showing 1-20 of 1,234 players
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                Previous
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
