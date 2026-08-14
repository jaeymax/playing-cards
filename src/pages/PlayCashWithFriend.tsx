import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Copy,
  Check,
  Share2,
  ShieldCheck,
  Coins,
 // Users,
  Trophy,
  Settings2,
  X,
  Loader2,
  AlertCircle,
//  Play,
} from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Setting from "./Setting";
import { useAppContext } from "@/contexts/AppContext";
import { useSocket } from "@/contexts/SocketProvider";
import ChatNotification from "@/components/ChatNotification";
import PlayerInfo from "@/components/PlayerInfo";
import OpponentArea from "@/components/OpponentArea";
import GameMessage from "@/components/GameMessage";
import PlayerArea from "@/components/PlayerArea";
import LeadingPlayerInfo from "@/components/LeadingPlayerInfo";
import GameChat from "@/components/GameChat";
import BottomBar from "@/components/BottomBar";
import Modal from "@/components/Modal";
import WinnerModal from "@/components/WinnerModal";
import DeckArea from "@/components/DeckArea";

import {
  authHeaders,
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
import GameNotFoundPage from "@/components/GameNotFoundPage";
import { baseUrl } from "@/config/api";
import { logEvent } from "firebase/analytics";
import { analytics } from "@/firebase/config";
import { Message } from "./PlayWithFriend";
import GameControls from "@/components/GameControls";
import PlayCashGameOver from "@/components/PlayCashGameOver";
import TimerBar from "@/components/TimerBar";
import PlayCashForfeitModal from "@/components/PlayCashForfeitModal";
import ProcessingForfeitModal from "@/components/ProcessingForfeitModal";

// interface CashChallenge {
//   id: number;
//   stake: number;
//   platformFee?: number;
//   winnerPayout?: number;
//   status:
//     | "waiting"
//     | "accepted"
//     | "in_progress"
//     | "completed"
//     | "cancelled"
//     | "expired";
//   creatorId: number;
//   opponentId?: number | null;
//   winnerId?: number | null;
// }

// interface Game {
//   id: number;
//   game_code: string;

//   creator_id: number;
//   player_ids?: number[];

//   // Your existing game configuration
//   winPoints?: number;
//   includeAces?: boolean;
//   includeSixes?: boolean;
//   isRated?: boolean;
//   numPlayers?: number;
//   current_player_position?: number;
//   // Cash challenge information
//   challenge?: CashChallenge | null;

//   cards: Array<{
//     id: number;
//     player_id: number;
//     status: "in_deck" | "in_hand" | "played";
//     suit: "hearts" | "diamonds" | "clubs" | "spades";
//     rank: string;
//   }>;

//   // Adjust this to whatever your backend calls it
//   status?: string;

//   // Useful if your server sends this
//   players?: Array<{
//     id: number;
//     username?: string;
//     avatar?: string;
//   }>;
// }

const PlayCashWithFriend = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [game, setGame] = useState<any | null>({
    id: 1,
    game_code: "ABC123",
    creator_id: 1,
    winPoints: 10,
    includeAces: true,
    includeSixes: false,
    isRated: true,
    numPlayers: 2,
    challenge: {
      id: 1,
      stake: 10,
      platformFee: 1,
      winnerPayout: 19,
      status: "waiting",
      creatorId: 1,
      opponentId: null,
      winnerId: null,
    },
    cards: [],
    status: "waiting",
    players: [
      { id: 1, username: "Player1", avatar: "avatar1.png" },
      { id: 2, username: "Player2", avatar: "avatar2.png" },
    ],
  });

  const [turn_ends_at, setTurnEndsAt] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [processing, setProcessing] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const { code } = useParams();
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [me, setMe] = useState<any>(null);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [shuffledAtLeastOnce, setShuffledAtLeastOnce] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [firstOpponent, setFirstOpponent] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);
  const { socket } = useSocket();
  const { user, updateUser } = useAppContext();
  const [showChat, setShowChat] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [message, setMessage] = useState<string>("Waiting for players...");
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<Message | null>(null);
  const [soundOn, setSoundOn] = useState(true);
  const [gameNotFound, setGameNotFound] = useState(false);
  const [showLeaveConfirmation, setShowLeaveConfirmation] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showForfeitModal, setShowForfeitModal] = useState(false);
  const [processingForfeit, setProcessingForfeit] = useState(false);


  const [gameEnded, setGameEnded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<any>(null);
  const [typingPlayer, setTypingPlayer] = useState<any>(null);

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
        (player: any) => player.position === game?.current_player_position,
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
  }, [game]);

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

      if (remaining === 0 && game.status == 'in_progress') {
        setProcessingForfeit(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [turn_ends_at]);

  
  useEffect(() => {
    if (game) {
      socket?.on("playedCard", playedCardCallback);
      socket?.on("gameEnded", gameEndedCallback);
      socket?.on("startNewHand", startNewHandCallback);
      socket?.on("gameOver", gameOverCallback);
      //socket?.on("rematch", rematchCallback);
    }
    return () => {
      socket?.off("playedCard", playedCardCallback);
      socket?.off("gameEnded", gameEndedCallback);
      socket?.off("startNewHand", startNewHandCallback);
      socket?.off("gameOver", gameOverCallback);
      //socket?.off("rematch", rematchCallback);
    };
  }, [socket, gameCards, game, soundOn]);

  useEffect(() => {
    const authToken = getToken();

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

  const voiceMessageCallback = (message: any) => {
    if (!showChat) {
      setUnreadCount((prev) => prev + 1);
      setNotification(message);
    }

    setMessages((prev) => [...prev, message]);

    console.log("Received voice message:", message);
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
    setTurnEndsAt(0);
    console.log("Game over");
    logEvent(analytics, "game_ended", {
      winningPlayer: winnerData.winner.user.username,
      winningPosition: winnerData.winner.position,
    });
    setGameOver(true);
    setWinningPlayer(winnerData.winner);
    console.log("Winner data:", winnerData);
  };

  useEffect(() => {
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    return () => {
      socket?.off("shuffledDeck", shuffledDeckCallback);
      socket?.off("dealtCards", dealtCardsCallback);
    };
  }, [
    socket,
    me,
    firstOpponent,
    secondOpponent,
    thirdOpponent,
    soundOn,
    isShuffling,
    isDealing,
  ]);

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
      (card: any) => card.status == "in_deck",
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
    setTurnEndsAt(data.turn_ends_at);
    const myData = data.players.find(
      (player: any) => player.user.id === user?.id,
    );
    setMe(myData);
    getOpponentsData(data.players);

    if(data.status == "forfeited"){
      setShowForfeitModal(true);
      setProcessingForfeit(false);
      const winner = data.players.find((player:any) => player.user.id != data.forfeited_by);
      setWinningPlayer(winner);
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
      opponentThreePlayAreaRef,
    );
    //setGameCards(data.cards);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
     if(data.status == "forfeited"){
      setShowForfeitModal(true);
      setProcessingForfeit(false);
      const winner = data.players.find((player:any) => player.user.id != data.forfeited_by);
      setWinningPlayer(winner);
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
        setIsDealing,
      );
      setShowDealButton(false);
      setShowShuffleButton(false);
    },
    [
      firstOpponent,
      secondOpponent,
      thirdOpponent,
      soundOn,
      isShuffling,
      isDealing,
    ],
  );

  const shuffledDeckCallback = (cards: any) => {
    setShuffledAtLeastOnce(true);
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    if (soundOn) playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
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

  const startNewHandCallback = (data: any) => {
    setShuffledAtLeastOnce(false);
    console.log("Start new hand:", data);
    logEvent(analytics, "new_hand_started", { handNumber: data.hand_number });
    //setGameEnded(false);
    //setWinningPlayer(null);
    setTurnEndsAt(data.turn_ends_at);
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
      game_code: code as string,
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

  // if (gameNotFound) {
  //   return <GameNotFoundPage gameCode={code} />;
  // }

  const onAcceptChallenge = async () => {
    // make a post api request to baseur/challenges/accept and add challenge_id in the body of the request

    try {
      const response = await fetch(`${baseUrl}/challenges/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders()),
        },
        body: JSON.stringify({ challenge_id: game?.challenge?.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept challenge");
      }

      const data = await response.json();

      console.log("Challenge accepted:", data);
    } catch (error) {
      console.error("Error accepting challenge:", error);
    }

    // return new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     console.log("Challenge accepted");
    //     resolve();
    //   }, 2000);
    // });
  };

  const onDeclineChallenge = async () => {
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Challenge declined");
        resolve();
      }, 2000);
    });
  };

  const onCancelChallenge = async () => {
    // Simulate API call
    // make a post api request to baseur/challenges/cancel and add challenge_id in the body of the request

    try {
      const response = await fetch(`${baseUrl}/challenges/cancel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders()),
        },
        body: JSON.stringify({ challenge_id: game?.challenge?.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel challenge");
      }

      const data = await response.json();

      console.log("Challenge cancelled:", data);
    } catch (error) {
      console.error("Error cancelling challenge:", error);
    } 

  };

  const challenge = game?.challenge;

  const isHost = challenge.creator_id === user?.id; // Replace with actual logic to determine if the current user is the host

  const gameLink = `${window.location.origin}/cash-game/${code}`;

  const stake = Number(challenge?.stake || 0);
  const platformFee = Number(challenge?.platform_fee || 0);

  const prize = useMemo(() => {
    if (challenge?.winner_payout !== undefined) {
      return Number(challenge.winner_payout);
    }

    // If your backend sends the fee separately,
    // this calculates the expected winner payout.
    return Math.max(0, stake * 2 - platformFee);
  }, [challenge?.winner_payout, stake, platformFee]);

  const challengeStatus = challenge?.status || "waiting";

  /*
   * The actual game should only be shown after
   * the server confirms that the challenge has
   * been accepted and the game has started.
   *
   * Adjust these conditions to match your backend.
   */
  

  const challengeIsFinished =
    challengeStatus === "completed" ||
    challengeStatus === "cancelled" ||
    challengeStatus === "expired";

  const copyGameLink = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy game link:", error);
    }
  };

  const shareGameLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "SparPlay Cash Challenge",
          text: `You've been challenged to a Spar game for ₵${stake}.`,
          url: gameLink,
        });
      } else {
        await copyGameLink();
      }
    } catch (error) {
      // User cancelling native share shouldn't be treated as an error.
      console.log("Share cancelled");
    }
  };

  const handleAccept = async () => {
    if (!onAcceptChallenge || processing) return;

    try {
      setProcessing(true);
      await onAcceptChallenge();
    } catch (error) {
      console.error("Failed to accept challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleDecline = async () => {
    if (!onDeclineChallenge || processing) return;

    try {
      setProcessing(true);
      await onDeclineChallenge();
    } catch (error) {
      console.error("Failed to decline challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    if (!onCancelChallenge || processing) return;

    try {
      setProcessing(true);
      await onCancelChallenge();
      setShowCancelConfirm(false);
    } catch (error) {
      console.error("Failed to cancel challenge:", error);
    } finally {
      setProcessing(false);
    }
  };

  if (gameNotFound) {
    return <GameNotFoundPage gameCode={code} />;
  }

  /*
   * --------------------------------------------------
   * CANCELLED / EXPIRED / COMPLETED
   * --------------------------------------------------
   */

  if (challengeIsFinished) {
    return (
      <div className="min-h-screen bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-[#07130d] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border p-6 text-center border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
            {challengeStatus === "completed" ? (
              <Trophy className="h-7 w-7 text-yellow-400" />
            ) : (
              <X className="h-7 w-7 text-red-400" />
            )}
          </div>

          <h2 className="text-xl font-bold">
            {challengeStatus === "completed"
              ? "Challenge completed"
              : challengeStatus === "expired"
                ? "Challenge expired"
                : "Challenge cancelled"}
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            {challengeStatus === "completed"
              ? "This cash challenge has already been settled."
              : "This challenge is no longer available."}
          </p>
        </div>
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * HOST VIEW
   * --------------------------------------------------
   */

  if (challengeStatus === "waiting" && isHost) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-[#062e16] via-[#06451f] to-[#02190b] text-white">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-green-400/10 blur-[120px]" />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 ring-1 ring-green-300/20">
                <Coins className="h-7 w-7 text-green-400" />
              </div>

              <h1 className="text-2xl font-black tracking-tight">
                Cash Challenge
              </h1>

              <p className="mt-1 text-sm text-green-100/60">
                Your challenge is ready
              </p>
            </div>

            {/* Main card */}
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">
              {/* Stake */}
              <div className="border-b border-white/10 p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-green-100/50">
                      Your stake
                    </p>

                    <p className="mt-1 text-4xl font-black">
                      ₵{stake.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10">
                    <Coins className="h-7 w-7 text-green-400" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Winner receives
                    </span>

                    <span className="text-lg font-bold text-green-400">
                      ₵{prize.toFixed(2)}
                    </span>
                  </div>

                  {platformFee > 0 && (
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Platform fee
                      </span>

                      <span className="text-xs text-gray-500">
                        ₵{platformFee.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Invite */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="font-bold">Invite your opponent</h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Send this challenge link to the person you want to play.
                  </p>
                </div>

                {/* Link */}
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-2">
                  <div className="min-w-0 flex-1 px-2">
                    <p className="truncate text-sm text-gray-300">{gameLink}</p>
                  </div>

                  <button
                    onClick={copyGameLink}
                    className="flex h-10 shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-semibold transition hover:bg-white/15 active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Share */}
                <button
                  onClick={shareGameLink}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 py-3.5 text-sm font-bold text-black transition hover:bg-green-400 active:scale-[0.98]"
                >
                  <Share2 className="h-4 w-4" />
                  Share Challenge
                </button>

                {/* Waiting */}
                <div className="mt-5 flex items-center gap-3 rounded-2xl border border-green-400/10 bg-green-400/5 p-4">
                  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-400/10">
                    <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-green-400/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Waiting for opponent
                    </p>

                    <p className="text-xs text-gray-500">
                      The game starts after they accept.
                    </p>
                  </div>
                </div>

                {/* Security */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-gray-500">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Your stake is locked until the challenge is settled.
                </div>

                {/* Cancel */}

                <button
                  onClick={() => setShowCancelConfirm(true)}
                  className="mt-5 w-full text-xs font-medium text-gray-500 transition hover:text-red-400"
                >
                  Cancel challenge
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel confirmation */}
        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#101812] p-6 shadow-2xl">
              <h3 className="text-lg font-bold">Cancel challenge?</h3>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Your locked stake will be released if the challenge has not been
                accepted yet.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  disabled={processing}
                  className="flex-1 rounded-xl bg-white/5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Keep it
                </button>

                <button
                  onClick={handleCancel}
                  disabled={processing}
                  className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-400"
                >
                  {processing ? (
                    <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                  ) : (
                    "Cancel"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  /*
   * --------------------------------------------------
   * OPPONENT VIEW
   * --------------------------------------------------
   */
  if (challengeStatus === "waiting" && !isHost) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#062e16] via-[#06451f] to-[#02190b] b-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rr3.jpg')] bg-cover bg-center px-3 py-4 sm:px-4 sm:py-8 text-white">

      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-md items-center sm:min-h-[calc(100vh-4rem)]">

        <div className="w-full">

          {/* TOP BADGE */}
          <div className="mb-3 sm:mb-5 flex justify-center">

            <div className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs font-bold uppercase tracking-wider text-green-400">

              <Coins className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

              Cash Challenge

            </div>

          </div>


          {/* MAIN CHALLENGE CARD */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-xl">

            {/* SCROLLABLE CONTENT */}
            <div className="max-h-[calc(100vh-150px) overflow--auto">

              {/* CHALLENGER */}
              <div className="border-b border-white/10 px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-7 text-center">

                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-500/10 text-xl sm:text-2xl">
                  ⚔️
                </div>

                <h1 className="mt-3 sm:mt-4 text-lg sm:text-xl font-black">
                  You've been challenged!
                </h1>

                <p className="mt-1 text-[11px] sm:text-sm text-gray-500">
                  Join the match and put your skills to the test.
                </p>

              </div>


              {/* CONTENT */}
              <div className="p-4 sm:p-6">

                {/* MONEY */}
                <div className="rounded-2xl sm:rounded-3xl border border-green-400/20 bg-gradient-to-br from-green-500/10 to-transparent p-4 sm:p-5 text-center">

                  <p className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-gray-500">
                    Entry Stake
                  </p>

                  <p className="mt-1 text-3xl sm:text-5xl font-black tracking-tight">
                    ₵{stake.toFixed(2)}
                  </p>

                  <p className="mt-1 text-[10px] sm:text-xs text-gray-500">
                    Will be deducted from your wallet
                  </p>

                </div>


                {/* PRIZE BREAKDOWN */}
                <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl bg-white/[0.03] p-3 sm:p-4">

                  <div className="flex items-center justify-between">

                    <span className="text-xs sm:text-sm text-gray-400">
                      Total pot
                    </span>

                    <span className="text-sm sm:text-base font-bold">
                      ₵{(stake * 2).toFixed(2)}
                    </span>

                  </div>


                  {platformFee > 0 && (
                    <div className="mt-2 flex items-center justify-between">

                      <span className="text-[11px] sm:text-sm text-gray-500">
                        Platform fee
                      </span>

                      <span className="text-[11px] sm:text-sm text-gray-500">
                        ₵{platformFee.toFixed(2)}
                      </span>

                    </div>
                  )}


                  <div className="mt-2 border-t border-white/5 pt-2">

                    <div className="flex items-center justify-between">

                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300">

                        <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />

                        Winner receives

                      </span>

                      <span className="text-base sm:text-lg font-black text-green-400">
                        ₵{prize.toFixed(2)}
                      </span>

                    </div>

                  </div>

                </div>


                {/* GAME SETTINGS */}
                <div className="mt-3 sm:mt-4">

                  <div className="mb-2 sm:mb-3 flex items-center gap-1.5">

                    <Settings2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />

                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500">
                      Game Settings
                    </span>

                  </div>


                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">

                    <Setting
                      label="Win points"
                      value={String(game?.winPoints ?? 10)}
                    />

                    <Setting
                      label="Players"
                      value="2 Players"
                    />

                    <Setting
                      label="Aces"
                      value={game?.includeAces ? "Included" : "Excluded"}
                    />

                    <Setting
                      label="Sixes"
                      value={game?.includeSixes ? "Included" : "Excluded"}
                    />

                    <Setting
                      label="Rated"
                      value={game?.isRated ? "Yes" : "No"}
                    />

                    <Setting
                      label="Mode"
                      value="Cash Match"
                    />

                  </div>

                </div>


                {/* WARNING */}
                <div className="mt-3 sm:mt-5 flex gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-yellow-400/10 bg-yellow-400/5 p-3 sm:p-4">

                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-yellow-400" />

                  <p className="text-[10px] sm:text-xs leading-4 sm:leading-5 text-gray-400">

                    By accepting,{" "}

                    <strong className="text-gray-300">
                      ₵{stake.toFixed(2)}
                    </strong>{" "}

                    will be locked from your wallet. The winner receives{" "}

                    <strong className="text-green-400">
                      ₵{prize.toFixed(2)}
                    </strong>{" "}

                    after the match.

                  </p>

                </div>


                {/* ACCEPT */}
                <button
                  onClick={handleAccept}
                  disabled={processing || challengeStatus !== "waiting"}
                  className="
                    mt-3
                    sm:mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    sm:rounded-2xl
                    bg-green-500
                    py-3
                    sm:py-4
                    text-xs
                    sm:text-sm
                    font-black
                    text-black
                    shadow-lg
                    shadow-green-500/10
                    transition
                    hover:bg-green-400
                    active:scale-[0.98]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >

                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Accepting challenge...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                      Accept Challenge
                    </>
                  )}

                </button>


                {/* DECLINE */}
                <button
                  onClick={handleDecline}
                  disabled={processing}
                  className="
                    mt-1
                    sm:mt-3
                    w-full
                    py-1.5
                    sm:py-2
                    text-[10px]
                    sm:text-xs
                    font-semibold
                    text-gray-500
                    transition
                    hover:text-red-400
                    disabled:opacity-50
                  "
                >
                  Decline challenge
                </button>

              </div>

            </div>

          </div>


          {/* SECURITY FOOTER */}
          <div className="mt-3 sm:mt-5 flex items-center justify-center gap-1.5 text-[9px] sm:text-[11px] text-gray-600">

            <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />

            Funds are protected until the match is settled.

          </div>

        </div>

      </div>

    </div>
  );
}

  /* This will render when the challenge is in progress */

  return (
    <div className="relative borde bg-green-800 bg-[url('https://res.cloudinary.com/dbvame158/image/upload/v1770519565/background1_jx3rry.jpg')] bg-cover gap-4 bg-center w-full">
      {notification && !showChat && (
        <ChatNotification
          message={notification}
          onClose={() => setNotification(null)}
          onClick={() => setShowChat(true)}
        />
      )}

      <div className="min-h-screen relative bg-green800 bg\-[url(./assets/background1.jpg)] bg-cover gap-4 bg-center w-full flex flex-col justify-between pb-24">
         {remainingSeconds > 0 && game?.current_turn_user_id !== user?.id && (
          <TimerBar
            remainingSeconds={remainingSeconds}
            position="top"
            isCurrentPlayer={false}
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
          is_typing={typingPlayer?.user_id === firstOpponent?.user.id}
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
            is_typing={typingPlayer?.user_id === secondOpponent?.user.id}
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
            is_typing={typingPlayer?.user_id === thirdOpponent?.user.id}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        <GameControls
          showButtons={showDealButton && showShuffleButton}
          isDealing={isDealing}
          isShuffling={isShuffling}
          shuffledAtLeastOnce={shuffledAtLeastOnce}
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

         {remainingSeconds > 0 && game?.current_turn_user_id === user?.id && (
          <TimerBar
            remainingSeconds={remainingSeconds}
            position="bottom"
            isCurrentPlayer={true}
          />
        )}

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
          typingPlayer={typingPlayer}
          setTypingPlayer={setTypingPlayer}
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
        setSoundOn={setSoundOn}
        soundOn={soundOn}
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
        // <GameOverModal
        //   isOpen={gameOver}
        //   onClose={() => setGameOver(false)}
        //   winningPlayer={winningPlayer}
        //   currentPlayer={me}
        //   onRematch={() => {
        //     setGameOver(false);
        //     socket?.emit("rematch", { code, winningPlayer });
        //   }}
        //   onLeaveGame={() => navigate("/")}
        // />
        <PlayCashGameOver
          isOpen={gameOver}
          onClose={() => setGameOver(false)}
          winningPlayer={winningPlayer}
          currentPlayer={me}
          stake={stake}
          winnerPayout={prize}
          onLeaveGame={() => navigate("/")}
        />

      )}

       <PlayCashForfeitModal
          isOpen = {showForfeitModal}
          onClose={()=>setShowForfeitModal(false)}
          winningPlayer={winningPlayer}
          currentPlayer={me}
          stake={stake}
          winnerPayout={prize}
          onLeaveGame={()=>navigate('/')}       
       />

      <ProcessingForfeitModal
        isOpen = {processingForfeit}
      />

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

export default PlayCashWithFriend;
