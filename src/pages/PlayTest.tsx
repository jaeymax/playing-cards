import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {shuffleCards,dealCards} from "@/utils/Functions";
import { useSocket } from "@/contexts/SocketProvider";
import shuffleSound from "@/sounds/riffle-card-shuffle-104313.mp3";
import playedCardSound from "@/sounds/sound4.mp3";
import WinnerModal from "@/components/WinnerModal";
import PlayerInfo from "@/components/PlayerInfo";
import GameControls from "@/components/GameControls";

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
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);

  const [message, setMessage] = useState<string>("Your turn! Click to play");
  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<any>(null);

  const navigate = useNavigate();

  function playShuffleSound() {
    const audio = new Audio(shuffleSound);
    audio.play().catch((err) => {
      console.error("Failed to play sound:", err);
    });
  }

  function playPlayedCardSound() {
    const audio = new Audio(playedCardSound);
    audio.play().catch((err) => {
      console.error("Failed to play sound:", err);
    });
  }

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

  const dealtCardsCallback = (cards: any) => {
    console.log("DealtCards", cards);
    const currentMe = meRef.current;
    setGameCards(cards);
    dealCards(
      cards,
      currentMe.id,
      {
        playerHandRef,
        opponentOneHandRef,
        opponentTwoHandRef,
        opponentThreeHandRef,
        deckRef,
      },
      setGameCards,
      isDealing,
      isShuffling,
      setIsDealing
    );
    setShowDealButton(false);
    setShowShuffleButton(false);
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
    playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
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
    socket?.on("connect", () => {
      socket?.emit("join-room", code);
    });
    socket?.on("game-not-found", () => {
      console.error("Game not found with code:", code);
      alert("Game not found. Please check the code and try again.");
      navigate("/");
    });
    socket?.on("gameMessage", gameMessageCallback);

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
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

  const playCardToSlot = (card: any, destSlot: any, trick_number: number) => {
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
  };

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
    playPlayedCardSound();
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

  return (
    <>
      <div className="min-h-screen relative bg-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-between">
        <PlayerInfo
          name={firstOpponent?.user.username || "Opponent 1"}
          avatar={firstOpponent?.user.image_url || "path/to/avatar.jpg"}
          points={firstOpponent?.score}
          styles="left-1/2 -translate-x-1/2 top-1"
        />
        {secondOpponent && (
          <PlayerInfo
            name={secondOpponent?.user.username || "Opponent 2"}
            avatar={secondOpponent?.user.image_url || "path/to/avatar.jpg"}
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 left-1"
          />
        )}
        {thirdOpponent && (
          <PlayerInfo
            name={thirdOpponent?.user.username || "Opponent 3"}
            avatar={thirdOpponent?.user.image_url || "path/to/avatar.jpg"}
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        <GameControls
          showButtons={showDealButton && showShuffleButton}
          isDealing={isDealing}
          isShuffling={isShuffling}
          onDeal={handleDeal}
          onShuffle={handleShuffle}
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
          <div className="bg-yellow-200/0 opacity-50 sm:opacity-100 message-box text-center text-gray-300 mx-auto max-w-md w-full p-4 rounded-m text-xs absolute  bottom-32 sm:bottom-52 left-1/2 -translate-x-1/2">
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
          points={me?.score}
          styles="left-1/2 -translate-x-1/2 bottom-1"
        />
      </div>

      <WinnerModal
        isOpen={gameEnded}
        onClose={() => setGameEnded(false)}
        winningPlayer={winningPlayer}
        onPlayNextHand={() => {
          setGameEnded(false);
          socket?.emit("readyForNextHand", { code, winningPlayer });
        }}
        onLeaveGame={() => navigate("/")}
      />
    </>
  );
};

export default PlayTest;
