import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TournamentLobbyData } from "./types";
import NavBar from "@/components/NavBar";
import { useAppContext } from "@/contexts/AppContext";
import Toast from "@/components/Toast";
import Participants from "@/pages/Tournament/components/Participants";
import TournamentOverview from "./components/TournamentOverview";
import TournamentBracket from "../Tournament/components/TournamentBracket";
import TournamentStandings from "../Tournament/components/TournamentStandings";
import TournamentRules from "./components/TournamentRules";
import { MessageSquare } from "lucide-react";
import TournamentFooter from "../Tournament/components/TournamentFooter";
// import TournamentHeader from "../Tournament/components/TournamentHeader";
import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import RegistrationModal from "./components/RegistrationModal";
import PhoneNumberRequiredModal from "../Home/components/PhoneNumberRequiredModal";
import TournamentHeader from "../Tournament/components/TournamentHeader";
import LobbyChatModal from "./components/LobbyChatModal";
import MatchForfeitedModal from "../Tournament/components/MatchForfeitedModal";
import TournamentEndedModal from "../Tournament/components/TournamentEndedModal";
import { useSocket } from "@/contexts/SocketProvider";
import TournamentInfo from "./components/TournamentInfo";
import LoginRequiredModal from "../Home/components/LoginRequiredModal";

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [registrationTimeLeft, setRegistrationTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [activeTab, setActiveTab] = useState<
    "overview" | "participants" | "bracket" | "standings" | "rules"
  >("overview");

  const [userRegistered, setUserRegistered] = useState(false);
  const { user } = useAppContext();
  const [showToast] = useState(false);
  const [shareToastMessage, setShareToastMessage] = useState("");
  const [showShareToast, setShowShareToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tournamentLobbyData, setTournamentLobbyData] =
    useState<TournamentLobbyData | null>(null);
  const [tournamentStarted, setTournamentStarted] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
   const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
      useState(false);
  const [phoneNumberRequiredModalOpen, setPhoneNumberRequiredModalOpen] =
    useState(false);
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const { socket } = useSocket();
  const [showTournamentEndedModal, setShowTournamentEndedModal] =
    useState<boolean>(false);
  const [showMatchForfeitedModal, setShowMatchForfeitedModal] =
    useState<boolean>(false);
  const [matchForfeitedMessage, setMatchForfeitedMessage] =
    useState<string>("");
    const [myGameCode, setMyGameCode] = useState<string>("");

    myGameCode && true;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (
      tab === "bracket" ||
      tab === "participants" ||
      tab === "rules" ||
      tab === "standings"
    ) {
      setActiveTab(tab);
    }
  }, []);

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
    console.log("tournamentFormat", tournamentLobbyData?.tournament.format);
    if (user?.id === data.loserId) {
      if (tournamentLobbyData?.tournament.format === "Swiss") {
        setMatchForfeitedMessage(
          "You have forfeited your match. You will receive 0 points for this round, but you still have a chance to advance to the next round. Check the standings tab for more details.",
        );
        return;
      } else if (
        tournamentLobbyData?.tournament.format === "Single Elimination"
      ) {
        setMatchForfeitedMessage(
          "You have forfeited your match. Unfortunately, you are now out of the tournament. Better luck next time!",
        );
      }
    } else {
      if (tournamentLobbyData?.tournament.format === "Swiss") {
        setMatchForfeitedMessage(
          "Your opponent has forfeited the match. You have advanced to the next round and will received 1 point for this round. Check the standings tab for more details.",
        );
        return;
      } else if (
        tournamentLobbyData?.tournament.format === "Single Elimination"
      ) {
        setMatchForfeitedMessage(
          "Your opponent has forfeited the match. Congratulations! You have advanced to the next stage of the tournament.",
        );
      }
    }

    // fetchTournamentData();
  };

  const extractGameCodeFromTournamentData = (
    data: TournamentLobbyData | null,
  ): string => {
    if (!data) return "";
    const current_round_number = data.tournament.current_round_number;
    const current_round_matches = data.rounds.find(
      (round) => round.round === current_round_number,
    )?.matches;
    customLog("current_round_matches", current_round_matches);
    const myMatch = current_round_matches?.find(
      (match) => match.player1.id === user?.id || match.player2.id === user?.id,
    );
    if (myMatch) {
      return myMatch.game_code;
    }
    return "";
  };



  const startDate = useMemo(
    () => tournamentLobbyData?.tournament.start_date,
    [tournamentLobbyData],
  );
  const registrationClosingDate = useMemo(
    () => tournamentLobbyData?.tournament.registration_closing_date,
    [tournamentLobbyData],
  );

  const getTournamentLobbyData = async () => {
    // make a get request to fetch the lobby data from /api/tournaments/lobby/{tournamentId}
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/tournaments/${id}/lobby`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
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
      const data = await response.json();
      setTournamentLobbyData(data);
       setMyGameCode(extractGameCodeFromTournamentData(data));
      setUserRegistered(data.tournament.registered);
      console.log("fetched tournament data", data);
    } catch (error) {
      console.error("Error fetching tournament data:", error);
      setError("Failed to load tournament lobby data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTournamentLobbyData();
  }, [id, user]);

  const lobbyUpdateCallback = (tournamentData: TournamentLobbyData) => {
      customLog("Received tournamentData via socket");
      setTournamentLobbyData(tournamentData);
      console.log("tournamentData via socket", tournamentData);
    };
  
    useEffect(() => {
      if (!user) return;
      if (!socket) return;
      if (!tournamentLobbyData) return;
      socket.emit("joinTournamentRoom", {
        tournamentId: id,
        userId: user?.id,
        gameCode: extractGameCodeFromTournamentData(tournamentLobbyData),
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
          gameCode: extractGameCodeFromTournamentData(tournamentLobbyData),
        });
      };
    }, [user, socket, tournamentLobbyData]);
  
    const handleTournamentEndedModalClose = () => {
      setShowTournamentEndedModal(false);
      setActiveTab("standings");
    };

  const calculateTimeLeft = (startDate: string) => {
    const difference = new Date(startDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    if (!startDate || tournamentLobbyData?.tournament.status !== "upcoming")
      return;
    const updateTimer = () => {
      const timeLeft = calculateTimeLeft(startDate);
      if (timeLeft) {
        setTimeLeft(timeLeft);
      }
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(timer);
  }, [startDate, tournamentLobbyData?.tournament.status]);

  useEffect(() => {
    if (
      !registrationClosingDate ||
      tournamentLobbyData?.tournament.status !== "upcoming"
    )
      return;
    const updateRegistrationTimer = () => {
      const timeLeft = calculateTimeLeft(registrationClosingDate);
      if (timeLeft) {
        setRegistrationTimeLeft(timeLeft);
      }
    };
    const timer = setInterval(updateRegistrationTimer, 1000);
    updateRegistrationTimer();
    return () => clearInterval(timer);
  }, [registrationClosingDate, tournamentLobbyData?.tournament.status]);

  const handleRegistrationClicked = () => {
    if (!user || user.is_guest) {
      setIsLoginRequiredModalOpen(true);
      return;
    }
    //Registration logic goes here
    if (!user.phone) {
      setPhoneNumberRequiredModalOpen(true);
    } else {
      setRegistrationModalOpen(true);
    }
    //setRegistrationModalOpen(true);
    // setUserRegistered(true);
  };



  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShareToastMessage("Tournament link copied to clipboard!");
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    });
  };

  const handleLobbyChat = () => {
    setChatModalOpen(true);
  };

  const getButtonState = () => {
    if (userRegistered) return "lobby";
    if (
      tournamentLobbyData &&
      tournamentLobbyData?.tournament.registered_participants >=
        tournamentLobbyData?.tournament.max_participants
    )
      return "full";
    if (
      registrationTimeLeft.days === 0 &&
      registrationTimeLeft.hours === 0 &&
      registrationTimeLeft.minutes === 0 &&
      registrationTimeLeft.seconds === 0
    )
      return "closed";

    return "register";
  };

  const getButtonConfig = (state: string) => {
    const configs: Record<
      string,
      { label: string; color: string; disabled: boolean }
    > = {
      register: {
        label: `Register - ${tournamentLobbyData?.tournament.registration_fee} GHC`,
        color:
          "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transform transition hover:scale-105",
        disabled: false,
      },
      lobby: {
        label: "Registered",
        color: "bg-gray-600 text-white font-medium rounded-lg",
        disabled: true,
      },
      full: {
        label: "Tournament Full",
        color: "from-gray-600 to-gray-700",
        disabled: true,
      },
      closed: {
        label: "Registration Closed",
        color: "bg-gray-600 text-white font-medium rounded-lg",
        disabled: true,
      },
    };
    return configs[state];
  };

  const buttonConfig = getButtonConfig(getButtonState());

 
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
      <Toast
        message={shareToastMessage || "Please Register or Sign in"}
        isVisible={showShareToast || showToast}
        onClose={() => {}}
      />

       {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-4 m-4 rounded-lg flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={getTournamentLobbyData}
            className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded font-medium text-sm"
          >
            Retry
          </button>
        </div>
      )}

   {
    tournamentLobbyData?.tournament.status !== "upcoming" && (
      <TournamentHeader
        name={tournamentLobbyData?.tournament.name}
        format={tournamentLobbyData?.tournament.format}
        status={tournamentLobbyData?.tournament.status}
        numberOfParticipants={
          tournamentLobbyData?.participants.length
        }
        prize={tournamentLobbyData?.tournament.prize}
        current_round_number={
          tournamentLobbyData?.tournament.current_round_number ?? 0
        }
        matches={tournamentLobbyData?.rounds ?? []}
        loading={loading}
      />

    )
   }

      <main className="md:container mx-auto md:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
           
            {
              tournamentLobbyData?.tournament.status === "upcoming" && (
                <TournamentInfo
                  tournament={tournamentLobbyData?.tournament}
                  userRegistered={userRegistered}
                  registrationTimeLeft={registrationTimeLeft}
                  buttonConfig={buttonConfig}
                  handleRegistration={handleRegistrationClicked}
                  handleShare={handleShare}
                />

              )
            }


            <button
              onClick={handleLobbyChat}
              aria-label="Open lobby chat"
              className="fixed right-4 bottom-24 z-50 p-4 rounded-full bg-blue-600 text-white shadow-2xl hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <MessageSquare size={20} />
            </button>
            <div className="bg-gray-800 w-full md:rounded-lg p-4 border-t border-b md:border border-gray-700">
              <div className="flex space-x-4 border-b border-gray-700 overflow-x-scroll scrollbar-hide">
                {[
                  "overview",
                  "participants",
                  "bracket",
                  "standings",
                  "rules",
                ].map((tab) => (
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
                    {tab === "participants" &&
                      tournamentLobbyData &&
                      tournamentLobbyData.tournament.registered_participants >
                        0 && (
                        <span className="bg-blue-400 w-6 rounded-full text-gray-800 text-xs flex items-center justify-center">
                          {
                            tournamentLobbyData?.tournament
                              .registered_participants
                          }
                        </span>
                      )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-6 w-full">
                {activeTab === "overview" && (
                  <TournamentOverview
                    tournament={tournamentLobbyData?.tournament}
                    loading={loading}
                    timeLeft={timeLeft}
                    // registrationTimeLeft={registrationTimeLeft}
                    buttonConfig={buttonConfig}
                    onRegistration={handleRegistrationClicked}
                  />
                )}

                {activeTab === "participants" && (
                  <Participants
                    participants={tournamentLobbyData?.participants}
                    tournamentFormat={tournamentLobbyData?.tournament.format}
                    loading={loading}
                  />
                )}

                {activeTab === "bracket" && (
                  <TournamentBracket
                    rounds={tournamentLobbyData?.rounds}
                    numberOfParticipants={
                      tournamentLobbyData?.participants.length
                    }
                    tournamentFormat={tournamentLobbyData?.tournament.format}
                    loading={loading}
                  />
                )}

                {activeTab === "standings" && (
                  <TournamentStandings
                    tournamentFormat={tournamentLobbyData?.tournament.format}
                    standings={tournamentLobbyData?.standings}
                    loading={loading}
                  />
                )}

                {activeTab === "rules" && (
                  <TournamentRules
                    tournamentFormat={tournamentLobbyData?.tournament.format}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>

          <TournamentFooter
            tournamentId={tournamentLobbyData?.tournament.id}
            tournamentStarted={tournamentStarted}
            tournamentStartTime={tournamentLobbyData?.tournament.start_date}
            setTournamentStarted={setTournamentStarted}
            isRegistered={userRegistered}
            tournamentStatus={tournamentLobbyData?.tournament.status}
            tournamentFormat={tournamentLobbyData?.tournament.format}
            matches={tournamentLobbyData?.rounds}
            currentRoundNumber={
              tournamentLobbyData?.tournament.current_round_number ?? 0
            }
            loading={loading}
          />
        </div>
      </main>
      <RegistrationModal
        isOpen={registrationModalOpen}
        tournamentId={tournamentLobbyData?.tournament.id}
        setUserRegistered={setUserRegistered}
        entryFee={tournamentLobbyData?.tournament.registration_fee}  
        onCancel={() => setRegistrationModalOpen(false)}
      />
      <PhoneNumberRequiredModal
        isOpen={phoneNumberRequiredModalOpen}
        onClose={() => setPhoneNumberRequiredModalOpen(false)}
        onPhoneNumberAdded={() => {
          setPhoneNumberRequiredModalOpen(false);
          setRegistrationModalOpen(true);
        }}
      />
       <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={() => setIsLoginRequiredModalOpen(false)}
      />
      <LobbyChatModal
        isOpen={chatModalOpen}
        onClose={() => setChatModalOpen(false)}
        tournamentId={id || ""}
      />
    </div>
  );
};

export default TournamentDetailsPage;
