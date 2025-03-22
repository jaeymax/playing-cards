import React, { useState } from "react";
import ProfileHeader from "./components/ProfileHeader";
import Overview from "./components/Overview";
import MatchHistory from "./components/MatchHistory";
import Statistics from "./components/Statistics";
import Achievements from "./components/Achievements";
import ProfileSettings from "./components/ProfileSettings";
import { useAppContext } from "@/contexts/AppContext";

type ProfileTab =
  | "overview"
  | "matches"
  | "statistics"
  | "achievements"
  | "settings";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "matches", label: "Match History" },
    { id: "statistics", label: "Statistics" },
    { id: "achievements", label: "Achievements" },
    { id: "settings", label: "Settings" },
  ];

  const {user} = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <ProfileHeader />

      <div className="max-w-2xl w-full borde mx-auto px-4 py-8 ">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          {/* Tab Navigation */}
          <div className="border-b border-gray-700">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as ProfileTab)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && <Overview />}
            {activeTab === "matches" && <MatchHistory />}
            {activeTab === "statistics" && <Statistics />}
            {activeTab === "achievements" && <Achievements />}
            {activeTab === "settings" && <ProfileSettings />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
