import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { playing_cards } from "@/data/cards";
import Card from "@/components/Card";
import { useParams } from "react-router-dom";
import { socket } from "@/socket";
import { useAppContext } from "@/contexts/AppContext";
import {
  extractDealingSequence,
  shuffleCards,
  dealSequenceToPositions,
} from "@/utils/Functions";

const PlayerInfo = ({
  name,
  avatar,
  cards,
  points,
  styles,
}: {
  name: string;
  avatar: string;
  cards: number;
  points: number;
  styles: string;
}) => (
  <div
    className={`player-info absolute ${styles} mt- borde mb- w-fit mx-auto flex flex-col items-center`}
  >
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
  interface Card {
    id: number;
    value: number;
    rank: string;
    suit: string;
    imageUrl: string;
    transform: string;
    inSlot: boolean;
    slotPosition: null | { target: string; position: number };
  }

  const { user } = useAppContext();

  const [cards, setCards] = useState<Card[]>(playing_cards);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [opponentCards, setOpponentCards] = useState<Card[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const opponentOneHandRef = useRef<HTMLDivElement>(null);
  const opponentTwoHandRef = useRef<HTMLDivElement>(null);
  const opponentThreeHandRef = useRef<HTMLDivElement>(null);
  const playerHandRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>({
    game_id: 274,
    id: 377,
    is_dealer: true,
    position: 1,
    score: 0,
    status: "active",
    user: {
      id: 377,
      username: "Witty",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s",
    },
  });

  const [fourthOpponent, setFourthOpponent] = useState<any>({
    game_id: 274,
    id: 377,
    is_dealer: true,
    position: 1,
    score: 0,
    status: "active",
    user: {
      id: 377,
      username: "Tony",
      image_url:
        "https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
    },
  });

  const { code } = useParams();

  const getMyData = (data: any[]) => {
    const myData = data.find((player) => player.user.id === user?.id);
    setMe(myData);
  };

  const getOpponentsData = (data: any[]) => {
    const opponents = data.filter((player) => player.user.id !== user?.id);
    if (opponents.length > 0) setSecondOpponent(opponents[0]);
    if (opponents.length > 1) setThirdOpponent(opponents[1]);
    if (opponents.length > 2) setFourthOpponent(opponents[2]);
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
    //extractDealingSequence(cards, currentMe.id);
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

    socket.on("dealtCards", dealtCardsCallback);
    socket.on("shuffledDeck", shuffledDeckCallback);

    return () => {
      socket.off("gameData", getGameDataCallback);
      socket.off("shuffledDeck", shuffledDeckCallback);
      socket.off("dealtCards", dealtCardsCallback);
    };
  }, []);

  const handleShuffle = () => {
    socket.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket.emit("dealCards", code);
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
        playerHandRef,
        opponentOneHandRef,
        opponentTwoHandRef,
        opponentThreeHandRef,
        deckRef,
        setGameCards
      );
      cardIndex += sequence.positions.length;
    }

    setIsDealing(false);
  };

  return (
    <div className="min-h-screen b-green-800 bg-[url(./assets/background1.jpg)] bg-cover  gap-4 bg-center w-full flex flex-col justify-betwee">
      <PlayerInfo
        name={secondOpponent?.user.username || "Opponent 1"}
        avatar={secondOpponent?.user.image_url || "path/to/avatar.jpg"}
        cards={playerCards.length}
        points={secondOpponent?.score}
        styles="left-1/2 -translate-x-1/2 top-1"
      />
      <PlayerInfo
        name={thirdOpponent?.user.username || "Opponent 2"}
        avatar={thirdOpponent?.user.image_url || "path/to/avatar.jpg"}
        cards={playerCards.length}
        points={thirdOpponent?.score}
        styles="top-1/2 -translate-y-1/2 left-1"
      />
      <PlayerInfo
        name={fourthOpponent?.user.username || "Opponent 3"}
        avatar={fourthOpponent?.user.image_url || "path/to/avatar.jpg"}
        cards={playerCards.length}
        points={fourthOpponent?.score}
        styles="top-1/2 -translate-y-1/2 right-1"
      />
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

      <div className="flex-1 borde relative flex flex-col items-center ">
        <div
          className="flex-1 w-fit -ml-10 flex borde border-red-600 relative"
          id="player-2"
        >
          {/* {opponentCards.map((card, index) => (
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              rank={card.rank}
              suit={card.suit}
              value={card.value}
              key={card.id}
              inSlot={card.inSlot}
              slotPosition={card.slotPosition}
              transform={card.transform}
            />
          ))} */}
        </div>
        <div className="borde flex flex-col items-center borde ">
          <div
            className="flex deck p-2 relative borde w-[50px] border-red-600 h-[80px]"
            ref={deckRef}
          >
            {[...gameCards].map((card, i) => (
              <Card
                key={card.card.card_id}
                imageUrl={card.card.image_url}
                id={card.card.card_id}
                rank={card.card.rank}
                value={card.card.value}
                suit={card.card.suit}
                card_player_id={card.player_id}
                current_player_id={me?.id}
                // transform={`translate(${0.2 * i}px, ${0.1 * i}px)`}
                transform={`translate(${card.pos_x}px, ${
                  card.pos_y
                }px) rotate(${card.rotation + 0}deg)`}
                inSlot={card.inSlot}
                slotPosition={card.slotPosition}
              />
            ))}

            {/* {[...cards].map((card, i) => (
              <Card
                key={card.id}
                imageUrl={card.imageUrl}

                id={card.id}
                rank={card.rank}
                value={card.value}
                suit={card.suit}
                transform={card.transform}
                inSlot={card.inSlot}
                slotPosition={card.slotPosition}
              />
            ))}  */}
          </div>
          {me?.is_dealer && (
            <div className="flex gap-3 mt-5 button-container">
              <button
                id="deal-cards"
                disabled={isDealing}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg 
                hover:from-purple-500 hover:to-blue-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                font-medium shadow-lg hover:shadow-xl"
                onClick={handleDeal}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                {isDealing ? "Dealing..." : "Deal Cards"}
              </button>
              <button
                id="shuffle"
                disabled={isShuffling}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg 
                hover:from-emerald-500 hover:to-teal-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
                font-medium shadow-lg hover:shadow-xl"
                onClick={handleShuffle}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isShuffling ? "Shuffling..." : "Shuffle Deck"}
              </button>
            </div>
          )}
        </div>
        <div
          className="flex-1 w inline-block -ml-10  borde border-green-600 relative"
          id="player-1"
        >
          {playerCards.map((card, index) => (
            <Card
              id={card.id}
              imageUrl={card.imageUrl}
              rank={card.rank}
              suit={card.suit}
              value={card.value}
              key={card.id}
              inSlot={card.inSlot}
              slotPosition={card.slotPosition}
              transform={card.transform}
              card_player_id={0}
              current_player_id={me?.id}
            />
          ))}
        </div>
      </div>
      {game?.current_player_position === me?.position && (
        <div className="bg-yellow-200 text-black mx-auto max-w-md w-full p-4 rounded-md text-xs">
          Your turn! Click to play
        </div>
      )}
      {/* <div className="bg-yellow-200 text-black mx-auto max-w-md w-full w- p-4 rounded-md text-xs">
        Your turn! Click to play
      </div> */}
      <div
        id="playerArea"
        className="container mb-[100px] player-area flex gap- mx-auto w-full mbx-20"
        ref={playerHandRef}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>
      <PlayerInfo
        name={me?.user.username || "Player"}
        avatar={me?.user.image_url || "path/to/avatar.jpg"}
        cards={playerCards.length}
        points={me?.score}
        styles="left-1/2 -translate-x-1/2 bottom-1"
      />
    </div>
  );
};

export default PlayTest;
