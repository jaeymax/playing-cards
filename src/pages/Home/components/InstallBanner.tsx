import React, { useEffect, useState } from "react";

const isIOS = () => {
  const ua = window.navigator.userAgent || "";
  return /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
};

const isInStandaloneMode = () =>
  (window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  (window.navigator as any).standalone;

const STORAGE_KEY = "installBannerDismissed";

const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "true") return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    // if on iOS and not already installed, show custom hint
    if (isIOS() && !isInStandaloneMode()) {
      setVisible(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener,
      );
    };
  }, []);

  const onInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice && choice.outcome === "accepted") {
        setVisible(false);
        localStorage.setItem(STORAGE_KEY, "true");
      }
      setDeferredPrompt(null);
    } else if (isIOS()) {
      // show instructions overlay or temporarily keep visible
      // we'll mark dismissed so it doesn't keep showing repeatedly
      localStorage.setItem(STORAGE_KEY, "true");
      setVisible(false);
    }
  };

  const onDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  ///if (!visible) return null;
  console.log('inside install banner, visible:', visible)

  return (
    <div className="w-full flex justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      <div className="max-w-4xl w-full flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-left">
            <div className="font-semibold text-white">Install SparPlay</div>
            <div className="text-sm text-white/90">
              Add the app to your device for faster access and offline support.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!deferredPrompt && isIOS() ? (
            <button
              onClick={onInstallClick}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              Add to Home Screen
            </button>
          ) : (
            <button
              onClick={onInstallClick}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100 transition"
            >
              Install App
            </button>
          )}

          <button
            onClick={onDismiss}
            aria-label="Dismiss"
            className="text-white/90 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallBanner;
