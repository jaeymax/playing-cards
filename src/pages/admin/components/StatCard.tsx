import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h4 className="text-2xl font-bold mt-1">{value}</h4>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div
        className={`mt-2 text-sm ${
          isPositive ? "text-green-400" : "text-red-400"
        }`}
      >
        {change}
      </div>
    </div>
  );
};

export default StatCard;
