import { useAppContext } from "@/contexts/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "@/contexts/SocketProvider";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  customLog,
  dealCards,
  getPlayerIds,
  handleGameMessage,
  handlePlayedCard,
  playPlayedCardSound,
  playShuffleSound,
  reconcileCards,
  shuffleCards,
} from "@/utils/Functions";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/firebase/config";
import TimerBar from "@/components/TimerBar";
import PlayerInfo from "@/components/PlayerInfo";
import GameControls from "@/components/GameControls";
import OpponentArea from "@/components/OpponentArea";
import DeckArea from "@/components/DeckArea";
import GameMessage from "@/components/GameMessage";
import PlayerArea from "@/components/PlayerArea";
import LeadingPlayerInfo from "@/components/LeadingPlayerInfo";
import WinnerModal from "@/components/WinnerModal";
import SwissGameOverModal from "@/components/SwissGameOverModal";
import MatchForfeitModal from "@/components/MatchForfeitModal";
import ProcessingForfeitModal from "@/components/ProcessingForfeitModal";
import GameNotFoundPage from "@/components/GameNotFoundPage";
import GameForfeitedPage from "@/components/GameForfeitedPage";
import GameEndedPage from "@/components/GameEndedPage";

interface SwissGameProps {
  tournamentId: number;
}


const SwissGame: React.FC<SwissGameProps> = ({tournamentId}) => {
  const { code } = useParams();
  const { socket } = useSocket();
  const { user } = useAppContext();

  // const [current_turn_user_id, setCurrentTurnUserId] = useState<number | null>(null);
  const [turn_ends_at, setTurnEndsAt] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  // const [messages, setMessages] = useState<Message[]>([]);
  const [game, setGame] = useState<any>(null);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [firstOpponent, setFirstOpponent] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);
  const [me, setMe] = useState<any>(null);
  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffledAtLeastOnce, setShuffledATLeastOnce] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<any>(null);
  const [losingPlayer, setLosingPlayer] = useState<any>(null);
  const [matchForfeited, setMatchForfeited] = useState(false);
  const [matchForfeiter, setMatchForfeiter] = useState<any>(null);
  const [processingForfeit, setProcessingForfeit] = useState<any>(null);
  const [soundOn, setSoundOn] = useState(true);

  gameNotFound && true;
  losingPlayer && true;

  // Refs for card positions
  const deckRef = useRef<HTMLDivElement>(null);
  const playerHandRef = useRef<HTMLDivElement>(null);
  const playerPlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentOneHandRef = useRef<HTMLDivElement>(null);
  const opponentTwoHandRef = useRef<HTMLDivElement>(null);
  const opponentThreeHandRef = useRef<HTMLDivElement>(null);
  const opponentOnePlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentTwoPlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentThreePlayAreaRef = useRef<HTMLDivElement>(null);

  const getPlayerByPosition = (player_position: number) => {
    return players.find((player) => player.position === player_position);
  };

  const getCardByPlayerPosition = (player_position: number, cards: any[]) => {
    const player = getPlayerByPosition(player_position);

    return cards.find((card) => card.player_id === player?.id);
  };

  //customLog('players', players);

  const navigate = useNavigate();

  const handleDeal = () => {
    socket?.emit("dealCards", code);
  };

  const handleShuffle = () => {
    socket?.emit("shuffleDeck", code);
  };

  const handleSwissGameOverModalClose = () => {
    if(game?.is_final_match) {
      // if the game is final match navigate back to the lobby and set the current tab to standings
      navigate(`/tournaments/${tournamentId}?tab=standings`);
      return;
    }
   return navigate(`/tournaments/${tournamentId}?tab=bracket`);
  }

  const handleMatchForfeitClose = () => {
    setMatchForfeited(false);
    customLog("matchforfeiter", matchForfeiter);
    if (game?.is_final_match) {
      const winningPlayer = game.players.find(
        (player: any) => player.user.id != matchForfeiter.user.id
      );
      const losingPlayer = game.players.find(
        (player: any) => player.user.id == matchForfeiter.user.id
      );
      setWinningPlayer(winningPlayer);
      setLosingPlayer(losingPlayer);
      setGameOver(true);
    } else {
      navigate(-1);
    }
  };

  const getGameDataCallback = (data: any) => {
    console.log("Game data received:", data);
    setGame(data);
    setTurnEndsAt(data.turn_ends_at);
    setPlayers(data.players);
    data.cards.forEach((card: any, i: number) => {
      card.pos_x = card.pos_x * i;
      card.pos_y = card.pos_y * i;
    });
    const { meId, firstOpponentId, secondOpponentId, thirdOpponentId } =
      getPlayerIds(data.players, user);
    reconcileCards(
      data.cards,
      setGameCards,
      meId,
      firstOpponentId,
      secondOpponentId,
      thirdOpponentId,
      deckRef,
      playerHandRef,
      opponentOneHandRef,
      opponentTwoHandRef,
      opponentThreeHandRef,
      playerPlayAreaRef,
      opponentOnePlayAreaRef,
      opponentTwoPlayAreaRef,
      opponentThreePlayAreaRef
    );
    //setGameCards(data.cards);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
  };

  const getUpdatedGameData = (data: any) => {
    console.log("Updated game data received:", data);
    setGame(data);
    setTurnEndsAt(data.turn_ends_at);
    const myData = data.players.find(
      (player: any) => player.user.id === user?.id
    );
    // setMe(myData);
    console.log("my Data", myData);
    setMe((prevState: any) => ({
      ...prevState,
      score: myData.score,
      is_dealer: myData.is_dealer,
      games_won: myData.games_won,
    }));
    getOpponentsData(data.players);
  };

  const getMyData = (data: any[], cards: []) => {
    const myData = data.find((player) => player.user.id === user?.id);
    const showGameButtons = cards.every(
      (card: any) => card.status == "in_deck"
    );

    if (myData?.is_dealer && showGameButtons) {
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

  const handleConnect = () => {
    socket?.emit("join-room", code);
    socket?.emit("getGameData", code);
    console.log("handling connect.....");
  };

  const handleGameNotFound = () => {
    console.error("Game not found with code:", code);
    setGameNotFound(true);
  };

  const gameMessageCallback = (message: string) => {
    handleGameMessage(message, setMessage);
  };

  useEffect(() => {
    if (game?.current_player_position === me?.position) {
      if (game?.cards.every((card: any) => card.status === "in_deck")) {
        if (me?.is_dealer) {
          setMessage("Click to shuffle and deal");
        } else {
          setMessage("");
        }
      } else {
        setMessage("Your turn! Click to play");
      }
    } else {
      const player = players.find(
        (player: any) => player.position === game?.current_player_position
      );
      if (game?.cards.every((card: any) => card.status === "in_deck")) {
        if (me?.is_dealer) {
          setMessage("");
        } else {
          setMessage("Waiting for dealer to shuffle and deal");
        }
      } else {
        setMessage(`${player?.user.username}'s turn`);
      }
      //setMessage(`${player?.user.username}'s turn`);
    }
  }, [game]);

  const matchForfeitCallback = (data: any) => {
    const b = players.find((player) => player.user.id == user?.id);
    if (!b) return;
    setProcessingForfeit(false);
    setMatchForfeited(true);
    const forfeiterId = data.loserId;
    customLog("forfeiterId", forfeiterId);
    customLog("players", players);
    const forfeiter = players.find((player) => player.user.id == forfeiterId);
    customLog("forfeiter", forfeiter);
    setMatchForfeiter(forfeiter);
    console.log("Match forfeit:", data);
  };

  useEffect(() => {
    if (!user) return;

    // const fetchMessages = async () => {
    //   try {
    //     const response = await fetch(`${baseUrl}/messages/games/${code}`);
    //     if (!response.ok) throw new Error("Failed to fetch messages");
    //     const data = await response.json();
    //     setMessages(data);
    //   } catch (error) {
    //     console.error("Error fetching messages:", error);
    //   }
    // };
    // fetchMessages();

    socket?.on("connect", handleConnect);
    socket?.on("gameData", getGameDataCallback);
    socket?.on("updatedGameData", getUpdatedGameData);
    socket?.on("game-not-found", handleGameNotFound);
    socket?.on("gameMessage", gameMessageCallback);
    //socket?.on("chatMessage", chatMessageCallback);

    //socket?.on("voiceMessage", voiceMessageCallback);

    if (socket?.connected) {
      handleConnect();
    }

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("gameMessage", gameMessageCallback);
      socket?.off("connect", handleConnect);
      socket?.off("game-not-found", handleGameNotFound);
      //socket?.off("chatMessage", chatMessageCallback);
      //socket?.off("voiceMessage", voiceMessageCallback);
    };
  }, [user, code, socket]);

  useEffect(() => {
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    return () => {
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
    };
  }, [socket, me, firstOpponent, secondOpponent, thirdOpponent, soundOn]);

  useEffect(() => {
    if (game) {
      socket?.on("playedCard", playedCardCallback);
      socket?.on("turnStarted", turnStartedCallback);
      socket?.on("gameEnded", gameEndedCallback);
      socket?.on("startNewHand", startNewHandCallback);
      socket?.on("gameOver", gameOverCallback);
      socket?.on("matchForfeit", matchForfeitCallback);
      //socket?.on("rematch", rematchCallback);
    }

    return () => {
      socket?.off("playedCard", playedCardCallback);
      socket?.off("turnStarted", turnStartedCallback);
      socket?.off("gameEnded", gameEndedCallback);
      socket?.off("startNewHand", startNewHandCallback);
      socket?.off("gameOver", gameOverCallback);
      socket?.off("matchForfeit", matchForfeitCallback);
      //socket?.off("rematch", rematchCallback);
    };
  }, [socket, game, gameCards, soundOn]);

  useEffect(() => {
    if (!turn_ends_at) {
      setRemainingSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = new Date(turn_ends_at).getTime();
      const remaining = Math.max(0, Math.ceil((endTime - now) / 1000));
      setRemainingSeconds(remaining);

      if (remaining === 0) {
        if (!matchForfeiter) {
          setProcessingForfeit(true);
        }
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [turn_ends_at, matchForfeiter]);

  const turnStartedCallback = (data: {
    current_turn_user_id: number;
    turn_ends_at: number;
  }) => {
    customLog("data", data);
    //setCurrentTurnUserId(data.current_turn_user_id);
    setTurnEndsAt(data.turn_ends_at);
  };

  const startNewHandCallback = (data: any) => {
    console.log("Start new hand:", data);
    logEvent(analytics, "new_hand_started", { handNumber: data.hand_number });
    setGameEnded(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
    setGame(data);
    setTurnEndsAt(data.turn_ends_at);
    setGameCards(data.cards);
    if (me?.is_dealer) {
      setShuffledATLeastOnce(false);
    }
  };

  const gameEndedCallback = (data: any) => {
    console.log("gameEnded", data);
    logEvent(analytics, "hand_ended", {
      winningPlayer: data.winner.user.username,
      winningPosition: data.winner.position,
    });
    setGameEnded(true);
    setWinningPlayer(data.winner);
  };

  const gameOverCallback = (winnerData: any) => {
    setGameOver(true);
    setTurnEndsAt(0);
    console.log("Game over");
    logEvent(analytics, "game_ended", {
      winningPlayer: winnerData.winner.user.username,
      winningPosition: winnerData.winner.position,
    });
    setWinningPlayer(winnerData.winner);
    const losingPlayer = players.find(
      (player: any) => player.user.id !== winnerData.winner.user.id
    );
    setLosingPlayer(losingPlayer);
    console.log("Winner data:", winnerData);
    console.log("losing player in gameovercallback", losingPlayer);
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
      soundOn,
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

  const shuffledDeckCallback = (cards: any) => {
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
    if (me?.is_dealer) {
      setShuffledATLeastOnce(true);
    }
  };

  const dealtCardsCallback = useCallback(
    (cards: any) => {
      console.log("DealtCards", cards);
      setGameCards(cards);
      dealCards(
        cards,
        soundOn,
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
    },
    [me, firstOpponent, secondOpponent, thirdOpponent, soundOn]
  );

  if(gameNotFound){
    return <GameNotFoundPage gameCode={code} />;
  }

  if (game?.status === "forfeited") {
    return <GameForfeitedPage gameCode={code} />;
  }

  if(game?.status === 'completed'){
    return <GameEndedPage gameCode={code} />;
  }


  return (
    <div className="relative bg-green-800 bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-cover gap-4 bg-center w-full">
      <div className="min-h-screen relative bg-green-800 bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-cover gap-4 bg-center w-full flex flex-col justify-between pb-24">
        {remainingSeconds > 0 && game?.current_turn_user_id !== user?.id && (
          <TimerBar
            remainingSeconds={remainingSeconds}
            position="top"
            isCurrentPlayer={false}
          />
        )}
        <PlayerInfo
          name={firstOpponent?.user.username || "Opponent 1"}
          player_position={firstOpponent?.position || 0}
          current_player_position={game?.current_player_position || 0}
          remaining_time={remainingSeconds}
          total_time={game?.turn_timeout_seconds}
          avatar={
            firstOpponent?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={firstOpponent?.score}
          styles="left-1/2 -translate-x-1/2 top-1"
        />
        {secondOpponent && (
          <PlayerInfo
            name={secondOpponent?.user.username || "Opponent 2"}
            player_position={secondOpponent?.position || 0}
            current_player_position={game?.current_player_position || 0}
            avatar={
              secondOpponent?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={secondOpponent?.score}
            styles="top-1/2 -translate-y-1/2 left-1"
          />
        )}
        {thirdOpponent && (
          <PlayerInfo
            name={thirdOpponent?.user.username || "Opponent 3"}
            player_position={thirdOpponent?.position || 0}
            current_player_position={game?.current_player_position || 0}
            avatar={
              thirdOpponent?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        <GameControls
          showButtons={showDealButton && showShuffleButton}
          shuffledAtLeastOnce={shuffledAtLeastOnce}
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

        <GameMessage message={message} gameEnded={gameEnded} />

        <PlayerArea
          id="playerArea"
          ref={playerHandRef}
          className="container absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
        />

        {remainingSeconds > 0 && game?.current_turn_user_id === user?.id && (
          <TimerBar
            remainingSeconds={remainingSeconds}
            position="bottom"
            isCurrentPlayer={true}
          />
        )}

        {/* <ScoresTable players={players} /> */}

        <LeadingPlayerInfo
          game={game}
          getPlayerByPosition={getPlayerByPosition}
          getCardByPlayerPosition={getCardByPlayerPosition}
        />

        <PlayerInfo
          name={me?.user.username || "Player"}
          player_position={me?.position || 0}
          current_player_position={game?.current_player_position || 0}
          remaining_time={remainingSeconds}
          total_time={game?.turn_timeout_seconds}
          avatar={
            me?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
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
        onLeaveGame={() => {}}
      />

      {gameOver && (
        <SwissGameOverModal
          isOpen={gameOver}
          onClose={() => setGameOver(false)}
          winningPlayer={winningPlayer}
          currentPlayer={me}
          isFinalMatch = {game?.is_final_match}
          onContinue={handleSwissGameOverModalClose}
        />
      )}

      {matchForfeited && (
        <MatchForfeitModal
          isOpen={matchForfeited}
          onClose={handleMatchForfeitClose}
          forfeitedPlayer={matchForfeiter}
          currentPlayer={me}
        />
      )}

      <ProcessingForfeitModal isOpen={processingForfeit} />
    </div>
  );
};

export default SwissGame;
