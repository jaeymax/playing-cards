import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { playing_cards } from "@/data/cards";
import Card from "@/components/Card";

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

  const [cards, setCards] = useState<Card[]>(playing_cards);
  const [playerCards, setPlayerCards] = useState<Card[]>([
    {
        id: 1,
        value:7,
        rank:'7',
        suit:'diamonds',
        imageUrl:'cards/7-of-diamonds.jpg',
        transform:`translate(${0}px, ${0}px) `,
        inSlot:false,
        slotPosition:null
    },
    {
        id: 2,
        value:8,
        rank:'8',
        suit:'diamonds',
        imageUrl:'cards/8-of-diamonds.jpg',
        transform:`translate(${10}px, ${0}px)`,
        inSlot:false,
        slotPosition:null
    },
    {
        id: 3,
        value:13,
        rank:'king',
        suit:'hearts',
        imageUrl:'cards/king-of-hearts.jpg',
        transform:`translate(${20}px, ${0}px)`,
        inSlot:false,
        slotPosition:null
    },
    {
        id: 4,
        value:12,
        rank:'queen',
        suit:'spades',
        imageUrl:'cards/queen-of-spades.jpg',
        transform:`translate(${30}px, ${0}px)`,
        inSlot:false,
        slotPosition:null
    }
  ]);
  const [opponentCards, setOpponentCards] = useState<Card[]>([
    {
        id: 7,
        value:7,
        rank:'7',
        suit:'diamonds',
        imageUrl:'cards/7-of-diamonds.jpg',
        transform:`translate(${0}px, ${0}px) `,
        inSlot:false,
        slotPosition:null
    },
    {
        id: 8,
        value:8,
        rank:'8',
        suit:'diamonds',
        imageUrl:'cards/8-of-diamonds.jpg',
        transform:`translate(${10}px, ${0}px)`,
        inSlot:false,
        slotPosition:null
    },
    {
        id: 9,
        value:13,
        rank:'king',
        suit:'hearts',
        imageUrl:'cards/king-of-hearts.jpg',
        transform:`translate(${20}px, ${0}px)`,
        inSlot:false,
        slotPosition:null
    },
  ]);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const opponentAreaRef = useRef<HTMLDivElement>(null);
  const playerAreaRef = useRef<HTMLDivElement>(null);

  // console.log(playing_cards);

  const fisherYatesShuffle = (arr: Card[]) => {
    const updatedCards = [...arr];

    for (let i = updatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [updatedCards[i], updatedCards[j]] = [updatedCards[j], updatedCards[i]];
    }

    setCards(updatedCards);
  };

  const shuffleCards = async () => {
    if (isShuffling) return;

    setIsShuffling(true);

    const updatedCards = [...cards];

    for (let i = updatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [updatedCards[i], updatedCards[j]] = [updatedCards[j], updatedCards[i]];
    }

    for (let i = 0; i < updatedCards.length; i++) {
      updatedCards[i].transform = `translateY(${i}px)`;
    }

    //setCards(updatedCards);

    console.log(updatedCards);

    const leftHalf = cards.slice(0, updatedCards.length / 2);
    const rightHalf = cards.slice(updatedCards.length / 2, updatedCards.length);

    await splitDeck(leftHalf, rightHalf);

    await riffleCards(leftHalf, rightHalf);

    await bridgeFinish();

    setCards(updatedCards);

    setIsShuffling(false);
  };

  const splitDeck = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];

      leftHalf.forEach((_, i) => {
        updatedCards[i].transform = `translate(-120px, ${
          i * 0.5
        }px) rotate(-5deg)`;
      });

      rightHalf.forEach((_, i) => {
        updatedCards[i + leftHalf.length].transform = `translate(120px, ${
          i * 0.5
        }px) rotate(5deg)`;
      });

      setCards(updatedCards);
      setTimeout(resolve, 500);
    });
  };

  const riffleCards = (leftHalf: Card[], rightHalf: Card[]) => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];
      let delay = 0;
      const shuffledPositions: Card[] = [];

      for (let i = 0; i < Math.max(leftHalf.length, rightHalf.length); i++) {
        if (i < leftHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            updatedCards[i].transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px)`;
            shuffledPositions.push(updatedCards[i]);
            setCards([...updatedCards]);
          }, delay);
          delay += 50;
        }

        if (i < rightHalf.length) {
          setTimeout(() => {
            const randomOffset = Math.random() * 3 - 1.5;
            updatedCards[
              i + leftHalf.length
            ].transform = `translate(${randomOffset}px, ${
              shuffledPositions.length * 0.5
            }px)`;
            shuffledPositions.push(updatedCards[i + leftHalf.length]);
            setCards([...updatedCards]);
          }, delay);
          delay += 50;
        }
      }

      setTimeout(resolve, delay + 500);
    });
  };

  const bridgeFinish = () => {
    return new Promise<void>((resolve) => {
      const updatedCards = [...cards];
      updatedCards.forEach((_, i) => {
        const progress = i / updatedCards.length;
        const archHeight = Math.sin(progress * Math.PI) * 30;

        updatedCards[i].transform = `translateY(${
          i * 0.5 - archHeight
        }px) rotate(${(progress - 0.5) * 2}deg)`;
      });

      setCards(updatedCards);

      setTimeout(() => {
        updatedCards.forEach((_, i) => {
          updatedCards[i].transform = `translateX(${i * 0.5}px)`;
        });
        setCards(updatedCards);
        resolve();
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
    console.log("before create cards runs", cards);

    let updatedCards = [...cards];
    /* for(let i = updatedCards.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [updatedCards[i], updatedCards[j]] =  [updatedCards[j], updatedCards[i]]
    }
    */

    for (let i = 0; i < updatedCards.length; i++) {
      updatedCards[i].transform = `translate(${i * 0.1}px, ${i * 0.1}px)`;
    }
    setCards(updatedCards);

    console.log("after create cards runs", updatedCards);

    deckRef.current.style.display = "non";
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
    if (isDealing) return;
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

  const reset = () => {
    if (!isDealing) {
      createCards();
    }
  };

  useEffect(() => {
    createCards();
  }, []);

  return (
    <div className="min-h-screen b-green-800 bg-[url(./assets/background1.jpg)] bg-cover  gap-4 bg-center w-full flex flex-col justify-betwee">
      <div className="player-info borde mt-5 w-fit mx-auto flex flex-col items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-medium">Witty</div>
          <div className="text-sm">4 cards</div>
          <div className="text-sm font-semibold">3 pts</div>
        </div>
      </div>
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
            {opponentCards.map((card, index)=>(
            <Card id={card.id} imageUrl={card.imageUrl} rank={card.rank} suit={card.suit} value={card.value} key={card.id} inSlot = {card.inSlot} slotPosition={card.slotPosition} transform={card.transform} />
            ))}
        </div>
        <div className="borde flex flex-col items-center borde ">
          <div
            className="flex deck p-2 relative borde w-[50px] border-red-600 h-[80px]"
            ref={deckRef}
          >
            {[...cards].reverse().map((card) => (
              <Card
                key={card.id}
                imageUrl={card.imageUrl}
                id={card.id}
                rank={card.rank}
                value={card.value}
                suit={card.suit}
                transform={card.transform}
                inSlot = {card.inSlot}
                slotPosition={card.slotPosition}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-5">
            <button
              id="deal-cards"
              disabled={isDealing}
              className="border border-gray-800 bg-gray-50 text-black py-2 px-4 rounded"
              onClick={dealCards}
            >
              Deal
            </button>
            <button
              id="shuffle"
              disabled={isShuffling}
              className="border border-gray-800 bg-gray-50 text-black py-2 px-4 rounded"
              onClick={shuffleCards}
            >
              Shuffle
            </button>
          </div>
        </div>
        <div
          className="flex-1 w inline-block -ml-10  borde border-green-600 relative"
          id="player-1"
        >
            {playerCards.map((card, index)=>(
            <Card id={card.id} imageUrl={card.imageUrl} rank={card.rank} suit={card.suit} value={card.value} key={card.id} inSlot = {card.inSlot} slotPosition={card.slotPosition} transform={card.transform} />
            ))}
            {/* <Card id={1} imageUrl="/cards/6-of-spades.jpg" rank="4" suit="4" value={5} key={1} inSlot = {false} slotPosition={null} transform="" />
            <Card id={1} imageUrl="/cards/6-of-spades.jpg" rank="4" suit="4" value={5} key={2} inSlot = {false} slotPosition={null} transform="" /> */}
            
        </div>
      </div>
      <div className="bg-yellow-200 text-black mx-auto max-w-md w-full w- p-4 rounded-md text-xs">
        Your turn! Click to play
      </div>
      <div
        id="playerArea"
        className="container player-area flex gap- mx-auto w-full mbx-20"
        ref={playerAreaRef}
      >
        {[...Array(5)].map((_, index) => (
          <div key={index} className="card-slot" data-position={index}></div>
        ))}
      </div>
      <div className="player-info borde mb-5 w-fit mx-auto flex flex-col items-center">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-medium">Jaey</div>
          <div className="text-sm">4 cards</div>
          <div className="text-sm font-semibold">5 pts</div>
        </div>
      </div>
    </div>
  );
};

export default PlayTest;
