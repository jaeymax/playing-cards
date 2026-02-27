import React from "react";
import PlayerInfo from "./PlayerInfo";
import DeckArea from "./DeckArea";
import OpponentArea from "./OpponentArea";
import PlayerArea from "./PlayerArea";

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

  // const playersByPosition = useMemo(() => {
  //   return players.reduce((acc, player) => {
  //     acc[player.position] = player;
  //     return acc;
  //   }, {});
  // }, [players]);

  const playerOne = players[0];
  const playerTwo = players[1];
  const playerThree = players[2];
  const playerFour = players[3];

  //console.log('players', players)

  return (
    <div className="relative borde border-yellow-500 h-[100px gap-4 bg-center w-full">


      <div className="min-h-screen h-full relativ  gap-4 bg-center w-full flex flex-col justify-between pb-24">



        <PlayerInfo
          name={playerTwo?.user.username || "Waiting..."}
          player_position={playerTwo?.position || 0}
          current_player_position={game?.current_player_position || 0}
          avatar={
            playerTwo?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={playerTwo?.score || 0}
          styles="left-1/2 -translate-x-1/2 top-1"
        />

        {playerThree && (
          <PlayerInfo
            player_position={playerThree?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={playerThree?.user.username || "Opponent 2"}
            avatar={
              playerThree?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={playerThree?.score}
            styles="top-1/2 -translate-y-1/2 left-1"
          />
        )}
        {playerFour && (
          <PlayerInfo
            player_position={playerFour?.position || 0}
            current_player_position={game?.current_player_position || 0}
            name={playerFour?.user.username || "Opponent 3"}
            avatar={
              playerFour?.user.image_url ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            points={playerFour?.score}
            styles="top-1/2 -translate-y-1/2 right-1"
          />
        )}

        <OpponentArea
          id="opponentArea1"
          ref={playerTwoHandRef}
          className="borde absolute left-1/2 -translate-x-1/2 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea2"
          ref={playerThreeHandRef}
          className="borde border-red-500 rotate-90 absolute -left-0 sm:left-0 top-1/3 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <OpponentArea
          id="opponentArea3"
          ref={playerFourHandRef}
          className="borde border-green-500 absolute rotate-90 top-1/3 -right-0 sm:right-0 mt-[100px] container opponent-area borde flex gap- mx-auto w-full mtx-20"
        />

        <div className="borde z-[100000] w-ful absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <div
            className="flex-col items-center h-[90px w-full opponent-one-play-area  flex borde border-red-500 relative"
            id="player-2"
            ref={playerTwoPlayAreaRef}
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
              ref={playerThreePlayAreaRef}
            >
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="card-slot-2"
                  data-position={5 - index - 1}
                ></div>
              ))}
            </div>

            <DeckArea ref={deckRef} gameCards={gameCards} game={game} me={null} />

            <div
              className="opponent-three-play-area flex borde border-black w-ful"
              ref={playerFourPlayAreaRef}
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
            ref={playerOnePlayAreaRef}
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

        

        <PlayerArea
          id="playerArea"
          ref={playerOneHandRef}
          className="container borde border-yellow-500 absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
        />



        <PlayerInfo
          player_position={playerOne?.position || 0}
          current_player_position={game?.current_player_position || 0}
          name={playerOne?.user.username || "Player"}
          avatar={
            playerOne?.user.image_url ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          points={playerOne?.score || 0}
          styles="left-1/2 -translate-x-1/2 bottom-1"
        />

        {/* <div className="">
          <AudioRecorder onAudioReady={handleAudio} />
        </div> */}

 
      </div>

      {/* Bottom Bar */}


    
    </div>
  );


  // return (
  //   <div className="relative min-h-screen gap-4 w-full h-full border flex flex-col justify-between pb-24">
  //     {/* Player Positions */}
  //     {playerTwo && (
  //       <PlayerInfo
  //         name={playerTwo?.user.username || "Player 1"}
  //         player_position={playerTwo?.position || 0}
  //         current_player_position={game?.current_player_position || 0}
  //         avatar={
  //           playerTwo?.user.image_url ||
  //           "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
  //         }
  //         points={playerTwo?.score || 0}
  //         styles="left-1/2 -translate-x-1/2 top-1"
  //       />
  //     )}

  //     {playerThree && (
  //       <PlayerInfo
  //         player_position={playerThree?.position || 0}
  //         current_player_position={game?.current_player_position || 0}
  //         name={playerThree?.user.username || "Player 2"}
  //         avatar={
  //           playerThree?.user.image_url ||
  //           "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
  //         }
  //         points={playerThree?.score || 0}
  //         styles="top-1/2 -translate-y-1/2 left-1"
  //       />
  //     )}

  //     {playerFour && (
  //       <PlayerInfo
  //         player_position={playerFour?.position || 0}
  //         current_player_position={game?.current_player_position || 0}
  //         name={playerFour?.user.username || "Player 3"}
  //         avatar={
  //           playerFour?.user.image_url ||
  //           "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
  //         }
  //         points={playerFour?.score || 0}
  //         styles="top-1/2 -translate-y-1/2 right-1"
  //       />
  //     )}

  //     {/* Opponent Areas */}
  //     <OpponentArea
  //       id="opponentArea1"
  //       ref={playerTwoHandRef}
  //       className="absolute left-1/2 -translate-x-1/2 mt-[100px] container opponent-area flex gap-2 mx-auto w-full"
  //     />

  //     <OpponentArea
  //       id="opponentArea2"
  //       ref={playerThreeHandRef}
  //       className="absolute rotate-90 -left-0 sm:left-0 top-1/3 mt-[100px] container opponent-area flex gap-2 mx-auto w-full"
  //     />

  //     <OpponentArea
  //       id="opponentArea3"
  //       ref={playerFourHandRef}
  //       className="absolute rotate-90 top-1/3 -right-0 sm:right-0 mt-[100px] container opponent-area flex gap-2 mx-auto w-full"
  //     />

  //     {/* Play Areas */}
  //     <div className="absolute border z-[100000] w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
  //       {/* Opponent 1 Play Area */}
  //       <div
  //         className="flex-col items-center h-[90px w-full opponent-one-play-area flex relative"
  //         id="player-2"
  //         ref={playerTwoPlayAreaRef}
  //       >
  //         {[...Array(5)].map((_, index) => (
  //           <div
  //             key={index}
  //             className="card-slot"
  //             data-position={5 - index - 1}
  //           ></div>
  //         ))}
  //       </div>

  //       <div className="flex  gap-10">
  //         {/* Opponent 2 Play Area */}
  //         <div
  //           className="opponent-two-play-area flex"
  //           ref={playerThreePlayAreaRef}
  //         >
  //           {[...Array(5)].map((_, index) => (
  //             <div
  //               key={index}
  //               className="card-slot-2"
  //               data-position={5 - index - 1}
  //             ></div>
  //           ))}
  //         </div>

  //         {/* Deck */}
  //         <DeckArea ref={deckRef} gameCards={gameCards} game={game} me={null} />

  //         {/* Opponent 3 Play Area */}
  //         <div
  //           className="opponent-three-play-area flex border-black w-full"
  //           ref={playerFourPlayAreaRef}
  //         >
  //           {[...Array(5)].map((_, index) => (
  //             <div
  //               key={index}
  //               className="card-slot-2"
  //               data-position={index}
  //             ></div>
  //           ))}
  //         </div>
  //       </div>

  //       {/* Player Play Area */}
  //     <div
  //         className="flex w-full player-play-area items-center flex-col relative"
  //         id="player-1"
  //         ref={playerOnePlayAreaRef}
  //       >
  //         {[...Array(5)].map((_, index) => (
  //           <div key={index} className="card-slot" data-position={index}></div>
  //         ))}
  //       </div>
  //     </div>

  //     {/* Player Hand */}
  //     {/* <div
  //       ref={playerOneHandRef}
  //       className="container absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap-2 mx-auto w-full"
  //     ></div> */}
  //      <PlayerArea
  //               id="playerArea"
  //               ref={playerOneHandRef}
  //               className="container borde border-yellow-500 absolute bottom-0 sm:bottom-10 left-1/2 -translate-x-1/2 mb-20 player-area flex gap- mx-auto w-full"
  //             />

  //     {/* Current Turn Indicator */}
  //     {/* {game && (
  //       <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
  //         <p className="text-sm font-semibold">
  //           Current Turn: Position {game.current_player_position}
  //         </p>
  //       </div>
  //     )} */}

  //     {/* PlayerInfo */}
  //     <PlayerInfo
  //         player_position={playerOne?.position || 0}
  //         current_player_position={game?.current_player_position || 0}
  //         name={playerOne?.user.username || "Player"}
  //         avatar={
  //           playerOne?.user.image_url ||
  //           "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
  //         }
  //         points={playerOne?.score || 0}
  //         styles="left-1/2 -translate-x-1/2 bottom-1"
  //       />
  //   </div>
  // );
};

export default GameBoard;
