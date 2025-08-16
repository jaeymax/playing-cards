import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  extractDealingSequence,
  shuffleCards,
  dealSequenceToPositions,
} from "@/utils/Functions";
import Modal from "@/components/Modal";
import shuffleSound from "@/sounds/riffle-card-shuffle-104313.mp3";
import playedCardSound from "@/sounds/sound4.mp3";
import bot from "@/assets/robot3.png";

const PlayerInfo = ({
  name,
  avatar,
  points,
  styles,
}: {
  name: string;
  avatar: string;
  points: number;
  styles: string;
}) => (
  <div
    className={`player-info absolute ${styles} w-fit mx-auto flex flex-col items-center`}
  >
    <div className="relative">
      <Avatar className="w-12 h-12 avatar-image">
        <AvatarImage src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    </div>
    <div className="text-center">
      <div className="font-medium player-name">{name}</div>
      <div className="text-sm font-semibold player-score">{points} pts</div>
    </div>
  </div>
);

const PlayVsComputer = () => {
  
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isThinking, setIsThinking] = useState(true);
  // ... refs and other state similar to PlayTest

  const computerPlay = async () => {
    setIsThinking(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate thinking
    setIsThinking(false);
    // Implement computer move logic here
   
  };

  // Similar structure to PlayTest but with computer-specific handling
  // ... rest of the implementation

  return (
    <div className="min-h-screen relative bg-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-between">

      <PlayerInfo name="bot" points={0} avatar={bot} styles="left-1/2 -translate-x-1/2 top-1" />  



    </div>
  );
};

export default PlayVsComputer;
