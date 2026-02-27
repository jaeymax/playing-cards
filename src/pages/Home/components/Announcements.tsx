import React from "react";
import { Link } from "react-router-dom";

const Announcements: React.FC = () => {
  const announcements = [
    {
      id: 1,
      title: "New Card Pack Released!",
      content: "Explore the new Mystic Legends card collection.",
      date: "2h ago",
      type: "updat",
    },
    {
      id: 2,
      title: "Weekend Tournament",
      content: "Join our Spar weekly tournament this Friday.",
      date: "5h ago",
      type: "event",
    },
    {
      id: 3,
      title: "System Maintenance",
      content: "Scheduled maintenance on Friday 2 AM UTC.",
      date: "1d ago",
      type: "maintenance",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "update":
        return "🎉";
      case "event":
        return "🏆";
      case "maintenance":
        return "🔧";
      default:
        return "📢";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-bold text-white">Announcements</h2>
      </div>
      <div className="divide-y divide-gray-700">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="p-4 hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="text-xl">{getIcon(announcement.type)}</div>
              <div className="flex-1">
                <h3 className="text-white font-medium">{announcement.title}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {announcement.content}
                </p>
                <span className="text-xs text-gray-500 mt-2 block">
                  {announcement.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700">
        <Link
          to="/announcements"
          className="text-sm block text-blue-400 hover:text-blue-300 transition w-full text-center"
        >
          View All Announcements
        </Link>
      </div>
    </div>
  );
};

export default Announcements;
