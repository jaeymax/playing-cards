import React, { useState } from "react";
import FriendsList from "./components/FriendsList";
import FriendRequests from "./components/FriendRequests";
import SearchFriends from "./components/SearchFriends";
import OnlineFriends from "./components/OnlineFriends";
import RecentlyPlayed from "./components/RecentlyPlayed";
import NavBar from "@/components/NavBar";

type TabType = "all" | "online" | "requests" | "search";

const FriendsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  const tabs: { id: TabType; label: string; count?: number }[] = [
    { id: "all", label: "All Friends", count: 48 },
    { id: "online", label: "Online", count: 12 },
    { id: "requests", label: "Requests", count: 3 },
    { id: "search", label: "Add Friends" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {true} />
      <div className="container mx-auto md:px-4 py8 borde">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700" >
          <h2 className="text-xl font-bold text-white flex items-center" >Friends</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 borde">
            {/* Tabs */}
            <div className="bg-gray-800 md:rounded-lg md:border md:border-gray-700 overflow-hidden">
              <div className="border-b border-gray-700">
                <div className="flex scrollbar-hide md:scrollbar-auto overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-400 hover:text-white"
                      }`}
                    >
                      {tab.label}
                      {tab.count && (
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            activeTab === tab.id
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {activeTab === "all" && <FriendsList />}
                {activeTab === "online" && <OnlineFriends />}
                {activeTab === "requests" && <FriendRequests />}
                {activeTab === "search" && <SearchFriends />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
          <RecentlyPlayed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
