import React from "react";
import { Link } from "react-router-dom";

const RecentActivities: React.FC = () => {
  const activities = [
    {
      id: 1,
      user: "Alex",
      action: "won a tournament",
      details: "Weekend Championship",
      time: "10m ago",
      icon: "🏆",
    },
    {
      id: 2,
      user: "Emma",
      action: "unlocked achievement",
      details: "Perfect Game",
      time: "30m ago",
      icon: "🌟",
    },
    {
      id: 3,
      user: "John",
      action: "reached level",
      details: "Level 50",
      time: "2h ago",
      icon: "⭐",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Recent Activities</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-gray-200">
                  <span className="font-medium text-blue-400">
                    {activity.user}
                  </span>{" "}
                  {activity.action}
                </p>
                <p className="text-sm text-gray-400">{activity.details}</p>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <Link
          to="/activities"
          className="text-sm block text-blue-400 hover:text-blue-300 transition w-full text-center"
        >
          View All Activities
        </Link>
      </div>
    </div>
  );
};

export default RecentActivities;
