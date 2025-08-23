import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import {
  shuffleCards,
  dealCards,
  handleGameMessage,
  handlePlayedCard,
  playShuffleSound,
  playPlayedCardSound,
  reconcileCards,
  getPlayerIds,
} from "@/utils/Functions";
import bot from "@/assets/robot3.png";
import PlayerInfo from "@/components/PlayerInfo";
import GameControls from "@/components/GameControls";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/contexts/SocketProvider";
import OpponentArea from "@/components/OpponentArea";
import DeckArea from "@/components/DeckArea";
import GameMessage from "@/components/GameMessage";
import PlayerArea from "@/components/PlayerArea";
import WinnerModal from "@/components/WinnerModal";
import GameOverModal from "@/components/GameOverModal";

const PlayVsComputer = () => {
  const { code } = useParams();
  const { socket } = useSocket();
  const { user } = useAppContext();
  const [isDealing, setIsDealing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [game, setGame] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [gameCards, setGameCards] = useState<any[]>([]);
  const [me, setMe] = useState<any>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [firstOpponent, setFirstOpponent] = useState<any>(null);
  const [secondOpponent, setSecondOpponent] = useState<any>(null);
  const [thirdOpponent, setThirdOpponent] = useState<any>(null);

  const [showDealButton, setShowDealButton] = useState(false);
  const [showShuffleButton, setShowShuffleButton] = useState(false);
  const [message, setMessage] = useState<string>("Your turn! Click to play");
  const [gameEnded, setGameEnded] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winningPlayer, setWinningPlayer] = useState<any>(null);

  const opponentOneHandRef = useRef<HTMLDivElement>(null);
  const opponentTwoHandRef = useRef<HTMLDivElement>(null);
  const opponentThreeHandRef = useRef<HTMLDivElement>(null);
  const opponentOnePlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentTwoPlayAreaRef = useRef<HTMLDivElement>(null);
  const opponentThreePlayAreaRef = useRef<HTMLDivElement>(null);
  const playerHandRef = useRef<HTMLDivElement>(null);
  const playerPlayAreaRef = useRef<HTMLDivElement>(null);

  const getOpponentsData = useCallback(
    (data: any[]) => {
      const opponents = data.filter((player) => player.user.id !== user?.id);
      if (opponents.length > 0) setFirstOpponent(opponents[0]);
      if (opponents.length > 1) setSecondOpponent(opponents[1]);
      if (opponents.length > 2) setThirdOpponent(opponents[2]);
    },
    [user]
  );

  const getUpdatedGameData = useCallback(
    (data: any) => {
      console.log("Updated game data received:", data);
      setGame(data);
      const myData = data.players.find(
        (player: any) => player.user.id === user?.id
      );
      setMe(myData);
      getOpponentsData(data.players);
    },
    [user]
  );

  const getMyData = useCallback(
    (data: any[], cards:any[]) => {
      const myData = data.find((player) => player.user.id === user?.id);
      const showGameButtons = cards.every((card:any)=>card.status == 'in_deck');
      if (myData?.is_dealer && showGameButtons) {
        setShowDealButton(true);
        setShowShuffleButton(true);
      }
      setMe(myData);
    },
    [user]
  );

  const getGameDataCallback = useCallback(
    (data: any) => {
      console.log("Game data received:", data);
      setGame(data);

      setPlayers(data.players);
      data.cards.forEach((card: any, i: number) => {
        card.pos_x = card.pos_x * i;
        card.pos_y = card.pos_y * i;
      });


      const {meId, firstOpponentId, secondOpponentId, thirdOpponentId} = getPlayerIds(data.players, user);
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
      getMyData(data.players, data.cards);
      getOpponentsData(data.players);
    },
    [user, me, firstOpponent, secondOpponent, thirdOpponent]
  );

  const dealtCardsCallback = useCallback(
    (cards: any) => {
      console.log("DealtCards", cards);
      //setGameCards(cards);
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
    [me, firstOpponent, secondOpponent, thirdOpponent]
  );

  const shuffledDeckCallback = useCallback((cards: any) => {
    console.log("ShuffleCards", cards);
    setGameCards(cards);
    playShuffleSound();
    shuffleCards(cards, setGameCards, setIsShuffling, isShuffling, isDealing);
  }, []);

  const gameMessageCallback = (message: string) => {
    handleGameMessage(message, setMessage);
  };

  // useEffect(()=>{
  //   if(me && game){
  //     console.log('reconciling game state')
  //     console.log(gameCards);

  //     if(gameCards.some((card:any)=>card.status == 'in_hand' || card.status == 'played')){
  //         setShowDealButton(false);
  //         setShowShuffleButton(false);
  //     }

  //     gameCards.forEach((card:any)=>{
  //        if(card.status == 'played'){
  //         const slot_position = card.trick_number - 1;
  //         if(card.player_id == me?.id){
  //          const targetArea = playerPlayAreaRef.current;
  //          const slot = targetArea?.children[slot_position];
  //          const slotRect = slot?.getBoundingClientRect();
  //          const deckRect = deckRef?.current?.getBoundingClientRect();
  //          let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
  //          let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  //          card.x_pos = xOffset;
  //          card.y_pos = yOffset;
  //          card.rotation = 0;
  //          setGameCards((prevCards:any)=>{
  //             return prevCards.map((c:any)=>{
  //               if(c?.id == card?.id){
  //                return {
  //                  ...c,
  //                  pos_x:xOffset,
  //                  pos_y:yOffset,
  //                  z_index:card.trick_number
  //                }
  //               }
  //               return c;
  //             })
  //          })
  //         }
  //         else if(card.player_id == firstOpponent?.id){
  //           const targetArea = opponentOnePlayAreaRef.current;
  //           const slot = targetArea?.children[5 - slot_position - 1];
  //           const slotRect = slot?.getBoundingClientRect();
  //           const deckRect = deckRef?.current?.getBoundingClientRect();
  //           let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
  //           let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  //           card.x_pos = xOffset;
  //           card.y_pos = yOffset;
  //           card.rotation = 0;
  //           setGameCards((prevCards:any)=>{
  //             return prevCards.map((c:any)=>{
  //               if(c?.id == card?.id){
  //                return {
  //                  ...c,
  //                  pos_x:xOffset,
  //                  pos_y:yOffset,
  //                  z_index:card.trick_number
  //                }
  //               }
  //               return c;
  //             })
  //          })
  //         }
  //        }
  //        else if(card.status == 'in_hand'){
  //            const hand_position = card.hand_position;
  //            if(card.player_id == me?.id){
  //             const targetArea = playerHandRef.current;
  //             const slot = targetArea?.children[hand_position];
  //             const slotRect = slot?.getBoundingClientRect();
  //             const deckRect = deckRef?.current?.getBoundingClientRect();
  //             let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
  //             let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  //             card.x_pos = xOffset;
  //             card.y_pos = yOffset;
  //             card.rotation = 0;
  //             setGameCards((prevCards:any)=>{
  //                return prevCards.map((c:any)=>{
  //                  if(c?.id == card?.id){
  //                   return {
  //                     ...c,
  //                     pos_x:xOffset,
  //                     pos_y:yOffset
  //                   }
  //                  }
  //                  return c;
  //                })
  //             })
  //            }
  //            else if(card.player_id == firstOpponent?.id){
  //             const targetArea = opponentOneHandRef.current;
  //             const slot = targetArea?.children[hand_position];
  //             const slotRect = slot?.getBoundingClientRect();
  //             const deckRect = deckRef?.current?.getBoundingClientRect();
  //             let xOffset = (slotRect?.left || 0) - (deckRect?.left || 0);
  //             let yOffset = (slotRect?.top || 0) - (deckRect?.top || 0);
  //             card.x_pos = xOffset;
  //             card.y_pos = yOffset;
  //             card.rotation = 0;
  //             setGameCards((prevCards:any)=>{
  //                return prevCards.map((c:any)=>{
  //                  if(c?.id == card?.id){
  //                   return {
  //                     ...c,
  //                     pos_x:xOffset,
  //                     pos_y:yOffset
  //                   }
  //                  }
  //                  return c;
  //                })
  //             })
  //            }else if(card.player_id == secondOpponent?.id){

  //            }else if(card.player_id == thirdOpponent?.id){

  //            }
  //        }
  //        else if(card.status == 'in_drawpile'){
  //         setGameCards((prevCards:any)=>{
  //           return prevCards.map((c:any)=>{
  //             if(c?.id == card?.id){
  //              return {
  //                ...c,
  //                pos_x:-1000,

  //              }
  //             }
  //             return c;
  //           })
  //        })
  //        }
  //        else if(card.status == 'in_deck'){

  //        }
  //     })
  //   }
  // },[me?.id, firstOpponent?.id, secondOpponent?.id, thirdOpponent?.id])

  // useEffect(()=>{

  //   if(gameCards)console.log('gamecards changed', gameCards)
  // }, [gameCards])

  useEffect(() => {
    if (user) {
      //socket?.emit("join-room", code);
      //socket?.emit("getGameData", code);
      socket?.on("connect", handleConnect);
      socket?.on("gameData", getGameDataCallback);
      socket?.on("updatedGameData", getUpdatedGameData);
      socket?.on("game-not-found", handleGameNotFound);
      socket?.on("gameMessage", gameMessageCallback);

      if (socket?.connected) {
        handleConnect();
      }
    }

    return () => {
      socket?.off("gameData", getGameDataCallback);
      socket?.off("updatedGameData", getUpdatedGameData);
      socket?.off("gameMessage", gameMessageCallback);
      socket?.off("game-not-found", handleGameNotFound);
      socket?.off("connect", handleConnect);
      //socket?.emit("leave-room", code);
    };
  }, [user]);

  useEffect(() => {
    socket?.on("dealtCards", dealtCardsCallback);
    socket?.on("shuffledDeck", shuffledDeckCallback);

    return () => {
      socket?.off("dealtCards", dealtCardsCallback);
      socket?.off("shuffledDeck", shuffledDeckCallback);
    };
  }, [me, firstOpponent, secondOpponent, thirdOpponent]);

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
  }, [gameCards, game]);

  useEffect(() => {
    if (game?.current_player_position === me?.position) {
      setMessage("Your turn! Click to play");
    } else {
      const player = players.find(
        (player: any) => player.position === game?.current_player_position
      );
      setMessage(`${player?.user.username}'s turn`);
      computerPlay(game);
    }
  }, [game]);

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

  const gameEndedCallback = useCallback((data: any) => {
    console.log("gameEnded", data);
    setGameEnded(true);
    setWinningPlayer(data.winner);
  }, []);

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

  const startNewHandCallback = async (data: any) => {
    console.log("Start new hand:", data);
    setGameEnded(false);
    setWinningPlayer(null);
    setPlayers(data.players);
    getMyData(data.players, data.cards);
    getOpponentsData(data.players);
    setGame(data);
    setGameCards(data.cards);
    const dealer = data.players.find((player: any) => player.is_dealer);
    if (dealer.user.is_bot) {
      console.log(`${firstOpponent?.user?.username} is the dealer`);
      let shuffleTimes = Math.floor(Math.random() * 3) + 1;
      console.log("shuffle times", shuffleTimes);

      const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

      async function shuffleLoop(shuffleTimes: number) {
        while (shuffleTimes > 0) {
          handleShuffle(); // your shuffle logic
          shuffleTimes--;

          await sleep(5000); // pause 5 seconds before next shuffle
        }
      }
      await shuffleLoop(shuffleTimes);
      // handleShuffle();
      setTimeout(() => {
        handleDeal();
      }, 1000);
    }
  };

  const gameOverCallback = useCallback((winnerData: any) => {
    console.log("Game over");
    setGameOver(true);
    setWinningPlayer(winnerData.winner);
    console.log("Winner data:", winnerData);
  }, []);

  const rematchCallback = useCallback(
    (data: any) => {
      console.log("Hand rematch:", data);
      setWinningPlayer(null);
      setPlayers(data.players);
      getMyData(data.players, data.cards);
      getOpponentsData(data.players);
      setGame(data);
      setGameCards(data.cards);
    },
    [user]
  );

  const getCardById = (cardId: number, cards: any[]) => {
    return cards.find((card) => card.id === cardId);
  };

  const computerPlay = (game: any) => {
    const botCards = game.cards.filter(
      (card: any) => card.player_id === firstOpponent?.id
    );
    const botHand = botCards.filter((card: any) => card.status === "in_hand");
    if (!botHand.length) {
      return;
    }
    setMessage(`Computer is thinking...`);
    let currentLeadingSuit = null;

    console.log("current_trick", game.current_trick);

    if (game.current_trick) {
      currentLeadingSuit = game.current_trick.leading_suit;
    }

    let randomCard = null;
    if (!currentLeadingSuit) {
      randomCard = botHand[Math.floor(Math.random() * botHand.length)];
    } else {
      const validCards = botHand.filter(
        (card: any) => card.card.suit === currentLeadingSuit
      );
      if (validCards.length === 1) {
        randomCard = validCards[0];
      } else if (validCards.length > 1) {
        const sortedCards = validCards.sort(
          (a: any, b: any) => a.card.value - b.card.value
        );
        const leadingCard = getCardById(
          game.current_trick.cards[0].id,
          game.cards
        );
        console.log("Leading Card:", leadingCard);
        if (
          leadingCard.card.value >
          sortedCards[sortedCards.length - 1].card.value
        ) {
          randomCard = sortedCards[0];
        } else {
          let optimalCardIndex = 0;
          while (optimalCardIndex < sortedCards.length) {
            if (
              sortedCards[optimalCardIndex].card.value > leadingCard.card.value
            ) {
              randomCard = sortedCards[optimalCardIndex];
              break;
            }
            optimalCardIndex++;
          }
        }
        console.log("Sorted valid cards:", sortedCards);
      } else {
        const sortedCards = botHand.sort(
          (a: any, b: any) => a.card.value - b.card.value
        );
        randomCard = sortedCards[0];
      }
    }

    if (botHand.length === 5 && !firstOpponent?.is_dealer) {
      setTimeout(() => {
        socket?.emit("playCard", {
          card_id: randomCard?.id,
          game_code: code,
          player_id: firstOpponent?.id,
        });
        // setMessage(`${firstOpponent.user.username} played a card`);
      }, 5000);
      return;
    }

    console.log("current_trick", game.current_trick);
    console.log("Bot cards:", botCards);
    socket?.emit("playCard", {
      card_id: randomCard?.id,
      game_code: code,
      player_id: firstOpponent?.id,
    });
  };

  const handleShuffle = () => {
    socket?.emit("shuffleDeck", code);
  };

  const handleDeal = () => {
    socket?.emit("dealCards", code);
  };

  const handleConnect = () => {
    console.log("here...");
    socket?.emit("join-room", code);
    socket?.emit("getGameData", code);
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
          name={"Computer"}
          avatar={bot}
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

        <GameMessage message={message} gameEnded={gameEnded} />

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

      {gameEnded && (
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
      )}

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

export default PlayVsComputer;
