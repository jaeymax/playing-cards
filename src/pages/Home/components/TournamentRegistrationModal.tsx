import { useState } from "react";
import { Trophy, Clock, Award, Loader2 } from "lucide-react";
import Modal from "../../../components/Modal";
import { baseUrl } from "@/config/api";
import { authHeaders } from "@/utils/Functions";

interface TournamentRegistrationModalProps {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  countdown: string;
  registrationFee: number;

  getTournamentDetails: () => Promise<void>;
  prizePool: number;
}

const TournamentRegistrationModal: React.FC<
  TournamentRegistrationModalProps
> = ({
  isOpen,
  onClose,
  countdown,
  id,
  registrationFee,
  getTournamentDetails,
  prizePool,
}) => {
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
      } else {
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
    <Modal isOpen={isOpen} onClose={onClose} title="🏆 Weekend Tournament">
      <div className="space-y-6 p-2">
        <div className="text-center text-gray-400 text-sm">
          Join the tournament to compete with other players
        </div>

        {/* Info sections */}
        <div className="space-y-3">
          {/* Prize Pool */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 rounded-lg p-4 border border-yellow-600/30">
            <div className="flex items-center gap-3">
              <Trophy className="text-yellow-400" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-300">
                  Prize Pool
                </h3>
                <p className="text-lg font-bold text-yellow-300">
                  {prizePool} GHC
                </p>
              </div>
            </div>
          </div>

          {/* Registration Fee */}
          <div className="bg-gradient-to-r from-orange-700/20 to-orange-500/10 rounded-lg p-4 border border-orange-600/30">
            <div className="flex items-center gap-3">
              <Trophy className="text-orange-400" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-300">
                  Registration Fee
                </h3>
                <p className="text-lg font-bold text-orange-300">
                  {registrationFee} GHC
                </p>
              </div>
            </div>
          </div>

          {/* Registration closes */}
          <div className="bg-gradient-to-r from-green-700/20 to-green-500/10 rounded-lg p-4 border border-green-600/30">
            <div className="flex items-center gap-3">
              <Clock className="text-green-400" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-300">Closes In</h3>
                <p className="text-lg font-bold text-green-400">{countdown}</p>
              </div>
            </div>
          </div>

          {/* Qualification */}
          <div className="bg-gradient-to-r from-blue-700/20 to-purple-600/10 rounded-lg p-4 border border-blue-700/30">
            <div className="flex items-center gap-3">
              <Award className="text-purple-400" size={20} />
              <div>
                <h3 className="text-sm font-medium text-gray-300">
                  Qualification
                </h3>
                <p className="text-sm text-gray-400">
                  Top{" "}
                  <span className="font-semibold text-white">3 players</span>{" "}
                  advance to Championship
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Messages */}
        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
            <p className="text-red-400 text-sm">{errorMsg}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
            <p className="text-green-400 text-sm font-semibold">
              ✅ Successfully joined tournament!
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleJoinTournament}
            disabled={isLoading || success}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
              ${
                isLoading || success
                  ? "bg-gray-700 cursor-not-allowed opacity-75"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Joining...</span>
              </>
            ) : success ? (
              <>
                <span>🎉</span>
                <span>Joined!</span>
              </>
            ) : (
              "Join Tournament"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TournamentRegistrationModal;
