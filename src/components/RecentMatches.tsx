import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlayCircle, Clock, Users, Trophy, Timer, ArrowUp, ArrowDown } from 'lucide-react';

const RecentMatches = () => {
    const matches = [
      {
        id: 1,
        game: "Tournament Match",
        result: "Victory",
        score: "+250",
        time: "2 hours ago",
        positive: true
      },
      {
        id: 2,
        game: "Ranked Match",
        result: "Defeat",
        score: "-120",
        time: "3 hours ago",
        positive: false
      },
      {
        id: 3,
        game: "Challenge Match",
        result: "Victory",
        score: "+180",
        time: "5 hours ago",
        positive: true
      }
    ];
  
    return (
      <Card className="w-full max-w-md bg-gray-00 bottom-nav border-gray-600/20 shadow-md mt-6">
        <CardHeader className="border-b border-gray-600/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Timer className="h-5 w-5 text-blue-500" />
              Recent Matches
            </CardTitle>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              View All
            </button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {matches.map((match) => (
              <div key={match.id} className="flex items-center justify-between p-3 rounded-lg hover:header header cursor-pointer transition-colors">
                <div className="flex items-center gap-3">
                  {match.positive ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{match.game}</p>
                    <p className="text-xs text-gray-400">{match.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${match.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {match.score}
                  </p>
                  <p className="text-xs text-gray-400">{match.result}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

export default RecentMatches;