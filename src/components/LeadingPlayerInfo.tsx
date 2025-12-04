import { useAppContext } from "@/contexts/AppContext";

interface LeadingPlayerInfoProps {
  game: any;
  getPlayerByPosition: (position: number) => any;
  getCardByPlayerPosition: (position: number, cards: any[]) => any;
}

const LeadingPlayerInfo = ({
  game,
  getPlayerByPosition,
  getCardByPlayerPosition,
}: LeadingPlayerInfoProps) => {
  const { user } = useAppContext();

  if (!game?.current_trick) {
    return <span className="text-xs text-white"></span>;
  }

  const currentPlayer = getPlayerByPosition(
    game.current_trick.leader_position
  )?.user;
  const playerName = currentPlayer?.is_bot
    ? "Computer"
    : currentPlayer?.id === user?.id
    ? "You are"
    : `${currentPlayer?.username} is`;

  const getLeadingCardInfo = () => {
    if (game.current_trick.cards.length > 0) {
      const leadingCard = getCardByPlayerPosition(
        game.current_trick.leader_position,
        game.current_trick.cards
      );
      return `${leadingCard?.card?.rank} of ${game.current_trick.leading_suit}`;
    }

    const lastTrickCard = game.completed_tricks[
      game.completed_tricks.length - 1
    ]?.cards.find(
      (card: any) => card.player_position === game.current_trick.leader_position
    );
    return `${lastTrickCard?.card?.rank} of ${
      game.completed_tricks[game.completed_tricks.length - 1]?.leading_suit
    }`;
  };

  return (
    <div className="absolute bottom-0 right-0 max-w-[150px] m-2 text-right">
      <span className="text-xs text-white break-words">
        {playerName} leading with{" "}
        <span className="text-xs whitespace-nowrap">
          {getLeadingCardInfo()}
        </span>
      </span>
    </div>
  );
};

export default LeadingPlayerInfo;
