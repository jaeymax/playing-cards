import React from "react";

const PrizePool: React.FC = () => {
  const prizes = [
    {
      position: "1st Place",
      reward: "500 Gems",
      extra: "Championship Qualifier",
    },
    {
      position: "2nd Place",
      reward: "300 Gems",
      extra: "Championship Qualifier",
    },
    {
      position: "3rd Place",
      reward: "200 Gems",
      extra: "Championship Qualifier",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <h3 className="text-lg font-bold text-white mb-4">Prize Pool</h3>
      <div className="space-y-4">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 bg-gray-750 rounded-lg"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                index === 0
                  ? "bg-yellow-500"
                  : index === 1
                  ? "bg-gray-400"
                  : "bg-orange-600"
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className="text-white font-medium">{prize.position}</p>
              <p className="text-sm text-blue-400">{prize.reward}</p>
              <p className="text-xs text-gray-400">{prize.extra}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizePool;
