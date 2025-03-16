import React from "react";

const TournamentRules: React.FC = () => {
  const rules = [
    {
      title: "Format",
      content:
        "Double elimination bracket. Best of 3 matches until finals. Finals are Best of 5.",
    },
    {
      title: "Timing",
      content:
        "Players have 2 minutes per turn. Three timeouts allowed per match.",
    },
    {
      title: "Advancement",
      content:
        "Winners advance through upper bracket. Losers get one more chance in lower bracket.",
    },
    {
      title: "Disconnections",
      content:
        "Two reconnect attempts allowed per match. Exceed this and forfeit the game.",
    },
  ];

  return (
    <div className="space-y-6">
      {rules.map((rule, index) => (
        <div key={index} className="bg-gray-750 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">{rule.title}</h4>
          <p className="text-gray-300">{rule.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TournamentRules;
