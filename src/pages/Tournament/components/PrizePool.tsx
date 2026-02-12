import React from "react";

interface PrizePoolProps {
  prize: string | undefined;
  registrationFee: string | undefined;
  loading?: boolean;
}

const PrizePool: React.FC<PrizePoolProps> = ({
  prize,
  registrationFee,
  loading = false,
}) => {
  if (prize === "0" && registrationFee === "0") {
  }

  const prizes = [
    {
      position: "1st Place",
      reward: "🥇",
      extra: "Championship Qualifier",
    },
    {
      position: "2nd Place",
      reward: "🥈",
      extra: "Championship Qualifier",
    },
    {
      position: "3rd Place",
      reward: "🥉",
      extra: "Championship Qualifier",
    },
  ];

  const PrizePoolSkeleton: React.FC = () => (
    <div className="bg-gray-800 md:rounded-lg border-t border-b md:border border-gray-700 p-4">
      <div className="h-6 bg-gray-700 rounded animate-pulse w-32 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 bg-gray-750 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-24"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <PrizePoolSkeleton />;
  }

  return (
    <div className="bg-gray-800 md:rounded-lg border-t border-b md:border border-gray-700 p-4">
      <h3 className="text-lg font-bold text-white mb-4">Prize Pool</h3>
      <div className="space-y-4">
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="flex items-center gap-4 borde p-3 bg-gray-750 rounded-lg"
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
            <div className = 'flex gap-5'>
              <p className="text-white font-medium">{prize.position}</p>
              <p className="text-2xl text-blue-400">{prize.reward}</p>
              {/* <p className="text-xs text-gray-400">{prize.extra}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizePool;
