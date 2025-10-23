import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "../../components/Footer";

type Announcement = {
  id: number;
  title: string;
  content: string;
  date: Date;
  type: "update" | "event" | "maintenance" | "news";
  priority: "high" | "medium" | "low";
};

const AnnouncementsPage: React.FC = () => {
  const announcements: Announcement[] = [
    {
      id: 1,
      title: "New Tournament System",
      content:
        "We're introducing a new tournament system with better matchmaking and rewards! Players will now be matched based on their skill rating and tournament history. The new system includes dynamic prize pools and automated bracket generation.",
      date: new Date("2024-01-20T10:00:00"),
      type: "update",
      priority: "high",
    },
    {
      id: 2,
      title: "Weekend Event: Double XP",
      content:
        "Earn double XP this weekend in all game modes! Perfect time to level up and unlock new card backs and emotes.",
      date: new Date("2024-01-19T15:00:00"),
      type: "event",
      priority: "medium",
    },
    {
      id: 3,
      title: "Server Maintenance",
      content:
        "Scheduled maintenance on January 25th, 2-4 AM UTC. During this time, the game will be unavailable as we upgrade our server infrastructure.",
      date: new Date("2024-01-18T09:00:00"),
      type: "maintenance",
      priority: "high",
    },
    {
      id: 4,
      title: "New Card Collection: Mythic Legends",
      content:
        "Introducing our newest card collection featuring legendary creatures and mythical beings. Available in the shop now!",
      date: new Date("2024-01-17T14:30:00"),
      type: "news",
      priority: "high",
    },
    {
      id: 5,
      title: "Community Challenge: Million Games",
      content:
        "Help us reach 1 million games played this month! Track progress on the community tab. Special rewards for all players when achieved.",
      date: new Date("2024-01-16T11:00:00"),
      type: "event",
      priority: "medium",
    },
    {
      id: 6,
      title: "Balance Updates Coming Soon",
      content:
        "Major balance changes coming next week. Changes include adjustments to high-win-rate cards and buffs to underused strategies.",
      date: new Date("2024-01-15T16:45:00"),
      type: "update",
      priority: "high",
    },
    {
      id: 7,
      title: "Mobile App Beta Testing",
      content:
        "Join our mobile app beta testing program! Limited spots available. Sign up through your profile settings.",
      date: new Date("2024-01-14T13:20:00"),
      type: "news",
      priority: "medium",
    },
    {
      id: 8,
      title: "Weekly Server Maintenance",
      content:
        "Regular server maintenance scheduled for Tuesday, 3-4 AM UTC. Minor disruptions expected.",
      date: new Date("2024-01-13T08:00:00"),
      type: "maintenance",
      priority: "low",
    },
    {
      id: 9,
      title: "Seasonal Rewards Distribution",
      content:
        "Winter season rewards have been distributed! Check your inventory for exclusive card backs and profile frames.",
      date: new Date("2024-01-12T10:30:00"),
      type: "news",
      priority: "medium",
    },
    {
      id: 10,
      title: "Valentine's Event Preview",
      content:
        "Get ready for our upcoming Valentine's themed event! Special edition cards and romantic card backs coming soon.",
      date: new Date("2024-01-11T15:15:00"),
      type: "event",
      priority: "low",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {true} />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-bold">Announcements</h2>
          </div>

          <div className="divide-y divide-gray-700">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-6 hover:bg-gray-750 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {announcement.title}
                    </h3>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded ${getTypeStyle(
                        announcement.type
                      )}`}
                    >
                      {announcement.type.charAt(0).toUpperCase() +
                        announcement.type.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {announcement.date.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;
