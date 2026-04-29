import { useAppContext } from "@/contexts/AppContext";

interface ScoresTableProps {
  players: any[];
}

const ScoresTable = ({ players }: ScoresTableProps) => {
  const { user } = useAppContext();
  if(players.length === 0){
    return null;
  }

  return (
     
    <div className="absolute bottom-0 left-0 max-w-[150px] m-2">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-xs text-left text-white">Player</th>
            <th className="text-xs text-right text-white">Wins</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="text-xs text-white">
                {player.user.is_bot
                  ? "Computer"
                  : player.user.id === user?.id
                  ? "You"
                  : player.user.username}
              </td>
              <td className="text-xs text-right text-white">
                {player.games_won || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresTable;
