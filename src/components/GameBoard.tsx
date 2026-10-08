import React, { useEffect } from "react";
//import PlayerInfo from "./PlayerInfo";
import DeckArea from "./DeckArea";
import OpponentArea from "./OpponentArea";
import PlayerArea from "./PlayerArea";
import SpectatorPlayerInfo from "./SpectatorPlayerInfor";

interface GameBoardProps {
  game: any;
  players: any[];
  gameCards: any[];
  deckRef: React.RefObject<HTMLDivElement>;
  playerOneHandRef: React.RefObject<HTMLDivElement>;
  playerOnePlayAreaRef: React.RefObject<HTMLDivElement>;
  playerTwoHandRef: React.RefObject<HTMLDivElement>;
  playerThreeHandRef: React.RefObject<HTMLDivElement>;
  playerFourHandRef: React.RefObject<HTMLDivElement>;
  playerTwoPlayAreaRef: React.RefObject<HTMLDivElement>;
  playerThreePlayAreaRef: React.RefObject<HTMLDivElement>;
  playerFourPlayAreaRef: React.RefObject<HTMLDivElement>;
  readonly?: boolean;
}

const GameBoard = ({
  game,
  players,
  gameCards,
  deckRef,
  playerOneHandRef,
  playerOnePlayAreaRef,
  playerTwoHandRef,
  playerThreeHandRef,
  playerFourHandRef,
  playerTwoPlayAreaRef,
  playerThreePlayAreaRef,
  playerFourPlayAreaRef,
}: GameBoardProps) => {
  const playerOne = players[0];
  const playerTwo = players[1];
  const playerThree = players[2];
  const playerFour = players[3];

  const [remainingSeconds, setRemainingSeconds] = React.useState<number>(0);

   useEffect(() => {
      if (!game?.turn_ends_at) {
        setRemainingSeconds(0);
        return;
      }
  
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const endTime = new Date(game?.turn_ends_at).getTime();
        const remainingSeconds = Math.max(0, Math.ceil((endTime - now) / 1000));
        setRemainingSeconds(remainingSeconds);
  
        if (remainingSeconds === 0) {
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [game?.turn_ends_at]);



  return (
    <div className="relative h-full min-h-[520px] borde w-full overflow-hidden">
      {/* Game Table Area */}
      <div className="relative h-full min-h-[520px] w-full overflow-hidden ">
        {/* ================= TOP PLAYER ================= */}
        <SpectatorPlayerInfo
          name={playerTwo?.user.username || "Waiting..."}
          player_position={playerTwo?.position || 0}
          current_player_position={game?.current_player_position || 0}
          remaining_time={remainingSeconds}
          total_time={game?.turn_timeout_seconds}
          avatar={
            playerTwo?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={playerTwo?.score || 0}
          styles="absolute left-1/2 top-2 -translate-x-1/2"
        />

        {/* ================= LEFT PLAYER ================= */}
        {playerThree && (
          <SpectatorPlayerInfo
            player_position={playerThree?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={playerThree?.user.username || "Opponent 2"}
            remaining_time={remainingSeconds}
            total_time={game?.turn_timeout_seconds}
            avatar={
              playerThree?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={playerThree?.score || 0}
            styles="absolute left-2 top-1/2 -translate-y-1/2"
          />
        )}

        {/* ================= RIGHT PLAYER ================= */}
        {playerFour && (
          <SpectatorPlayerInfo
            player_position={playerFour?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={playerFour?.user.username || "Opponent 3"}
            avatar={
              playerFour?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            remaining_time={remainingSeconds}
            total_time={game?.turn_timeout_seconds}
            points={playerFour?.score || 0}
            styles="absolute right-2 top-1/2 -translate-y-1/2"
          />
        )}

        {/* ================= OPPONENT HANDS ================= */}

        <OpponentArea
          id="opponentArea1"
          ref={playerTwoHandRef}
          className="absolute left-1/2 top-20 flex w-full -translate-x-1/2 items-center justify-center"
        />

        <OpponentArea
          id="opponentArea2"
          ref={playerThreeHandRef}
          className="absolute left-[-45px] top-1/2 flex w-[160px] -translate-y-1/2 rotate-90 items-center justify-center sm:left-[-25px]"
        />

        <OpponentArea
          id="opponentArea3"
          ref={playerFourHandRef}
          className="absolute right-[-45px] top-1/2 flex w-[160px] -translate-y-1/2 rotate-90 items-center justify-center sm:right-[-25px]"
        />

        {/* ================= CENTRAL TABLE ================= */}

        <div className="absolute left-1/2 top-1/2 z-50 w-[min(88%,520px)]  -translate-x-1/2 -translate-y-1/2">
          {/* Player 2 Play Area */}
          <div
            className="relative flex flex-col opponent-one-play-area h-[70px] w-full items-center justify-center"
            id="player-2"
            ref={playerTwoPlayAreaRef}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="card-slot"
                data-position={5 - index - 1}
              />
            ))}
          </div>

          {/* Middle Play Area */}
          <div className="flex w-full items-center justify-between">
            {/* Player 3 */}
            <div
              className="opponent-two-play-area flex items-center justify-center"
              ref={playerThreePlayAreaRef}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={index}
                />
              ))}
            </div>

            {/* Deck */}
            <div className="relative z-50 shrink-0">
              <DeckArea
                ref={deckRef}
                gameCards={gameCards}
                game={game}
                me={null}
              />
            </div>

            {/* Player 4 */}
            <div
              className="opponent-three-play-area flex items-center justify-center"
              ref={playerFourPlayAreaRef}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={index}
                />
              ))}
            </div>
          </div>

          {/* Player 1 Play Area */}
          <div
            className="relative flex h-[70px] w-full flex-col items-center justify-center"
            id="player-1"
            ref={playerOnePlayAreaRef}
          >
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="card-slot"
                data-position={index}
              />
            ))}
          </div>
        </div>

        {/* ================= PLAYER 1 HAND ================= */}

        <PlayerArea
          id="playerArea"
          ref={playerOneHandRef}
          className="absolute bottom-1 borde left-1/2 mb-2 flex w-full -translate-x-1/2 items-center justify-center"
        />

        {/* ================= BOTTOM PLAYER ================= */}

        <SpectatorPlayerInfo
          player_position={playerOne?.position || 0}
          current_player_position={game?.current_player_position || 0}
          name={playerOne?.user.username || "Player"}
          avatar={
            playerOne?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          remaining_time={remainingSeconds}
          total_time={game?.turn_timeout_seconds}
          points={playerOne?.score || 0}
          styles="absolute bottom-1 left-1/2 -translate-x-1/2 z-[1000]"
        />
      </div>
    </div>
  );
};
export default GameBoard;
