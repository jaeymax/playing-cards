import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect } from "react";
import MatchModal from "./MatchModal";
import { TournamentStatus } from "@/pages/Tournaments/types";

interface Match {
  id: number;
  player1: {
    id: number;
    name: string;
    image_url: string;
    winner: boolean;
  };
  player2: {
    id: number;
    name: string;
    image_url: string;
    winner: boolean;
  };
  status: string;
  winner_id: number | null;
}

interface TournamentHeaderProps {
  name?: string;
  format?: string;
  status?: TournamentStatus
  numberOfParticipants?: number;
  prize?: string;
  current_round_number?: number;
  loading?: boolean;
  matches?: any[];
}

const TournamentHeader: React.FC<TournamentHeaderProps> = ({
  name,
  format,
  status,
  numberOfParticipants,
  prize,
  current_round_number,
  matches,
  loading,
}) => {
  const currentRoundName = () => {
    if(format == "Swiss") {
      return "Round " + current_round_number;
    }

    const totalRounds = Math.ceil(Math.log2(numberOfParticipants!)); // Assuming a fixed total rounds for simplicity
    const roundsFromEnd = totalRounds - current_round_number!;
    if (roundsFromEnd === 0) return "Finals";
    if (roundsFromEnd === 1) return "Semi Finals";
    if (roundsFromEnd === 2) return "Quarter Finals";
    if (roundsFromEnd === 3) return "Round of 16";
    if (roundsFromEnd === 4) return "Round of 32";
    if (roundsFromEnd === 5) return "Round of 64";
    return "Round " + current_round_number;
  };

  console.log("matches in header", matches);

  const { user } = useAppContext();
  const [myMatch, setMyMatch] = React.useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const current_round_matches = matches?.find(
    (match: any) => match.round == current_round_number
  );

  console.log("current round matches", current_round_matches);
  const totalMatches = current_round_matches?.matches.length;
  const ongoingMatches = current_round_matches?.matches.filter(
    (match: Match) => match.status == "in_progress"
  ).length;
  const completedMatches = current_round_matches?.matches.filter(
    (match: Match) => match.status == "completed"
  ).length;
  const forfeitedMatches = current_round_matches?.matches.filter(
    (match: Match) => match.status == "forfeited"
  ).length;
  // const upcommingMatches = current_round_matches?.matches.filter(
  //   (match: Match) => match.status == "pending"
  // ).length;

  console.log("total matches", totalMatches);

  useEffect(() => {
    if (!user) return;
    const getMyMatch = (matches: any[]) => {
      const roundData = matches.find((r) => r.round === current_round_number);
      if (!roundData) return null;
      const myMatch = roundData.matches.find(
        (match: any) =>
          match.player1.id === user?.id || match.player2.id === user?.id
      );
      return myMatch;
    };
    const match = matches ? getMyMatch(matches) : null;
    setMyMatch(match);
  }, [matches, user]);

  console.log("myMatch in header", myMatch);

  const SkeletonLoader = () => (
    <div className="space-y-2">
      <div className="h-8 bg-gray-700 rounded animate-pulse w-48"></div>
      <div className="h-4 bg-gray-700 rounded animate-pulse w-96"></div>
    </div>
  );

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 md:gap-4">
          <div className="w-full lg:w-auto">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                <div className="flex items-center gap-2 md:gap-3">
                  <h1 className="text-lg md:text-2xl font-bold text-white">
                    {name}
                  </h1>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                    {status}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  {numberOfParticipants} Players • {format} • {prize} GHC Prize
                  Pool
                </p>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-4 w-full lg:w-auto">
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-32"></div>
                <div className="h-6 bg-gray-700 rounded animate-pulse w-40"></div>
              </div>
            ) : (
              <div className="text-left md:text-righ">
                <p className="text-xs md:text-sm text-gray-400">
                  Current Round
                </p>
                <p className="text-base md:text-lg font-medium text-white">
                  {currentRoundName()}
                </p>
                {/* <div className="text-xs text-gray-400">Total Matches</div>
                <div className="text-xs text-gray-400">Ongoing</div>
                <div className="text-xs text-gray-400">Completed</div>
                <div className="text-xs text-gray-400">Forfeited</div> */}
              </div>
            )}
            <div className="borde w-28" >
              <div className="text-xs text-gray-400 flex justify-between">
                <span>Total Matches</span>
                <span>{totalMatches}</span>
              </div>
              <div className="text-xs text-gray-400 flex justify-between">
              <span>Ongoing</span>
              <span>{ongoingMatches}</span>
              </div>
              {/* <div className="text-xs text-gray-400 flex justify-between">
              <span>Upcoming</span>
               <span>{upcommingMatches}</span>
              </div> */}
              <div className="text-xs text-gray-400 flex justify-between">
              <span>Completed</span>
              <span>{completedMatches}</span>
              </div>
              <div className="text-xs text-gray-400 flex justify-between">
              <span>Forfeited</span>
               <span>{forfeitedMatches}</span>
              </div>
            </div>
            {myMatch && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3 md:px-4 py-2 text-sm md:text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={loading}
              >
                View Your Match
              </button>
            )}
            {/* <div>
            <div className="text-xs text-gray-400">Total Matches</div>
                <div className="text-xs text-gray-400">Ongoing</div>
                <div className="text-xs text-gray-400">Completed</div>
                <div className="text-xs text-gray-400">Forfeited</div>
            </div> */}
          </div>
        </div>
      </div>
      <MatchModal
        match={myMatch}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default TournamentHeader;
