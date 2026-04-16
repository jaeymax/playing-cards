import React from "react";
import { Round } from "@/types/tournament";
import { TournamentLobbyData} from "@/pages/Tournaments/types";

interface TimelineWidgetProps {
  status?: string;
  loading?: boolean;
  tournamentData: TournamentLobbyData | null;
}

// interface Tournament {
//   id: number;
//   name: string;
//   start_date: string;
//   status: "upcoming" | "ongoing" | "completed";
//   format: string;
//   prize: string;
//   registration_fee: string;
//   current_round_number: number;
// }

// interface Participant {
//   id: number;
//   username: string;
//   image_url: string;
//   rank: string;
//   status: string;
//   wins: number;
//   losses: number;
// }

// interface Rule {
//   id: number;
//   title: string;
//   content: string;
// }

// interface TournamentData {
//   success: boolean;
//   tournament: Tournament;
//   participants: TournamentParticipant[];
//   rounds: Round[];
//   rules: Rule[];
// }

const TimelineWidget: React.FC<TimelineWidgetProps> = ({
  status,
  loading = false,
  tournamentData,
}) => {
  const generateTimeLine = (tournamentData: TournamentLobbyData) => {
    if (!tournamentData) return [];

    const rounds = tournamentData.rounds;
    const currentRound = tournamentData.tournament.current_round_number;
    const numberOfParticipants = tournamentData.participants.length;

    const calculateTotalRounds = (participants: number): number => {
      if (participants <= 1) return 0;
      return Math.ceil(Math.log2(participants));
    };

    (status)

    const totalRounds = calculateTotalRounds(numberOfParticipants);
    const roundsMap = new Map(rounds.map((r) => [r.round, r]));

    const renderRoundName = (round: number) => {
      if(tournamentData.tournament.format == "Swiss"){
        return "Round " + round;
      }
      const roundsFromEnd = totalRounds - round;
      if (roundsFromEnd === 0) return "Finals";
      if (roundsFromEnd === 1) return "Semi Finals";
      if (roundsFromEnd === 2) return "Quarter Finals";
      if (roundsFromEnd === 3) return "Round of 16";
      if (roundsFromEnd === 4) return "Round of 32";
      if (roundsFromEnd === 5) return "Round of 64";
      return "Round " + round;
    };

    const isRoundCompleted = (roundData: Round): boolean => {
      return roundData.matches.length > 0 && roundData.matches.every((match) => match.winner_id !== null);
    };

    const isRoundPending = (roundData: Round): boolean => {
      return roundData.matches.every((match) => match.status === 'pending');
    }

    const timelineItems = [];

    for (let roundNumber = 1; roundNumber <= totalRounds; roundNumber++) {
      let roundStatus: "completed" | "active" | "upcoming" = "upcoming";
      let timeLabel = "Upcoming";

      const roundData = roundsMap.get(roundNumber);

      if (roundData) {
        const isCompleted = isRoundCompleted(roundData);
        const isPending = isRoundPending(roundData);

        if(isPending) {
          roundStatus = "upcoming";
          timeLabel = "Upcoming";
        }
        else if (isCompleted) {
          roundStatus = "completed";
          timeLabel = "Completed";
        } else if (roundNumber === currentRound) {
          roundStatus = "active";
          timeLabel = "In Progress";
        }
      } else if (roundNumber < currentRound) {
        roundStatus = "completed";
        timeLabel = "Completed";
      } else if (roundNumber === currentRound) {
        roundStatus = "upcoming";
        timeLabel = "Upcoming";
      }

      timelineItems.push({
        phase: renderRoundName(roundNumber),
        status: roundStatus,
        time: timeLabel,
      });
    }

    return timelineItems;
  };

  const timeline = tournamentData ? generateTimeLine(tournamentData) : [];

  const TimelineSkeleton: React.FC = () => (
    <div className="bg-gray-800 md:rounded-lg border-t border-b md:border border-gray-700 p-4">
      <div className="h-6 bg-gray-700 rounded animate-pulse w-40 mb-4"></div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full mt-1.5 bg-gray-700 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-28"></div>
              <div className="h-3 bg-gray-700 rounded animate-pulse w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return <TimelineSkeleton />;
  }

  return (
    <div className="bg-gray-800 md:rounded-lg border-t border-b md:border border-gray-700 p-4">
      <h3 className="text-lg font-bold text-white mb-4">Tournament Timeline</h3>
      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`w-3 h-3 rounded-full mt-1.5 ${
                item.status === "completed"
                  ? "bg-green-500"
                  : item.status === "active"
                  ? "bg-blue-500 animate-pulse"
                  : "bg-gray-600"
              }`}
            />
            <div>
              <p className="text-white font-medium">{item.phase}</p>
              <p className="text-sm text-gray-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineWidget;
