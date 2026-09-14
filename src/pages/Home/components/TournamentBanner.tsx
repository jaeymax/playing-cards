import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Clock,
  Users,
  Zap,
  ChevronRight,
} from "lucide-react";

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

/*
 * -----------------------------------------
 * COUNTDOWN
 * -----------------------------------------
 */

const useCountdown = (targetDate: string) => {
  const calculateTimeLeft = () => {
    if (!targetDate) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const difference =
      new Date(targetDate).getTime() -
      new Date().getTime();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(
        difference / (1000 * 60 * 60 * 24)
      ),

      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      ),

      minutes: Math.floor(
        (difference / (1000 * 60)) % 60
      ),

      seconds: Math.floor(
        (difference / 1000) % 60
      ),
    };
  };

  const [timeLeft, setTimeLeft] =
    useState(calculateTimeLeft());

  const [isExpired, setIsExpired] = useState(
    !targetDate ||
      new Date(targetDate).getTime() <=
        new Date().getTime()
  );

  useEffect(() => {
    const initial = calculateTimeLeft();

    setTimeLeft(initial);

    setIsExpired(
      !targetDate ||
        new Date(targetDate).getTime() <=
          new Date().getTime()
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

  return {
    timeLeft,
    isExpired,
  };
};


/*
 * -----------------------------------------
 * SKELETON
 * -----------------------------------------
 */

const TournamentSkeleton: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

      <div className="animate-pulse p-5 sm:p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 shrink-0 rounded-2xl bg-gray-700" />

            <div className="space-y-2">

              <div className="h-5 w-48 rounded bg-gray-700" />

              <div className="h-3 w-32 rounded bg-gray-700" />

            </div>

          </div>

          <div className="flex gap-3">

            <div className="h-16 w-32 rounded-xl bg-gray-700" />

            <div className="h-11 w-32 rounded-xl bg-gray-700" />

          </div>

        </div>

      </div>

    </div>
  );
};


/*
 * -----------------------------------------
 * TOURNAMENT BANNER
 * -----------------------------------------
 */

const TournamentBanner: React.FC = () => {

  const navigate = useNavigate();

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] =
    useState(false);

  const [isLoginRequiredModalOpen, setIsLoginRequiredModalOpen] =
    useState(false);

  const [phoneNumberRequiredModalOpen, setPhoneNumberRequiredModalOpen] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [tournamentData, setTournamentData] =
    useState<TournamentData | null>(null);

  const { user } = useAppContext();

  /*
   * -----------------------------------------
   * COUNTDOWN
   * -----------------------------------------
   */

  const { timeLeft, isExpired } =
    useCountdown(
      tournamentData?.registered
        ? tournamentData.start_date || ""
        : tournamentData?.registration_closing_date || ""
    );


  /*
   * -----------------------------------------
   * FORMAT COUNTDOWN
   * -----------------------------------------
   */

  const formatCountdown = () => {

    const {
      days,
      hours,
      minutes,
      seconds,
    } = timeLeft;

    if (days > 0) {
      return `${days}d ${String(hours).padStart(
        2,
        "0"
      )}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }

    return `${String(hours).padStart(
      2,
      "0"
    )}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };


  /*
   * -----------------------------------------
   * GET TOURNAMENT
   * -----------------------------------------
   */

  const getTournamentDetails = async () => {

    try {

      setIsLoading(true);

      const response = await fetch(
        `${baseUrl}/tournaments/weekly/current`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            userId: user
              ? user.id
              : null,
          }),
        }
      );

      if (response.ok) {

        const { data } =
          await response.json();

        customLog(
          "Tournament Data:",
          data
        );

        setTournamentData(data);

      } else {

        console.error(
          "Failed to fetch tournament details"
        );

      }

    } catch (err) {

      console.error(
        "Error fetching tournament details:",
        err
      );

    } finally {

      setIsLoading(false);

    }
  };


  /*
   * -----------------------------------------
   * FETCH
   * -----------------------------------------
   */

  useEffect(() => {

    const fetchTournamentDetails =
      async () => {

        if (
          (await getToken()) &&
          !user
        ) {
          return;
        }

        getTournamentDetails();
      };

    fetchTournamentDetails();

  }, [user]);


  /*
   * -----------------------------------------
   * NAVIGATION
   * -----------------------------------------
   */

  const handleJoinTournament = () => {

    if (!tournamentData) return;

    if (
      tournamentData.status ===
      "completed"
    ) {

      navigate(
        `/tournaments/${tournamentData.id}/?tab=standings`
      );

      return;
    }

    if (
      tournamentData.status ===
      "ongoing"
    ) {

      navigate(
        `/tournaments/${tournamentData.id}/?tab=bracket`
      );

      return;
    }

    navigate(
      `/tournaments/${tournamentData.id}`
    );
  };


  const handleRegistration = () => {

    if (!tournamentData) return;

    navigate(
      `/tournaments/${tournamentData.id}`
    );
  };


  /*
   * -----------------------------------------
   * STATUS
   * -----------------------------------------
   */

  const isCompleted =
    tournamentData?.status ===
    "completed";

  const isOngoing =
    tournamentData?.status ===
    "ongoing";

  const isRegistered =
    tournamentData?.registered;


  /*
   * -----------------------------------------
   * LOADING
   * -----------------------------------------
   */

  if (isLoading) {
    return <TournamentSkeleton />;
  }


  /*
   * -----------------------------------------
   * NO TOURNAMENT
   * -----------------------------------------
   */

  if (!tournamentData) {
    return null;
  }


  /*
   * -----------------------------------------
   * RENDER
   * -----------------------------------------
   */

  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-700 bg-gray-800">

      {/* Decorative glow */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-purple-500/10 blur-3xl" />


      {/* TOP ACCENT */}

      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />


      <div className="relative p-5 sm:p-6">

        {/* HEADER */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT */}

          <div className="min-w-0">

            <div className="flex items-start gap-4">

              {/* TROPHY */}

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-yellow-500/20 bg-yellow-500/10">

                <Trophy className="h-7 w-7 text-yellow-400" />

              </div>


              {/* TITLE */}

              <div className="min-w-0">

                <div className="mb-1 flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-400">
                    Weekly Tournament
                  </span>

                  {isOngoing && (
                    <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">

                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </span>

                      Live
                    </span>
                  )}

                </div>


                <h2 className="truncate text-xl font-black tracking-tight text-white sm:text-2xl">
                  {tournamentData.name}
                </h2>

                <p className="mt-1 line-clamp-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {tournamentData.description ||
                    "Compete, climb the bracket and become this week's champion."}
                </p>

              </div>

            </div>


            {/* META */}

            <div className="mt-5 flex flex-wrap items-center gap-2">

              {/* <div className="flex items-center gap-1.5 rounded-lg bg-gray-900/60 px-3 py-2">

                <Trophy className="h-3.5 w-3.5 text-yellow-400" />

                <span className="text-[10px] text-gray-500">
                  Prize
                </span>

                <span className="text-xs font-bold text-yellow-300">
                  ₵{Number(
                    tournamentData.prize
                  ).toFixed(2)}
                </span>

              </div> */}


              <div className="flex items-center gap-1.5 rounded-lg bg-gray-900/60 px-3 py-2">

                <Users className="h-3.5 w-3.5 text-blue-400" />

                <span className="text-[10px] text-gray-500">
                  Format
                </span>

                <span className="text-xs font-bold capitalize text-gray-300">
                  {tournamentData.format?.replace(
                    /_/g,
                    " "
                  ) || "Tournament"}
                </span>

              </div>


              {!isRegistered &&
                !isCompleted && (
                  <div className="flex items-center gap-1.5 rounded-lg bg-gray-900/60 px-3 py-2">

                    <Zap className="h-3.5 w-3.5 text-emerald-400" />

                    <span className="text-[10px] text-gray-500">
                      Entry
                    </span>

                    <span className="text-xs font-bold text-emerald-400">
                      {Number(
                        tournamentData.registration_fee
                      ) === 0
                        ? "FREE"
                        : `₵${Number(
                            tournamentData.registration_fee
                          ).toFixed(2)}`}
                    </span>

                  </div>
                )}

            </div>

          </div>


          {/* RIGHT */}

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

            {/* COUNTDOWN */}

            {!isCompleted && (

              <div className="rounded-2xl border border-gray-700 bg-gray-900/70 px-5 py-3 text-center">

                <div className="flex items-center justify-center gap-1.5">

                  <Clock className="h-3.5 w-3.5 text-yellow-400" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    {isRegistered
                      ? "Starts in"
                      : "Registration ends"}
                  </span>

                </div>

                <p className="mt-1 font-mono text-xl font-black tracking-tight text-white sm:text-2xl">

                  {isExpired
                    ? "00:00"
                    : formatCountdown()}

                </p>

              </div>

            )}


            {/* ACTION */}

            <div className="min-w-[150px]">

              {!isRegistered ? (

                <button
                  onClick={handleRegistration}
                  disabled={
                    !tournamentData
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-2xl
                    px-5
                    py-3
                    text-sm
                    font-black
                    text-white
                    transition
                    active:scale-[0.98]
                    ${
                      isExpired
                        ? "border border-gray-700 bg-gray-700/50 text-gray-500"
                        : "bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/10 hover:from-emerald-400 hover:to-green-400"
                    }
                  `}
                >

                  {isExpired
                    ? "Spectate"
                    : "Register Now"}

                  <ChevronRight className="h-4 w-4" />

                </button>

              ) : (

                <div className="flex flex-col gap-2">

                  {!isCompleted && (
                    <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-3 py-2 text-center">

                      <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        ✓ Registered
                      </p>

                    </div>
                  )}

                  <button
                    onClick={
                      handleJoinTournament
                    }
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-blue-500
                      px-5
                      py-3
                      text-sm
                      font-black
                      text-white
                      shadow-lg
                      shadow-blue-500/10
                      transition
                      hover:bg-blue-400
                      active:scale-[0.98]
                    "
                  >

                    {isCompleted
                      ? "View Results"
                      : "Join Lobby"}

                    <ChevronRight className="h-4 w-4" />

                  </button>

                </div>

              )}

            </div>

          </div>

        </div>


        {/* FOOTER EVENT BAR */}

        <div className="mt-5 flex flex-col gap-2 border-t border-gray-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">

            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />

            <p className="text-[10px] text-gray-500">
              {isCompleted
                ? "Tournament completed"
                : isOngoing
                ? "Tournament is currently underway"
                : isRegistered
                ? "You're registered. Get ready!"
                : "Open for registration"}
            </p>

          </div>


          <button
            onClick={() =>
              navigate(
                `/tournaments/${tournamentData.id}`
              )
            }
            className="flex items-center gap-1 text-[10px] font-bold text-gray-500 transition hover:text-blue-400"
          >
            Tournament details
            <ChevronRight className="h-3 w-3" />
          </button>

        </div>

      </div>


      {/* MODALS */}

      <TournamentRegistrationModal
        id={tournamentData.id}
        isOpen={isRegistrationModalOpen}
        onClose={() =>
          setIsRegistrationModalOpen(false)
        }
        countdown={formatCountdown()}
        registrationFee={
          tournamentData.registration_fee
        }
        getTournamentDetails={
          getTournamentDetails
        }
        prizePool={
          tournamentData.prize
        }
      />

      <PhoneNumberRequiredModal
        isOpen={
          phoneNumberRequiredModalOpen
        }
        onClose={() =>
          setPhoneNumberRequiredModalOpen(false)
        }
        onPhoneNumberAdded={() => {
          setPhoneNumberRequiredModalOpen(
            false
          );

          setIsRegistrationModalOpen(
            true
          );
        }}
      />

      <LoginRequiredModal
        isOpen={
          isLoginRequiredModalOpen
        }
        onClose={() =>
          setIsLoginRequiredModalOpen(false)
        }
      />

    </div>
  );
};

export default TournamentBanner;