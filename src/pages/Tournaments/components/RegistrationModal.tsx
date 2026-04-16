import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { authHeaders } from "@/utils/Functions";
import { baseUrl } from "@/config/api";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

interface RegistrationModalProps {
  tournamentId: number | undefined;
  setUserRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  entryFee: string | undefined;
  isOpen: boolean;
  onCancel: () => void;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({
  tournamentId,
  setUserRegistered,
  entryFee,
  isOpen,
  onCancel,
}) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const {user} = useAppContext();
  const navigate = useNavigate();

  const handleGoToWallet = () => {
    // Implement navigation to wallet page
    navigate("/wallet", { state: { from: "/tournaments" } }); // Using React Router navigation
  };

  const handleRegistrationConfirmation = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const response = await fetch(
        `${baseUrl}/tournaments/join/${tournamentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders(),
          },
        },
      );

      const data = await response.json();
      console.log("join tournament response", data);
      
      if (!response.ok) {
        if (response.status === 400) {
          // means the user doesn't have enough money in their account to join the tournament
          setErrorMsg("You don't have enough funds to join this tournament");

          return;
          //setErrorMsg(data.message || "Failed to join tournament");
        }
        setErrorMsg(data.message || "Failed to join tournament");
        return;
      }
      //await getTournamentDetails();
      setUserRegistered(true);
      setSuccess(true);
      setIsLoading(false);
      //onCancel();
    } catch (err: any) {
      setErrorMsg("An error occurred");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-sm w-full mx-4 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {success ? (
            <h2 className="text-2xl font-bold text-white">Registration Successful!</h2>
          ) : (
            <h2 className="text-2xl font-bold text-white">Register Tournament</h2>
          )}
          {/* <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button> */}
        </div>

        {/* Body */}
        {
          errorMsg && (
            <p className="text-red-500 mb-4">{errorMsg}</p>
          )
        }

        {
          success && (
            <p className="text-gray-300 mb-4"> You're all set for the tournament! Good luck and have fun! 💪🎯</p>
          )
        }


      {
        !success? user && entryFee && parseFloat(user.balance) < parseFloat(entryFee) ? (
          <p className="text-gray-300 mb-8">
            You don't have enough funds to join this tournament. Please add funds to your wallet to participate.
          </p>
        ): (
          <p className="text-gray-300 mb-8">
            Click to confirm your registration for this tournament. You'll be
          added to the participant list and can start competing!
          </p>
        ): null
      }

        {/* {!success && user && entryFee && user.balance >= parseFloat(entryFee) ?(
        <p className="text-gray-300 mb-8">
          Click to confirm your registration for this tournament. You'll be
          added to the participant list and can start competing!
        </p>

        ):(
          <p className="text-gray-300 mb-8">
          You don't have enough funds to join this tournament. Please add funds to your wallet to participate.
        </p>
        )
      
      } */}

        {/* Footer Actions */}
        <div className="flex gap-4">
          {success ? (
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Got it!
            </button>
          ):(
            <>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            {
              entryFee && user && parseFloat(user.balance) < parseFloat(entryFee)? (
                <button
                  onClick={handleGoToWallet}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-lg transition-colors"
                >
                  Add Funds
                </button>
              ):(
            <button
              onClick={handleRegistrationConfirmation}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Register"
              )}
            </button>
              )
  
            }
            
            </>
          )
          
          }
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
