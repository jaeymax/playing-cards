import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSocket } from "@/contexts/SocketProvider";
import { useAppContext } from "@/contexts/AppContext";
import PlayerInfo from "@/components/PlayerInfo";
import ParticipantsModal from "@/components/ParticipantsModal";
import ShareOverlay from "@/components/ShareOverlay";
import GameControls from "@/components/GameControls";
import OpponentArea from "@/components/OpponentArea";
import GameMessage from "@/components/GameMessage";
import DeckArea from "@/components/DeckArea";
import PlayerArea from "@/components/PlayerArea";
import WinnerModal from "@/components/WinnerModal";
import GameOverModal from "@/components/GameOverModal";
import {
  dealCards,
  ensureGuest,
  getPlayerIds,
  getToken,
  handleGameMessage,
  handlePlayedCard,
  playPlayedCardSound,
  playShuffleSound,
  reconcileCards,
  shuffleCards,
} from "@/utils/Functions";
import { analytics, logEvent } from "@/firebase/config";
import ScoresTable from "@/components/ScoresTable";
import GameChat from "@/components/GameChat";
import ChatNotification from "@/components/ChatNotification";
import { baseUrl } from "@/config/api";
import Modal from "@/components/Modal";
import LeadingPlayerInfo from "@/components/LeadingPlayerInfo";
//import AudioRecorder from "@/components/AudioRecorder";
import BottomBar from "@/components/BottomBar";

interface Message {
  user_id: number | undefined;
  username: string | undefined;
  avatar: string | undefined;
  message: string;
  type: "text" | "audio";
  timestamp: string;
  mime_type?: string;
  audio?: ArrayBuffer;
}

const PlayWithFriend = () => {
  const [showShareOverlay, setShowShareOverlay] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [shuffledAtLeastOnce, setShuffledAtLeastOnce] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [firstOpponent, setFirstOpponent] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [game, setGame] = useState<any>(null);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<string>("Waiting for players...");
  const [gameStarted, setGameStarted] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<Message | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);

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

  const { code } = useParams();
  const { socket } = useSocket();
  const { user, updateUser } = useAppContext();
  const [winningPlayer, setWinningPlayer] = useState<any>(null);
  const navigate = useNavigate();


  const getPlayerByPosition = (player_position: number) => {
    return players.find((player) => player.position === player_position);
  };

  const getCardByPlayerPosition = (player_position: number, cards: any[]) => {
    const player = getPlayerByPosition(player_position);

    return cards.find((card) => card.player_id === player?.id);
  };

  useEffect(() => {
    if (game?.current_player_position === me?.position) {
      if (game?.cards.every((card: any) => card.status === "in_deck")) {
        if (me?.is_dealer) {
          setMessage("");
        } else {
          setMessage("Waiting for dealer to shuffle and deal");
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
          setMessage("Click to shuffle or deal");
        } else {
          setMessage("");
        }
      } else {
        setMessage(`${player?.user.username}'s turn`);
      }
      //setMessage(`${player?.user.username}'s turn`);
    }

    if (game) {
      setMaxPlayers(game?.player_count);
    }
  }, [game]);

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
  }, [socket, gameCards, game]);

  useEffect(() => {
    const authToken = getToken();
    // const getGuestCredentials = async () => {
    //   const user = await ensureGuest();
    //   if (user) {
    //     updateUser(user);
    //   }
    // };

    if (!authToken && !user) {
      setShowLoginPrompt(true);
    }
  }, [user]);

  const handleLogin = () => {
    setShowLoginPrompt(false);
    navigate("/signin", { state: { from: window.location.pathname } }); // Pass current page path
  };

  const handlePlayAsGuest = async () => {
    setShowLoginPrompt(false);
    const user = await ensureGuest();
    if (user) {
      updateUser(user);
    }
  };

  const chatMessageCallback = (message: Message) => {
    if (!showChat) {
      setUnreadCount((prev) => prev + 1);
      setNotification(message);
    }

    setMessages((prev) => [...prev, message]);
    console.log("Received chat message:", message);
  };

  console.log("Messages:", messages);

  const voiceMessageCallback = (message: any) => {
    if (!showChat) {
      setUnreadCount((prev) => prev + 1);
      setNotification(message);
    }

    setMessages((prev) => [...prev, message]);

    console.log("Received voice message:", message);
  };

  useEffect(() => {
    if (game) {
      const isHost = me?.user?.id == game?.created_by;
      console.log("is host", isHost);
      setShowShareOverlay(isHost);
    }
  }, [me, game]);

  useEffect(() => {
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    return () => {
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
    };
  }, [socket, me, firstOpponent, secondOpponent, thirdOpponent]);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${baseUrl}/messages/games/${code}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();

    socket?.on("connect", handleConnect);
    socket?.on("gameData", getGameDataCallback);
    socket?.on("updatedGameData", getUpdatedGameData);
    socket?.on("game-not-found", handleGameNotFound);
    socket?.on("gameMessage", gameMessageCallback);
    socket?.on("chatMessage", chatMessageCallback);

    socket?.on("voiceMessage", voiceMessageCallback);

    if (socket?.connected) {
      handleConnect();
    }

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("gameMessage", gameMessageCallback);
      socket?.off("connect", handleConnect);
      socket?.off("game-not-found", handleGameNotFound);
      socket?.off("chatMessage", chatMessageCallback);
      socket?.off("voiceMessage", voiceMessageCallback);
    };
  }, [user, code, socket]);

  useEffect(() => {
    if (user) {
      socket?.emit("playerJoin", { userId: user.id, gameCode: code });
      // } else {
      //   const state = window.history.state?.usr?.state;
      //   if (state?.from) {
      //     navigate(state.from); // Redirect back to the page we came from
      //   }
    }
  }, [user, socket]);

  useEffect(() => {
    console.log("players", players);
    if (players.length >= maxPlayers) {
      setShowParticipants(false);
      setShowShareOverlay(false);
      setGameStarted(true);
    } else if (players.length > 0) {
      setShowParticipants(true);
    }
  }, [players, maxPlayers]);

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

  const dealtCardsCallback = useCallback(
    (cards: any) => {
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
    },
    [firstOpponent, secondOpponent, thirdOpponent]
  );

  const shuffledDeckCallback = (cards: any) => {
    setShuffledAtLeastOnce(true);
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
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
    setShuffledAtLeastOnce(false);
    console.log("Game over");
    logEvent(analytics, "game_ended", {
      winningPlayer: winnerData.winner.user.username,
      winningPosition: winnerData.winner.position,
    });
    setGameOver(true);
    setWinningPlayer(winnerData.winner);
    console.log("Winner data:", winnerData);
  };

  const rematchCallback = (data: any) => {
    console.log("Hand rematch:", data);
    logEvent(analytics, "rematch_started", { players: data.players });
    setGameOver(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
    setGame(data);
    setGameCards(data.cards);
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

  const startNewHandCallback = (data: any) => {
    setShuffledAtLeastOnce(false);
    console.log("Start new hand:", data);
    logEvent(analytics, "new_hand_started", { handNumber: data.hand_number });
    setGameEnded(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
    setGame(data);
    setGameCards(data.cards);
  };

  const gameMessageCallback = (message: string) => {
    handleGameMessage(message, setMessage);
  };

  const handleShuffle = () => {
    socket?.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket?.emit("dealCards", code);
  };

  const handleConnect = () => {
    socket?.emit("join-room", code);
    socket?.emit("getGameData", code);
  };

  const handleGameNotFound = () => {
    console.error("Game not found with code:", code);
    setGameNotFound(true);
  };

  const handleSendMessage = (message: string) => {
    logEvent(analytics, "message_sent", {
      gameCode: code,
      messageLength: message.length,
    });
    const messageData: Message = {
      user_id: user?.id,
      username: user?.username,
      avatar: user?.image_url,
      type: "text",
      message: message,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, messageData]);
    socket?.emit("sendMessage", messageData);
  };

  const handleLeaveRoom = () => {
    logEvent(analytics, "leave_game_initiated", { gameCode: code });
    setShowLeaveConfirmation(true);
  };

  const handleConfirmLeave = () => {
    logEvent(analytics, "left_game", { gameCode: code });
    setShowLeaveConfirmation(false);
    navigate("/");
  };

  const handleCancelLeave = () => {
    setShowLeaveConfirmation(false);
  };

  return (
    <div className="relative bg-green-800 bg-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full">
      {notification && !showChat && (
        <ChatNotification
          message={notification}
          onClose={() => setNotification(null)}
          onClick={() => setShowChat(true)}
        />
      )}

      <div className="min-h-screen relative bg-green800 bg\-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-between pb-24">
        {showShareOverlay && !gameStarted && (
          <ShareOverlay
            gameCode={code}
            onClose={() => setShowShareOverlay(false)}
          />
        )}

        {showParticipants && game && players.length > 0 && (
          <ParticipantsModal
            players={players}
            maxPlayers={maxPlayers}
            currentPlayer={me}
          />
        )}

        <PlayerInfo
          name={firstOpponent?.user.username || "Waiting..."}
          player_position={firstOpponent?.position || 0}
          current_player_position={game?.current_player_position || 0}
          avatar={
            firstOpponent?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={firstOpponent?.score || 0}
          styles="left-1/2 -translate-x-1/2 top-1"
        />

        {secondOpponent && (
          <PlayerInfo
            player_position={secondOpponent?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={secondOpponent?.user.username || "Opponent 2"}
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
            player_position={thirdOpponent?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={thirdOpponent?.user.username || "Opponent 3"}
            avatar={
              thirdOpponent?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={thirdOpponent?.score}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        {!showShareOverlay && !showParticipants && (
          <GameControls
            showButtons={showDealButton && showShuffleButton}
            isDealing={isDealing}
            isShuffling={isShuffling}
            shuffledAtLeastOnce = {shuffledAtLeastOnce}
            onDeal={handleDeal}
            onShuffle={handleShuffle}
          />
        )}

        <OpponentArea
          id="opponentArea1"
          ref={opponentOneHandRef}
          className="borde absolute left-1/2 -translate-x-1/2 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea2"
          ref={opponentTwoHandRef}
          className="borde border-red-500 rotate-90 absolute -left-0 sm:left-0 top-1/3 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea3"
          ref={opponentThreeHandRef}
          className="borde border-green-500 absolute rotate-90 top-1/3 -right-0 sm:right-0 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
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
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={5 - index - 1}
                ></div>
              ))}
            </div>

            <DeckArea ref={deckRef} gameCards={gameCards} game={game} me={me} />

            <div
              className="opponent-three-play-area flex borde border-black w-ful"
              ref={opponentThreePlayAreaRef}
            >
              {[...Array(5)].map((_, index) => (
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
          className="container borde border-yellow-500 absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
        />

        <ScoresTable players={players} />

        <LeadingPlayerInfo
          game={game}
          getPlayerByPosition={getPlayerByPosition}
          getCardByPlayerPosition={getCardByPlayerPosition}
        />

        <PlayerInfo
          player_position={me?.position || 0}
          current_player_position={game?.current_player_position || 0}
          name={me?.user.username || "Player"}
          avatar={
            me?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={me?.score || 0}
          styles="left-1/2 -translate-x-1/2 bottom-1"
        />

        {/* <div className="">
          <AudioRecorder onAudioReady={handleAudio} />
        </div> */}

        <GameChat
          socket={socket}
          gameCode={code || ""}
          currentUser={user}
          isOpen={showChat}
          onClose={() => setShowChat(false)}
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      </div>

      {/* Bottom Bar */}
      <BottomBar
        unreadCount={unreadCount}
        showChat={showChat}
        onToggleChat={() => {
          setShowChat(!showChat);
          setUnreadCount(0);
        }}
        socket={socket}
        gameCode={code}
        onLeaveRoom={handleLeaveRoom}
        setMessages={setMessages}
      />

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

      {showLoginPrompt && (
        <Modal
          title=""
          isOpen={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Welcome!</h2>
            <p className="mb-4">Would you like to log in or play as a guest?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleLogin}
              >
                Log In
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handlePlayAsGuest}
              >
                Play as Guest
              </button>
            </div>
          </div>
        </Modal>
      )}

      {gameNotFound && (
        <Modal
          title=""
          isOpen={gameNotFound}
          onClose={() => setGameNotFound(false)}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Game Not Found</h2>
            <p className="mb-4 text-sm">
              The game with this code is not found or has expired. Please check
              the code and try again.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setGameNotFound(false);
                  navigate("/");
                }}
              >
                Return Home
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showLeaveConfirmation && (
        <Modal
          title=""
          isOpen={showLeaveConfirmation}
          onClose={handleCancelLeave}
        >
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Leave Game?</h2>
            <p className="mb-4">
              Are you sure you want to leave the game? Your game progress will
              be lost.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCancelLeave}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleConfirmLeave}
              >
                Leave Game
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PlayWithFriend;
