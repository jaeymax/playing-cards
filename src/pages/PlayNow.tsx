import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  shuffleCards,
  dealCards,
  handlePlayedCard,
  handleGameMessage,
  playShuffleSound,
  playPlayedCardSound,
} from "@/utils/Functions";
import { useSocket } from "@/contexts/SocketProvider";
import WinnerModal from "@/components/WinnerModal";
import PlayerInfo from "@/components/PlayerInfo";
import GameControls from "@/components/GameControls";
import OpponentArea from "@/components/OpponentArea";
import DeckArea from "@/components/DeckArea";
import PlayerArea from "@/components/PlayerArea";
import GameMessage from "@/components/GameMessage";
import GameOverModal from "@/components/GameOverModal";

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
  const [gameOver, setGameOver] = useState(false);
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

  const dealtCardsCallback = useCallback((cards: any) => {
    console.log("DealtCards", cards);
    setGameCards(cards);
    dealCards(
      cards,
      me?.id,
      firstOpponent?.id,
      secondOpponent?.id,
      thirdOpponent?.id,
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
  }, [me, firstOpponent, secondOpponent, thirdOpponent]);

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

  useEffect(() => {
    console.log(socket)
    socket?.emit("getGameData", code);

    socket?.on("gameData", getGameDataCallback);
    socket?.on("updatedGameData", getUpdatedGameData);
    socket?.on("connect", handleConnect);
    socket?.on("game-not-found", handleGameNotFound);
    socket?.on("gameMessage", gameMessageCallback);

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("gameMessage", gameMessageCallback);
    //  socket?.emit("leave-room", code);
    };
  }, [socket, user])

  useEffect(()=>{
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    return ()=>{
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
    }

  },[socket, me, firstOpponent, secondOpponent, thirdOpponent])

  useEffect(() => {
    if (game) {
      socket?.on("playedCard", playedCardCallback);
      socket?.on("gameEnded", gameEndedCallback);
      socket?.on("startNewHand", startNewHandCallback);
      socket?.on("gameOver", gameOverCallback);
      socket?.on("rematch", rematchCallback);

    }

    return () => {
      socket?.off("playedCard", playedCardCallback);
      socket?.off("gameEnded", gameEndedCallback);
      socket?.off("startNewHand", startNewHandCallback);
      socket?.off("gameOver", gameOverCallback);
      socket?.off("rematch", rematchCallback);
    };
  }, [socket, game, gameCards]);

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


  const gameEndedCallback = (data: any) => {
    console.log("gameEnded", data);
    setGameEnded(true);
    setWinningPlayer(data.winner);
  };

  const gameOverCallback = (winnerData:any) => {
    console.log("Game over");
    setGameOver(true);
    setWinningPlayer(winnerData.winner);
    console.log("Winner data:", winnerData);
  }

  const rematchCallback = (data: any) => {
    console.log("Hand rematch:", data);
    setGameOver(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players);
    getOpponentsData(data.players);
    setGame(data);
    setGameCards(data.cards);
  }


  const handleShuffle = () => {
    socket?.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket?.emit("dealCards", code);
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
    handlePlayedCard({
      card_id,
      player_id,
      trick_number,
      gameCards,
      game,
      me,
      firstOpponent,
      secondOpponent,
      thirdOpponent,
      deckRef,
      playerPlayAreaRef,
      opponentOnePlayAreaRef,
      opponentTwoPlayAreaRef,
      opponentThreePlayAreaRef,
      setGameCards,
      playSound: playPlayedCardSound,
    });
  };

  const gameMessageCallback = (message: string) => {
    handleGameMessage(message, setMessage);
  };

  const handleConnect = () => {
    socket?.emit("join-room", code);
  };

  const handleGameNotFound = () => {
    console.error("Game not found with code:", code);
    alert("Game not found. Please check the code and try again.");
    navigate("/");
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

        <OpponentArea
          id="opponentArea1"
          ref={opponentOneHandRef}
          className="borde absolute left-1/2 -translate-x-1/2 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea2"
          ref={opponentTwoHandRef}
          className="borde rotate-90 absolute left-0 top-1/3 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea3"
          ref={opponentThreeHandRef}
          className="borde absolute rotate-90 top-1/3 right-0 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

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

            <DeckArea ref={deckRef} gameCards={gameCards} game={game} me={me} />

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

        <GameMessage message={message} gameEnded ={gameEnded} />

        <PlayerArea
          id="playerArea"
          ref={playerHandRef}
          className="container absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
        />

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
        currentPlayer={me}
        onPlayNextHand={() => {
          setGameEnded(false);
          socket?.emit("readyForNextHand", { code, winningPlayer });
        }}
        onLeaveGame={() => navigate("/")}
      />

      {gameOver && (
              <GameOverModal
                isOpen={gameOver}
                onClose={() => setGameOver(false)}
                winningPlayer={winningPlayer}
                currentPlayer={me}
                onRematch={() => {
                  setGameOver(false);
                  socket?.emit("rematch", { code, winningPlayer });
                }}
                onLeaveGame={() => navigate("/")}
              />
            )}
    </>
  );
};

export default PlayTest;
