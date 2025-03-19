import React from "react";

const Achievements: React.FC = () => {
  const achievements = [
    {
      id: "1",
      title: "Perfect Game",
      description: "Win a game with a perfect score",
      progress: 100,
      reward: "500 Gems",
      icon: "🎯",
      rarity: "legendary",
      unlocked: true,
      date: "2024-03-10",
    },
    {
      id: "2",
      title: "Tournament Victor",
      description: "Win a tournament",
      progress: 100,
      reward: "1000 Gems",
      icon: "🏆",
      rarity: "epic",
      unlocked: true,
      date: "2024-03-05",
    },
    {
      id: "3",
      title: "Winning Streak",
      description: "Win 10 games in a row",
      progress: 70,
      reward: "300 Gems",
      icon: "🔥",
      rarity: "rare",
      unlocked: false,
    },
  ];

  const getRarityStyle = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500";
      case "epic":
        return "from-purple-400 to-pink-500";
      case "rare":
        return "from-blue-400 to-indigo-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievement Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-750 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">12/20</div>
          <div className="text-sm text-gray-400">Achievements Unlocked</div>
        </div>
        <div className="bg-gray-750 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">3,500</div>
          <div className="text-sm text-gray-400">Total Gems Earned</div>
        </div>
        <div className="bg-gray-750 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">60%</div>
          <div className="text-sm text-gray-400">Completion Rate</div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`bg-gray-750 rounded-lg p-4 border border-gray-700 ${
              achievement.unlocked ? "opacity-100" : "opacity-60"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getRarityStyle(
                  achievement.rarity
                )} flex items-center justify-center text-2xl`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-white">
                  {achievement.title}
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  {achievement.description}
                </p>
                {achievement.unlocked ? (
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-sm">Completed!</span>
                    <span className="text-gray-400 text-sm">
                      {achievement.date}
                    </span>
                  </div>
                ) : (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2 transition-all"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                )}
                <div className="mt-2 text-sm text-blue-400">
                  Reward: {achievement.reward}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
