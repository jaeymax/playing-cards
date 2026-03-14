import React, { useEffect, useState } from "react";
import TournamentHeader from "./components/TournamentHeader";
import TournamentBracket from "./components/TournamentBracket";
import Participants from "./components/Participants";
import PrizePool from "./components/PrizePool";
import TournamentRules from "./components/TournamentRules";
import TournamentFooter from "./components/TournamentFooter";
import TimelineWidget from "./components/TimelineWidget";
//import TournamentResults from "./components/TournamentResults";
import TournamentEndedModal from "./components/TournamentEndedModal";
import MatchForfeitedModal from "./components/MatchForfeitedModal";
import TournamentStandings from "./components/TournamentStandings";
import { useParams } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";
import NavBar from "@/components/NavBar";
import { Round } from "@/types/tournament";
import { TournamentParticipant } from "../Tournaments/types";

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

// interface Participant {
//   id: number;
//   username: string;
//   image_url: string;
//   rank: string;
//   rating: number;
//   is_rated: boolean;
//   status: string;
//   wins: number;
//   score: number;
//   losses: number;
// }

interface Rule {
  id: number;
  title: string;
  content: string;
}

interface TournamentData {
  success: boolean;
  tournament: Tournament;
  participants: TournamentParticipant[];
  rounds: Round[];
  rules: Rule[];
  standings:any[]
}

const TournamentLobbyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "bracket" | "participants" | "rules" | "standings"
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
  const [error, setError] = useState<string | null>(null);
  const [showTournamentEndedModal, setShowTournamentEndedModal] =
    useState<boolean>(false);
  const [showMatchForfeitedModal, setShowMatchForfeitedModal] =
    useState<boolean>(false);
  const [matchForfeitedMessage, setMatchForfeitedMessage] =
    useState<string>("");
  const [isParticipant, setIsParticipant] = useState<boolean>(true);

  (isParticipant) && true;

  // get the current selected tab from the url query params and set it as the active tab on page load like tab=standings and set it as the active tab on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab === "bracket" || tab === "participants" || tab === "rules" || tab === "standings") {
      setActiveTab(tab);
    }
  }, []);

  myGameCode && true;

  const tournamentEndedCallback = () => {
    customLog("Tournament ended event received via socket");
    setShowTournamentEndedModal(true);
    //fetchTournamentData();
  };

  const matchForfeitedCallback = (data: {
    loserId: number;
    reason: string;
  }) => {
    customLog("Match forfeited event received via socket", data);
    setShowMatchForfeitedModal(true);
    console.log('tournamentFormat', tournamentData?.tournament.format);
    if (user?.id === data.loserId) {
      if(tournamentData?.tournament.format === "Swiss"){
        setMatchForfeitedMessage(
          "You have forfeited your match. You will receive 0 points for this round, but you still have a chance to advance to the next round. Check the standings tab for more details."
        );
        return;
      }else if(tournamentData?.tournament.format === "Single Elimination"){
        setMatchForfeitedMessage(
          "You have forfeited your match. Unfortunately, you are now out of the tournament. Better luck next time!"
        );
      }

    } else {
      if(tournamentData?.tournament.format === "Swiss"){
        setMatchForfeitedMessage(
          "Your opponent has forfeited the match. You have advanced to the next round and will received 1 point for this round. Check the standings tab for more details."
        );
        return;
      }else if(tournamentData?.tournament.format === "Single Elimination"){
        setMatchForfeitedMessage(
          "Your opponent has forfeited the match. Congratulations! You have advanced to the next stage of the tournament."
        );
      }
    }

    // fetchTournamentData();
  };

  const extractGameCodeFromTournamentData = (
    data: TournamentData | null
  ): string => {
    if (!data) return "";
    const current_round_number = data.tournament.current_round_number;
    const current_round_matches = data.rounds.find(
      (round) => round.round === current_round_number
    )?.matches;
    customLog("current_round_matches", current_round_matches);
    const myMatch = current_round_matches?.find(
      (match) => match.player1.id === user?.id || match.player2.id === user?.id
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
      setError(null);
      const response = await fetch(`${baseUrl}/tournaments/${id}/lobby`, {
        method: "GET",
        headers: { "Content-Type": "application/json", ...authHeaders() },
      });

      if (!response.ok) {
        if (response.status === 500) {
          setError(
            "Network problem: Please check your connection and try again."
          );
        } else {
          setError("Failed to fetch tournament data. Please try again.");
        }
        return;
      }

      const data: TournamentData = await response.json();
      setTournamentData(data);
      setMyGameCode(extractGameCodeFromTournamentData(data));
      const isparticipant = data.participants.some((p) => p.id === user?.id);
      setIsParticipant(isparticipant);
      // Set tournament start time from data if available
      if (data.tournament.start_date) {
        const startDate = new Date(data.tournament.start_date);
        setTournamentStartTime(startDate);
        setTournamentStarted(new Date() >= startDate);
      }
    } catch (error) {
      console.error("Error fetching tournament data:", error);
      setError("Failed to fetch tournament data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   // if (!user) return;
    fetchTournamentData();
  }, [id, user]);

  const lobbyUpdateCallback = (tournamentData: TournamentData) => {
    customLog("Received tournamentData via socket");
    setTournamentData(tournamentData);
    console.log("tournamentData via socket", tournamentData);
  };

  useEffect(() => {
    if (!user) return;
    if (!socket) return;
    if (!tournamentData) return;
    socket.emit("joinTournamentRoom", {
      tournamentId: id,
      userId: user?.id,
      gameCode: extractGameCodeFromTournamentData(tournamentData),
    });
    //socket?.emit('')
    socket.on("lobbyUpdate", lobbyUpdateCallback);
    socket.on("tournamentEnded", tournamentEndedCallback);
    socket.on("matchForfeit", matchForfeitedCallback);

    return () => {
      socket?.off("lobbyUpdate", lobbyUpdateCallback);
      socket.off("tournamentEnded", tournamentEndedCallback);
      socket.off("matchForfeit", matchForfeitedCallback);
      socket.emit("leaveTournamentRoom", {
        tournamentId: id,
        userId: user?.id,
        gameCode: extractGameCodeFromTournamentData(tournamentData),
      });
    };
  }, [user, socket, tournamentData]);

  const handleTournamentEndedModalClose = () => {
    setShowTournamentEndedModal(false);
    setActiveTab("standings");
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 pb-32">
      <NavBar showSignUps={true} />

      <TournamentEndedModal
        isOpen={showTournamentEndedModal}
        onClose={handleTournamentEndedModalClose}
      />

      <MatchForfeitedModal
        isOpen={showMatchForfeitedModal}
        onClose={() => setShowMatchForfeitedModal(false)}
        message={matchForfeitedMessage}
      />

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-4 m-4 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={fetchTournamentData}
            className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-medium text-sm"
          >
            Retry
          </button>
        </div>
      )}

      {!error && (
        <>
          <TournamentHeader
            name={tournamentData?.tournament.name}
            format={tournamentData?.tournament.format}
            status={tournamentData?.tournament.status}
            numberOfParticipants={tournamentData?.participants.length}
            prize={tournamentData?.tournament.prize}
            matches={tournamentData?.rounds}
            current_round_number={
              tournamentData?.tournament.current_round_number
            }
            loading={loading}
          />

          <div className="md:container mx-auto md:px-4 py-8 borde">
            {/* {tournamentData?.tournament.status === "completed" && (
              <div className="mb-8">
                <TournamentResults
                  participants={tournamentData?.participants || []}
                  tournament_status={tournamentData?.tournament?.status}
                  tournament_id={tournamentData?.tournament?.id}
                  number_of_rounds={tournamentData?.rounds.length}
                />
              </div>
            )} */}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 borde w-full">
              {/* Main Content */}
              <div className="lg:col-span-9 space-y-6">
                {/* Tab Navigation */}
                <div className="bg-gray-800 w-full md:rounded-lg p-4 border-t border-b md:border border-gray-700">
                  <div className="flex space-x-4 border-b border-gray-700 overflow-x-scroll scrollbar-hide">
                    {["bracket", "participants", "rules", "standings"].map(
                      (tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as any)}
                          className={`px-4 gap-3 flex py-2 text-sm font-medium capitalize ${
                            activeTab === tab
                              ? "text-blue-400 border-b-2 border-blue-400"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {tab}
                          {tab === "participants" && (
                            <span className="bg-blue-400 w-6 rounded-full text-gray-800">
                              {tournamentData?.participants.length}
                            </span>
                          )}
                        </button>
                      )
                    )}
                  </div>

                  {/* Tab Content */}
                  <div className="mt-6 w-full">
                    {activeTab === "bracket" && (
                      <TournamentBracket
                        rounds={tournamentData?.rounds}
                        numberOfParticipants={
                          tournamentData?.participants.length
                        }
                        tournamentFormat={tournamentData?.tournament.format}
                        loading={loading}
                      />
                    )}
                    {activeTab === "participants" && (
                      <Participants
                        participants={tournamentData?.participants}
                        loading={loading}
                      
                        tournamentFormat={tournamentData?.tournament.format}
                      />
                    )}
                    {activeTab === "rules" && (
                      <TournamentRules
                        loading={loading}
                        rules={tournamentData?.rules}
                      />
                    )}
                    {activeTab === "standings" && (
                      <TournamentStandings
                        tournamentId={tournamentData?.tournament.id}
                        tournamentFormat={tournamentData?.tournament.format}
                       standings={tournamentData?.standings}
                        numberOfParticipants={
                          tournamentData?.participants.length
                        }
                        loading={loading}
                      />
                    )}
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
                  tournamentData={tournamentData}
                />
              </div>
            </div>
          </div>

          <TournamentFooter
            tournamentId={tournamentData?.tournament.id}
            tournamentStarted={tournamentStarted}
            tournamentStartTime={tournamentStartTime}
            setTournamentStarted={setTournamentStarted}
            tournamentStatus={tournamentData?.tournament.status}
            tournamentFormat={tournamentData?.tournament.format}
            matches={tournamentData?.rounds}
            currentRoundNumber={
              tournamentData?.tournament.current_round_number ?? 0
            }
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default TournamentLobbyPage;
