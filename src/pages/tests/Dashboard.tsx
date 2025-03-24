import {
  Activity,
  Trophy,
  Star,
  Zap,
} from "lucide-react";

const DashboardPage = () => {
  // Mock data
  const activeGames = [
    {
      id: 1,
      opponent: "DragonMaster",
      gameType: "Ranked",
      timeLeft: "1:30",
      yourTurn: true,
    },
    {
      id: 2,
      opponent: "SpellWeaver",
      gameType: "Friendly",
      timeLeft: "2:45",
      yourTurn: false,
    },
  ];

  const recentGames = [
    {
      id: 1,
      opponent: "MagicKing",
      result: "win",
      rating: 1850,
      ratingChange: +15,
      time: "2h ago",
    },
    {
      id: 2,
      opponent: "CardWizard",
      result: "loss",
      rating: 1835,
      ratingChange: -12,
      time: "5h ago",
    },
  ];

  const notifications = [
    { id: 1, type: "friend_request", from: "CardMaster99", time: "5m ago" },
    { id: 2, type: "game_invite", from: "SpellWeaver", time: "15m ago" },
    {
      id: 3,
      type: "tournament",
      message: "Cosmic Championship starts in 1 hour",
      time: "30m ago",
    },
  ];

  const userStats = {
    rating: 1850,
    rank: "Diamond II",
    winRate: "64%",
    gamesPlayed: 256,
    currentStreak: 3,
    dailyQuests: [
      { id: 1, title: "Win 3 Games", progress: 2, total: 3, reward: "100 CR" },
      { id: 2, title: "Play 5 Cards", progress: 4, total: 5, reward: "50 CR" },
    ],
  };

  const onlineFriends = [
    {
      id: 1,
      name: "CardMaster99",
      status: "in-game",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "SpellWeaver",
      status: "online",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "DragonLord",
      status: "online",
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        {/* ...existing navbar code... */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Rating</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {userStats.rating}
                </div>
              </div>
              <Trophy className="h-8 w-8 text-yellow-400 opacity-20" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Win Rate</div>
                <div className="text-2xl font-bold text-green-400">
                  {userStats.winRate}
                </div>
              </div>
              <Activity className="h-8 w-8 text-green-400 opacity-20" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Games Played</div>
                <div className="text-2xl font-bold text-blue-400">
                  {userStats.gamesPlayed}
                </div>
              </div>
              <Star className="h-8 w-8 text-blue-400 opacity-20" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Current Streak</div>
                <div className="text-2xl font-bold text-purple-400">
                  {userStats.currentStreak}
                </div>
              </div>
              <Zap className="h-8 w-8 text-purple-400 opacity-20" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Games */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Games</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {activeGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          {game.opponent[0]}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">{game.opponent}</div>
                          <div className="text-sm text-gray-400">
                            {game.gameType}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Time Left</div>
                          <div className="font-medium text-blue-400">
                            {game.timeLeft}
                          </div>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg transition ${
                            game.yourTurn
                              ? "bg-blue-600 hover:bg-blue-500 text-white"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {game.yourTurn ? "Your Turn" : "Opponent's Turn"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Quests */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Daily Quests</h2>
              <div className="space-y-4">
                {userStats.dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{quest.title}</div>
                      <div className="text-sm text-yellow-400">
                        {quest.reward}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{
                          width: `${(quest.progress / quest.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="mt-1 text-sm text-gray-400 text-right">
                      {quest.progress}/{quest.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Games */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Games</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View History
                </button>
              </div>
              <div className="space-y-4">
                {recentGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            game.result === "win"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {game.result === "win" ? "🏆" : "❌"}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium">vs. {game.opponent}</div>
                          <div className="text-sm text-gray-400">
                            {game.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{game.rating}</div>
                        <div
                          className={`text-sm ${
                            game.ratingChange > 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {game.ratingChange > 0 ? "+" : ""}
                          {game.ratingChange}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Notifications</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === "friend_request"
                            ? "bg-green-500/20 text-green-400"
                            : notification.type === "game_invite"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {notification.type === "friend_request"
                          ? "👥"
                          : notification.type === "game_invite"
                          ? "🎮"
                          : "🏆"}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="font-medium">
                          {notification.from
                            ? `${notification.from} ${
                                notification.type === "friend_request"
                                  ? "sent you a friend request"
                                  : "invited you to play"
                              }`
                            : notification.message}
                        </div>
                        <div className="text-sm text-gray-400">
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Friends */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Online Friends</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {onlineFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center justify-between p-2 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${
                            friend.status === "online"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          } border-2 border-gray-800`}
                        ></div>
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">{friend.name}</div>
                        <div className="text-xs text-gray-400 capitalize">
                          {friend.status}
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition">
                      Invite
                    </button>
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

export default DashboardPage;
