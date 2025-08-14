import React, { useState } from "react";
import NavBar from "@/config/NavBar";
import StatCard from "./components/StatCard";
import CreateAnnouncementModal from "./components/CreateAnnouncementModal";
import CreateTournamentModal from "./components/CreateTournamentModal";
import UserManagementTable from "./components/UserManagementTable";
import ActivityLog from "./components/ActivityLog";
import ReportsView from "./components/ReportsView";
import SystemStatus from "./components/SystemStatus";
import TournamentManagement from "./components/TournamentManagement";
import AnnouncementManagement from "./components/AnnouncementManagement";

type TabType =
  | "overview"
  | "users"
  | "tournaments"
  | "announcements"
  | "reports";

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);

  const stats = [
    { title: "Total Users", value: "15.2K", change: "+12%", icon: "👥" },
    { title: "Active Games", value: "1.2K", change: "+5%", icon: "🎮" },
    { title: "Tournament Players", value: "3.1K", change: "+8%", icon: "🏆" },
    { title: "Revenue", value: "$52.3K", change: "+15%", icon: "💰" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Create Announcement
            </button>
            <button
              onClick={() => setIsTournamentModalOpen(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
            >
              Create Tournament
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {["overview", "users", "tournaments", "announcements", "reports"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as TabType)}
                className={`px-4 py-2 -mb-px ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Dashboard Content */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActivityLog />
              <SystemStatus />
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && <UserManagementTable />}

        {/* Tournaments Tab */}
        {activeTab === "tournaments" && <TournamentManagement />}

        {/* Announcements Tab */}
        {activeTab === "announcements" && <AnnouncementManagement />}

        {/* Reports Tab */}
        {activeTab === "reports" && <ReportsView />}

        {/* Other tab contents */}
      </div>

      {/* Modals */}
      <CreateAnnouncementModal
        isOpen={isAnnouncementModalOpen}
        onClose={() => setIsAnnouncementModalOpen(false)}
      />
      <CreateTournamentModal
        isOpen={isTournamentModalOpen}
        onClose={() => setIsTournamentModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
