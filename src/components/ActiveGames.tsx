import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlayCircle, Clock, Users, Trophy} from 'lucide-react';

const ActiveGames = () => {
  const activeGames = [
    {
      id: 1,
      title: "Tournament Finals",
      players: 8,
      timeElapsed: "45:23",
      status: "In Progress",
      type: "Tournament",
      prize: "5000 Points"
    },
    {
      id: 2,
      title: "Daily Challenge",
      players: 24,
      timeElapsed: "12:05",
      status: "Registration",
      type: "Challenge",
      prize: "1000 Points"
    }
  ];

  return (
    <div className="w-full max-w-md rounded-md test shadow-md border border-gray-600/20">
      <CardHeader className="border-b border-gray-600/10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-green-500" />
            Active Games
          </CardTitle>
          <span className="text-sm text-green-500 font-semibold">
            {activeGames.length} Active
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {activeGames.map((game) => (
            <div key={game.id} className="header rounded-lg p-4 hover:bg-gray-800 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-white">{game.title}</h3>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded-full">
                  {game.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{game.players} Players</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{game.timeElapsed}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm">{game.prize}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default ActiveGames;