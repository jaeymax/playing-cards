import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { playing_cards } from "@/data/cards";
import Card from "@/components/Card";
import { useParams } from "react-router-dom";
import { socket } from "@/socket";
import { useAppContext } from "@/contexts/AppContext";

const PlayerInfo = ({
  name,
  avatar,
  cards,
  points,
}: {
  name: string;
  avatar: string;
  cards: number;
  points: number;
}) => (
  <div
    className="player-info mt-5 borde mb-5 w-fit mx-auto flex flex-col
    items-center"
  >
    <Avatar className="w-12 h-12">
      <AvatarImage src={avatar} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
    <div className="text-center">
      <div className="font-medium">{name}</div>
      {/* <div className="text-sm">{cards} cards</div> */}
      <div className="text-sm font-semibold">{points} pts</div>
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
  //const [opponentCards, setOpponentCards] = useState<Card[]>([]);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const opponentAreaRef = useRef<HTMLDivElement>(null);
  const playerAreaRef = useRef<HTMLDivElement>(null);
  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);
  const [fourthOpponent, setFourthOpponent] = useState<any>(null);

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
    setGameCards(data.cards);
    getMyData(data.players);
    getOpponentsData(data.players);
  };

  //console.log('gameData', game)
  //console.log("Players:", players);
  //console.log("Game Cards:", gameCards);

  const dealtCardsCallback = (cards: any) => {
    console.log("DealtCards", cards);
  };

  const shuffledDeckCallback = (cards: any) => {
    console.log("ShuffleCards", cards);
    // Update state and ensure the animation runs after state is updated
    setGameCards(cards);
    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shuffleCards(cards); // Pass cards directly to shuffleCards
      });
    });
  };

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
  }, [socket]);

  const handleShuffle = () => {
    socket.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket.emit("dealCards", code);
  };

  const shuffleCards = async (cardsToShuffle: any[]) => {
    if (isShuffling) return;
    setIsShuffling(true);

    try {
      const updatedCards = [...cardsToShuffle]; // Use passed cards instead of gameCards state

      for (let i = 0; i < updatedCards.length; i++) {
        updatedCards[i].pos_y = i;
      }

      const leftHalf = updatedCards.slice(0, updatedCards.length / 2);
      const rightHalf = updatedCards.slice(
        updatedCards.length / 2,
        updatedCards.length
      );

      await splitDeck(leftHalf, rightHalf, updatedCards); // Pass updatedCards to splitDeck
      await riffleCards(leftHalf, rightHalf, updatedCards); // Pass updatedCards here
      await bridgeFinish(updatedCards); // Pass updatedCards to bridgeFinish
    } catch (error) {
      console.error("Error shuffling cards:", error);
    } finally {
      setIsShuffling(false);
    }
  };

  const splitDeck = (
    leftHalf: any[],
    rightHalf: any[],
    currentCards: any[]
  ) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...currentCards];

      leftHalf.forEach((_, i) => {
        updatedCards[i].pos_x = -120;
        updatedCards[i].pos_y = i * 0.5;
        updatedCards[i].rotation = -5;
      });

      rightHalf.forEach((_, i) => {
        updatedCards[i + leftHalf.length].pos_x = 120;
        updatedCards[i + leftHalf.length].pos_y = i * 0.5;
        updatedCards[i + leftHalf.length].rotation = 5;
      });

      setGameCards(updatedCards);
      setTimeout(resolve, 500);
    });
  };

  const riffleCards = (
    leftHalf: any[],
    rightHalf: any[],
    currentCards: any[]
  ) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...currentCards]; // Use passed in cards instead of gameCards state
      let delay = 0;
      const shuffledPositions: any[] = [];

      for (let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++) {
        if (i < leftHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            if (updatedCards[i]) {
              updatedCards[i].pos_x = randomOffset; // Fixed typo: pox_x -> pos_x
              updatedCards[i].pos_y = shuffledPositions.length * 0.5;
              shuffledPositions.push(updatedCards[i]);
            }
            setGameCards([...updatedCards]);
          }, delay);
          delay += 50;
        }

        if (i < rightHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            const rightIndex = i + leftHalf.length;
            if (updatedCards[rightIndex]) {
              updatedCards[rightIndex].pos_x = randomOffset; // Fixed typo: pox_x -> pos_x
              updatedCards[rightIndex].pos_y = shuffledPositions.length * 0.5;
              shuffledPositions.push(updatedCards[rightIndex]);
            }
            setGameCards([...updatedCards]);
          }, delay);
          delay += 50;
        }
      }

      setTimeout(resolve, delay + 500);
    });
  };

  const bridgeFinish = (currentCards: any[]) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...currentCards];

      // First animation - arch formation
      updatedCards.forEach((card, i) => {
        const progress = i / updatedCards.length;
        const archHeight = Math.sin(progress * Math.PI) * 30;

        if (card) {
          card.pos_y = i * 0.5 - archHeight;
          card.rotation = (progress - 0.5) * 2;
        }
      });

      setGameCards([...updatedCards]);

      // Second animation - final deck position
      setTimeout(() => {
        updatedCards.forEach((card, i) => {
          if (card) {
            card.pos_x = i * 0.5; // Reduced spacing for tighter deck
            card.pos_y = i * 0.1; // Add slight vertical offset
            card.rotation = 0; // Reset rotation
          }
        });
        setGameCards([...updatedCards]);

        setTimeout(resolve, 300); // Give time for final animation
      }, 600);
    });
  };

  const dealingSequence = [
    { target: "opponent", positions: [0, 1, 2] },
    { target: "player", positions: [0, 1, 2] },
    { target: "opponent", positions: [3, 4] },
    { target: "player", positions: [3, 4] },
  ];

  const createCards = () => {
    let updatedCards = [...cards];

    for (let i = 0; i < updatedCards.length; i++) {
      updatedCards[i].transform = `translate(${i * 0.3}px, ${i * 0.1}px)`;
    }
    setCards(updatedCards);
  };

  const dealSequenceToPositions = (
    startIndex: number,
    target: string,
    positions: number[]
  ) => {
    return new Promise<void>((resolve) => {
      const targetArea =
        target === "opponent" ? opponentAreaRef.current : playerAreaRef.current;
      let delay = 0;

      positions.forEach((position, index) => {
        setTimeout(() => {
          const updatedCards = [...cards];
          const cardToMove = updatedCards[startIndex + index];
          if (!targetArea) return;
          const slot = targetArea.children[position];
          const slotRect = slot.getBoundingClientRect();
          if (!deckRef.current) return;
          const deckRect = deckRef.current.getBoundingClientRect();

          const xOffset = slotRect.left - deckRect.left;
          const yOffset = slotRect.top - deckRect.top;

          cardToMove.transform = `translate(${xOffset}px, ${yOffset}px)`;
          cardToMove.inSlot = true;
          cardToMove.slotPosition = { target, position };

          setCards(updatedCards);

          if (index === positions.length - 1) resolve();
        }, delay);

        delay += 300;
      });
    });
  };

  const dealCards = async () => {
    if (isDealing || isShuffling) return;
    setIsDealing(true);

    let cardIndex = 0;

    for (const sequence of dealingSequence) {
      await dealSequenceToPositions(
        cardIndex,
        sequence.target,
        sequence.positions
      );
      cardIndex += sequence.positions.length;
    }

    setIsDealing(false);
  };

  useEffect(() => {
    createCards();
  }, []);

  return (
    <div className="min-h-screen b-green-800 bg-[url(./assets/background1.jpg)] bg-cover  gap-4 bg-center w-full flex flex-col justify-betwee">
      <PlayerInfo
        name={secondOpponent?.user.username || "Opponent 1"}
        avatar={secondOpponent?.user.image_url || "path/to/avatar.jpg"}
        cards={playerCards.length}
        points={secondOpponent?.score}
      />
      <div
        id="opponentArea"
        ref={opponentAreaRef}
        className="borde container opponent-area borde flex gap- mx-auto w-full mtx-20"
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
                // transform={`translate(${0.2 * i}px, ${0.1 * i}px)`}
                transform={`translate(${card.pos_x}px, ${card.pos_y}px) rotate(${card.rotation}deg)`}
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
            <div className="flex gap-3 mt-5">
              <button
                id="deal-cards"
                // disabled={isDealing}
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
        className="container player-area flex gap- mx-auto w-full mbx-20"
        ref={playerAreaRef}
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
      />
    </div>
  );
};

export default PlayTest;
