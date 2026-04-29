import React from "react";

interface Rule{
  id: number;
  title:string;
  content:string;
}

interface TournamentRulesProps {
  loading?: boolean;
  rules:Rule[] | undefined
}

const TournamentRules: React.FC<TournamentRulesProps> = ({
  loading = false,
  rules
}) => {
  // const rules = [
  //   {
  //     title: "Format",
  //     content:
  //       "Double elimination bracket. Best of 3 matches until finals. Finals are Best of 5.",
  //   },
  //   {
  //     title: "Timing",
  //     content:
  //       "Players have 2 minutes per turn. Three timeouts allowed per match.",
  //   },
  //   {
  //     title: "Advancement",
  //     content:
  //       "Winners advance through upper bracket. Losers get one more chance in lower bracket.",
  //   },
  //   {
  //     title: "Disconnections",
  //     content:
  //       "Two reconnect attempts allowed per match. Exceed this and forfeit the game.",
  //   },
  // ];

  const RulesSkeleton: React.FC = () => (
    <div className="space-y-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="bg-gray-750 rounded-lg p-4">
          <div className="h-6 bg-gray-700 rounded animate-pulse w-32 mb-2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
            <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <RulesSkeleton />;
  }

  return (
    <div className="space-y-6">
      {rules?.map((rule, index) => (
        <div key={index} className="bg-gray-750 rounded-lg p-4">
          <h4 className="text-sm md:text-lg font-medium text-white mb-2">{rule.title}</h4>
          <p className="text-gray-300">{rule.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TournamentRules;
