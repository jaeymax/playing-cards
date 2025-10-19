import {useState} from "react";
import { Trophy, Clock, Award, Loader2 } from "lucide-react";
import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";

interface TournamentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  countdown: string;
}

const TournamentRegistrationModal: React.FC<TournamentRegistrationModalProps> = ({
  isOpen,
  onClose,
  countdown,
}) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleJoinTournament = async () => {

    try{
      setIsLoading(true);
      setErrorMsg("");
      
      const response = await fetch(`${baseUrl}/tournament/:id/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        
      });
  
      const data = await response.json();
      console.log('join tournament response', data);
      setSuccess(true);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join tournament');
      } 
  
      setTimeout(() => {
        setIsLoading(false);
        onClose();
      }, 1500);
  

    }catch(err:any){
      setErrorMsg('An error occurred');
      setIsLoading(false);
    }
  }


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-s  flex items-center justify-center z-50 px-3">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative borde border-gray-700/50">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition text-xl"
        >
          ✕
        </button>

        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              🏆 Weekend Tournament
            </h2>
            <div className="h-1 w-20 sm:w-24 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
          </div>

          {/* Info sections */}
          <div className="grid gap-4 sm:gap-5">
            {/* Prize Pool */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 rounded-xl p-4 sm:p-5 border border-yellow-600/30 hover:border-yellow-400/50 transition">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Trophy className="text-yellow-400" size={20} />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Prize Pool
                </h3>
              </div>
              <p className="text-lg sm:text-xl font-bold text-yellow-300">
                💎 1,000 Gems
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Distributed among the top 3 players.
              </p>
            </div>

            {/* Registration closes */}
            <div className="bg-gradient-to-r from-green-700/20 to-green-500/10 rounded-xl p-4 sm:p-5 border border-green-600/30 hover:border-green-400/50 transition">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Clock className="text-green-400" size={20} />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Registration Closes In
                </h3>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-green-400 tracking-wide">
                {countdown}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                Don’t miss your chance to compete!
              </p>
            </div>

            {/* Qualification */}
            <div className="bg-gradient-to-r from-blue-700/20 to-purple-600/10 rounded-xl p-4 sm:p-5 border border-blue-700/30 hover:border-purple-400/50 transition">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <Award className="text-purple-400" size={20} />
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Qualification
                </h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Top{" "}
                <span className="font-semibold text-white">3 players</span>{" "}
                advance to the{" "}
                <span className="text-purple-300 font-semibold">
                  Championship
                </span>{" "}
                round.
              </p>
            </div>
          </div>

           {/* Feedback Messages */}
           {errorMsg && (
            <p className="text-red-400 text-center text-sm">{errorMsg}</p>
          )}
          {success && (
            <p className="text-green-400 text-center text-sm font-semibold">
              ✅ Successfully joined tournament!
            </p>
          )}

          {/* Join Button */}
          <button
            onClick={handleJoinTournament}
            disabled={isLoading || success}
            className={`w-full py-2.5 sm:py-3 flex items-center justify-center gap-2 
              ${
                isLoading
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
              } 
              text-white font-bold rounded-lg transform transition hover:scale-105 shadow-lg text-sm sm:text-base`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Joining...
              </>
            ) : success ? (
              "Joined!"
            ) : (
              "Join Tournament"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TournamentRegistrationModal;
