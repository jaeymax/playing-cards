import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Round } from "@/types/tournament";
import { useAppContext } from "@/contexts/AppContext";
import { Match } from "@/types/tournament";
//import { customLog } from "@/utils/Functions";


const TournamentFooter: React.FC<{
  tournamentId: number | undefined;
  tournamentStarted: boolean;
  tournamentStartTime: Date | null;
  setTournamentStarted: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentStatus?: string;
  tournamentFormat?: string;
  loading?: boolean;
  matches?: Round[];
  currentRoundNumber: number;
}> = ({
  tournamentId,
  tournamentStarted,
  tournamentStartTime,
  setTournamentStarted,
  currentRoundNumber,
  tournamentStatus,
  tournamentFormat,
  loading = false,
  matches,
}) => {

  const { user } = useAppContext();
  
  const getMyMatch = (matches: Round[]): Match | undefined => {
    const roundData = matches.find((r) => r.round === currentRoundNumber);
    if (!roundData) return undefined;
    const myMatch = roundData.matches.find(
      (match) => match.player1.id === user?.id || match.player2.id === user?.id
    );

    //console.log('my Match', myMatch?.turn_ends_at)
    return myMatch;
  };
  const myMatch: Match | undefined = matches ? getMyMatch(matches) : undefined;

  const [countdown, setCountdown] = useState<string>("");
  const [joinDeadlineCountdown, setJoinDeadlineCountdown] =
    useState<string>("");
  const [joinDeadlineTime, setJoinDeadlineTime] = useState<Date | null>(
   myMatch?.turn_ends_at ? new Date(myMatch.turn_ends_at) : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    setJoinDeadlineTime(myMatch?.turn_ends_at ? new Date(myMatch.turn_ends_at) : null);
  }, [myMatch]);
  

  //console.log("currentRoundMatches in Footer:", matches);
  //customLog("matches", matches);
  //customLog("joinDeadlineTime", joinDeadlineTime)


  // Determine user status
  const tournamentUpcoming = tournamentStatus === "upcoming";
  const tournamentOngoing = tournamentStatus === "ongoing";
  const tournamentEnded = tournamentStatus === "completed";
  const tournamentCanceled = tournamentStatus === "canceled";
 // const isForfeited = myMatch?.status === "forfeited";
  const isEliminated = () => {
    if(!myMatch) return true;
      
      else if(tournamentFormat == "Single Elimination"){
        return myMatch.winner_id != null && myMatch.winner_id !== user?.id;
      }
      return false;
  }
 //   !myMatch ||
   // (myMatch.status === "completed" && myMatch.winner_id !== user?.id && tournamentFormat == "Single Elimination");
  const isWaitingForNextRound = () => {
   // myMatch && myMatch.status === "completed" && myMatch.winner_id === user?.id;
    if(!myMatch) return false;
    if(tournamentFormat == "Swiss"){
      return myMatch.status === "completed" || myMatch.status === "forfeited";
    }
    else if(tournamentFormat == "Single Elimination"){
      return myMatch.winner_id === user?.id;
    }
    return false;

  };
  const canJoinMatch =
    myMatch && myMatch.status !== "completed" && tournamentStarted;

  const handleJoinMatch = () => {
    if (!myMatch?.game_code) {
      console.error("No game code available");
      return;
    }
    console.log("Joining match with code:", myMatch.game_code);
    navigate(`/game/${myMatch.game_code}`, {
      state: { gameType: "Tournament", format: tournamentFormat, tournamentId },
    });
  };

  useEffect(() => {
    if (tournamentStarted || !tournamentStartTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const diff = tournamentStartTime.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("");
        setTournamentStarted(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (days > 0) {
        setCountdown(`${days}d ${hours}h ${minutes}m`);
      } else if (hours > 0) {
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setCountdown(`${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [tournamentStartTime, tournamentStarted]);

  useEffect(() => {
    if (!tournamentStarted || !joinDeadlineTime) return;

    const updateJoinDeadline = () => {
      const now = new Date();
      const diff = joinDeadlineTime.getTime() - now.getTime();

      if (diff <= 0) {
        setJoinDeadlineCountdown("");
        return;
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setJoinDeadlineCountdown(
        `Match forfeits in ${minutes}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateJoinDeadline();
    const interval = setInterval(updateJoinDeadline, 1000);
    return () => clearInterval(interval);
  }, [tournamentStarted, joinDeadlineTime]);

  const FooterSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
          <div className="h-4 bg-gray-600 rounded animate-pulse w-24"></div>
        </div>
        <div className="h-9 bg-gray-600 rounded animate-pulse w-32"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 16px rgba(59, 130, 246, 0.8); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Left Side - Status and Timer */}
          <div className="flex items-center gap-6 min-w-0">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 shrink-0">
              <div
                className={`w-2 h-2 rounded-full ${
                  tournamentOngoing
                    ? "bg-green-400 animate-pulse"
                    : tournamentUpcoming
                    ? "bg-blue-400 animate-pulse"
                    : "bg-gray-500"
                }`}
              />
              <span
                className={`text-xs font-semibold uppercase tracking-wide ${
                  tournamentOngoing
                    ? "text-green-400"
                    : tournamentUpcoming
                    ? "text-blue-400"
                    : "text-gray-400"
                }`}
              >
                {tournamentOngoing
                  ? "Live"
                  : tournamentUpcoming
                  ? "Upcoming"
                  : tournamentEnded
                  ? "Ended"
                  : "Canceled"}
              </span>
            </div>

            {/* Countdown Timer - Show only for upcoming tournaments */}
            {tournamentUpcoming && countdown && (
              <p className="text-sm font-mono text-gray-300 shrink-0">
                {countdown}
              </p>
            )}

            {/* Join Deadline Timer - Show only for ongoing tournaments */}
            {tournamentOngoing && joinDeadlineCountdown && canJoinMatch && (
              <p className="text-xs text-red-400 font-mono shrink-0">
                {joinDeadlineCountdown}
              </p>
            )}
          </div>

          {/* Right Side - Action Button */}
          <div className="shrink-0">
            {tournamentUpcoming ? (
              <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-blue-900/40 text-blue-300 border border-blue-700/60">
                Waiting
              </div>
            ) : tournamentEnded ? (
              <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-gray-800 text-gray-300 border border-gray-600/60">
                Tournament Ended
              </div>
            ) : tournamentCanceled ? (
              <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-red-900/40 text-red-300 border border-red-700/60">
                Canceled
              </div>
            ) : isEliminated() ? (
              <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-red-900/40 text-red-300 border border-red-700/60">
                Eliminated
              </div>)
            // ) :
            // isForfeited ? 
            //   myMatch?.forfeiter_user_id === user?.id ? (<div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-red-900/40 text-red-300 border border-red-700/60">
            //     Eliminated
            //   </div>):(
            //     <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-yellow-900/40 text-yellow-300 border border-yellow-700/60">
            //     Waiting For Next Round
            //   </div>
            //   )
              
             : isWaitingForNextRound() ? (
              <div className="px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide bg-yellow-900/40 text-yellow-300 border border-yellow-700/60">
                Waiting For Next Round
              </div>
            ) :  (
              <button
                onClick={handleJoinMatch}
                disabled={!canJoinMatch}
                className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                  canJoinMatch
                    ? "bg-green-600 text-white hover:bg-green-500 active:scale-95"
                    : "bg-blue-600/40 text-blue-200 cursor-not-allowed animate-pulse-glow"
                }`}
              >
                {canJoinMatch ? "Join Match" : "Waiting"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentFooter;
