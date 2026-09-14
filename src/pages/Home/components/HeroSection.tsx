import React, { useState, useEffect } from "react";
import InviteFriendModal from "./InviteFriendModal";
import PlayNowModal from "./PlayNowModal";
import PlayVsComputerModal from "./PlayVsComputerModal";
//import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
//import animationlogo from '@/assets/animationPicture.png';
import animationVideo from "@/assets/animationVideo.webm";
//import { ensureGuest, getToken } from "@/utils/Functions";
import { useSocket } from "@/contexts/SocketProvider";
import Modal from "@/components/Modal";
import { useNavigate } from "react-router-dom";
import robotImage from '@/assets/robot.png'
import friendsImage from '@/assets/friendship.png'
//import CreateChallengeModal from "./CreateChallengeModal";
import OpenChallenges from "./OpenChallenges";


interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { socket } = useSocket();
  const { user} = useAppContext();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isPlayNowModalOpen, setIsPlayNowModalOpen] = useState(false);
  const [isPlayVsComputerModalOpen, setIsPlayVsComputerModalOpen] =
    useState(false);
  const [isLoginPromptModalOpen, setIsLoginPromptModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  // const handlePlayNowModalClicked = async () => {
  //   setIsPlayNowModalOpen(true);
  //   const authToken = getToken();
  //   let guestUser = null;
  //   if (!authToken) {
  //     const user = await ensureGuest();
  //     if (user) {
  //       updateUser(user);
  //       guestUser = user;
  //     }
  //   }

  //   const response = fetch(`${baseUrl}/matchmaking/join`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       userId: user?.id || guestUser?.id,
  //       rating: user?.rating || guestUser?.rating,
  //     }),
  //   });

  //   response
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Matchmaking response:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error joining matchmaking:", error);
  //     });
  // };

  const handleInviteModalClicked = () => {
    setSelectedOption("invite");
    if (!user) {
      setIsLoginPromptModalOpen(true);
    } else {
      setIsInviteModalOpen(true);
    }
  };

  const handlePlayVsComputerModalClicked = () => {
    setSelectedOption("computer");
    if (!user) {
      setIsLoginPromptModalOpen(true);
    } else {
      setIsPlayVsComputerModalOpen(true);
    }
  };

  useEffect(() => {
    socket?.on("queue_left", () => {
      console.log("queue left");
    });
  }, [user, socket]);

  const handleLeaveQueue = () => {
    socket?.emit("leave_queue", { userId: user?.id });
    console.log("Left matchmaking queue", socket);
  };

  const handClosePlayNowModal = () => {
    setIsPlayNowModalOpen(false);
    handleLeaveQueue();
  };

  const handleLogin = () => {
    console.log("Redirecting to login...");
    navigate("/signin", { state: { from: window.location.pathname } });
    setIsLoginPromptModalOpen(false);
  };

  const handlePlayAsGuest = () => {
    console.log("Continuing as guest...");
    setIsLoginPromptModalOpen(false);
    if (selectedOption === "invite") {
      setIsInviteModalOpen(true);
    } else if (selectedOption === "computer") {
      setIsPlayVsComputerModalOpen(true);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left: Call to Action */}
      <div className="space-y-6">
        <div className="space-y-6 max-w-3xl">
          {/* LIVE PLAYERS EYEBROW */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] text-emerald-400/80 uppercase">
              The Ghanaian Spar experience, online
            </span>
          </div>

          {/* HEADLINE */}
          <div>
            <h1
              className="
      text-4xl
      sm:text-5xl
      lg:text-6xl
      font-black
      tracking-tight
      leading-[1.05]
      text-white
    "
            >
              Ghana's favourite card game.
              <br />
              <span className="text-gray-400">Now you can play</span>{" "}
              <span className="text-[#E8B93E]">Spar</span>{" "}
              <span className="text-white">online.</span>
            </h1>
          </div>

          {/* DESCRIPTION */}
          <p
            className="
    max-w-2xl
    text-sm
    sm:text-base
    lg:text-lg
    leading-7
    text-gray-400
  "
          >
            Deal the cards, outplay your opponent, and take the table. Play with
            friends, challenge players online, compete in tournaments, or
            sharpen your skills against the computer.
          </p>

          {/* SMALL PROOF / FEATURE ROW */}
          <div
            className="
    flex
    flex-wrap
    items-center
    gap-x-6
    gap-y-3
    pt-1
  "
          >
            <div className="flex items-center gap-2">
              <div
                className="
        flex h-7 w-7 items-center justify-center
        rounded-lg
        bg-blue-500/10
        border border-blue-500/10
      "
              >
                <svg
                  className="h-3.5 w-3.5 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m8-5a4 4 0 100-8 4 4 0 000 8zM9 9a4 4 0 100-8 4 4 0 000 8z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-300">
                  Play with anyone
                </p>
                <p className="text-[10px] text-gray-600">
                  Friends or online players
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-800" />

            <div className="flex items-center gap-2">
              <div
                className="
        flex h-7 w-7 items-center justify-center
        rounded-lg
        bg-yellow-500/10
        border border-yellow-500/10
      "
              >
                <svg
                  className="h-3.5 w-3.5 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-300">
                  Quick matches
                </p>
                <p className="text-[10px] text-gray-600">
                  Jump straight into a game
                </p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-gray-800" />

            <div className="flex items-center gap-2">
              <div
                className="
        flex h-7 w-7 items-center justify-center
        rounded-lg
        bg-emerald-500/10
        border border-emerald-500/10
      "
              >
                <svg
                  className="h-3.5 w-3.5 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3zM5 20h14M6 20v-4a6 6 0 0112 0v4"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-300">
                  Climb the ranks
                </p>
                <p className="text-[10px] text-gray-600">
                  Compete in tournaments & prove yourself
                </p>
              </div>
            </div>
          </div>

            

          {/* YOUR EXISTING BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-3xl">
            {/* Play Now */}

            {/* PLAY NOW */}
            {/* <button
              onClick={handlePlayNowModalClicked}
              className="
              group relative flex-1
              flex items-center justify-center gap-2.5
              px-6 py-3.5
              rounded-xl
              bg-[#17243a]
      text-blue-300
      font-semibold
      border border-blue-500/20
      shadow-lg shadow-black/20
      transition-all duration-200
      hover:-translate-y-0.5
      hover:bg-[#1b2b45]
      hover:border-blue-400/35
      hover:text-blue-200
      hoer:shadow-blue-500/10
      active:translate-y-0
      active:scale-[0.98]
    "
            >
              <div
                className="
        flex items-center justify-center
        w-8 h-8
        rounded-lg
        bg-blue-500/10
        border border-blue-400/10
        group-hover:bg-blue-500/15
        transition-colors
      "
              >
                <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <span>Play Now</span>

              <svg
                className="w-4 h-4 opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button> */}

            {/* PLAY WITH FRIENDS */}
            <button
              onClick={handleInviteModalClicked}
              className="
      group relative flex-1
      flex items-center justify-center gap-2.5
      px-6 py-3.5
      rounded-xl
      bg-[#172d27]
      text-emerald-300
      font-semibold
      border border-emerald-500/20
      shadow-lg shadow-black/20
      transition-all duration-200
      hover:-translate-y-0.5
      hover:bg-[#1a352e]
      hover:border-emerald-400/35
      hover:text-emerald-200
      hver:shadow-emerald-500/10
      active:translate-y-0
      active:scale-[0.98]
    "
            >
              <div
                className="
        flex items-center justify-center
        w-8 h-8
        rounded-lg
        b-emerald-500/10
        boder border-emerald-400/10
        goup-hover:bg-emerald-500/15
        transition-colors
      "
              >
                {/* <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2
             M9 11a4 4 0 100-8 4 4 0 000 8
             M22 21v-2a4 4 0 00-3-3.87
             M16 3.13a4 4 0 010 7.75"
                  />
                </svg> */}
                <img src={friendsImage} alt="" />
              </div>

              <span>Play with Friends</span>
            </button>

            {/* PLAY VS COMPUTER */}
            <button
              onClick={handlePlayVsComputerModalClicked}
              className="
      group relative flex-1
      flex items-center justify-center gap-2.5
      px-6 py-3.5
      
      bg-gray-900 hover:bg-gray-800
    border border-gray-700 hover:border-gray-700
    rounded-xl
    shadow-[0_4px_14px_-4px_rgba(0,0,0,0.5)]
    hover:-translate-y-0.5
    active:translate-y-0 active:scale-[0.98]
    transition-all duration-200
      text-violet
      font-semibold
    "
            >
              <div
                className="
        flex items-center justify-center
        w-8 h-8
        rounded-lg
        b-violet-500/10
        borde border-violet-400/10
        grop-hover:bg-violet-500/15
        transition-colors
      "
              >
                {/* <svg
                  className="w-4.5 h-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3h6a2 2 0 012 2v1h1a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h1V5a2 2 0 012-2z
             M8 11h.01M16 11h.01M9 16h6"
                  />
                </svg> */}
                <img src={robotImage} alt="" />
                
              </div>

              <span>Play vs Computer</span>
            </button>
          </div>
        </div>
      </div>

      <OpenChallenges />

      {/* Right: Game Preview */}
      <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl borde border-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            autoPlay={true}
            muted={true}
            loop={true}
            className="w-full h-full object-cover"
          >
            <source src={animationVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
       
      </div>

      {/* Add Modal at the end of the component */}
      <InviteFriendModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <PlayNowModal
        isOpen={isPlayNowModalOpen}
        onClose={handClosePlayNowModal}
      />
      <PlayVsComputerModal
        isOpen={isPlayVsComputerModalOpen}
        onClose={() => setIsPlayVsComputerModalOpen(false)}
      />
      {/* <LoginPromptModal
        isOpen={isLoginPromptModalOpen}
        onClose={() => setIsLoginPromptModalOpen(false)}
      /> */}
      <Modal
        isOpen={isLoginPromptModalOpen}
        onClose={() => setIsLoginPromptModalOpen(false)}
        title=""
      >
        <div className="p-6 space-y-4 borde">
          <h2 className="text-xl font-bold text-gray-00">
            Log In or Play as Guest
          </h2>
          <p className="text-gray-400">
            You need to log in to play. Alternatively, you can continue as a
            guest.
          </p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handlePlayAsGuest}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
            >
              Play as Guest
            </button>
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Log In
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeroSection;
