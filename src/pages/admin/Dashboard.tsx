import { useState } from "react";
import {
  Users,
  Activity,
  Trophy,
  Calendar,
  ChevronUp,
  Ban,
  Flag,
  Settings,
  Plus,
  Edit,
  Trash,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalUsers: 15420,
    activeUsers: 1250,
    totalGames: 45280,
    ongoingGames: 126,
    dailyActiveUsers: [
      { date: "2024-03-01", count: 1200 },
      { date: "2024-03-02", count: 1350 },
      { date: "2024-03-03", count: 1100 },
      { date: "2024-03-04", count: 1400 },
      { date: "2024-03-05", count: 1250 },
    ],
    recentReports: [
      {
        id: 1,
        type: "user",
        reporter: "Player123",
        reported: "ToxicPlayer",
        reason: "Harassment",
        status: "pending",
      },
      {
        id: 2,
        type: "bug",
        reporter: "User456",
        issue: "Game freeze",
        priority: "high",
        status: "investigating",
      },
    ],
    activeTournaments: [
      {
        id: 1,
        name: "Spring Championship",
        participants: 128,
        status: "ongoing",
      },
      {
        id: 2,
        name: "Weekly Tournament",
        participants: 64,
        status: "registration",
      },
    ],
  };

  // const users = [
  //   {
  //     id: 1,
  //     username: "Player123",
  //     status: "active",
  //     gamesPlayed: 156,
  //     reports: 0,
  //     joinDate: "2024-02-15",
  //   },
  //   {
  //     id: 2,
  //     username: "ToxicPlayer",
  //     status: "warned",
  //     gamesPlayed: 89,
  //     reports: 3,
  //     joinDate: "2024-02-10",
  //   },
  // ];

  const announcements = [
    {
      id: 1,
      title: "Server Maintenance",
      type: "system",
      status: "scheduled",
      date: "2024-03-15",
    },
    {
      id: 2,
      title: "New Season Starting",
      type: "event",
      status: "draft",
      date: "2024-03-20",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Admin Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="hidden md:flex ml-10 space-x-6">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`font-medium transition ${
                    activeTab === "overview"
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`font-medium transition ${
                    activeTab === "users"
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab("tournaments")}
                  className={`font-medium transition ${
                    activeTab === "tournaments"
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Tournaments
                </button>
                <button
                  onClick={() => setActiveTab("reports")}
                  className={`font-medium transition ${
                    activeTab === "reports"
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Reports
                </button>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition relative">
                <Flag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 flex items-center justify-center rounded-full">
                  3
                </span>
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                New Announcement
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Users</p>
                <h3 className="text-2xl font-bold text-white">
                  {stats.totalUsers}
                </h3>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <ChevronUp className="w-4 h-4 mr-1" />
                  12% this week
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Active Users</p>
                <h3 className="text-2xl font-bold text-white">
                  {stats.activeUsers}
                </h3>
                <p className="text-sm text-green-400 flex items-center mt-1">
                  <ChevronUp className="w-4 h-4 mr-1" />
                  8% today
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Games</p>
                <h3 className="text-2xl font-bold text-white">
                  {stats.totalGames}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {stats.ongoingGames} ongoing
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Active Tournaments</p>
                <h3 className="text-2xl font-bold text-white">
                  {stats.activeTournaments.length}
                </h3>
                <p className="text-sm text-blue-400 mt-1">View details</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">User Activity</h2>
              <div className="h-64 w-full">
                {/* Add your chart component here */}
                <div className="w-full h-full bg-gray-750 rounded-lg border border-gray-700 p-4">
                  Chart placeholder - User activity over time
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
              <div className="space-y-4">
                {stats.recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          report.type === "user"
                            ? "bg-red-500/20"
                            : "bg-yellow-500/20"
                        }`}
                      >
                        {report.type === "user" ? (
                          <Ban className="w-5 h-5 text-red-400" />
                        ) : (
                          <Flag className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="font-medium">
                          {report.type === "user"
                            ? `${report.reporter} reported ${report.reported}`
                            : report.issue}
                        </div>
                        <div className="text-sm text-gray-400">
                          {report.type === "user"
                            ? report.reason
                            : `Priority: ${report.priority}`}
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tournaments */}
            <div className="lg:col-span-2 bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Active Tournaments</h2>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition text-sm">
                  Create Tournament
                </button>
              </div>
              <div className="space-y-4">
                {stats.activeTournaments.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{tournament.name}</h3>
                        <p className="text-sm text-gray-400">
                          {tournament.participants} participants
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            tournament.status === "ongoing"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {tournament.status}
                        </span>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                          <Settings className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Recent Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-gray-750 rounded-lg border border-gray-700 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{announcement.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              announcement.type === "system"
                                ? "bg-red-500/20 text-red-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {announcement.type}
                          </span>
                          <span className="text-sm text-gray-400">
                            {announcement.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg transition">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg transition">
                          <Trash className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
