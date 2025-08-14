import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

type Activity = {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: "achievement" | "rank" | "friend" | "tournament" | "game";
};

const RecentActivitiesPage: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      user: { name: "John Doe", avatar: "👤" },
      action: "achieved",
      target: "Master Card Player",
      timestamp: new Date("2024-01-20T15:30:00"),
      type: "achievement",
    },
    {
      id: 2,
      user: { name: "Alice Smith", avatar: "👩" },
      action: "ranked up to",
      target: "Diamond",
      timestamp: new Date("2024-01-20T14:15:00"),
      type: "rank",
    },
    // Add more activities...
  ];

  const getActivityStyle = (type: Activity["type"]) => {
    switch (type) {
      case "achievement":
        return "bg-yellow-500/10 text-yellow-400";
      case "rank":
        return "bg-purple-500/10 text-purple-400";
      case "friend":
        return "bg-blue-500/10 text-blue-400";
      case "tournament":
        return "bg-green-500/10 text-green-400";
      case "game":
        return "bg-red-500/10 text-red-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold">Recent Activities</h2>
          </div>

          <div className="divide-y divide-gray-700">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      <span className="text-lg">{activity.user.avatar}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.user.name}</span>
                      <span className="text-gray-400">{activity.action}</span>
                      <span
                        className={`px-2 py-1 rounded text-sm ${getActivityStyle(
                          activity.type
                        )}`}
                      >
                        {activity.target}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecentActivitiesPage;
