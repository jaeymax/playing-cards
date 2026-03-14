import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { TournamentLobbyData } from "./types";
import NavBar from "@/components/NavBar";
import { useAppContext } from "@/contexts/AppContext";
import Toast from "@/components/Toast";
import Participants from "@/pages/Tournament/components/Participants";
import TournamentOverview from "./components/TournamentOverview";
import TournamentBracket from "./components/TournamentBracket";
import TournamentStandings from "./components/TournamentStandings";
import TournamentRules from "./components/TournamentRules";
import { Share2 } from "lucide-react";
// import TournamentFooter from "../Tournament/components/TournamentFooter";
// import TournamentHeader from "../Tournament/components/TournamentHeader";
import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";

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
  const [showToast, setShowToast] = useState(false);
  const [shareToastMessage, setShareToastMessage] = useState("");
  const [showShareToast, setShowShareToast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tournamentLobbyData, setTournamentLobbyData] =
    useState<TournamentLobbyData | null>(null);
  const [tournamentStarted, setTournamentStarted] = useState(false);

  (error && tournamentStarted) && true;

  // const getTournament = (id: string): Tournament => {
  //   return {
  //     id: id,
  //     name: "Spar Weekend Championship",
  //     type: "Elimination",
  //     status: "upcoming",
  //     start_date: "2026-03-10T20:00:00Z",
  //     registration_closing_date: "2026-03-10T19:30:00Z",
  //     registration_fee: "5",
  //     prize: "10000",
  //     registered_participants: 14,
  //     max_participants: 32,
  //     format: "Swiss",
  //     difficulty: "advanced",
  //   };
  // };

  // const tournament = useMemo(() => getTournament(id || ""), [id]);
  const startDate = useMemo(() => tournamentLobbyData?.tournament.start_date, [tournamentLobbyData]);
  const registrationClosingDate = useMemo(
    () => tournamentLobbyData?.tournament.registration_closing_date,
    [tournamentLobbyData]
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
        throw new Error("Failed to fetch tournament data");
      }
      const data = await response.json();
      setTournamentLobbyData(data);
      console.log("fetched tournament data", data);
    } catch (error) {
      setError("Failed to load tournament lobby data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTournamentLobbyData();
  }, []);

  const calculateTimeLeft = (startDate: string) => {
    const difference = new Date(startDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      setTournamentStarted(true);
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
    if (!startDate || tournamentLobbyData?.tournament.status !== "upcoming") return;
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
    if (!registrationClosingDate || tournamentLobbyData?.tournament.status !== "upcoming") return;
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

  const handleRegistration = () => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
    setUserRegistered(true);
  };

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setShareToastMessage("Tournament link copied to clipboard!");
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2000);
    });
  };

  const getButtonState = () => {
    if (tournamentLobbyData?.tournament.status === "completed") return "results";
    if (tournamentLobbyData?.tournament.status === "ongoing") return "rounds";
    if (
      registrationTimeLeft.days === 0 &&
      registrationTimeLeft.hours === 0 &&
      registrationTimeLeft.minutes === 0 &&
      registrationTimeLeft.seconds === 0
    )
      return "closed";
    if (tournamentLobbyData && tournamentLobbyData?.tournament.registered_participants >= tournamentLobbyData?.tournament.max_participants)
      return "full";
    if (userRegistered) return "lobby";
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
        disabled: false,
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
      rounds: {
        label: "View Rounds",
        color:
          "from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
        disabled: false,
      },
      results: {
        label: "View Results",
        color:
          "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
        disabled: false,
      },
    };
    return configs[state];
  };

  const buttonConfig = getButtonConfig(getButtonState());

  // const tabs = [
  //   { id: "overview", label: "Overview", icon: "📋" },
  //   { id: "participants", label: "Participants", icon: "👥" },
  //   { id: "bracket", label: "Bracket / Rounds", icon: "🏆" },
  //   { id: "standings", label: "Standings", icon: "📊" },
  //   { id: "rules", label: "Rules", icon: "📖" },
  // ];

  // const mockParticipants = [
  //   {
  //     id: 1,
  //     username: "Player1",
  //     image_url: "",
  //     rank: "Gold",
  //     rating: 1800,
  //     is_rated: true,
  //     status: "qualified",
  //     score: 3,
  //     wins: 3,
  //     losses: 0,
  //   },
  //   {
  //     id: 2,
  //     username: "Player2",
  //     image_url: "",
  //     rank: "Silver",
  //     rating: 1600,
  //     is_rated: true,
  //     status: "active",
  //     score: 2,
  //     wins: 2,
  //     losses: 1,
  //   },
  //   {
  //     id: 3,
  //     username: "Player3",
  //     image_url: "",
  //     rank: "Bronze",
  //     rating: 1400,
  //     is_rated: true,
  //     status: "eliminated",
  //     score: 1,
  //     wins: 1,
  //     losses: 2,
  //   },
  // ];

  if (!tournamentLobbyData) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <h2 className="text-2xl">Tournament not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 text-gray-100 pb-32">
      <NavBar showSignUps={true} />
      <Toast
        message={shareToastMessage || "Please Register or Sign in"}
        isVisible={showShareToast || showToast}
        onClose={() => {}}
      />

      <main className="md:container mx-auto md:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Tournament Header */}
            <div className="px-4 md:px-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                {tournamentLobbyData ? tournamentLobbyData.tournament.name : "Loading Tournament..."}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-sm">
                      Starts:{" "}
                      {
                        tournamentLobbyData && (
                          <>
                          {new Date(tournamentLobbyData.tournament.start_date).toLocaleDateString()} at{" "}
                          {new Date(tournamentLobbyData.tournament.start_date).toLocaleTimeString()}
                          </>
                        )
                      }
                    </p>
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-full flex items-center justify-items-center bg-gray-700/60 hover:bg-gray-600 transition-colors"
                      title="Share tournament"
                    >
                      <Share2 size={16} className="text-gray-300" />
                    </button>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <p className="text-gray-400 text-sm">
                      Registration Closes:{" "}
                      {new Date(
                        tournament.registrationClosingDate
                      ).toLocaleDateString()}{" "}
                      at{" "}
                      {new Date(
                        tournament.registrationClosingDate
                      ).toLocaleTimeString()}
                    </p>
                  </div> */}
                  {tournamentLobbyData?.tournament.status === "upcoming" && (
                    <>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">
                            {timeLeft.days}
                          </div>
                          <div className="text-gray-400 text-xs">days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">
                            {timeLeft.hours}
                          </div>
                          <div className="text-gray-400 text-xs">hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">
                            {timeLeft.minutes}
                          </div>
                          <div className="text-gray-400 text-xs">mins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">
                            {timeLeft.seconds}
                          </div>
                          <div className="text-gray-400 text-xs">secs</div>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm items-center">
                        <p className="text-gray-400">Registration closes in:</p>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-400">
                            {registrationTimeLeft.days}
                          </div>
                          <div className="text-gray-400 text-xs">days</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-400">
                            {registrationTimeLeft.hours}
                          </div>
                          <div className="text-gray-400 text-xs">hours</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-400">
                            {registrationTimeLeft.minutes}
                          </div>
                          <div className="text-gray-400 text-xs">mins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-orange-400">
                            {registrationTimeLeft.seconds}
                          </div>
                          <div className="text-gray-400 text-xs">secs</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={handleRegistration}
                  disabled={buttonConfig.disabled}
                  className={`bg-gradient-to-r ${
                    buttonConfig.color
                  } text-white font-semibold py-2 px-6 rounded-lg transition-all whitespace-nowrap ${
                    buttonConfig.disabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {buttonConfig.label}
                </button>
              </div>
            </div>

            {/* Tab Navigation */}
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
                    {tab === "participants" && tournamentLobbyData && tournamentLobbyData.tournament.registered_participants > 0 && (
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
                    onRegistration={handleRegistration}
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

          {/* <TournamentFooter
            tournamentStarted={tournamentStarted}
            tournamentStartTime={tournamentLobbyData?.tournament.start_date}
            setTournamentStarted={setTournamentStarted}
            tournamentStatus={tournamentLobbyData?.tournament.status}
            tournamentFormat={tournamentLobbyData?.tournament.format}
            loading={loading}
            matches={tournamentLobbyData?.rounds}
            currentRoundNumber={tournamentLobbyData?.tournament.current_round_number as number}
          />
          */}
        </div>
      </main>
    </div>
  );
};

export default TournamentDetailsPage;
