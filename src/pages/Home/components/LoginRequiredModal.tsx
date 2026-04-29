import { useAppContext } from "@/contexts/AppContext";
import React from "react";
import { useNavigate } from "react-router-dom";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const {user} = useAppContext();

  const isGuest = user?.is_guest? true : false;
  console.log("isGuest", isGuest);

  if (!isOpen) return null;

  const handleLoginClick = () => {
    onClose();
    navigate("/signin",  { state: { from: window.location.pathname } });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-11 max-w-md w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Login Required</h2>
        {
          isGuest ? (
            <p className="text-gray-300 mb-6">
              You are currently logged in with a guest account. To register for
              tournaments, please log in with a real account.
            </p>
          ) : (
            <p className="text-gray-300 mb-6">
              You are currently not logged in. You need to log in to register for tournaments.
            </p>
          )
        }
        {/* <p className="text-gray-300 mb-6">
          You need to log in with a real account to register for tournaments.
          Guest accounts cannot participate in tournaments.
        </p> */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLoginClick}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-lg transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
