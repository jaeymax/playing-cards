import { useState } from "react";
import {
  Trophy,
  Users,
  Bell,
  MessageCircle,
  Calendar,
  Award,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";

const HomePage = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type: string) => {
    setModalType(type);
    setShowGameModal(true);
  };

  // Mock data
  const topPlayers = [
    {
      id: 1,
      name: "CardMaster99",
      rating: 2345,
      avatar: "/api/placeholder/40/40",
    },
    { id: 2, name: "SpaChamp", rating: 2280, avatar: "/api/placeholder/40/40" },
    {
      id: 3,
      name: "AcePlayer",
      rating: 2210,
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 4,
      name: "KingOfCards",
      rating: 2185,
      avatar: "/api/placeholder/40/40",
    },
    { id: 5, name: "SpaDemon", rating: 2150, avatar: "/api/placeholder/40/40" },
  ];

  const announcements = [
    {
      id: 1,
      title: "Weekend Tournament",
      date: "Mar 15, 2025",
      desc: "Join our weekend tournament with $500 prize pool!",
    },
    {
      id: 2,
      title: "New Card Pack",
      date: "Mar 8, 2025",
      desc: "Discover our new expansion 'Mystic Waters'",
    },
    {
      id: 3,
      title: "System Maintenance",
      date: "Mar 5, 2025",
      desc: "Scheduled maintenance on March 6th",
    },
  ];

  const onlineFriends = [
    {
      id: 1,
      name: "JaneDoe",
      status: "online",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 2,
      name: "JohnSmith",
      status: "in-game",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: 3,
      name: "BobbyTables",
      status: "online",
      avatar: "/api/placeholder/40/40",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </h1>
              <div className="hidden md:flex ml-10 space-x-6">
                <a
                  href="/leaderboard"
                  className="font-medium text-gray-300 hover:text-blue-400 transition flex items-center"
                >
                  <Trophy size={18} className="mr-1" /> Leaderboard
                </a>
                <a
                  href="/events"
                  className="font-medium text-gray-300 hover:text-blue-400 transition flex items-center"
                >
                  <Calendar size={18} className="mr-1" /> Events
                </a>
                <a
                  href="/friends"
                  className="font-medium text-gray-300 hover:text-blue-400 transition flex items-center"
                >
                  <Users size={18} className="mr-1" /> Friends
                </a>
                <a
                  href="/how-to-play"
                  className="font-medium text-gray-300 hover:text-blue-400 transition flex items-center"
                >
                  <Award size={18} className="mr-1" /> How to Play
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Currency display */}
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

              {/* Notifications */}
              <button className="p-2 rounded-full hover:bg-gray-800 transition relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-1 rounded hover:bg-gray-800 transition"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white font-bold">
                    JP
                  </div>
                  <span className="hidden md:block">Player123</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl py-1 z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                    >
                      <User size={16} className="mr-2" /> Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                    >
                      <Award size={16} className="mr-2" /> My Stats
                    </a>
                    <a
                      href="/logout"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex items-center"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Play Options */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Play Now</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => openModal("random")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold px-6 py-4 rounded-lg shadow-lg shadow-blue-900/50 transition transform hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <Users size={28} className="mb-2" />
                    <span>Play Now</span>
                    <span className="text-xs mt-1 text-blue-200">
                      Find a match
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => openModal("friend")}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-4 rounded-lg border border-blue-800 transition transform hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <MessageCircle size={28} className="mb-2" />
                    <span>Play with Friend</span>
                    <span className="text-xs mt-1 text-gray-300">
                      Invite a friend
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => openModal("computer")}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-6 py-4 rounded-lg border border-purple-800 transition transform hover:scale-105"
                >
                  <div className="flex flex-col items-center">
                    <Award size={28} className="mb-2" />
                    <span>Play vs AI</span>
                    <span className="text-xs mt-1 text-gray-300">
                      Practice mode
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Featured Tournament */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl overflow-hidden mb-8">
              <div className="relative">
                <img
                  src="https://www.shutterstock.com/image-vector/poker-tournament-banner-table-cards-600nw-2048694602.jpg"
                  alt="Tournament Banner"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-yellow-400 font-bold mb-1">
                    FEATURED TOURNAMENT
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Spring Championship 2025
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Compete for a $1,000 prize pool and glory!
                  </p>
                  <button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg shadow-amber-900/30 transition transform hover:scale-105 flex items-center">
                    Register Now <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-4 grid grid-cols-3 text-center border-t border-blue-900/50">
                <div>
                  <div className="text-blue-400 text-sm">PARTICIPANTS</div>
                  <div className="text-white font-bold text-xl">128/256</div>
                </div>
                <div>
                  <div className="text-blue-400 text-sm">STARTS IN</div>
                  <div className="text-white font-bold text-xl">3 Days</div>
                </div>
                <div>
                  <div className="text-blue-400 text-sm">FORMAT</div>
                  <div className="text-white font-bold text-xl">
                    Single Elim
                  </div>
                </div>
              </div>
            </div>

           {/*  Recent Games */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Your Recent Games</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-3">WIN</div>
                    <img
                      src="/api/placeholder/32/32"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. CardMaster99</div>
                  </div>
                  <div className="text-gray-400 text-sm">10 min ago</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="text-red-400 font-bold mr-3">LOSS</div>
                    <img
                      src="/api/placeholder/32/32"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. SpaChamp</div>
                  </div>
                  <div className="text-gray-400 text-sm">2 hours ago</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-3">WIN</div>
                    <img
                      src="/api/placeholder/32/32"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. KingOfCards</div>
                  </div>
                  <div className="text-gray-400 text-sm">Yesterday</div>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition">
                View Game History
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Top Players */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Players</h2>
                <a
                  href="/leaderboard"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>

              <div className="space-y-3">
                {topPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center p-2 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="w-6 text-center font-bold text-gray-400">
                      {index + 1}
                    </div>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full mx-2"
                    />
                    <div className="flex-1 text-white">{player.name}</div>
                    <div className="text-yellow-400 font-bold">
                      {player.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Announcements</h2>
                <a
                  href="/announcements"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border-l-4 border-blue-500 pl-3 py-1"
                  >
                    <h3 className="text-white font-bold">
                      {announcement.title}
                    </h3>
                    <div className="text-gray-400 text-xs mb-1">
                      {announcement.date}
                    </div>
                    <p className="text-gray-300 text-sm">{announcement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Friends */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Friends Online</h2>
                <a
                  href="/friends"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  All Friends
                </a>
              </div>

              {onlineFriends.length > 0 ? (
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
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            } border-2 border-gray-800`}
                          ></div>
                        </div>
                        <div className="ml-2">
                          <div className="text-white">{friend.name}</div>
                          <div className="text-gray-400 text-xs capitalize">
                            {friend.status}
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition transform hover:scale-105">
                        Invite
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No friends online right now
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Game Modal */}
      {showGameModal && (
        <div className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              {modalType === "random" && "Find a Match"}
              {modalType === "friend" && "Play with Friend"}
              {modalType === "computer" && "Play with Computer"}
            </h2>

            {modalType === "random" && (
              <div className="space-y-4">
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Game Mode:</span>
                    <span className="text-white font-bold">Ranked</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Your Rating:</span>
                    <span className="text-yellow-400 font-bold">1850</span>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-blue-900/30 transition transform hover:scale-105">
                  Find Match
                </button>
              </div>
            )}

            {modalType === "friend" && (
              <div className="space-y-4">
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-bold mb-2">Invite a Friend</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {onlineFriends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center justify-between p-2 bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div className="ml-2 text-white">{friend.name}</div>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition transform hover:scale-105">
                          Invite
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center text-white">or</div>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-900/30 transition transform hover:scale-105">
                  Create Private Room
                </button>
              </div>
            )}

            {modalType === "computer" && (
              <div className="space-y-4">
                <div className="bg-gray-750 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-white font-bold mb-2">
                    Select Difficulty
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="py-2 bg-green-600 hover:bg-green-500 text-white rounded transition transform hover:scale-105">
                      Easy
                    </button>
                    <button className="py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded transition transform hover:scale-105">
                      Medium
                    </button>
                    <button className="py-2 bg-red-600 hover:bg-red-500 text-white rounded transition transform hover:scale-105">
                      Hard
                    </button>
                  </div>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white rounded-lg font-bold shadow-lg shadow-green-900/30 transition transform hover:scale-105">
                  Start Game
                </button>
              </div>
            )}

            <button
              onClick={() => setShowGameModal(false)}
              className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
