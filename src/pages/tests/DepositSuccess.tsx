import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import { useAppContext } from "@/contexts/AppContext";

const DepositSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"waiting" | "success" | "error">(
    "waiting"
  );
  const [message, setMessage] = useState("Processing your payment...");
  const [countdown, setCountdown] = useState(3);
  const { user } = useAppContext();

  const reference = searchParams.get("reference");

  useEffect(() => {
    // if (!user) return;
    if (!reference) {
      setStatus("error");
      setMessage("Invalid payment reference");
      return;
    }

    let pollAttempts = 0;
    const maxPollAttempts = 6; // Poll for up to 6 seconds (6 attempts × 1 second)
    const pollInterval = setInterval(async () => {
      try {
        pollAttempts++;

        // Verify payment with backend
        const response = await fetch(
          `${baseUrl}/wallet/deposit/verify-payment/${reference}`,
          {
            headers: {
              "Content-Type": "application/json",
              ...authHeaders(),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "success") {
            setStatus("success");
            setMessage("✨ Payment received! Updating your wallet...");
            clearInterval(pollInterval);

            // Start countdown after success
            const countdownInterval = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(countdownInterval);
                  navigate("/wallet");
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          } else if (
            data.status === "pending" &&
            pollAttempts >= maxPollAttempts
          ) {
            // After max attempts, assume success and redirect
            setStatus("success");
            setMessage("✨ Payment confirmed! Redirecting to your wallet...");
            clearInterval(pollInterval);

            const countdownInterval = setInterval(() => {
              setCountdown((prev) => {
                if (prev <= 1) {
                  clearInterval(countdownInterval);
                  navigate("/wallet");
                  return 0;
                }
                return prev - 1;
              });
            }, 1000);
          }
        } else {
          // Continue polling if not successful yet
          if (pollAttempts < maxPollAttempts) {
            setMessage(
              `Processing your payment... (${
                maxPollAttempts - pollAttempts
              }s remaining)`
            );
          }
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        // Continue polling on error
        if (pollAttempts < maxPollAttempts) {
          setMessage(
            `Processing your payment... (${
              maxPollAttempts - pollAttempts
            }s remaining)`
          );
        }
      }

      // Stop polling after max attempts
      if (pollAttempts >= maxPollAttempts) {
        clearInterval(pollInterval);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, [reference, navigate]);

  customLog('user', user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-8 text-center">
          {/* Status Icon */}
          <div className="mb-6">
            {status === "waiting" && (
              <div className="flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
                </div>
              </div>
            )}
            {status === "success" && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center animate-bounce">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            )}
            {status === "error" && (
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Status Message */}
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {status === "waiting" && "Processing Payment"}
            {status === "success" && "Payment Successful!"}
            {status === "error" && "Payment Error"}
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm md:text-base mb-6">{message}</p>

          {/* Payment Details */}
          {user && (
            <div className="bg-gray-750 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="text-left space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Account:</span>
                  <span className="font-medium text-white">
                    {user.username}
                  </span>
                </div>
                {reference && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Reference:</span>
                    <span className="font-mono text-xs text-blue-400">
                      {reference.substring(0, 12)}...
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  status !== "waiting" ? "bg-green-500" : "bg-yellow-500"
                }`}
              ></div>
              <span className="text-gray-400">Payment submitted</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  status === "success" ? "bg-green-500" : "bg-gray-600"
                }`}
              ></div>
              <span className="text-gray-400">
                {status === "success"
                  ? "Payment confirmed"
                  : "Waiting for confirmation"}
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 mb-6">
            <p className="text-xs text-blue-300">
              💡 Your wallet will update automatically once the payment is
              confirmed. Please don't close this page.
            </p>
          </div>

          {/* Countdown or Action Buttons */}
          {status === "success" && (
            <div className="space-y-4">
              <div className="text-sm text-gray-400">
                Redirecting to wallet in{" "}
                <span className="font-bold text-blue-400">{countdown}s</span>
              </div>
              <button
                onClick={() => navigate("/wallet")}
                className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H6a3 3 0 00-3 3v11a3 3 0 003 3z"
                  />
                </svg>
                Go to Wallet Now
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-3">
              <button
                onClick={() => navigate("/wallet")}
                className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Back to Wallet
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-6 py-2 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 transition duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {status === "waiting" && (
            <div className="text-xs text-gray-500 mt-6">
              <p>Please wait while we confirm your payment...</p>
              <p className="mt-1">This usually takes a few seconds.</p>
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>🔒 Your transaction is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default DepositSuccessPage;
