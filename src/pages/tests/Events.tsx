import { useState } from "react";
import {
  Calendar,
  Trophy,
  Clock,
  Users,
  Star,
  ChevronRight,
  Target,
} from "lucide-react";

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock events data
  const events = [
    {
      id: 1,
      type: "tournament",
      title: "Cosmic Championship Series",
      status: "ongoing",
      startDate: "Mar 15, 2025",
      endDate: "Mar 18, 2025",
      prizePool: "50,000",
      participants: 128,
      maxParticipants: 256,
      format: "Double Elimination",
      entryFee: "1,000",
      rewards: [
        { position: "1st", reward: "25,000", icon: "🏆" },
        { position: "2nd", reward: "15,000", icon: "🥈" },
        { position: "3rd", reward: "10,000", icon: "🥉" },
      ],
      banner: "/api/placeholder/800/200",
    },
    {
      id: 2,
      type: "special",
      title: "Lunar New Year Festival",
      status: "upcoming",
      startDate: "Mar 20, 2025",
      endDate: "Mar 27, 2025",
      description:
        "Collect special lunar-themed cards and earn exclusive rewards!",
      rewards: [
        { type: "card", name: "Celestial Dragon", rarity: "Legendary" },
        { type: "currency", amount: "5,000", currency: "coins" },
      ],
      banner: "/api/placeholder/800/200",
    },
    {
      id: 3,
      type: "tournament",
      title: "Weekend Warriors Cup",
      status: "upcoming",
      startDate: "Mar 25, 2025",
      endDate: "Mar 26, 2025",
      prizePool: "10,000",
      participants: 32,
      maxParticipants: 64,
      format: "Single Elimination",
      entryFee: "500",
      banner: "/api/placeholder/800/200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar - similar to other pages */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gray-900/80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </h1>
            </div>

            {/* Currency and profile section */}
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
        <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-blue-400 mr-3" />
              <h1 className="text-2xl font-bold">Events & Tournaments</h1>
            </div>

            {/* Event Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-700">
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "upcoming"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "ongoing"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("ongoing")}
              >
                Ongoing
              </button>
              <button
                className={`px-4 py-2 font-medium transition border-b-2 ${
                  activeTab === "past"
                    ? "text-blue-400 border-blue-400"
                    : "text-gray-400 border-transparent hover:text-white"
                }`}
                onClick={() => setActiveTab("past")}
              >
                Past Events
              </button>
            </div>

            {/* Event Grid */}
            <div className="grid gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-750 rounded-xl border border-gray-700 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={event.banner}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <div className="flex items-center mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            event.status === "ongoing"
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                          }`}
                        >
                          {event.status === "ongoing" ? "LIVE NOW" : "UPCOMING"}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.startDate} - {event.endDate}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    {event.type === "tournament" ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-yellow-400 mb-1">
                            <Trophy className="w-5 h-5 mx-auto" />
                          </div>
                          <div className="text-sm text-gray-400">
                            Prize Pool
                          </div>
                          <div className="font-bold">{event.prizePool} CR</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 mb-1">
                            <Users className="w-5 h-5 mx-auto" />
                          </div>
                          <div className="text-sm text-gray-400">
                            Participants
                          </div>
                          <div className="font-bold">
                            {event.participants}/{event.maxParticipants}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-400 mb-1">
                            <Target className="w-5 h-5 mx-auto" />
                          </div>
                          <div className="text-sm text-gray-400">Format</div>
                          <div className="font-bold">{event.format}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 mb-1">
                            <Star className="w-5 h-5 mx-auto" />
                          </div>
                          <div className="text-sm text-gray-400">Entry Fee</div>
                          <div className="font-bold">{event.entryFee} CR</div>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="text-gray-300 mb-4">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.rewards?.map((reward, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-gray-800 rounded-full text-sm border border-gray-700"
                            >
                              {'type' in reward ? (reward.type === "card" ? "🃏" : "💰") : reward.icon}{" "}
                              {'type' in reward ? (reward.name || reward.amount) : reward.reward}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white rounded-lg font-bold shadow-lg shadow-blue-900/30 transition transform hover:scale-105 flex items-center justify-center">
                      {event.type === "tournament"
                        ? "Register Now"
                        : "View Details"}
                      <ChevronRight className="w-5 h-5 ml-2" />
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

export default EventsPage;
