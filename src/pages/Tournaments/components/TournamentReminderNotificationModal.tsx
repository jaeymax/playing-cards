import { useAppContext } from "@/contexts/AppContext";
import { enableNotifications } from "@/utils/notifications";
import { useState } from "react";

interface TournamentReminderNotificationModalProps {
   tournamentReminderModalOpen: boolean;
   setTournamentReminderModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


const TournamentReminderNotificationModal = ({ tournamentReminderModalOpen, setTournamentReminderModalOpen }: TournamentReminderNotificationModalProps) => {

    if (!tournamentReminderModalOpen) return null;

  const {user, updateUser} = useAppContext();
  const [loading, setLoading] = useState(false);

  const handleAllowNotifications = async () => {
    try {
      setLoading(true);
      const token = await enableNotifications();
      console.log("Notification token:", token);
      setTournamentReminderModalOpen(false);

      
      updateUser({ ...(user as any), notification_enabled: true });
      // You can send this token to your server to save it for sending notifications later
    } catch (error) {
      console.error("Error enabling notifications:", error);
    }finally {
      setLoading(false);
    }
  };

  if(!user)return;

  return (
      <div className="w-full flex justify-center px-3 py-3 bg-gray-800 border-b border-gray-700 shadow-sm">
      <div className="max-w-5xl w-full flex items-center justify-between gap-4">

        {/* Content */}
        <div className="flex items-center gap-3 min-w-0">

          {/* Icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-600/20 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
              />
            </svg>
          </div>


          <div className="min-w-0">
            <p className="text-white font-semibold text-sm">
              Tournament reminders
            </p>

            <p className="text-gray-300 text-xs truncat">
              Enable notifications so you never miss your matches, results, or
              tournament updates.
            </p>
          </div>

        </div>


        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">

          {loading? (
            <button
             disabled
            className="
              bg-indigo-600
              hover:bg-indigo-500
              text-white
              text-xs
              font-medium
              px-3
              py-1.5
              rounded-md
              transition
              cursor-not-allowed
              disabled:opacity-50
            "
          >
            Enabling...
          </button>
          ):(
           <button
            onClick={handleAllowNotifications}
            className="
              bg-indigo-600
              hover:bg-indigo-500
              text-white
              text-xs
              font-medium
              px-3
              py-1.5
              rounded-md
              transition
            "
          >
            Enable
          </button>
          )}
   

          {
            !loading && (
          <button
            onClick={() => setTournamentReminderModalOpen(false)}
            className="
              text-gray-400
              hover:text-white
              text-xs
              px-2
            "
          >
            Later
          </button>
            )
          }

        </div>

      </div>
    </div>
  )
}

export default TournamentReminderNotificationModal
