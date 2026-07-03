interface InstallPromptProps {
  showInstallModal: boolean;
  setShowInstallModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const InstallPrompt = ({ showInstallModal, setShowInstallModal }: InstallPromptProps) => {
    if (!showInstallModal) return null; 
  return (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 px-4">
    <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4">

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold text-sm">
          Install SparPlay
        </h2>

        <button
          onClick={() => setShowInstallModal(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="mb- borde" >
        <p className="text-gray-300 text-sm mb-2">
          🔥 Never miss your Spar matches
        </p>
        <p className="text-gray-300 text-sm">
          Get real-time updates and notifications for all your favorite tournaments.
        </p>
        <p className="text-gray-300 text-sm" >
          ✓ tournament reminders
        </p>
        <p className="text-gray-300 text-sm">
          ✓ match notifications
        </p>
        <p className="text-gray-300 text-sm">
          ✓ opponent ready notifications
        </p>
        
          <p className="text-gray-300 text-sm mt-2 mb-2">
          To install SparPlay, follow the instructions for your device below:
        </p>
        
      </div>

      <div className="space-y-3 text-sm text-gray-300">

        {/* Android */}
        <div>
          <p className="text-white font-medium mb-1">Android (Chrome)</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Open the menu (⋮) in the top right</li>
            <li>Select “Add to Home screen”</li>
            <li>Confirm installation</li>
          </ol>
        </div>

        {/* iOS */}
        <div>
          <p className="text-white font-medium mb-1">iPhone (Safari)</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Tap the Share button (⬆️)</li>
            <li>Scroll and select “Add to Home Screen”</li>
            <li>Tap “Add” to confirm</li>
          </ol>
        </div>

      </div>

      <button
        onClick={() => setShowInstallModal(false)}
        className="mt-4 w-full bg-blue-500 hover:bg-blue-400 text-white text-sm py-2 rounded-md transition"
      >
        Got it
      </button>
    </div>
  </div>
  )
}

export default InstallPrompt
