import { useSocket } from "@/contexts/SocketProvider";
import React from "react";

interface Card {
  id: number;
  rank: string;
  suit: string;
  status: string;
  game_code: string;
  game_card_id: number;
  card_player_id: number;
  current_player_id: number;
  imageUrl: string;
  transform: string;
  inSlot: boolean;
  slotPosition: null | { target: string; position: number };
  zIndex: number;
}

const Card: React.FC<Card> = ({
  card_player_id,
  game_code,
  game_card_id,
  current_player_id,
  status,
  rank,
  suit,
  imageUrl,
  transform,
  zIndex,
}) => {
  const { socket } = useSocket();
  const canView = (
    card_player_id: number,
    current_player_id: number,
    status: string
  ) => {
    // console.log(card_player_id, current_player_id, status);
    /*if((current_player_id == card_player_id) && (status === 'in_hand')){
      console.log(`${current_player_id} can view ${rank} of ${suit}`);
    }
    else{
      console.log(`${current_player_id} can't view ${rank} of ${suit}`);
    }*/
    return card_player_id === current_player_id && status === "in_hand";
  };

  const inDeck = (status: string) => {
    const v = ['in_drawpile', 'in_deck'];
    return v.includes(status);
  };

  const handleCardClick = () => {
    if (card_player_id == current_player_id) {
      console.log(`${rank} of ${suit} clicked`);
      console.log(status);
      socket?.emit("playCard", {
        card_id: game_card_id,
        game_code: game_code,
        player_id: current_player_id,
      });
    } else {
      console.log(`Can't click opponent's card`);
    }
  };

  return (
    <div
      className={`card ${canView(current_player_id, card_player_id, status) ? 'player-card': 'opponent-card'} ${inDeck(status)? "in-deck":""}`}
      style={{ transform: transform, zIndex: zIndex }}
      onClick={handleCardClick}
    >
      {/* <div className={`card-inner ${canView(current_player_id, card_player_id, status) ? 'player-card': 'opponent-card'}`}> */}
      <div
        className={`card-inner ${
          canView(current_player_id, card_player_id, status)
            ? "player-card"
            : "opponent-card"
        } ${status === "played" ? "played" : ""}`}
      >
        <div className="card-front">
          <img src={imageUrl} alt="" className="card-img" />
        </div>
        <div className="card-back">
          <img src="/card_back_blue.jpeg" alt="" className="card-img" />
        </div>
      </div>
    </div>
  );
};

export default Card;
