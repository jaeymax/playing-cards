import { useAppContext } from "@/contexts/AppContext";
import React, { useEffect, useState } from "react";

interface Match {
  id: number;
  player1: {
    id: number;
    name: string;
    image_url: string;
    winner: boolean;
  };
  player2: {
    id: number;
    name: string;
    image_url: string;
    winner: boolean;
  };
  status: string;
  winner_id: number | null;
}

interface Player{
    id: number;
    name: string;
    image_url: string;
    winner: boolean;
}

interface MatchModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ match, isOpen, onClose }) => {
  if (!isOpen || !match) return null;

 
  const [me, setMe] = useState<Player| null>(null)
  const [opponent, setOpponent] = useState<Player|null>(null)

  const {user} = useAppContext();



  useEffect(()=>{
    if(!user)return;

    if(match.player1.id == user.id){
        setMe(match.player1);
        setOpponent(match.player2);
    }else if(match.player2.id == user.id){
        setMe(match.player2);
        setOpponent(match.player1);
    }

  },[match, user])

  const formatMatchStatus = (status:string)=>{
      let matchStatus = ""
      switch(status){
           case "in_progress":
            matchStatus = "Ongoing"
            break;
           case "pending":
            matchStatus = "Pending"
            break;
           case "completed":
            matchStatus = "Completed"
            break;
           case "forfeited":
            matchStatus = "Forfeited"
            break;
      }

      return matchStatus;
  }


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-lg w-full borde border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blu-600 to-indig-600 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl md:text-2xl text-center w-full font-bold text-white">
            Match Details
          </h2>
          {/* <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition"
          >
            ✕
          </button> */}
        </div>

        {/* Match Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-row items-center justify-between gap-6 h-[200px]">
            {/* Player 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div
                className={`relative mb-4 flex items-center border-yellow-300 justify-center w-20 h-20 md:w-24 md:h-24 ${
                  me?.winner ? "ring-4 ring-yellow-400 rounded-full" : ""
                }`}
              >
                {
                    me?.image_url?( <img
                        src={me?.image_url}
                        alt={me?.name}
                        className="w-full h-full rounded-full object-cover border-4 border-gray-700"
                      />):( <span className="text-6xl">👤</span>)
                }
               
                {me?.winner && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full p-2">
                    👑
                  </div>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                You
              </h3>
              {/* {me?.winner && (
                <span className="text-sm font-medium text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">
                  Winner
                </span>
              )} */}
            </div>

            {/* VS */}
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold text-gray-400 mb-2">
                VS
              </div>
              <div className="text-xs md:text-sm text-gray-500 font-medium">
                {formatMatchStatus(match.status)}
              </div>
            </div>

            {/* Player 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div
                className={`flex items-center justify-center  relative mb-4 w-20 h-20 md:w-24 md:h-24 ${
                  opponent?.winner ? "ring-4 ring-yellow-400 rounded-full" : ""
                }`}
              >
                {opponent?.image_url? (
                    <img
                      src={opponent?.image_url}
                      alt={opponent?.name}
                      className="rounded-full w-full h-full object-cover border-4 border-gray-700"
                    />
                ):(
                    <span className="text-6xl">👤</span>
                )}
                {(opponent?.winner) && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full p-2">
                    👑
                  </div>
                )}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                {opponent?.name || ""}
              </h3>
              {/* {opponent?.winner && (
                <span className="text-sm font-medium text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded">
                  Winner
                </span>
              )} */}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-750 px-6 py-4 flex justify-end rounded-b-lg border- border-gray-700">
          {/* <button
            onClick={onClose}
            className="px-4 py-2 mx-auto bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition"
          >
            Close
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default MatchModal;
