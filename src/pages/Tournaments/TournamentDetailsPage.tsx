import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Tournament } from "./types";
import NavBar from "@/components/NavBar";
import { useAppContext } from "@/contexts/AppContext";
import Toast from "@/components/Toast";

const TournamentDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const { user } = useAppContext();
  const [showToast, setShowToast] = useState(false);

  const getTournament = (id: string): Tournament => {
    // Mock tournament data
    return {
      id: id,
      title: "Weekend Championship",
      type: "Elimination",
      status: "upcoming",
      startDate: "2025-10-20T09:16:00Z",
      entryFee: "500",
      prizePool: "10000",
      registeredPlayers: 24,
      maxPlayers: 32,
      format: "Single Elimination",
      difficulty: "advanced",
    };
  };

  const tournament = useMemo(() => getTournament(id || ""), [id]);
  const startDate = useMemo(() => tournament?.startDate, [tournament]);

  const calculateTimeLeft = (startDate: string) => {
    const difference = new Date(startDate).getTime() - new Date().getTime();

    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  useEffect(() => {
    if (!startDate || tournament.status !== "upcoming") return;

    const updateTimer = () => {
      const timeLeft = calculateTimeLeft(startDate);
      if (timeLeft) {
        setTimeLeft(timeLeft);
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call

    return () => clearInterval(timer);
  }, [startDate, tournament.status]);

  const handleRegistration = () => {
    if (!user) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
      return;
    }
    // Handle actual registration logic here
  };

  const formatStartDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "shortOffset",
    });
  };

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <h2 className="text-2xl">Tournament not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps = {false} />
      <Toast message="Please Register or Sign in" isVisible={showToast} />
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-4xl font-bold">{tournament.title}</h1>
            {tournament.status === "completed" && (
              <div className="w-fit">
                <a
                  href={`/tournaments/${tournament.id}/rankings`}
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 
                           hover:from-emerald-500 hover:to-teal-500 text-white font-medium 
                           rounded-lg transform transition hover:scale-[1.02]"
                >
                  <span className="mr-2">🏆</span>
                  View Rankings
                </a>
              </div>
            )}
          </div>
          {tournament.status === "upcoming" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-400">
                <div>{formatStartDate(tournament.startDate)}</div>
                <div className="font-semibold">
                  Starts in: {timeLeft.days}d{" "}
                  <span className="font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <button
                onClick={handleRegistration}
                disabled={tournament.registeredPlayers >= tournament.maxPlayers}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                         hover:from-blue-500 hover:to-indigo-500 text-white font-medium 
                         rounded-lg transform transition hover:scale-[1.02] 
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tournament.registeredPlayers >= tournament.maxPlayers
                  ? "Tournament Full"
                  : `Register Now - ${tournament.entryFee} Gems`}
              </button>
            </div>
          )}
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to {tournament.title}!
          </h2>
          <p className="text-gray-300">
            Get ready for an exciting tournament experience. Compete against the
            best players and show your skills in this {tournament.format} format
            tournament.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tournament Details */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Tournament Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-gray-200 capitalize">
                    {tournament.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Format</span>
                  <span className="text-gray-200">{tournament.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Difficulty</span>
                  <span className="text-gray-200 capitalize">
                    {tournament.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Start Date</span>
                  <span className="text-gray-200">
                    {new Date(tournament.startDate).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Important Notes</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Please join 15 minutes before the tournament starts</li>
                <li>All players must follow the tournament rules</li>
                <li>Matches will be played in {tournament.format} format</li>
                <li>Tournament difficulty level: {tournament.difficulty}</li>
                <li>Players must maintain stable internet connection</li>
                <li>
                  Any form of cheating will result in immediate disqualification
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prize Distribution */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Prize Distribution</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-yellow-400 text-2xl mr-2">🏆</span>
                    <span>1st Place</span>
                  </span>
                  <span className="text-yellow-400">
                    {parseInt(tournament.prizePool) * 0.5} Gems
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-gray-300 text-2xl mr-2">🥈</span>
                    <span>2nd Place</span>
                  </span>
                  <span className="text-gray-300">
                    {parseInt(tournament.prizePool) * 0.3} Gems
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center">
                    <span className="text-orange-400 text-2xl mr-2">🥉</span>
                    <span>3rd Place</span>
                  </span>
                  <span className="text-orange-400">
                    {parseInt(tournament.prizePool) * 0.2} Gems
                  </span>
                </div>
              </div>
            </div>

            {/* Registration Details */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">
                Registration Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Entry Fee</span>
                  <span className="font-semibold">
                    {tournament.entryFee} Gems
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Players</span>
                  <span className="font-semibold">
                    {tournament.registeredPlayers}/{tournament.maxPlayers}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Ends</span>
                  <span className="font-semibold">
                    {new Date(tournament.startDate).toLocaleString()}
                  </span>
                </div>

                {tournament.status === "upcoming" && (
                  <button
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                             hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg 
                             transform transition hover:scale-[1.02] disabled:opacity-50 
                             disabled:cursor-not-allowed"
                    disabled={
                      tournament.registeredPlayers >= tournament.maxPlayers
                    }
                    onClick={handleRegistration}
                  >
                    {tournament.registeredPlayers >= tournament.maxPlayers
                      ? "Tournament Full"
                      : `Register Now - ${tournament.entryFee} Gems`}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetailsPage;
