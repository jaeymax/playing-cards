import { useState } from "react";
import {
  Users,
  Search,
  UserPlus,
  MessageCircle,
  Settings,
  X,
  Check,
} from "lucide-react";

const FriendsPage = () => {
  const [activeTab, setActiveTab] = useState("online");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock friends data
  const friends = [
    {
      id: 1,
      name: "JaneDoe",
      status: "online",
      avatar: "/api/placeholder/40/40",
      rank: "Master",
      rating: 2450,
      lastPlayed: "2 hours ago",
      winRate: "65%",
    },
    {
      id: 2,
      name: "JohnSmith",
      status: "in-game",
      avatar: "/api/placeholder/40/40",
      rank: "Diamond",
      rating: 2150,
      lastPlayed: "Playing now",
      winRate: "58%",
    },
    {
      id: 3,
      name: "BobbyTables",
      status: "offline",
      avatar: "/api/placeholder/40/40",
      rank: "Platinum",
      rating: 1950,
      lastPlayed: "1 day ago",
      winRate: "52%",
    },
  ];

  // Mock friend requests
  const friendRequests = [
    {
      id: 1,
      name: "DragonSlayer42",
      avatar: "/api/placeholder/40/40",
      mutualFriends: 3,
    },
    {
      id: 2,
      name: "CardMaster99",
      avatar: "/api/placeholder/40/40",
      mutualFriends: 5,
    },
  ];

  // Mock suggested friends
  const suggestedFriends = [
    {
      id: 1,
      name: "ProPlayer123",
      avatar: "/api/placeholder/40/40",
      rank: "Master",
      mutualFriends: 8,
    },
    {
      id: 2,
      name: "NexusKnight",
      avatar: "/api/placeholder/40/40",
      rank: "Diamond",
      mutualFriends: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar - similar to other pages */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        {/* ...existing navbar code... */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Friends List */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="flex items-center mb-4 md:mb-0">
                  <Users className="w-8 h-8 text-blue-400 mr-3" />
                  <h1 className="text-2xl font-bold">Friends</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search friends..."
                      className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Add Friend
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mb-6 border-b border-gray-700">
                <button
                  className={`px-4 py-2 font-medium transition border-b-2 ${
                    activeTab === "online"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                  onClick={() => setActiveTab("online")}
                >
                  Online
                </button>
                <button
                  className={`px-4 py-2 font-medium transition border-b-2 ${
                    activeTab === "all"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Friends
                </button>
                <button
                  className={`px-4 py-2 font-medium transition border-b-2 ${
                    activeTab === "blocked"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-400 border-transparent hover:text-white"
                  }`}
                  onClick={() => setActiveTab("blocked")}
                >
                  Blocked
                </button>
              </div>

              {/* Friends List */}
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-gray-800 ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : friend.status === "in-game"
                                ? "bg-yellow-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-bold">{friend.name}</h3>
                          <div className="flex items-center text-sm">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                friend.rank === "Master"
                                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                  : friend.rank === "Diamond"
                                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                  : "bg-gradient-to-r from-cyan-500 to-teal-500"
                              }`}
                            >
                              {friend.rank}
                            </span>
                            <span className="text-yellow-400 ml-2">
                              {friend.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                          <MessageCircle className="w-5 h-5 text-blue-400" />
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition">
                          Invite to Game
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                          <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Friend Requests & Suggestions */}
          <div className="space-y-8">
            {/* Friend Requests */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Friend Requests</h2>
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-750 rounded-lg border border-gray-700 p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={request.avatar}
                        alt={request.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-gray-400">
                          {request.mutualFriends} mutual friends
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-green-600 hover:bg-green-500 rounded-lg transition">
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Friends */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Suggested Friends</h2>
              {suggestedFriends.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-750 rounded-lg border border-gray-700 p-4 mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={suggestion.avatar}
                        alt={suggestion.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="ml-3">
                        <div className="font-medium">{suggestion.name}</div>
                        <div className="flex items-center text-sm space-x-2">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              suggestion.rank === "Master"
                                ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                : "bg-gradient-to-r from-blue-500 to-cyan-500"
                            }`}
                          >
                            {suggestion.rank}
                          </span>
                          <span className="text-gray-400">
                            {suggestion.mutualFriends} mutual
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center">
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
