import { useParams, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef, useState, memo } from "react";
import { useSocket } from "@/contexts/SocketProvider";
import MatchHeader from "./MatchHeader";
import MainLayout from "./MainLayout";
import GameBoard from "./GameBoard";
import SidePanel from "./SidePanel";
import MatchStats from "./MatchStats";
import ShareButtons from "./ShareButtons";
import GameNotFoundPage from "./GameNotFoundPage";
import {
  dealCards,
  ensureGuest,
  getPlayerIdsForSpectator,
  getToken,
  handlePlayedCard,
  playPlayedCardSound,
  playShuffleSound,
  reconcileCards,
  shuffleCards,
} from "@/utils/Functions";
import { useAppContext } from "@/contexts/AppContext";
import GameForfeitedPage from "./GameForfeitedPage";
import GameEndedPage from "./GameEndedPage";
import SpectatorChat from "./SpectatorChat";
import { baseUrl } from "@/config/api";

const MemoizedMatchHeader = memo(MatchHeader);

interface ChatMessage {
  id: string;
  game_code: string;
  user_id:number;
  username: string;
  message: string;
  timestamp: string;
  image_url?: string;
}

const SpectatePage = () => {
  const { code } = useParams();
  const { socket } = useSocket();

  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [playerOne, setPlayerOne] = useState<any | null>();
  const [playerTwo, setPlayerTwo] = useState<any | null>();
  const [playerThree, setPlayerThree] = useState<any | null>({});
  const [playerFour, setPlayerFour] = useState<any | null>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
       // {
    //   id: "1",
    //   user_id: 1,
    //   username: "Jaey",
    //   message: "He will lose this match",
    //   timestamp: new Date(Date.now() - 300000),
    // },
    // {
    //   id: "2",
    //   user_id: 2,
    //   username: "ProPlayer92",
    //   message: "Amazing play right there!",
    //   timestamp: new Date(Date.now() - 240000),
    // },
    // {
    //   id: "3",
    //   user_id: 3,
    //   username: "CardMaster",
    //   message: "Did you see that trick? Insane!",
    //   timestamp: new Date(Date.now() - 180000),
    // },
    // {
    //   id: "4",
    //   user_id: 4,
    //   username: "SpectatorX",
    //   message: "Player 2 is playing defensively",
    //   timestamp: new Date(Date.now() - 120000),
    // },
    // {
    //   id: "5",
    //   user_id: 5,
    //   username: "Jaey",
    //   message: "Yeah, smart move honestly",
    //   timestamp: new Date(Date.now() - 90000),
    // },
    // {
    //   id: "6",
    //   user_id: 6,
    //   username: "TwitchViewer",
    //   message: "This is the best match I've seen all season",
    //   timestamp: new Date(Date.now() - 60000),
    // },
    // {
    //   id: "7",
    //   user_id: 7,
    //   username: "GamerPete",
    //   message: "The strategy here is top tier",
    //   timestamp: new Date(Date.now() - 45000),
    // },
    // {
    //   id: "8",
    //   user_id: 8,
    //   username: "ProPlayer92",
    //   message: "What a comeback!",
    //   timestamp: new Date(Date.now() - 30000),
    // },
    // {
    //   id: "9",
    //   user_id: 9,
    //   username: "CardMaster",
    //   message: "Did NOT expect that move",
    //   timestamp: new Date(Date.now() - 15000),
    // },
    // {
    //   id: "10",
    //   user_id: 10,
    //   username: "SpectatorX",
    //   message: "This is intense!",
    //   timestamp: new Date(Date.now() - 5000),
    // },
  ]);
 // const [newMessage, setNewMessage] = useState("");
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameForfeited, setGameForfeited] = useState(false);
  
  (chatMessages)
  // Refs for card positions (same as PlayWithFriend)
  const deckRef = useRef<HTMLDivElement>(null);
  const playerOneHandRef = useRef<HTMLDivElement>(null);
  const playerOnePlayAreaRef = useRef<HTMLDivElement>(null);
  const playerTwoHandRef = useRef<HTMLDivElement>(null);
  const playerThreeHandRef = useRef<HTMLDivElement>(null);
  const playerFourHandRef = useRef<HTMLDivElement>(null);
  const playerTwoPlayAreaRef = useRef<HTMLDivElement>(null);
  const playerThreePlayAreaRef = useRef<HTMLDivElement>(null);
  const playerFourPlayAreaRef = useRef<HTMLDivElement>(null);

  const location = useLocation();

  const eventName = location?.state?.name || "";
  const roundName = location?.state?.roundName || "";

  const { user, updateUser } = useAppContext();

  useEffect(() => {
    if (!user) return;

    socket?.on("gameData", handleGameData);
    socket?.on("updatedGameData", handleUpdatedGameData);
    socket?.on("game-not-found", handleGameNotFound);
    socket?.on("spectatorChatMessage", handleChatMessage);

    handleConnect();

    return () => {
      socket?.off("gameData", handleGameData);
      socket?.off("updatedGameData", handleUpdatedGameData);
      socket?.off("game-not-found", handleGameNotFound);
      socket?.off("spectatorChatMessage", handleChatMessage);
      socket?.emit("leave-room", code);
  //alert('You are leaving the game room');
//console.log('leaving room ....')
//alert('You are leaving the game room');
//console.log('leaving room ....')
    //alert('You are leaving the game room');
      //console.log('leaving room ....')
    //alert('You are leaving the game room');
      //console.log('leaving room ....')
    //alert('You are leaving the game room');
      //console.log('leaving room ....')
    };
  }, [socket, user]);

  useEffect(() => {
    async function fetchSpectatorChatMessages() {
      try {
          setLoading(true);
          const response = await fetch(
            `${baseUrl}/messages/spectator/${code}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch chat messages");
          }
          const data = await response.json();
          setChatMessages(data);
        } catch (error) {
          console.error("Error fetching spectator chat messages:", error);
        }
        finally {
            setLoading(false);
        }
      }
      fetchSpectatorChatMessages();
  }, []);

  useEffect(() => {
    if (game) {
      socket?.on("playedCard", playedCardCallback);
      socket?.on("gameEnded", handleGameEnded);
      socket?.on("gameOver", handleGameOver);
      socket?.on("startNewHand", startNewHandCallback);
      socket?.on("matchForfeit", matchForfeitCallback);
    }

    return () => {
      socket?.off("playedCard", playedCardCallback);
      socket?.off("gameEnded", handleGameEnded);
      socket?.off("gameOver", handleGameOver);
      socket?.off("startNewHand", startNewHandCallback);
      socket?.off('matchForfeit', matchForfeitCallback);
    };
  }, [socket, game, gameCards]);

  useEffect(() => {
    socket?.on("dealtCards", handleDealtCards);
    socket?.on("shuffledDeck", handleShuffledDeck);

    return () => {
      socket?.off("dealtCards", handleDealtCards);
      socket?.off("shuffledDeck", handleShuffledDeck);
    };
  }, [socket, playerOne, playerTwo, playerThree, playerFour]);

  const handleConnect = () => {
    socket?.emit("join-room", code);
    socket?.emit("getGameData", code);
  };

  const matchForfeitCallback = (data:any)=>{
    console.log('data (spectator) matchforfeit', data);
    setGameForfeited(true);
  }

  const startNewHandCallback = (data: any) => {
    console.log("Start new hand:", data);
    setPlayers(data.players);
    setGame(data);
    setGameCards(data.cards);
  };

  const handleGameData = (data: any) => {
    console.log("Game data received (spectator):", data);
    if(data.status == 'completed')setGameCompleted(true);
    if(data.status == 'forfeited')setGameForfeited(true);
    setGame(data);
    setPlayers(data.players);
    setGameCards(data.cards);
    setPlayerOne(data.players[0]);
    setPlayerTwo(data.players[1]);
    if (data.players.length > 2) setPlayerThree(data.players[2]);
    if (data.players.length > 3) setPlayerFour(data.players[3]);
    setLoading(false);
    const { playerOneId, playerTwoId, playerThreeId, playerFourId } =
      getPlayerIdsForSpectator(data.players);
    reconcileCards(
      data.cards,
      setGameCards,
      playerOneId,
      playerTwoId,
      playerThreeId,
      playerFourId,
      deckRef,
      playerOneHandRef,
      playerTwoHandRef,
      playerThreeHandRef,
      playerFourHandRef,
      playerOnePlayAreaRef,
      playerTwoPlayAreaRef,
      playerThreePlayAreaRef,
      playerFourPlayAreaRef
    );
  };

  const handleUpdatedGameData = (data: any) => {
    console.log("Updated game data received (spectator):", data);
    if(data.status == 'completed')setGameCompleted(true);
    if(data.status == 'forfeited')setGameForfeited(true);
    setGame(data);
  };

  const handleGameNotFound = () => {
    console.error("Game not found with (spectator) code:", code);

    setGameNotFound(true);
    setLoading(false);
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
    console.log("Card played (spectator):", {
      card_id,
      player_id,
      trick_number,
    });
    handlePlayedCard({
      card_id,
      player_id,
      trick_number,
      gameCards,
      game,
      me: playerOne,
      firstOpponent: playerTwo,
      secondOpponent: playerThree,
      thirdOpponent: playerFour,
      deckRef,
      playerPlayAreaRef: playerOnePlayAreaRef,
      opponentOnePlayAreaRef: playerTwoPlayAreaRef,
      opponentTwoPlayAreaRef: playerThreePlayAreaRef,
      opponentThreePlayAreaRef: playerFourPlayAreaRef,
      setGameCards,
      playSound: playPlayedCardSound,
    });
  };

  const handleDealtCards = useCallback(
    (cards: any) => {
      console.log("Cards dealt (spectator):", cards);
      setGameCards(cards);
      dealCards(
        cards,
        playerOne?.id,
        playerTwo?.id,
        playerThree?.id,
        playerFour?.id,
        {
          playerHandRef: playerOneHandRef,
          opponentOneHandRef: playerTwoHandRef,
          opponentTwoHandRef: playerThreeHandRef,
          opponentThreeHandRef: playerFourHandRef,
          deckRef,
        },
        setGameCards,
        isDealing,
        isShuffling,
        setIsDealing
      );
    },
    [playerTwo, playerThree, playerFour]
  );

  const handleShuffledDeck = (cards: any) => {
    console.log("Deck shuffled (spectator):", cards);
    setGameCards(cards);
    playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
  };

  const handleGameEnded = (data: any) => {
    console.log("Hand ended (spectator):", data);
  };

  const handleGameOver = (data: any) => {
    console.log("Game over (spectator):", data);
    setGameCompleted(true);
  };

  const handleChatMessage = (data: any) => {
    console.log("New chat message (spectator):", data);
    setChatMessages((prev) => [...prev, data]);
  };

  // const sendChatMessage = () => {
  //   if (!newMessage.trim()) return;

  //   socket?.emit("sendChat", {
  //     gameCode: code,
  //     message: newMessage,
  //     username: user?.username,
  //     timestamp: new Date(),
  //   });

  //   setNewMessage("");
  // };

  useEffect(() => {
    console.log("checking user");
    const authToken = getToken();
    const getGuestCredentials = async () => {
      const user = await ensureGuest();
      if (user) {
        updateUser(user);
      } 
    };

    if (!authToken) {
      getGuestCredentials();
    }
  }, [user]);

  if (gameNotFound) {
    return <GameNotFoundPage gameCode={code} />;
  }

  // if(gameCompleted){
  //   return <GameEndedPage gameCode={code} />
  // }

  // if(gameForfeited){
  //   return <GameForfeitedPage gameCode={code} />
  // }

 

  return (
    <div className="relative bg-green-800 bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-cover min-h-screen flex flex-col">
      <MemoizedMatchHeader
        gameCode={code}
        player1={game?.players[0]}
        player2={game?.players[1]}
        player3={game?.players[2]}
        player4={game?.players[3]}
        eventName={`${eventName} - ${roundName}`}
        viewers={Math.floor(Math.random() * 30) + 1} // Placeholder for viewer count
      />
      <MainLayout
        gameBoard={
          <GameBoard
            game={game}
            players={players}
            gameCards={gameCards}
            deckRef={deckRef}
            playerOneHandRef={playerOneHandRef}
            playerOnePlayAreaRef={playerOnePlayAreaRef}
            playerTwoHandRef={playerTwoHandRef}
            playerThreeHandRef={playerThreeHandRef}
            playerFourHandRef={playerFourHandRef}
            playerTwoPlayAreaRef={playerTwoPlayAreaRef}
            playerThreePlayAreaRef={playerThreePlayAreaRef}
            playerFourPlayAreaRef={playerFourPlayAreaRef}
            readonly
          />
        }
        sidePanel={
          <SidePanel>
            <MatchStats game={game} players={players} />
            <ShareButtons gameCode={code} />
          </SidePanel>
        }
      />

      <SpectatorChat
        socket={socket}
        gameCode={code as string}
        user_id={user?.id as number}
        username={user?.username as string}
        loading={loading}
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
};

export default SpectatePage;
