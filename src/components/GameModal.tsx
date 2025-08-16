import { useLocation } from "react-router-dom";
import PlayTest from "@/pages/PlayTest";
import PlayVsComputer from "@/pages/PlayVsComputer";
import PlayWithFriend from "@/pages/PlayWithFriend";

type GameType = "playNow" | "playWithFriend" | "playVsComputer";

const GameModal = () => {
  const location = useLocation();
  const gameType = location.state?.gameType as GameType;

  const renderGame = () => {
    switch (gameType) {
      case "playNow":
        return <PlayTest />;
      case "playWithFriend":
        return <PlayWithFriend />;
      case "playVsComputer":
        return <PlayVsComputer />;
      default:
        return <PlayTest />; // Fallback to PlayTest if no gameType specified
    }
  };

  return renderGame();
};

export default GameModal;
