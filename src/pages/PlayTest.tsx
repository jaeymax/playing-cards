import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  extractDealingSequence,
  shuffleCards,
  dealSequenceToPositions,
} from "@/utils/Functions";
import Modal from "@/components/Modal";
import { useSocket } from "@/contexts/SocketProvider";

const PlayerInfo = ({
  name,
  avatar,
  points,
  styles,
}: {
  name: string;
  avatar: string;
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
      <div className="text-sm font-semibold player-score">{points} pts</div>
    </div>
  </div>
);

const PlayTest = () => {
  const { user } = useAppContext();
  const { socket } = useSocket();
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
  /* const [secondOpponent, setSecondOpponent] = useState<any>({
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
  const [thirdOpponent, setThirdOpponent] = useState<any>({
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
  });*/
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);

  const [message, setMessage] = useState<string>("Your turn! Click to play");
  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<any>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (game?.current_player_position === me?.position) {
      setMessage("Your turn! Click to play");
    } else {
      const player = players.find(
        (player: any) => player.position === game?.current_player_position
      );
      setMessage(`${player?.user.username}'s turn`);
    }
  }, [game]);

  const { code } = useParams();

  const getMyData = (data: any[]) => {
    const myData = data.find((player) => player.user.id === user?.id);
    if (myData.is_dealer) {
      setShowDealButton(true);
      setShowShuffleButton(true);
    }
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
    const myData = data.players.find(
      (player: any) => player.user.id === user?.id
    );
    setMe(myData);
    getOpponentsData(data.players);
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
    // requestAnimationFrame(() => {
    // requestAnimationFrame(() => {
    dealCards(cards, currentMe.id);
    // });
    // });
  };

  const startNewHandCallback = (data: any) => {
    console.log("Start new hand:", data);
    setGameEnded(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players);
    getOpponentsData(data.players);
    setGame(data);
    setGameCards(data.cards);
  };

  const shuffledDeckCallback = (cards: any) => {
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    // requestAnimationFrame(() => {
    // requestAnimationFrame(() => {
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
    //});
    //});
  };

  const meRef = useRef(me);
  useEffect(() => {
    meRef.current = me;
  }, [me]);

  useEffect(() => {
    console.log("Game code:", code);
    socket?.emit("getGameData", code);

    socket?.on("gameData", getGameDataCallback);
    socket?.on("updatedGameData", getUpdatedGameData);
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    //socket.on("playedCard", playedCardCallback);

    socket?.on("gameMessage", gameMessageCallback);

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
      //socket.off("playedCard", playedCardCallback);
      socket?.off("gameMessage", gameMessageCallback);
    };
  }, []);

  const gameEndedCallback = (data: any) => {
    console.log("gameEnded", data);
    setGameEnded(true);
    setWinningPlayer(data.winner);
  };

  useEffect(() => {
    if (game) {
      socket?.on("playedCard", playedCardCallback);
      socket?.on("gameEnded", gameEndedCallback);
      socket?.on("startNewHand", startNewHandCallback);
    }

    return () => {
      socket?.off("playedCard", playedCardCallback);
      socket?.off("gameEnded", gameEndedCallback);
      socket?.off("startNewHand", startNewHandCallback);
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
    socket?.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket?.emit("dealCards", code);
  };

  const getSlotByPosition = (position: number, ref: any) => {
    if (!ref.current) return null;
    return ref.current.querySelector(`[data-position="${position}"]`);
  };

  const moveDrawPileOffScreen = (cards: any[]) => {
    const cardsInDrawPile = cards.filter(
      (card: any) => card.status === "in_drawpile"
    );
    //const deckRect = deckRef.current?.getBoundingClientRect();
    cardsInDrawPile.forEach((card: any) => {
      setGameCards((prevCards) => {
        return prevCards.map((c) => {
          if (c.id === card.id) {
            // console.log("card", card);

            return {
              ...c,
              pos_x: -1000,
              pos_y: 0,
              rotation: 0,
              inSlot: false,
              slotPosition: { target: "player", position: 0 },
            };
          }
          return c;
        });
      });
    });
    //console.log("gameCards", cards);
    //console.log("cardsInDrawPile", cardsInDrawPile);
  };

  const playCardToSlot = (card: any, destSlot: any, trick_number: number) => {
    //console.log("destSlot", destSlot);

    const slotRect = destSlot?.getBoundingClientRect();

    const deckRect = deckRef?.current?.getBoundingClientRect();
    const xOffset = slotRect?.left - (deckRect?.left || 0);
    const yOffset = slotRect?.top - (deckRect?.top || 0);
    card.pos_x = xOffset;
    card.pos_y = yOffset;
    card.rotation = 0;
    card.inSlot = true;
    card.slotPosition = { target: "player", position: 0 };
    setGameCards((prevCards) => {
      return prevCards.map((c) => {
        if (c.id === card.id) {
          return {
            ...c,
            pos_x: xOffset,
            status: "played",
            pos_y: yOffset,
            rotation: 0,
            inSlot: true,
            z_index: trick_number,
            slotPosition: { target: "player", position: 0 },
          };
        }
        return c;
      });
    });
    //card.style.setProperty('transform', `translate(${xOffset}px, ${yOffset}px)`);
  };

  //console.log('gameCards', gameCards);

  const playedCardCallback = ({
    card_id,
    player_id,
    trick_number,
  }: {
    card_id: number;
    player_id: number;
    trick_number: number;
  }) => {
    console.log("Played card:", card_id, player_id, trick_number);
    console.log("here...");
    console.log("game", game);
    const card = gameCards.find((card: any) => card.id === card_id);
    const player = game.players.find((player: any) => player.id === player_id);
    console.log(
      `${player.user.username} played ${card.card.rank} of ${card.card.suit}`
    );

    if (player_id === me?.id) {
      const destSlot = getSlotByPosition(trick_number - 1, playerPlayAreaRef);
      playCardToSlot(card, destSlot, trick_number);
    } else if (player_id === firstOpponent?.id) {
      const destSlot = getSlotByPosition(
        trick_number - 1,
        opponentOnePlayAreaRef
      );
      playCardToSlot(card, destSlot, trick_number);
    } else if (player_id === secondOpponent?.id) {
      const destSlot = getSlotByPosition(
        trick_number - 1,
        opponentTwoPlayAreaRef
      );
      playCardToSlot(card, destSlot, trick_number);
    } else if (player_id === thirdOpponent?.id) {
      const destSlot = getSlotByPosition(
        trick_number - 1,
        opponentThreePlayAreaRef
      );
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
          deckRef,
        },
        setGameCards
      );
      cardIndex += sequence.positions.length;
    }

    setIsDealing(false);
    setShowDealButton(false);
    setShowShuffleButton(false);

    moveDrawPileOffScreen(cards);
  };

  return (
    <>
      <div className="min-h-screen relative b-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-betwee">
        <PlayerInfo
          name={firstOpponent?.user.username || "Opponent 1"}
          avatar={firstOpponent?.user.image_url || "path/to/avatar.jpg"}
          //cards={playerCards.length}
          points={firstOpponent?.score}
          styles="left-1/2 -translate-x-1/2 top-1"
        />
        {secondOpponent && (
          <PlayerInfo
            name={secondOpponent?.user.username || "Opponent 2"}
            avatar={secondOpponent?.user.image_url || "path/to/avatar.jpg"}
            //cards={playerCards.length}
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 left-1"
          />
        )}
        {thirdOpponent && (
          <PlayerInfo
            name={thirdOpponent?.user.username || "Opponent 3"}
            avatar={thirdOpponent?.user.image_url || "path/to/avatar.jpg"}
            //cards={playerCards.length}
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        {showDealButton && showShuffleButton && (
          <div className="flex hidde absolute w-fit gap-2 borde top-1/2 left-1/2 -translate-x-1/2 button-container z-[1000000000000]">
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
            ref={opponentOnePlayAreaRef}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="card-slot"
                data-position={5 - index - 1}
              ></div>
            ))}
          </div>

          <div className="borde gap-10 justify-betwee items-cente flex border-black">
            <div
              className="opponent-two-play-area flex  borde border-blac w-ful"
              ref={opponentTwoPlayAreaRef}
            >
              {[...Array(1)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={index}
                ></div>
              ))}
            </div>
            <div
              className="flex deck hidde absolute  top-1/4 p-2 left-1/3 borde  border-blue-600"
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
            <div
              className="opponent-three-play-area flex borde border-black w-ful"
              ref={opponentThreePlayAreaRef}
            >
              {[...Array(1)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={index}
                ></div>
              ))}
            </div>
          </div>

          <div
            className="flex w-full player-play-area items-center flex-col borde border-blue-600 relative"
            id="player-1"
            ref={playerPlayAreaRef}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="card-slot"
                data-position={index}
              ></div>
            ))}
          </div>
        </div>

        {!gameEnded && (
          <div className="bg-yellow-200/0 message-box text-center text-gray-300 mx-auto max-w-md w-full p-4 rounded-m text-xs absolute  bottom-32 sm:bottom-52 left-1/2 -translate-x-1/2">
            {message}
          </div>
        )}

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

      {/* Game End Modal */}
      <Modal
        isOpen={gameEnded}
        onClose={() => setGameEnded(false)}
        title="Hand Complete!"
      >
        <div className="flex flex-col items-center space-y-6 py-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <img
                src={winningPlayer?.user?.image_url}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-yellow-400">
              {winningPlayer?.id === me?.id
                ? "You"
                : winningPlayer?.user.username}{" "}
              Won!
            </h3>
            <div className="text-gray-400 sm:text-sm text-xs">
              <p>Score: {winningPlayer?.points} points</p>
              <p>
                Previous Score: {winningPlayer?.score - winningPlayer?.points}
              </p>
              <p>Total Score: {winningPlayer?.score}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setGameEnded(false);
                socket?.emit("readyForNextHand", { code, winningPlayer });
              }}
              className="px-3 sm:px-6 py-2 bg-gradient-to-r from-green-600 to-green-500 
                hover:from-green-500 hover:to-green-400 text-white rounded-lg 
                transition-all duration-300 flex items-center gap-2"
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
              <span className="text-xs sm:text-sm">Play Next Hand</span>
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-3 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 
                text-gray-300 rounded-lg transition-all duration-300"
            >
              <span className="text-xs sm:text-normal">Leave Game</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PlayTest;
