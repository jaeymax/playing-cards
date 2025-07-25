import React from "react";

interface Card {
    id: number;
    value: number;
    rank:string;
    suit: string;
    card_player_id: number;
    current_player_id: number;
    imageUrl:string; 
    transform: string;
    inSlot: boolean;
    slotPosition: null | { target: string; position: number };

}

const Card:React.FC<Card> = ({card_player_id, current_player_id, value, rank, suit, imageUrl, transform}) => {
  //console.log(value);
  
  const handleCardClick = ()=> {
    if(card_player_id == current_player_id){
      console.log(`${rank} of ${suit} clicked`);
    }else{
      console.log(`Can't click opponent's card`);
    }
  }

  return (
    <div className="card" style={{ transform: transform }} onClick={handleCardClick} >
      <div className={`card-inner ${card_player_id === current_player_id ? 'player-card' : 'opponent-card'}`}>
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
