import React from "react";

interface TimelineWidgetProps {
  status?: string;
  loading?: boolean;
}

const TimelineWidget: React.FC<TimelineWidgetProps> = ({
  status,
  loading = false,
}) => {
  const timeline = [
    { phase: "Registration", status: "completed", time: "Ended 2h ago" },
    { phase: "Group Stage", status: "active", time: "In Progress" },
    { phase: "Quarter Finals", status: "upcoming", time: "Starts in 2h" },
    { phase: "Semi Finals", status: "upcoming", time: "Mar 15, 2:00 PM" },
    { phase: "Finals", status: "upcoming", time: "Mar 15, 4:00 PM" },
  ];

  const TimelineSkeleton: React.FC = () => (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <div className="h-6 bg-gray-700 rounded animate-pulse w-40 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-1.5 bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-28"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <TimelineSkeleton />;
  }

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

export default TimelineWidget;
