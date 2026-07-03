import InstallPrompt from "@/pages/Tournaments/components/InstallPrompt";
import { isIOS, isPWA } from "@/utils/Functions";
import React, { useEffect, useState } from "react";



const isInStandaloneMode = () =>
  (window.matchMedia &&
    window.matchMedia("(display-mode: standalone)").matches) ||
  (window.navigator as any).standalone;

//const STORAGE_KEY = "installBannerDismissed";

const InstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [visible, setVisible] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);



  useEffect(() => {
    //if (localStorage.getItem(STORAGE_KEY) === "true") return;

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
       // localStorage.setItem(STORAGE_KEY, "true");
      }
      setDeferredPrompt(null);
    } else {
      // show instructions overlay or temporarily keep visible
      // we'll mark dismissed so it doesn't keep showing repeatedly
      //localStorage.setItem(STORAGE_KEY, "true");
      setShowInstallModal(true);
      setVisible(false);
    }
  };

  const onDismiss = () => {
   // localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  console.log('inside install banner, visible:', visible)
  if (isPWA()) return null;

 return (
  <>
  <div className="w-full flex justify-center px-3 py-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:from-blue-600 hover:to-cyan-500">
    <div className="max-w-5xl w-full flex items-center justify-between gap-3">

      {/* Text */}
      <div className="flex items-center gap-3 min-w-0">
         <div>
        <div className="font-semibold text-white text-sm whitespace-nowrap">
          Install SparPlay
        </div>
          <p className="text-xs text-gray-300 truncat hidde sm:block">
             Add the app to your device for faster access, tournament updates and notifications
          </p>
         </div>

        {/* <div className="text-xs text-gray-300 truncat hidde sm:block">
          Add the app to your device for faster access, tournament updates and notifications.
        </div> */}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 shrink-0">

        {!deferredPrompt && isIOS() ? (
          <button
            onClick={onInstallClick}
            className="bg-sky-400 text-gray-900
hover:bg-sky-300 px-2.5 py-1 text-xs rounded-md font-medium shadow-sm transition"
          >
            Install
          </button>
        ) : (
          <button
            onClick={onInstallClick}
            className="bg-sky-400 text-gray-900
hover:bg-sky-300 px-2.5 py-1 text-xs rounded-md font-medium shadow-sm transition"
          >
            Install
          </button>
        )}

        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-gray-300 hover:text-white p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
  
  <InstallPrompt showInstallModal={showInstallModal} setShowInstallModal={setShowInstallModal} />
 
  </>
);
};

export default InstallBanner;
