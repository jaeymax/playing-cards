import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
//import { playing_cards } from "@/data/cards";
import Card from "@/components/Card";
import { useParams } from "react-router-dom";
import { socket } from "@/socket";
import { useAppContext } from "@/contexts/AppContext";
import { extractDealingSequence, shuffleCards, dealSequenceToPositions } from "@/utils/Functions";

const PlayerInfo = ({
  name,
  avatar,
  points,
  styles
}: {
  name: string;
  avatar: string;
  //cards: number;
  points: number;
  styles: string;
}) => (
  <div
    className={`player-info absolute ${styles} mt- borde mb- w-fit mx-auto flex flex-col items-center`}>
    <Avatar className="w-12 h-12 avatar-image">
      <AvatarImage src={avatar} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
    <div className="text-center">
      <div className="font-medium player-name">{name}</div>
      {/* <div className="text-sm">{cards} cards</div> */}
      <div className="text-sm font-semibold player-score">{points} pts</div>
    </div>
  </div>
);

const PlayTest = () => {
   /* interface Card {
      id: number;
      value: number;
      rank: string;
      suit: string;
      imageUrl: string;
      transform: string;
      inSlot: boolean;
      slotPosition: null | { target: string; position: number };
    }*/

  const { user } = useAppContext();

 // const [cards, setCards] = useState<Card[]>(playing_cards);
  const [playerCards, setPlayerCards] = useState<any[]>([{
    "id": 8576,
    "game_id": 410,
    "player_id": 649,
    "status": "in_deck",
    "hand_position": -1,
    "trick_number": null,
    "pos_x": 0,
    "pos_y": 0,
    "rotation": 0,
    "z_index": 0,
    "animation_state": "idle",
    "card": {
        "card_id": 5,
        "suit": "Diamonds",
        "value": 12,
        "rank": "Queen",
        "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486110/queen-of-diamonds_mwbdwf.jpg"
    }},
    {
      "id": 8577,
      "game_id": 410,
      "player_id": 649,
      "status": "in_deck",
      "hand_position": -1,
      "trick_number": null,
      "pos_x": 0.3,
      "pos_y": 0.1,
      "rotation": 0,
      "z_index": 0,
      "animation_state": "idle",
      "card": {
          "card_id": 33,
          "suit": "Hearts",
          "value": 12,
          "rank": "Queen",
          "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486110/queen-of-hearts_cphfre.jpg"
      }
  },
  {
    "id": 8578,
    "game_id": 410,
    "player_id": 649,
    "status": "in_deck",
    "hand_position": -1,
    "trick_number": null,
    "pos_x": 0.6,
    "pos_y": 0.2,
    "rotation": 0,
    "z_index": 0,
    "animation_state": "idle",
    "card": {
        "card_id": 16,
        "suit": "Clubs",
        "value": 9,
        "rank": "9",
        "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486108/9-of-clubs_eu1knv.jpg"
    }
},
{
  "id": 8579,
  "game_id": 410,
  "player_id": 649,
  "status": "in_deck",
  "hand_position": -1,
  "trick_number": null,
  "pos_x": 0.8999999999999999,
  "pos_y": 0.30000000000000004,
  "rotation": 0,
  "z_index": 0,
  "animation_state": "idle",
  "card": {
      "card_id": 3,
      "suit": "Diamonds",
      "value": 6,
      "rank": "6",
      "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486105/6-of-diamonds_xxtnxt.jpg"
  }
},
{
"id": 8580,
"game_id": 410,
"player_id": 649,
"status": "in_deck",
"hand_position": -1,
"trick_number": null,
"pos_x": 1.2,
"pos_y": 0.4,
"rotation": 0,
"z_index": 0,
"animation_state": "idle",
"card": {
    "card_id": 17,
    "suit": "Diamonds",
    "value": 9,
    "rank": "9",
    "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486106/9-of-diamonds_fgujnc.jpg"
}
}]);
  const [opponentOneCards, setOpponentOneCards] = useState<any[]>([{
        "id": 8576,
        "game_id": 410,
        "player_id": 649,
        "status": "in_deck",
        "hand_position": -1,
        "trick_number": null,
        "pos_x": 0,
        "pos_y": 0,
        "rotation": 0,
        "z_index": 0,
        "animation_state": "idle",
        "card": {
            "card_id": 5,
            "suit": "Diamonds",
            "value": 12,
            "rank": "Queen",
            "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486110/queen-of-diamonds_mwbdwf.jpg"
        }},
        {
          "id": 8577,
          "game_id": 410,
          "player_id": 649,
          "status": "in_deck",
          "hand_position": -1,
          "trick_number": null,
          "pos_x": 0.3,
          "pos_y": 0.1,
          "rotation": 0,
          "z_index": 0,
          "animation_state": "idle",
          "card": {
              "card_id": 33,
              "suit": "Hearts",
              "value": 12,
              "rank": "Queen",
              "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486110/queen-of-hearts_cphfre.jpg"
          }
      },
      {
        "id": 8578,
        "game_id": 410,
        "player_id": 649,
        "status": "in_deck",
        "hand_position": -1,
        "trick_number": null,
        "pos_x": 0.6,
        "pos_y": 0.2,
        "rotation": 0,
        "z_index": 0,
        "animation_state": "idle",
        "card": {
            "card_id": 16,
            "suit": "Clubs",
            "value": 9,
            "rank": "9",
            "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486108/9-of-clubs_eu1knv.jpg"
        }
    },
    {
      "id": 8579,
      "game_id": 410,
      "player_id": 649,
      "status": "in_deck",
      "hand_position": -1,
      "trick_number": null,
      "pos_x": 0.8999999999999999,
      "pos_y": 0.30000000000000004,
      "rotation": 0,
      "z_index": 0,
      "animation_state": "idle",
      "card": {
          "card_id": 3,
          "suit": "Diamonds",
          "value": 6,
          "rank": "6",
          "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486105/6-of-diamonds_xxtnxt.jpg"
      }
  },
  {
    "id": 8580,
    "game_id": 410,
    "player_id": 649,
    "status": "in_deck",
    "hand_position": -1,
    "trick_number": null,
    "pos_x": 1.2,
    "pos_y": 0.4,
    "rotation": 0,
    "z_index": 0,
    "animation_state": "idle",
    "card": {
        "card_id": 17,
        "suit": "Diamonds",
        "value": 9,
        "rank": "9",
        "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486106/9-of-diamonds_fgujnc.jpg"
    }
}
      
      ]);
  const [opponentTwoCards, setOpponentTwoCards] = useState<any[]>([{
        "id": 8576,
        "game_id": 410,
        "player_id": 649,
        "status": "in_deck",
        "hand_position": -1,
        "trick_number": null,
        "pos_x": 0,
        "pos_y": 0,
        "rotation": 0,
        "z_index": 0,
        "animation_state": "idle",
        "card": {
            "card_id": 5,
            "suit": "Diamonds",
            "value": 12,
            "rank": "Queen",
            "image_url": "https://res.cloudinary.com/dbvame158/image/upload/v1753486110/queen-of-diamonds_mwbdwf.jpg"
        }}]);
  const [opponentThreeCards, setOpponentThreeCards] = useState<any[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const opponentOneHandRef = useRef<HTMLDivElement>(null);
  const opponentTwoHandRef = useRef<HTMLDivElement>(null);
  const opponentThreeHandRef = useRef<HTMLDivElement>(null);
  const opponentOnePlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentTwoPlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentThreePlayAreaRef = useRef<HTMLDivElement>(null);
  const playerHandRef = useRef<HTMLDivElement>(null);
  const playerPlayAreaRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const [firstOpponent, setFirstOpponent] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>({
    game_id: 274,
    id: 377,
    is_dealer: true,        
    position: 1,
    score: 0,
    status: "active",
    user:{
      id: 377,
      username: "Witty",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s",
    }
  });
  const [thirdOpponent, setThirdOpponent] = useState<any>({
    game_id: 274,
    id: 377,
    is_dealer: true,        
    position: 1,
    score: 0,
    status: "active",
    user:{
      id: 377,
      username: "Tony",
      image_url: "https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
    }
  });

  const [message, setMessage] = useState<string>("Your turn! Click to play");

  
  useEffect(() => {
    if (game?.current_player_position === me?.position) {
      setMessage("Your turn! Click to play");
    } else {
      const player = players.find((player: any) => player.position === game?.current_player_position);
      setMessage(`${player?.user.username}'s turn`);
    }
  }, [game]);


  const { code } = useParams();

  const getMyData = (data: any[]) => {
    const myData = data.find((player) => player.user.id === user?.id);
    setMe(myData);
  };

  const getOpponentsData = (data: any[]) => {
    const opponents = data.filter((player) => player.user.id !== user?.id);
    if (opponents.length > 0) setFirstOpponent(opponents[0]);
    if (opponents.length > 1) setSecondOpponent(opponents[1]);
    if (opponents.length > 2) setThirdOpponent(opponents[2]);
  };


  const getUpdatedGameData = (data: any) => {
    console.log("Updated game data received:", data);
    setGame(data);
    //setGameCards(data.cards);
  };

  const getGameDataCallback = (data: any) => {
    console.log("Game data received:", data);
    setGame(data);

    setPlayers(data.players);
    data.cards.forEach((card: any, i: number) => {
      card.pos_x = card.pos_x * i;
      card.pos_y = card.pos_y * i;
    });
    setGameCards(data.cards);
    getMyData(data.players);
    getOpponentsData(data.players);
  };

  //console.log('gameData', game)
  //console.log("Players:", players);
  //console.log("Game Cards:", gameCards);

  const dealtCardsCallback = (cards: any) => {
    console.log("DealtCards", cards);
    const currentMe = meRef.current;
    setGameCards(cards);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dealCards(cards, currentMe.id);
      });
    });
  };

  const shuffledDeckCallback = (cards: any) => {
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shuffleCards(cards, setGameCards, setIsShuffling);
      });
    });
  };

  const meRef = useRef(me);
  useEffect(() => {
    meRef.current = me;
  }, [me]);

  useEffect(() => {
    console.log("Game code:", code);
    socket.emit("getGameData", code);

    socket.on("gameData", getGameDataCallback);
    socket.on("updatedGameData", getUpdatedGameData);
    socket.on("dealtCards", dealtCardsCallback);
    socket.on("shuffledDeck", shuffledDeckCallback);

    //socket.on("playedCard", playedCardCallback);

    socket.on("gameMessage", gameMessageCallback);

    return () => {
      socket.off("gameData", getGameDataCallback);
      socket.off("updatedGameData", getUpdatedGameData);
      socket.off("shuffledDeck", shuffledDeckCallback);
      socket.off("dealtCards", dealtCardsCallback);
      //socket.off("playedCard", playedCardCallback);
      socket.off("gameMessage", gameMessageCallback);
    };
  }, []);

  useEffect(() => {
    if(game) {
      socket.on("playedCard", playedCardCallback);
    }

    return () => {
      socket.off("playedCard", playedCardCallback);
    };
  }, [game, gameCards]);

  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      e.preventDefault();
     // socket.emit("leaveGame", code);
      e.returnValue = "Are you sure you want to leave the game?";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleShuffle = () => {
    socket.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket.emit("dealCards", code);
  };

  const getSlotByPosition = (position: number, ref: any) => {
    if(!ref.current) return null;
    return ref.current.querySelector(`[data-position="${position}"]`);
  }

  const getCardHandSlotRect = (card: any) => {
    let targetArea = null;

    if(card.player_id === me?.id) {
      console.log('me', me?.id, card.player_id);
      
      targetArea = playerHandRef.current;
    } else if(card.player_id === firstOpponent?.id) {
      targetArea = opponentOneHandRef.current;
    } else if(card.player_id === secondOpponent?.id) {
      targetArea = opponentTwoHandRef.current;
    } else if(card.player_id === thirdOpponent?.id) {
      targetArea = opponentThreeHandRef.current;
    }

    if(!targetArea) return null;
    const slot = targetArea.children[card.hand_position];
    console.log('slot from hand', slot);
    
    return slot?.getBoundingClientRect();
  }


  const playCardToSlot = (card: any, destSlot: any, trick_number: number) => {
    //console.log('slot', slot);
   // destSlot?.style.setProperty('background-color', 'red');
    console.log('destSlot', destSlot);
    
    const slotRect = destSlot?.getBoundingClientRect();
    //console.log('slot_pos', card);
    const deckRect = deckRef.current.getBoundingClientRect();
    const xOffset = slotRect?.left - deckRect.left;
    const yOffset = slotRect?.top - deckRect.top;
    card.pos_x = xOffset;
    card.pos_y = yOffset;
    card.rotation = 0;
    card.inSlot = true;
    card.slotPosition = {target: 'player', position: 0};
    setGameCards(prevCards=>{
      return prevCards.map(c=>{
        if(c.id === card.id) {
          return {...c, pos_x: xOffset, status:'played', pos_y: yOffset, rotation: 0, inSlot: true, z_index: trick_number, slotPosition: {target: 'player', position: 0}};
        }
        return c;
      })
    });
    //card.style.setProperty('transform', `translate(${xOffset}px, ${yOffset}px)`);
  }

  //console.log('gameCards', gameCards);


  const playedCardCallback = ({card_id, player_id, trick_number}: {card_id: number, player_id: number, trick_number: number}) => {
    console.log("Played card:", card_id, player_id, trick_number);
    console.log('here...');
    console.log('game', game);
    const card = gameCards.find((card: any) => card.id === card_id);
    const player = game.players.find((player: any) => player.id === player_id);
    console.log(`${player.user.username} played ${card.card.rank} of ${card.card.suit}`);

  /*  console.log('cards', gameCards);
    
    console.log('card', card.pos_x, card.pos_y);
    
    
    card.pos_x = 0;
    card.pos_y = 0;
    card.rotation = 0;
    card.inSlot = true;
    card.slotPosition = {target: 'player', position: 0};
    setGameCards(prevCards=>{
      return prevCards.map(c=>{
        if(c.id === card.id) {
          return {...c, pos_x: c.pos_x, pos_y: c.pos_y + 100, rotation: 0, inSlot: true, slotPosition: {target: 'player', position: 0}};
        }
        return c;
      })
    });

    const cardAgain = gameCards.find((card: any) => card.id === card_id);
    console.log('cardAgain', cardAgain);
*/
   

    if(player_id === me?.id) {
      const destSlot = getSlotByPosition(trick_number - 1, playerPlayAreaRef);
      playCardToSlot(card, destSlot, trick_number);
    } else if(player_id === firstOpponent?.id) {
      const destSlot = getSlotByPosition(trick_number - 1, opponentOnePlayAreaRef);
      playCardToSlot(card, destSlot, trick_number);
    } else if(player_id === secondOpponent?.id) {
      const destSlot = getSlotByPosition(trick_number - 1, opponentTwoPlayAreaRef);
      playCardToSlot(card, destSlot, trick_number);
    } else if(player_id === thirdOpponent?.id) {
      const destSlot = getSlotByPosition(trick_number - 1, opponentThreePlayAreaRef);
      playCardToSlot(card, destSlot, trick_number);
    }

   


  };

  const gameMessageCallback = (message: string) => {
    console.log("Game message:", message);
    setMessage(message);
  };


  const dealCards = async (cards: any[], current_player_id: number) => {
    if (isDealing || isShuffling) return;
    setIsDealing(true);

    let cardIndex = 0;

    for (const sequence of extractDealingSequence(cards, current_player_id)) {
      await dealSequenceToPositions(
        cardIndex,
        sequence.target,
        sequence.positions,
        cards,
        {
          playerHandRef,
          opponentOneHandRef,
          opponentTwoHandRef,
          opponentThreeHandRef,
          deckRef
        },
        setGameCards
      );
      cardIndex += sequence.positions.length;
    }

    setIsDealing(false);
    //deckRef.current?.style.setProperty('display', 'none');
  };

  return (
    <div className="min-h-screen relative b-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-betwee">
      <PlayerInfo
        name={firstOpponent?.user.username || "Opponent 1"}
        avatar={firstOpponent?.user.image_url || "path/to/avatar.jpg"}
        //cards={playerCards.length}
        points={firstOpponent?.score}
        styles="left-1/2 -translate-x-1/2 top-1"
      />
   {secondOpponent && <PlayerInfo
        name={secondOpponent?.user.username || "Opponent 2"}
        avatar={secondOpponent?.user.image_url || "path/to/avatar.jpg"}
        //cards={playerCards.length}
        points={thirdOpponent?.score}
        styles="top-1/2 -translate-y-1/2 left-1"
      />}
      {thirdOpponent && <PlayerInfo
        name={thirdOpponent?.user.username || "Opponent 3"}
        avatar={thirdOpponent?.user.image_url || "path/to/avatar.jpg"}
        //cards={playerCards.length}
        points={thirdOpponent?.score}
        styles="top-1/2 -translate-y-1/2 right-1"
      />}

       
{me?.is_dealer && (
            <div className="flex absolute justify-between borde top-2 left-0 right-0 button-container z-10">
              <button
                id="deal-cards"
                disabled={isDealing}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg 
                hover:from-purple-500 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                font-medium shadow-lg hover:shadow-xl"
                onClick={handleDeal}
              >
                {isDealing ? "Dealing..." : "Deal"}
              </button>
              <button
                id="shuffle"
                disabled={isShuffling}
                className="flex items-center gap- px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg 
                hover:from-emerald-500 hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                font-medium shadow-lg hover:shadow-xl"
                onClick={handleShuffle}
              >
                {isShuffling ? "Shuffling..." : "Shuffle"}
              </button>
            </div>
          )}

      
      {/* opponent area 1 */}
      <div
        id="opponentArea"
        ref={opponentOneHandRef}
          className="borde absolute left-1/2 -translate-x-1/2 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>
     {/* opponent area 2 */}
      <div
        id="opponentArea"
        ref={opponentTwoHandRef}
        className="borde rotate-90 absolute left-0 top-1/3  mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>

        {/* opponent area 3 */}
        <div
        id="opponentArea"
        ref={opponentThreeHandRef}
        className="borde absolute rotate-90 top-1/3  right-0 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>

      <div className="borde z-[100000] w-ful absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <div
          className="flex-col items-center h-[90px w-full opponent-one-play-area  flex borde border-red-500 relative"
          id="player-2"
          ref ={opponentOnePlayAreaRef}
        >
           {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={5 - index -1}></div>
        ))}
        
        </div>

        <div className="borde gap-10 justify-betwee items-cente flex border-black">
          <div className="opponent-two-play-area flex  borde border-blac w-ful" ref={opponentTwoPlayAreaRef}>
          {[...Array(1)].map((_, index) => (
          <div key={index} className="card-slot-2" data-position={index}></div>
        ))}
          </div>
          <div
            className="flex deck  hidde absolute  top-1/4 p-2 left-1/3 borde  border-blue-600"
            ref={deckRef}
          >
            {[...gameCards].reverse().map((card) => (
              <Card
                key={card.card.card_id}
                imageUrl={card.card.image_url}
                id={card.card.card_id}
                game_code={game?.code}
                game_card_id={card.id}
                rank={card.card.rank}
                value={card.card.value}
                suit={card.card.suit}
                card_player_id={card.player_id}
                current_player_id={me?.id}
                status={card.status}
                transform={`translate(${card.pos_x}px, ${
                  card.pos_y
                }px) rotate(${card.rotation + 0}deg)`}
                zIndex={card.z_index}
                inSlot={card.inSlot}
                slotPosition={card.slotPosition}
              />
            ))}

          </div>
          <div className="opponent-three-play-area flex borde border-black w-ful" ref={opponentThreePlayAreaRef}>
          {[...Array(1)].map((_, index) => (
          <div key={index} className="card-slot-2" data-position={index}></div>
        ))}
          </div>
         
        </div>


        <div
          className="flex w-full relative player-play-area items-center flex-col borde border-blue-600 relative"
          id="player-1"
          ref={playerPlayAreaRef}
        >

           {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
         
        </div>
      </div>


        <div className="bg-yellow-200 message-box text-black mx-auto max-w-md w-full p-4 rounded-md text-xs absolute  bottom-32 sm:bottom-52 left-1/2 -translate-x-1/2">
            {message}
        </div>


      <div
        id="playerArea"
        className="container   absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
        ref={playerHandRef}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>
      <PlayerInfo
        name={me?.user.username || "Player"}
        avatar={me?.user.image_url || "path/to/avatar.jpg"}
        //cards={playerCards.length}
        points={me?.score}
        styles="left-1/2 -translate-x-1/2 bottom-1"
      />
    </div>
  );
};

export default PlayTest;
