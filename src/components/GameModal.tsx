import { useLocation } from "react-router-dom";
import PlayNow from "@/pages/PlayNow";
import PlayVsComputer from "@/pages/PlayVsComputer";
import PlayWithFriend from "@/pages/PlayWithFriend";

type GameType = "playNow" | "playWithFriend" | "playVsComputer";

const GameModal = () => {
  const location = useLocation();
  const gameType = location.state?.gameType as GameType;

  const renderGame = () => {
    switch (gameType) {
      case "playNow":
        return <PlayNow />;
      case "playWithFriend":
        return <PlayWithFriend />;
      case "playVsComputer":
        return <PlayVsComputer />;
      default:
        return <PlayNow />; // Fallback to PlayNow if no gameType specified
    }
  };

  return renderGame();
};

export default GameModal;
