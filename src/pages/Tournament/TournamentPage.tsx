import React, { useState } from "react";
import TournamentHeader from "./components/TournamentHeader";
import TournamentBracket from "./components/TournamentBracket";
import Participants from "./components/Participants";
import PrizePool from "./components/PrizePool";
import TournamentRules from "./components/TournamentRules";

const TournamentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "bracket" | "participants" | "rules"
  >("bracket");

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <TournamentHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex space-x-4 border-b border-gray-700">
                {["bracket", "participants", "rules"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === "bracket" && <TournamentBracket />}
                {activeTab === "participants" && <Participants />}
                {activeTab === "rules" && <TournamentRules />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <PrizePool />
            <TimelineWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineWidget: React.FC = () => {
  const timeline = [
    { phase: "Registration", status: "completed", time: "Ended 2h ago" },
    { phase: "Group Stage", status: "active", time: "In Progress" },
    { phase: "Quarter Finals", status: "upcoming", time: "Starts in 2h" },
    { phase: "Semi Finals", status: "upcoming", time: "Mar 15, 2:00 PM" },
    { phase: "Finals", status: "upcoming", time: "Mar 15, 4:00 PM" },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <h3 className="text-lg font-bold text-white mb-4">Tournament Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`w-3 h-3 rounded-full mt-1.5 ${
                item.status === "completed"
                  ? "bg-green-500"
                  : item.status === "active"
                  ? "bg-blue-500"
                  : "bg-gray-600"
              }`}
            />
            <div>
              <p className="text-white font-medium">{item.phase}</p>
              <p className="text-sm text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentPage;
