import React, { useState } from "react";

export type ActivityType =
  | "TOURNAMENT_WIN"
  | "WIN_STREAK"
  | "RANK_UP"
  | "H2H_LOSS"
  | "H2H_WIN";

export interface ActivityItem {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  rankTitle?: string;
  type: ActivityType;
  title: string;
  timestamp: string;
  actionType?: "CHALLENGE" | "REMATCH" | "CONGRATULATE";
}

const mockActivities: ActivityItem[] = [
  {
    id: "act_1",
    userId: "usr_kofi",
    username: "Kofi Mensah",
    rankTitle: "Master",
    type: "TOURNAMENT_WIN",
    title: "Won the Friday Spar Championship 🏆",
    timestamp: "2m ago",
    actionType: "CHALLENGE",
  },
  {
    id: "act_2",
    userId: "usr_ama",
    username: "Ama Owusu",
    rankTitle: "Expert",
    type: "WIN_STREAK",
    title: "Reached a 7-game winning streak 🔥",
    timestamp: "15m ago",
    actionType: "CHALLENGE",
  },
  {
    id: "act_3",
    userId: "usr_kwame",
    username: "Kwame Asante",
    rankTitle: "Expert",
    type: "RANK_UP",
    title: "Promoted to Expert Division ⭐",
    timestamp: "1h ago",
    actionType: "CONGRATULATE",
  },
  {
    id: "act_4",
    userId: "usr_kojo",
    username: "Kojo",
    rankTitle: "Diamond",
    type: "H2H_LOSS",
    title: "Defeated you 10–7 in a match ⚔️",
    timestamp: "3h ago",
    actionType: "REMATCH",
  },
];

interface FriendActivityFeedProps {
  activities?: ActivityItem[];
  onAction?: (activity: ActivityItem) => void;
}

const FriendActivityFeed: React.FC<FriendActivityFeedProps> = ({
  activities = mockActivities,
  onAction,
}) => {
  const [activeActions, setActiveActions] = useState<Record<string, boolean>>(
    {}
  );

  const handleActionClick = (item: ActivityItem) => {
    setActiveActions((prev) => ({ ...prev, [item.id]: true }));
    if (onAction) onAction(item);

    // Reset feedback after 2s
    setTimeout(() => {
      setActiveActions((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const getEventBadge = (type: ActivityType) => {
    switch (type) {
      case "TOURNAMENT_WIN":
        return {
          icon: "🏆",
          color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "WIN_STREAK":
        return {
          icon: "🔥",
          color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        };
      case "RANK_UP":
        return {
          icon: "⭐",
          color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };
      case "H2H_LOSS":
        return {
          icon: "⚔️",
          color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        };
      case "H2H_WIN":
        return {
          icon: "🎉",
          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
    }
  };

  return (
    <div className="space-y-3">
      {activities.map((item) => {
        const badge = getEventBadge(item.type);
        const isLoading = activeActions[item.id];

        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-4 p-3.5 rounded-xl bg-gray-950/60 border border-gray-800/80 hover:border-gray-700 transition-all group"
          >
            {/* Left Info Group */}
            <div className="flex items-center gap-3 min-w-0">
              {/* Event Badge Icon */}
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border flex-shrink-0 ${badge.color}`}
              >
                {badge.icon}
              </div>

              {/* Text Content */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white truncate">
                    {item.username}
                  </span>
                  {item.rankTitle && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-400 font-medium">
                      {item.rankTitle}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 shrink-0">
                    • {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-300 font-medium truncate mt-0.5">
                  {item.title}
                </p>
              </div>
            </div>

            {/* Action CTA Button */}
            {item.actionType && (
              <button
                onClick={() => handleActionClick(item)}
                disabled={isLoading}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  item.actionType === "REMATCH"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
                    : item.actionType === "CHALLENGE"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sent
                  </span>
                ) : item.actionType === "REMATCH" ? (
                  "⚔️ Rematch"
                ) : item.actionType === "CHALLENGE" ? (
                  "⚔️ Challenge"
                ) : (
                  "👏 GG"
                )}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FriendActivityFeed;