import { useState } from "react";
import { Trophy, Clock, Award, Loader2 } from "lucide-react";
import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";

interface TournamentRegistrationModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  countdown: string;
  registrationFee: number;
  getTournamentDetails: () => Promise<void>;
}

const TournamentRegistrationModal: React.FC<
  TournamentRegistrationModalProps
> = ({ isOpen, onClose, countdown, id, registrationFee, getTournamentDetails }) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleJoinTournament = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const response = await fetch(`${baseUrl}/tournaments/join/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });

      const data = await response.json();
      console.log("join tournament response", data);
      setSuccess(true);

      if (!response.ok) {
        throw new Error(data.message || "Failed to join tournament");
      }
      else{
        // Successfully joined the tournament
        // You can handle any additional logic here if needed
        await getTournamentDetails();
        setIsLoading(false);
        onClose();
      }

    } catch (err: any) {
      setErrorMsg("An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md animate-fadeIn flex items-center justify-center z-50 px-3">
      <div className="bg-gray-800/95 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md relative border border-gray-700/50 animate-slideUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 hover:rotate-90 transform p-1"
        >
          ✕
        </button>

        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold texttransparent bg-clip-text bg-gradient-to-r from-blue400 via-purple400 topink-400">
              🏆 Weekend Tournament
            </h2>
            <div className="h-1 w-20 sm:w-24 mx-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-1000"
              style={{ width: `${(parseInt(countdown) / 60) * 100}%` }}
            ></div>
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
                Top <span className="font-semibold text-white">3 players</span>{" "}
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
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
              <p className="text-red-400 text-sm">{errorMsg}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center animate-pulse">
              <p className="text-green-400 text-sm font-semibold">
                ✅ Successfully joined tournament!
              </p>
            </div>
          )}

          {/* Join Button */}
          <button
            onClick={handleJoinTournament}
            disabled={isLoading || success}
            className={`w-full py-3 sm:py-4 flex items-center justify-center gap-2 
              ${
                isLoading || success
                  ? "bg-gray-700 cursor-not-allowed opacity-75"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 active:scale-95"
              } 
              text-white font-bold rounded-lg transform transition-all duration-200 shadow-lg hover:shadow-purple-500/25 text-sm sm:text-base`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Joining...</span>
              </>
            ) : success ? (
              <span className="flex items-center gap-2">
                <span className="text-lg">🎉</span> Joined!
              </span>
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
