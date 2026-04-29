// @ts-nocheck

import { Tournament, TournamentLobbyData } from "../types";
import TournamentHeaderSkeleton from "./TournamentHeaderSkeleton";
import { Share2 } from "lucide-react";

interface TournamentHeaderProps {
  tournament: Tournament | undefined;
  userRegistered: boolean;
  registrationTimeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  buttonConfig: {
    label: string;
    color: string;
    disabled: boolean;
  };
  handleRegistration: () => void;
  handleShare: () => void;
}

const TournamentInfo: React.FC<TournamentHeaderProps> = ({
  tournament,
  userRegistered,
  registrationTimeLeft,
  buttonConfig,
  handleRegistration,
  handleShare,
}) => {
  if (!tournament) {
    return <TournamentHeaderSkeleton />;
  }

  return (
    <div className="px-4 md:px-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
        {tournament?.name}
      </h1>
      <div className="flex flex-col mdflex-row mditems-center mdjustify-between gap-4 mt-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <p className="text-gray-400 text-sm">
              Starts:{" "}
              {tournament && (
                <>
                  {new Date(tournament?.start_date).toLocaleDateString()} at{" "}
                  {new Date(tournament?.start_date).toLocaleTimeString()}
                </>
              )}
            </p>
            <button
              onClick={handleShare}
              className="p-3 rounded-full flex items-center justify-center bg-blue-500/20 hover:bg-blue-500/30 b-gray-700/60  transition-colors"
              title="Share tournament"
            >
              <Share2 size={16} className="text-gray-300" />
            </button>
          </div>
          {tournament?.status === "upcoming" && !userRegistered && !(registrationTimeLeft.days ===0 && registrationTimeLeft.hours ===0 && registrationTimeLeft.minutes ===0 && registrationTimeLeft.seconds ===0) && (
            <div className="flex gap-4 text-sm items-center">
              <p className="text-gray-400">Registration closes in:</p>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">
                  {registrationTimeLeft.days}
                </div>
                <div className="text-gray-400 text-xs">days</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">
                  {registrationTimeLeft.hours}
                </div>
                <div className="text-gray-400 text-xs">hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">
                  {registrationTimeLeft.minutes}
                </div>
                <div className="text-gray-400 text-xs">mins</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">
                  {registrationTimeLeft.seconds}
                </div>
                <div className="text-gray-400 text-xs">secs</div>
              </div>
            </div>
          )}
        </div>
        <p className="text-sm text-gray-200">{tournament?.description}</p>

        {tournament?.status === "upcoming" && (
          <button
            onClick={handleRegistration}
            disabled={buttonConfig.disabled}
            className={`py-2.5 md:py-3 px-3 md:px-4 md:w-[200px] bg-gradient-to-r ${buttonConfig.color} 
      text-white font-bold text-xs sm:text-sm md:text-base rounded-lg transform transition 
      hover:scale-[1.02] active:scale-[0.98] shadow-lg
      disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:scale-100`}
          >
            {buttonConfig.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default TournamentInfo;
