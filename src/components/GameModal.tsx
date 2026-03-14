import { useLocation } from "react-router-dom";
import PlayNow from "@/pages/PlayNow";
import PlayVsComputer from "@/pages/PlayVsComputer";
import PlayWithFriend from "@/pages/PlayWithFriend";
import SingleEliminationGame from "@/pages/Home/components/SingleEliminationGame";
import SwissGame from "@/pages/Home/components/SwissGame";

type GameType = "playNow" | "playWithFriend" | "playVsComputer" | "Tournament";

const GameModal = () => {
  const location = useLocation();
  const gameType = location.state?.gameType as GameType;
  const tournamentFormat = location.state?.format as string;
  const tournamentId = location.state?.tournamentId as number;

  const renderGame = () => {
    switch (gameType) {
      case "playNow":
        return <PlayNow />;
      case "playWithFriend":
        return <PlayWithFriend />;
      case "playVsComputer":
        return <PlayVsComputer />;
      case "Tournament":
        if (tournamentFormat === "Single Elimination") {
          return <SingleEliminationGame tournamentId = {tournamentId} />;
        } else if (tournamentFormat === "Swiss") {
        return <SwissGame tournamentId = {tournamentId} />
        }
        return;
      default:
        return <PlayWithFriend />; // Fallback to PlayNow if no gameType specified
    }
  };

  return renderGame();
};

export default GameModal;
