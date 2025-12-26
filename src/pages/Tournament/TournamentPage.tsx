import React, { useEffect, useState } from "react";
import TournamentHeader from "./components/TournamentHeader";
import TournamentBracket from "./components/TournamentBracket";
import Participants from "./components/Participants";
import PrizePool from "./components/PrizePool";
import TournamentRules from "./components/TournamentRules";
import TournamentFooter from "./components/TournamentFooter";
import TimelineWidget from "./components/TimelineWidget";
import { useParams } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";

interface Tournament {
  id: number;
  name: string;
  start_date: string;
  status: "upcoming" | "ongoing" | "completed";
  format: string;
  prize: string;
  registration_fee: string;
  current_round_number: number;
}

interface Participant {
  id: number;
  username: string;
  image_url: string;
  rank: string;
  status: string;
  wins: number;
  losses: number;
}

interface Player {
  id: number;
  name: string;
  image_url: string;
  score: number;
  winner: boolean;
}

interface Match {
  id: number;
  player1: Player;
  player2: Player;
  status: "pending" | "in_progress" | "completed" | "forfeited";
  game_id: number;
  game_code: string;
  winner_id: number | null;
}

interface Round {
  round: number;
  matches: Match[];
}

interface TournamentData {
  success: boolean;
  tournament: Tournament;
  participants: Participant[];
  rounds: Round[];
}

const TournamentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "bracket" | "participants" | "rules"
  >("bracket");

  const { user } = useAppContext();
  const [tournamentData, setTournamentData] = useState<TournamentData | null>(
    null
  );
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  const [tournamentStartTime, setTournamentStartTime] = useState<Date | null>(
    null
  );
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [myGameCode, setMyGameCode] = useState<string>("");

  const extractGameCodeFromTournamentData = (data: TournamentData): string => {
    const current_round_number = data.tournament.current_round_number;
    const current_round_matches = data.rounds.find(
      (round) => round.round === current_round_number
    )?.matches;
    customLog("current_round_matches", current_round_matches);
    const myMatch = current_round_matches?.find(
      (match) =>
        match.player1.id === user?.id ||
        match.player2.id === user?.id
    );
    if (myMatch) {
      return myMatch.game_code;
    }
    return "";
  };

  const { id } = useParams();

  customLog("tournament data", tournamentData);

  const fetchTournamentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/tournaments/${id}/lobby`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...authHeaders() },
      });
      const data: TournamentData = await response.json();
      setTournamentData(data);
      setMyGameCode(extractGameCodeFromTournamentData(data));

      // Set tournament start time from data if available
      if (data.tournament.start_date) {
        const startDate = new Date(data.tournament.start_date);
        setTournamentStartTime(startDate);
        setTournamentStarted(new Date() >= startDate);
      }
    } catch (error) {
      console.error("Error fetching tournament data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!user) return;
    fetchTournamentData();
  }, [id, user]);


  const lobbyUpdateCallback = (tournamentData: TournamentData) => {
    customLog("Received tournamentData via socket");
    setTournamentData(tournamentData);
    console.log('tournamentData via socket', tournamentData);
  }

  useEffect(() => {
    if (!user) return;
    if(!socket) return;
    socket?.emit("joinTournamentRoom", {
      tournamentId: id,
      userId: user.id,
    });
    socket?.on("lobbyUpdate", lobbyUpdateCallback);

    return () => {
      socket?.off("lobbyUpdate", lobbyUpdateCallback);
    };

  }, [user, socket]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-32">
      <TournamentHeader
        name={tournamentData?.tournament.name}
        format={tournamentData?.tournament.format}
        status={tournamentData?.tournament.status}
        numberOfParticipants={tournamentData?.participants.length}
        prize={tournamentData?.tournament.prize}
        current_round_number={tournamentData?.tournament.current_round_number}
        loading={loading}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex space-x-4 border-b border-gray-700">
                {["bracket", "participants", "rules"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? "text-blue-400 border-b-2 border-blue-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6">
                {activeTab === "bracket" && (
                  <TournamentBracket
                    rounds={tournamentData?.rounds}
                    numberOfParticipants={tournamentData?.participants.length}
                    loading={loading}
                  />
                )}
                {activeTab === "participants" && (
                  <Participants
                    participants={tournamentData?.participants}
                    loading={loading}
                  />
                )}
                {activeTab === "rules" && <TournamentRules loading={loading} />}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <PrizePool
              prize={tournamentData?.tournament.prize}
              registrationFee={tournamentData?.tournament.registration_fee}
              loading={loading}
            />
            <TimelineWidget
              status={tournamentData?.tournament.status}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <TournamentFooter
        tournamentStarted={tournamentStarted}
        tournamentStartTime={tournamentStartTime}
        setTournamentStarted={setTournamentStarted}
        tournamentStatus={tournamentData?.tournament.status}
        matches={tournamentData?.rounds}
        currentRoundNumber={tournamentData?.tournament.current_round_number ?? 0}
        loading={loading}
      />
    </div>
  );
};

export default TournamentPage;
