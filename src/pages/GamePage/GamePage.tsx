// import React, { useState } from "react";
// import GameBoard from "./components/GameBoard";
// import ChatBox from "./components/ChatBox";
// import GameTimer from "./components/GameTimer";

// interface GamePageProps {
//   gameId: string;
//   opponent: string;
// }

// const GamePage: React.FC<GamePageProps> = ({ gameId, opponent }) => {
//   const [isYourTurn, setIsYourTurn] = useState<boolean>(false);

//   const handleSurrender = () => {
//     if (window.confirm("Are you sure you want to surrender?")) {
//       // Handle surrender logic
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 p-4">
//       <div className="flex justify-between items-center mb-4">
//         <GameTimer isYourTurn={isYourTurn} />
//         <button
//           className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
//           onClick={handleSurrender}
//         >
//           Surrender
//         </button>
//       </div>

//       <div className="flex flex-1 gap-4">
//         <GameBoard gameId={gameId} className="flex-[3]" />
//         <ChatBox gameId={gameId} opponent={opponent} className="flex-1" />
//       </div>
//     </div>
//   );
// };

// export default GamePage;
