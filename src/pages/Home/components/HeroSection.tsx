import React, { useState, useEffect } from "react";
import InviteFriendModal from "./InviteFriendModal";
import PlayNowModal from "./PlayNowModal";
import PlayVsComputerModal from "./PlayVsComputerModal";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
//import animationlogo from '@/assets/animationPicture.png';
import animationVideo from "@/assets/animationVideo.webm";
import { socket } from "@/socket";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const { user } = useAppContext();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isPlayNowModalOpen, setIsPlayNowModalOpen] = useState(false);
  const [isPlayVsComputerModalOpen, setIsPlayVsComputerModalOpen] =
    useState(false);

  const handlePlayNowModalClicked = () => {
    setIsPlayNowModalOpen(true);
    const response = fetch(`${baseUrl}/matchmaking/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id, rating: user?.rating }),
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
    socket.on("queue_left", ()=>{
      console.log("queue left");
    });
  }, []);

  const handleLeaveQueue = () => {
    socket.emit("leave_queue", { userId: user?.id });
  };

  const handClosePlayNowModal = () => {
    setIsPlayNowModalOpen(false);
    /*const response = fetch(`${baseUrl}/matchmaking/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user?.id }),
    });
    */
    handleLeaveQueue();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-center">
      {/* Left: Call to Action */}
      <div className="space-y-6">
        <h1 className="text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Enter the Arena of Cards
        </h1>
        <p className="text-lg text-gray-300">
          Challenge players worldwide, compete in tournaments, and become a
          legendary card master.
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
          {/* Add your game preview animation here */}
          {/* <div className="flex gap-4 animate-float">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-32 h-48 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg transform rotate-3 hover:rotate-0 transition-transform"
              />
            ))}
          </div> */}
          
            <video autoPlay = {true} muted ={true} loop = {true} className="w-full h-full object-cover">
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
