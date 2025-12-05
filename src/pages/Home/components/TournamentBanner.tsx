import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TournamentRegistrationModal from "./TournamentRegistrationModal";

interface TournamentData {
  startDate: string;
  prizePool: number;
  qualifyingSpots: number;
}

const useCountdown = (targetDate: string) => {
  const calculateTimeLeft = () => {
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
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
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

const TournamentBanner: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered] = useState(false);

  // Mock tournament data - replace with actual API call
  const tournamentData: TournamentData = {
    startDate: "2025-12-04T20:00:00", // Example date
    prizePool: 1000,
    qualifyingSpots: 3,
  };

  const { timeLeft, isExpired } = useCountdown(tournamentData.startDate);

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
    navigate("/tournaments/lobby/1");
  };

  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-auto">
            <h3 className="text-xl font-bold text-white mb-2 text-center lg:text-left">
              Weekend Tournament
            </h3>
            <p className="text-gray-300 text-center lg:text-left">
              Prize pool: {tournamentData.prizePool} Gems | Top{" "}
              {tournamentData.qualifyingSpots} players qualify for Championships
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="text-center w-full sm:w-auto">
              <div className="text-2xl font-bold text-white">
                {!isExpired && formatCountdown()}
              </div>
              <div className="text-sm text-gray-400">
                {/* {isRegistered ? "Tournament Starts In " : ""} */}
                {isExpired ? "Registration closed" : "Registration ends in"}
              </div>
            </div>
            {!isRegistered ? (
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isExpired}
                className={`w-full sm:w-auto px-6 py-2 ${
                  isExpired
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 transform transition hover:scale-105"
                } text-white font-medium rounded-lg`}
              >
                {isExpired ? "Registration Ended" : "Register Now"}
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white font-medium rounded-lg"
                  disabled
                >
                  Registered
                </button>
                <button
                  onClick={handleJoinTournament}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-lg transform transition hover:scale-105"
                >
                  Join
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <TournamentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        countdown={formatCountdown()}
      />
    </div>
  );
};

export default TournamentBanner;
