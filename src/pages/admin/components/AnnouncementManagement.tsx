import React, { useState } from "react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: Date;
  type: "update" | "event" | "maintenance" | "news";
  priority: "high" | "medium" | "low";
  status: "active" | "scheduled" | "expired";
  author: string;
  views: number;
}

const AnnouncementManagement: React.FC = () => {
  const [announcements] = useState<Announcement[]>([
    {
      id: 1,
      title: "Major System Update 2.0",
      content:
        "New features including improved matchmaking and tournament system",
      date: new Date("2024-01-25T10:00:00"),
      type: "update",
      priority: "high",
      status: "scheduled",
      author: "Admin",
      views: 1520,
    },
    {
      id: 2,
      title: "Easter Event",
      content: "Special Easter-themed cards and limited-time rewards",
      date: new Date("2024-03-31T00:00:00"),
      type: "event",
      priority: "medium",
      status: "scheduled",
      author: "EventManager",
      views: 0,
    },
    {
      id: 3,
      title: "Weekly Maintenance",
      content: "Server maintenance and performance improvements",
      date: new Date("2024-01-22T03:00:00"),
      type: "maintenance",
      priority: "medium",
      status: "active",
      author: "SysAdmin",
      views: 892,
    },
    {
      id: 4,
      title: "New Card Collection",
      content: "Mythical Beasts collection now available",
      date: new Date("2024-01-20T12:00:00"),
      type: "news",
      priority: "high",
      status: "active",
      author: "ContentManager",
      views: 2341,
    },
    {
      id: 5,
      title: "Valentine's Day Special",
      content: "Love-themed event with exclusive rewards",
      date: new Date("2024-02-14T00:00:00"),
      type: "event",
      priority: "medium",
      status: "scheduled",
      author: "EventManager",
      views: 0,
    },
  ]);

  const getTypeStyle = (type: Announcement["type"]) => {
    switch (type) {
      case "update":
        return "bg-blue-500/10 text-blue-400";
      case "event":
        return "bg-green-500/10 text-green-400";
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-400";
      case "news":
        return "bg-purple-500/10 text-purple-400";
    }
  };

  const getStatusStyle = (status: Announcement["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400";
      case "scheduled":
        return "bg-blue-500/10 text-blue-400";
      case "expired":
        return "bg-gray-500/10 text-gray-400";
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Announcement Management</h2>
          <div className="flex gap-2">
            <select className="bg-gray-700 rounded-lg px-3 py-1 text-sm">
              <option value="all">All Types</option>
              <option value="update">Updates</option>
              <option value="event">Events</option>
              <option value="maintenance">Maintenance</option>
              <option value="news">News</option>
            </select>
            <select className="bg-gray-700 rounded-lg px-3 py-1 text-sm">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-700">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4 hover:bg-gray-750">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{announcement.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getTypeStyle(
                      announcement.type
                    )}`}
                  >
                    {announcement.type}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                      announcement.status
                    )}`}
                  >
                    {announcement.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{announcement.content}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>By: {announcement.author}</span>
                  <span>Views: {announcement.views}</span>
                  <span>Date: {announcement.date.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-500/10 text-blue-400 rounded hover:bg-blue-500/20">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-red-500/10 text-red-400 rounded hover:bg-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementManagement;
