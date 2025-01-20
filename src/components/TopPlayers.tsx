
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Leaderboard = () => {
  // Sample data - replace with your actual data
  const players = [
    {
      rank: 1,
      username: "DragonMaster",
      score: 2840,
      winRate: 68,
      rankChange: 2,
      avatar: "/api/placeholder/32/32"
    },
    {
      rank: 2,
      username: "SpellWeaver",
      score: 2795,
      winRate: 65,
      rankChange: -1,
      avatar: "/api/placeholder/32/32"
    },
    {
      rank: 3,
      username: "MysticKnight",
      score: 2760,
      winRate: 62,
      rankChange: 1,
      avatar: "/api/placeholder/32/32"
    },
    {
      rank: 4,
      username: "ShadowBlade",
      score: 2715,
      winRate: 59,
      rankChange: 0,
      avatar: "/api/placeholder/32/32"
    },
    {
      rank: 5,
      username: "StormChaser",
      score: 2680,
      winRate: 57,
      rankChange: -2,
      avatar: "/api/placeholder/32/32"
    }
  ];

  const getRankIcon = (rank:any) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Trophy className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Trophy className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center font-bold">{rank}</span>;
    }
  };

  const getRankChangeIcon = (change:any) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  return (
    <Card className="w-full max-w-2xl bg-gray-900 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-center">Top Players</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-6 gap-4 px-4 py-2 text-sm font-semibold text-gray-400">
            <div className="col-span-1">Rank</div>
            <div className="col-span-2">Player</div>
            <div className="col-span-1 text-right">Score</div>
            <div className="col-span-1 text-right">Win Rate</div>
            <div className="col-span-1 text-center">Change</div>
          </div>

          {/* Player rows */}
          {players.map((player) => (
            <div 
              key={player.rank}
              className="grid grid-cols-6 gap-4 px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center">
                {getRankIcon(player.rank)}
              </div>

              {/* Player info */}
              <div className="col-span-2 flex items-center space-x-2">
                <img 
                  src={player.avatar} 
                  alt={player.username}
                  className="w-8 h-8 rounded-full bg-gray-600"
                />
                <span className="font-semibold truncate">{player.username}</span>
              </div>

              {/* Score */}
              <div className="col-span-1 flex items-center justify-end font-mono">
                {player.score}
              </div>

              {/* Win Rate */}
              <div className="col-span-1 flex items-center justify-end">
                <span className="px-2 py-1 rounded bg-gray-700 text-sm">
                  {player.winRate}%
                </span>
              </div>

              {/* Rank Change */}
              <div className="col-span-1 flex items-center justify-center space-x-1">
                {getRankChangeIcon(player.rankChange)}
                <span className={`text-sm ${
                  player.rankChange > 0 ? 'text-green-500' : 
                  player.rankChange < 0 ? 'text-red-500' : 
                  'text-gray-500'
                }`}>
                  {Math.abs(player.rankChange)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;