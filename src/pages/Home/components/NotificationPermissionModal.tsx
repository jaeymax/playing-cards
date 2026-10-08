import React, { useState } from "react";
import { Bell, Trophy, Swords, X, Zap } from "lucide-react";
import { enableNotifications } from "@/utils/notifications";

interface NotificationPermissionModalProps {
  open: boolean;
  onClose: () => void;
}

const NotificationPermissionModal: React.FC<
  NotificationPermissionModalProps
> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleEnableNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = await enableNotifications();
      console.log("Notification token:", token);

      if (token) {
        onClose();
      } else {
        setError(
          "Notifications could not be enabled on this device."
        );
      }
    } catch (error) {
      console.error("Failed to enable notifications:", error);

      setError(
        "We couldn't enable notifications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border border-white/[0.08]
          bg-gray-900
          shadow-2xl
        "
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Close */}
        <button
          onClick={onClose}
          disabled={loading}
          className="
            absolute
            right-4
            top-4
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-white/[0.05]
            text-gray-400
            transition
            hover:bg-white/[0.1]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="relative px-6 pb-7 pt-8 sm:px-8">
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 ring-1 ring-indigo-400/20">
            <Bell
              size={30}
              className="text-indigo-400"
            />
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Stay in the game
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-400">
              Turn on notifications for this device so you never
              miss an important SparPlay update.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10">
                <Trophy
                  size={19}
                  className="text-amber-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Tournament reminders
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Know when tournaments are about to begin.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-400/10">
                <Swords
                  size={19}
                  className="text-purple-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Game & challenge alerts
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Get notified when someone challenges you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.05] bg-white/[0.025] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
                <Zap
                  size={19}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-100">
                  Important updates
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Stay updated even when SparPlay isn't open.
                </p>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-7 space-y-3">
            <button
              onClick={handleEnableNotifications}
              disabled={loading}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-indigo-500
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-indigo-500/10
                transition
                hover:bg-indigo-400
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Bell size={17} />

              {loading
                ? "Enabling notifications..."
                : "Allow Notifications"}
            </button>

            <button
              onClick={onClose}
              disabled={loading}
              className="
                w-full
                rounded-2xl
                px-5
                py-3
                text-sm
                font-medium
                text-gray-500
                transition
                hover:bg-white/[0.04]
                hover:text-gray-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Maybe later
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] leading-5 text-gray-600">
            Notifications are enabled only for this device.
            You can change your browser notification settings at
            any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPermissionModal;