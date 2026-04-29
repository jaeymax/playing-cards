import  { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { baseUrl } from "@/config/api";
import { useNavigate } from "react-router-dom";

interface Champion {
  id: string;
  name: string;
  score: number;
  losses: number;
  image_url: string;
  rank: "gold" | "silver" | "bronze";
}


const WeeklySwissChampions = () => {


      const rankConfig: Record<
        number,
        { bg: string; border: string; text: string; medal: string }
      > = {
        1: {
          bg: "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10",
          border: "border-yellow-500/40",
          text: "text-yellow-300",
          medal: "🥇",
        },
        2: {
          bg: "bg-gradient-to-r from-slate-400/20 to-slate-500/10",
          border: "border-slate-400/40",
          text: "text-slate-200",
          medal: "🥈",
        },
        3: {
          bg: "bg-gradient-to-r from-orange-600/20 to-orange-700/10",
          border: "border-orange-600/40",
          text: "text-orange-300",
          medal: "🥉",
        },
      };
    
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      const [champions, setChampions] = useState<Champion[]>([]);
        const [tournamentId, setTournamentId] = useState<number | null>(null);
        const navigate = useNavigate();
    
      (error)
    
      const getWeeklyChampions = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${baseUrl}/tournaments/swiss/results`
          );
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(
              response.status === 500
                ? "Network error. Please check your internet connection."
                : "Failed to fetch weekly champions"
            );
          }
    
          setChampions(data.winners);
          setTournamentId(data.tournamentId);
        } catch (err: any) {
          console.log("Error fetching weekly champions", err);
          setError(err.message || "An error occured. Please try again");
          //setLoading(false);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getWeeklyChampions();
      }, []);
    
      const handleViewFullStandings = () => {
        if(tournamentId) {
          navigate(`/tournaments/${tournamentId}?tab=standings`);
        } 
      };

      if(!champions || champions.length == 0)return null;


    return (
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50 shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Weekly Champions</h2>
              <p className="text-xs text-gray-400">Swiss Round Tournament</p>
            </div>
          </div>
    
          {/* Champions List */}
          <div className="space-y-2">
            {loading
              ? [...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-700 backdrop-blur-sm transition-all hover:shadow-md animate-pulse"
                  >
                    <div className="flex items-center justify-center w-8 h-8  bg-gray-">
                      <span className="text-xl w-4 h-4 bg-gray-700 rounded-full"></span>
                    </div>
    
                    <div className="w-9 h-9 rounded-full border border-gray-600 flex-shrink-0"></div>
    
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-semibold rounded-sm w-24 h-5 bg-gray-700 truncate`}
                      ></p>
                    </div>
    
                    <span className="text-xs w-7 h-5 font-bold text-gray-300 bg-gray-700/50 px-2 py-1 rounded"></span>
                  </div>
                ))
              : champions.map((champion, index) => {
                  const config = rankConfig[index + 1];
                  return (
                    <div
                      key={champion.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border backdrop-blur-sm transition-all hover:shadow-md ${config.bg} ${config.border}`}
                    >
                      {/* Rank & Medal */}
                      <div className="flex items-center justify-center w-8">
                        <span className="text-xl">{config.medal}</span>
                      </div>
    
                      {/* Avatar */}
                      <div className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-600 flex-shrink-0" >
                      {
                        champion.image_url?(
                          <img
                            src={champion.image_url}
                            alt={champion.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ):(
                          <span className="text-sm text-white">👤</span>
                        )
                      }
                      </div>
    
                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold truncate ${config.text}`}
                        >
                          {champion.name}
                        </p>
                      </div>
                      {/* Wins - Losses*/}
                      <span className="text-xs font-bold text-gray-300 bg-gray-700/50 px-2 py-1 rounded">
                        {champion.score}W-{champion.losses}L
                      </span>
                    </div>
                  );
                })}
          </div>
    
          {/* CTA Button */}
          <button onClick={handleViewFullStandings} className="w-full mt-6 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg text-sm font-semibold transition-all shadow-lg hover:bg-blue-700">
            View Full Standings
          </button>
        </div>
      );
}

export default WeeklySwissChampions
