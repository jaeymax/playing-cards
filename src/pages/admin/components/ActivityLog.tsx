import React from "react";

interface AdminActivity {
  id: number;
  admin: string;
  action: string;
  target: string;
  timestamp: Date;
  details: string;
}

const ActivityLog: React.FC = () => {
  const activities: AdminActivity[] = [
    {
      id: 1,
      admin: "Admin1",
      action: "banned",
      target: "User123",
      timestamp: new Date(),
      details: "Multiple violations of community guidelines",
    },
    // Add more activities...
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Admin Activity Log</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-gray-750 rounded-lg p-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium text-blue-400">
                  {activity.admin}
                </span>
                <span className="text-gray-300"> {activity.action} </span>
                <span className="font-medium text-red-400">
                  {activity.target}
                </span>
              </div>
              <span className="text-sm text-gray-400">
                {activity.timestamp.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">{activity.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityLog;
