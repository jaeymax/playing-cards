import React, { useState } from "react";
import {
  Trophy,
  Users,
  Clock,
  Star,
  Calendar,
  ChevronRight,
  Filter,
  Search,
  Shield,
  Award,
} from "lucide-react";

const TournamentsPage = () => {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock tournament data
  const tournaments = [
    {
      id: 1,
      name: "Cosmic Championship Series",
      status: "ongoing",
      type: "ranked",
      tier: "platinum",
      startDate: "2024-03-15 14:00",
      endDate: "2024-03-18 20:00",
      prizePool: "50,000",
      currency: "CR",
      entryFee: "1,000",
      participants: 128,
      maxParticipants: 256,
      format: "Double Elimination",
      description:
        "The ultimate test of skill in our quarterly championship series.",
      rewards: [
        { position: "1st", amount: "25,000", type: "currency" },
        { position: "2nd", amount: "15,000", type: "currency" },
        { position: "3rd", amount: "10,000", type: "currency" },
        { position: "Top 8", reward: "Cosmic Champion Title", type: "title" },
      ],
      banner: "/api/placeholder/800/200",
    },
    {
      id: 2,
      name: "Weekend Warriors Cup",
      status: "registration",
      type: "casual",
      tier: "gold",
      startDate: "2024-03-20 12:00",
      endDate: "2024-03-20 20:00",
      prizePool: "10,000",
      currency: "CR",
      entryFee: "500",
      participants: 32,
      maxParticipants: 64,
      format: "Single Elimination",
      description: "A fast-paced tournament for weekend warriors.",
      banner: "/api/placeholder/800/200",
    },
    {
      id: 3,
      name: "Beginner's Arena",
      status: "upcoming",
      type: "beginner",
      tier: "bronze",
      startDate: "2024-03-25 15:00",
      endDate: "2024-03-25 19:00",
      prizePool: "5,000",
      currency: "CR",
      entryFee: "100",
      participants: 16,
      maxParticipants: 32,
      format: "Single Elimination",
      description: "Perfect for new players looking to compete!",
      restrictions: "Below 1500 rating",
      banner: "/api/placeholder/800/200",
    },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "from-purple-600 to-blue-600";
      case "gold":
        return "from-yellow-600 to-amber-600";
      case "bronze":
        return "from-orange-600 to-red-600";
      default:
        return "from-blue-600 to-indigo-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        {/* ...existing navbar code... */}
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Header Section */}
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
              <h1 className="text-2xl font-bold">Tournaments</h1>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tournaments..."
                  className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select className="px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none">
                <option value="all">All Types</option>
                <option value="ranked">Ranked</option>
                <option value="casual">Casual</option>
                <option value="beginner">Beginner</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Tournament Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">
                Active Tournaments
              </div>
              <div className="text-2xl font-bold text-green-400">3</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">
                Your Tournament Wins
              </div>
              <div className="text-2xl font-bold text-yellow-400">12</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">Total Prize Pool</div>
              <div className="text-2xl font-bold text-blue-400">65,000 CR</div>
            </div>
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="text-sm text-gray-400 mb-1">
                Tournament Rating
              </div>
              <div className="text-2xl font-bold text-purple-400">1850</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 border-b border-gray-700">
            {["ongoing", "upcoming", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium capitalize transition border-b-2 ${
                  activeTab === tab
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid gap-6">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={tournament.banner}
                  alt={tournament.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getTierColor(
                        tournament.tier
                      )} shadow-lg`}
                    >
                      {tournament.tier.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        tournament.status === "ongoing"
                          ? "bg-green-500/20 text-green-400 border border-green-500/50"
                          : tournament.status === "registration"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          : "bg-purple-500/20 text-purple-400 border border-purple-500/50"
                      }`}
                    >
                      {tournament.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tournament.name}</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    {tournament.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    Starts {new Date(tournament.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-yellow-400 mb-1">
                      <Trophy className="w-5 h-5 mx-auto" />
                    </div>
                    <div className="text-sm text-gray-400">Prize Pool</div>
                    <div className="font-bold">
                      {tournament.prizePool} {tournament.currency}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 mb-1">
                      <Users className="w-5 h-5 mx-auto" />
                    </div>
                    <div className="text-sm text-gray-400">Participants</div>
                    <div className="font-bold">
                      {tournament.participants}/{tournament.maxParticipants}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 mb-1">
                      <Shield className="w-5 h-5 mx-auto" />
                    </div>
                    <div className="text-sm text-gray-400">Format</div>
                    <div className="font-bold">{tournament.format}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 mb-1">
                      <Star className="w-5 h-5 mx-auto" />
                    </div>
                    <div className="text-sm text-gray-400">Entry Fee</div>
                    <div className="font-bold">
                      {tournament.entryFee} {tournament.currency}
                    </div>
                  </div>
                </div>

                {tournament.status === "registration" && (
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-blue-900/30 transition transform hover:scale-105 flex items-center justify-center">
                    Register Now <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}

                {tournament.status === "ongoing" && (
                  <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-green-900/30 transition transform hover:scale-105 flex items-center justify-center">
                    View Matches <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                )}

                {tournament.status === "upcoming" &&
                  !tournament.restrictions && (
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-500 hover:to-pink-600 text-white rounded-lg font-bold shadow-lg shadow-purple-900/30 transition transform hover:scale-105 flex items-center justify-center">
                      Get Notified <Bell className="w-5 h-5 ml-2" />
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage;
