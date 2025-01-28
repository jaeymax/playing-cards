import React from "react";

interface Card {
    id: number;
    value: number;
    rank:string;
    suit: string;
    imageUrl:string; 
    transform: string;
    inSlot: boolean;
    slotPosition: null | { target: string; position: number };

}

const Card:React.FC<Card> = ({value, rank, suit, imageUrl, transform}) => {

  const handleCardClick = ()=> {
     console.log(`${rank} of ${suit} clicked`);
  }

  return (
    <div className="card" style={{ transform: transform }} onClick={handleCardClick} >
      <div className="card-inner">
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
