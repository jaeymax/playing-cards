import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TournamentRegistrationModal from "./TournamentRegistrationModal";
import LoginRequiredModal from "./LoginRequiredModal";
import PhoneNumberRequiredModal from "./PhoneNumberRequiredModal";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { customLog, getToken } from "@/utils/Functions";

interface TournamentData {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  format: string;
  cretaed_at: string;
  updated_at: string;
  winner_id: number | null;
  prize: number;
  is_current: boolean;
  registration_fee: number;
  registration_closing_date: string;
  registered: boolean;
}

const useCountdown = (targetDate: string) => {
  const calculateTimeLeft = () => {
    if (!targetDate) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isExpired, setIsExpired] = useState(
    !targetDate || new Date(targetDate).getTime() <= new Date().getTime()
  );

  useEffect(() => {
    // Recalculate immediately when targetDate changes
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    setIsExpired(
      !targetDate || new Date(targetDate).getTime() <= new Date().getTime()
    );

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return { timeLeft, isExpired };
};

const TournamentSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto">
            <div className="h-6 bg-gray-700 rounded mb-2 w-40 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-60 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center w-full sm:w-auto">
              <div className="h-8 bg-gray-700 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-700 rounded w-24 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TournamentBanner: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [phoneNumberRequiredModalOpen, setPhoneNumberRequiredModalOpen] =
    useState(false);

  const [tournamentData, setTournamentData] = useState<TournamentData | null>(
    null
  );

  const { user } = useAppContext();

  const { timeLeft, isExpired } = useCountdown(
    tournamentData?.registered
      ? tournamentData?.start_date || ""
      : tournamentData?.registration_closing_date || ""
  );

  const formatCountdown = () => {
    const { days, hours, minutes, seconds } = timeLeft;
    return days > 0
      ? `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`
      : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleJoinTournament = () => {
    if(tournamentData?.status === "completed"){
      navigate(`/tournaments/${tournamentData?.id}/?tab=standings`);
      return;
    }
    else if(tournamentData?.status === "ongoing"){
      navigate(`/tournaments/${tournamentData?.id}/?tab=bracket`);
      return;
    }
   return navigate(`/tournaments/${tournamentData?.id}`);
  };

  const getTournamentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseUrl}/tournaments/weekly/current`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user ? user.id : null }),
      });
      if (response.ok) {
        const { data } = await response.json();
        customLog("Tournament Data:", data);
        setTournamentData(data);
      } else {
        console.error("Failed to fetch tournament details");
      }
    } catch (err) {
      console.error("Error fetching tournament details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (getToken() && !user) return;
    getTournamentDetails();
  }, [user]);

  const handleRegistration = () => {
 
    navigate(`/tournaments/${tournamentData?.id}`);
  };

  if (isLoading) {
    return <TournamentSkeleton />;
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center lg:text-left">
              {tournamentData?.name}
            </h3>
            <p className="text-gray-300 text-center lg:text-left">
              Prize pool: {tournamentData ? tournamentData.prize : 0} GHC
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center w-full sm:w-auto">
              <div className="text-2xl font-bold text-white">
                {tournamentData && !isExpired ? formatCountdown() : ""}
              </div>
              <div className="text-sm text-gray-400">
                {isExpired
                  ? tournamentData?.registered
                    ? tournamentData?.status == "completed"
                      ? "Tournament ended"
                      : "Tournament started"
                    : "Registration closed"
                  : tournamentData?.registered
                  ? "Tournament starts in"
                  : "Registration ends in"}
              </div>
            </div>
            {!tournamentData?.registered ? (
              <button
                onClick={handleRegistration}
                disabled={!tournamentData}
                className={`w-full sm:w-auto px-6 py-2 ${
                  !tournamentData || isExpired
                    ? "bg-gray-600"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transform transition hover:scale-105"
                } text-white font-medium rounded-lg`}
              >
                {isExpired ? "Spectate" : "Register Now"}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {tournamentData?.status !== "completed" && (
                  <button
                    className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white font-medium rounded-lg"
                    disabled
                  >
                    Registered
                  </button>
                )}
                <button
                  onClick={handleJoinTournament}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-lg transform transition hover:scale-105"
                >
                  {tournamentData?.status == "completed"
                    ? "View Results"
                    : "Join Lobby"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <TournamentRegistrationModal
        id={tournamentData ? tournamentData.id : 0}
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        countdown={formatCountdown()}
        registrationFee={tournamentData ? tournamentData.registration_fee : 0}
        getTournamentDetails={getTournamentDetails}
        prizePool={tournamentData ? tournamentData.prize : 0}
      />
      <PhoneNumberRequiredModal
        isOpen={phoneNumberRequiredModalOpen}
        onClose={() => setPhoneNumberRequiredModalOpen(false)}
        onPhoneNumberAdded={() => {
          setPhoneNumberRequiredModalOpen(false);
          setIsRegistrationModalOpen(true);
        }}
      />
      <LoginRequiredModal
        isOpen={isLoginRequiredModalOpen}
        onClose={() => setIsLoginRequiredModalOpen(false)}
      />
    </div>
  );
};

export default TournamentBanner;
