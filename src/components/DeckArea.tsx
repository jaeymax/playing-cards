import React from "react";
import Card from "./Card";

interface DeckAreaProps {
  gameCards: any[];
  game: any;
  me: any;
  ref: React.RefObject<HTMLDivElement>;
}

const DeckArea = React.forwardRef<
  HTMLDivElement,
  DeckAreaProps
>(({ gameCards, game, me }, ref) => {
  return (
    <div
      className="flex deck hidde absolute top-1/4 p-2 left-1/3 borde border-blue-600"
      ref={ref}
    >
      {[...gameCards].reverse().map((card) => (
        <Card
          key={card.card.card_id}
          imageUrl={card.card.image_url}
          id={card.card.card_id}
          game_code={game?.code}
          game_card_id={card.id}
          rank={card.card.rank}
          suit={card.card.suit}
          card_player_id={card.player_id}
          current_player_id={me?.id}
          status={card.status}
          transform={`translate(${card.pos_x}px, ${card.pos_y}px) rotate(${
            card.rotation + 0
          }deg)`}
          zIndex={card.z_index}
          inSlot={card.inSlot}
          slotPosition={card.slotPosition}
        />
      ))}
    </div>
  );
});

DeckArea.displayName = "DeckArea";

export default DeckArea;
