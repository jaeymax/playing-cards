import React, { useState, useEffect } from "react";
import InviteFriendModal from "./InviteFriendModal";
import PlayNowModal from "./PlayNowModal";
import PlayVsComputerModal from "./PlayVsComputerModal";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/data/contexts/AppContext";
//import animationlogo from '@/assets/animationPicture.png';
import animationVideo from "@/assets/animationVideo.webm";
import { ensureGuest, getToken } from "@/utils/Functions";
import { useSocket } from "@/data/contexts/SocketProvider";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { socket } = useSocket();
  const { user, updateUser } = useAppContext();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isPlayNowModalOpen, setIsPlayNowModalOpen] = useState(false);
  const [isPlayVsComputerModalOpen, setIsPlayVsComputerModalOpen] =
    useState(false);

  const handlePlayNowModalClicked = async () => {
    setIsPlayNowModalOpen(true);
    const authToken = getToken();
    let guestUser = null;
    if (!authToken) {
      const user = await ensureGuest();
      if (user) {
        updateUser(user);
        guestUser = user;
      }
    }

    const response = fetch(`${baseUrl}/matchmaking/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id || guestUser?.id, rating: user?.rating || guestUser?.rating }),
    });

    response
      .then((res) => res.json())
      .then((data) => {
        console.log("Matchmaking response:", data);
      })
      .catch((error) => {
        console.error("Error joining matchmaking:", error);
      });
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

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left: Call to Action */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Welcome to Spa
        </h1>
        <p className="text-lg text-gray-300">
          Spa is a fast-paced Ghanaian card game. Win the final trick to take
          the crown—play with friends, face a random challenger, or battle the
          computer.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handlePlayNowModalClicked}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-lg transform transition hover:scale-105"
          >
            Play Now
          </button>
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium rounded-lg transform transition hover:scale-105"
          >
            Invite Friend
          </button>
          <button
            onClick={() => setIsPlayVsComputerModalOpen(true)}
            className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transform transition hover:scale-105"
          >
            Play vs Computer
          </button>
        </div>
      </div>

      {/* Right: Game Preview */}
      <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden shadow-2xl border border-gray-700">
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
    </div>
  );
};

export default HeroSection;
