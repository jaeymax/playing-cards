import React, { useState } from "react";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if(!/\S+@\S+\.\S+/.test(email)){
      setErrorMessage("Please enter a valid email address.");
      setIsLoading(false);
      return;
    } else {
      setStatus("idle");
    }

    try {
      const response = await fetch("https://playing-cards-api.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 200) {
        setStatus("success");
      } else if (response.status === 400) {
        setErrorMessage(data.message);
      } else if (response.status === 404) {
        setErrorMessage(
          "This email address is not registered. Please use a different email."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    // Simulate API call
   /* setTimeout(() => {
      setIsLoading(false);
      if (email.includes("error")) {
        // This is just for demonstration
        setErrorMessage("This email address is not registered.");
      } else {
        setStatus("success");
      }
    }, 1500); */
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-blue-500 border-b border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-white">NEXUS CARDS</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700 transform transition hover:scale-[1.01]">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-gray-700">
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white text-center">
                Reset Password
              </h2>
              <p className="text-center text-gray-400 mt-2">
                Enter your email and we'll send you instructions to reset your
                password
              </p>
            </div>

            {/* Form */}
            {status === "success" ? (
              <div className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-2">
                  Check your email
                </h3>
                <p className="text-gray-400 mb-6">
                  We've sent password reset instructions to your email address.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Try another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={`bg-gray-700 block w-full pl-10 pr-3 py-2 border ${
                        errorMessage ? "border-red-500" : "border-gray-600"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="wizard@nexuscards.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {errorMessage && (
                    <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : null}
                  Send Reset Instructions
                </button>

                <div className="text-center">
                  <a
                    href="/signin"
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Back to Sign In
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Nexus Cards. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPasswordPage;
