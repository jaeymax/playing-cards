import { baseUrl } from "@/config/api";
import { customLog } from "@/utils/Functions";
import React, { useEffect, useState } from "react";

interface Participant {
  id: number;
  username: string;
  image_url: string;
  wins: number;
  losses: number;
}

interface TournamentResultsProps {
  participants: Participant[];
  tournament_status:string,
  tournament_id:number,
  number_of_rounds:number,
}

const TournamentResults: React.FC<TournamentResultsProps> = ({
  participants,
  tournament_status,
  tournament_id,
  number_of_rounds
}) => {
  
  (participants && true)

  const [winners, setWinners] = useState<Participant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null)

  customLog('error', error)

  customLog('winners', winners)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${baseUrl}/tournaments/${tournament_id}/results/top-three`);
        const data = await response.json();
        if(!response.ok){
          throw new Error(
            response.status === 500
              ? "Network error. Please check your internet connection."
              : "Failed to fetch weekly champions"
          );
        }
        setWinners(data);
      } catch (err) {
        console.error(err, 'Failed to fetch results for tournament');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlaceMedal = (index: number) => {
    const medals = ["🥇", "🥈", "🥉"];
    return medals[index] || null;
  };

  const getRowBgColor = (index: number) => {
    if (index === 0)
      return "bg-gradient-to-r from-yellow900/20 to-transparent";
    if (index === 1) return "bg-gradient-to-r from-gray500/20 to-transparent";
    if (index === 2)
      return "bg-gradient-to-r from-orange900/20 to-transparent";
    return "hover:bg-gray-700/20";
  };

  if(tournament_status !== "completed")return null;

  if (loading) {
    return (
      <div className="bg-gray-800 md:rounded-lg p-8 border-t border-b md:border border-gray-700">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-64 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 md:rounded-lg p-6 md:p-12 border-t border-b md:border border-gray-700">
      <div className="space-y-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
          🏆 Tournament Results
        </h2>

        <div className="overflow-x-auto">
          <div className="font-bold" >Final Standings</div>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-600">
                <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Place
                </th>
                <th className="text-left py-4 px-4 md:px-6 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Player
                </th>
                <th className="text-center py-4 px-4 md:px-6 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Wins
                </th>
                <th className="text-center py-4 px-4 md:px-6 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Losses
                </th>
                <th className="text-center py-4 px-4 md:px-6 text-gray-400 font-semibold text-xs md:text-sm uppercase tracking-wider">
                  Record
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {winners?.map((participant, index) => {
                const medal = getPlaceMedal(index);
                return (
                  <tr
                    key={participant.id}
                    className={`transition-all duration-300 ${getRowBgColor(
                      index
                    )} ${index < 3 ? "font-semibold" : ""}`}
                  >
                    <td className="py-5 px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        {medal && (
                          <span className="text-2xl md:text-3xl">{medal}</span>
                        )}
                        <span
                          className={`text-sm md:text-base ${
                            index < 3 ? "text-yellow-400" : "text-gray-400"
                          }`}
                        >
                          #{index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {participant.image_url ? (
                            <img
                              src={participant.image_url}
                              alt={participant.username}
                              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-gray-600"
                            />
                          ) : (
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg">
                              👤
                            </div>
                          )}
                        </div>
                        <span className="text-white text-sm md:text-base truncate">
                          {participant.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-4 md:px-6 text-center">
                      <span className="text-green-500 font-bold text-sm md:text-base">
                        {participant.wins}
                      </span>
                    </td>
                    <td className="py-5 px-4 md:px-6 text-center">
                      <span className="text-red-400 font-bold text-sm md:text-base">
                        {number_of_rounds - participant.wins}
                      </span>
                    </td>
                    <td className="py-5 px-4 md:px-6 text-center">
                      <span className="text-gray-300 text-sm md:text-base">
                        {participant.wins}W-{number_of_rounds - participant.wins}L
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TournamentResults;
