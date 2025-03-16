import React, { useState } from "react";
import {
  Shield,
  Star,
  Trophy,
  Activity,
  Clock,
  Users,
  Settings,
  Award,
  ChevronRight,
  Crown,
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "PlayerOne",
    title: "Card Master",
    rank: "Diamond II",
    level: 42,
    joinDate: "March 2024",
    stats: {
      rating: 2150,
      winRate: "64%",
      totalGames: 856,
      wins: 548,
      losses: 308,
      draws: 0,
      currentStreak: 5,
      bestStreak: 12,
      tournamentWins: 3,
    },
    achievements: [
      {
        id: 1,
        name: "First Victory",
        description: "Win your first game",
        icon: "🏆",
        completed: true,
      },
      {
        id: 2,
        name: "Master Strategist",
        description: "Win 500 games",
        icon: "⚔️",
        progress: 548,
        goal: 500,
        completed: true,
      },
      {
        id: 3,
        name: "Tournament Victor",
        description: "Win a tournament",
        icon: "👑",
        completed: true,
      },
      {
        id: 4,
        name: "Card Collector",
        description: "Collect 100 unique cards",
        icon: "🃏",
        progress: 85,
        goal: 100,
        completed: false,
      },
    ],
    recentMatches: [
      {
        id: 1,
        result: "win",
        opponent: "DragonMaster",
        rating: 2145,
        ratingChange: +15,
        time: "2 hours ago",
      },
      {
        id: 2,
        result: "win",
        opponent: "SpellWeaver",
        rating: 2180,
        ratingChange: +18,
        time: "3 hours ago",
      },
      {
        id: 3,
        result: "loss",
        opponent: "CardKing",
        rating: 2250,
        ratingChange: -12,
        time: "5 hours ago",
      },
      {
        id: 4,
        result: "win",
        opponent: "MysticMage",
        rating: 2130,
        ratingChange: +14,
        time: "6 hours ago",
      },
    ],
    badges: [
      { id: 1, name: "Season 8 Champion", icon: "👑" },
      { id: 2, name: "Beta Tester", icon: "🛠️" },
      { id: 3, name: "Tournament Winner", icon: "🏆" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        {/* ...existing navbar code... */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Profile Header */}
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="p-6 -mt-16">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-4xl font-bold border-4 border-gray-800">
                  {userData.name.charAt(0)}
                </div>
                <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-gray-800"></div>
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium text-purple-300">
                    {userData.title}
                  </span>
                </div>
                <div className="flex items-center justify-center md:justify-start mt-2 space-x-4">
                  <span className="flex items-center text-yellow-400">
                    <Crown className="w-4 h-4 mr-1" />
                    {userData.rank}
                  </span>
                  <span className="flex items-center text-blue-400">
                    <Star className="w-4 h-4 mr-1" />
                    Level {userData.level}
                  </span>
                  <span className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Joined {userData.joinDate}
                  </span>
                </div>
              </div>
              <div className="md:ml-auto mt-4 md:mt-0">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Rating</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {userData.stats.rating}
                </div>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="text-2xl font-bold text-green-400">
                  {userData.stats.winRate}
                </div>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Total Games</div>
                <div className="text-2xl font-bold text-blue-400">
                  {userData.stats.totalGames}
                </div>
              </div>
              <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                <div className="text-sm text-gray-400">Tournament Wins</div>
                <div className="text-2xl font-bold text-purple-400">
                  {userData.stats.tournamentWins}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 mt-6 border-b border-gray-700">
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "overview"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "matches"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("matches")}
              >
                Match History
              </button>
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "achievements"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("achievements")}
              >
                Achievements
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Matches */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Matches</h2>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>
              <div className="space-y-4">
                {userData.recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex justify-between items-center p-4 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          match.result === "win"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {match.result === "win" ? "🏆" : "❌"}
                      </div>
                      <div className="ml-4">
                        <div className="font-medium">vs. {match.opponent}</div>
                        <div className="text-sm text-gray-400">
                          {match.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{match.rating}</div>
                      <div
                        className={`text-sm ${
                          match.ratingChange > 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {match.ratingChange > 0 ? "+" : ""}
                        {match.ratingChange}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Achievements</h2>
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-2xl">
                        {achievement.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-medium">{achievement.name}</h3>
                        <p className="text-sm text-gray-400">
                          {achievement.description}
                        </p>
                        {achievement.progress !== undefined && (
                          <div className="mt-2">
                            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                style={{
                                  width: `${
                                    (achievement.progress / achievement.goal) *
                                    100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {achievement.progress} / {achievement.goal}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Detailed Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Games</span>
                  <span className="font-medium">
                    {userData.stats.totalGames}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Wins</span>
                  <span className="font-medium text-green-400">
                    {userData.stats.wins}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Losses</span>
                  <span className="font-medium text-red-400">
                    {userData.stats.losses}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Streak</span>
                  <span className="font-medium text-yellow-400">
                    {userData.stats.currentStreak}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="font-medium text-purple-400">
                    {userData.stats.bestStreak}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Badges</h2>
              <div className="grid grid-cols-3 gap-3">
                {userData.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex flex-col items-center p-3 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs text-center text-gray-400">
                      {badge.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
