import { baseUrl } from "@/config/api";
import GoogleSignupCustom from "@/pages/Home/components/GoogleSignupCustom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";

interface EmailStepProps {
  onSubmit: (email: string) => void;
}

const EmailStep: React.FC<EmailStepProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError(""); // Clear any previous errors

    try {
      const response = await fetch(`${baseUrl}/auth/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        // Successful login
        const data = await response.json();
        console.log(data);

        onSubmit(email);
        // Here you might want to store the token in localStorage or context
      } else if (response.status === 400) {
        alert("email required");
      } else if (response.status === 409) {
        setEmailError(
          "This email is already registered. Please use a different email."
        );
      } else {
        alert("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="text-center text-gray-400 mt-2">
          Enter your email to get started
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Google Sign In Button */}
         <GoogleSignupCustom/>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                type="email"
                required
                className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="wizard@nexuscards.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && (
              <p className="mt-2 text-sm text-red-500">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {isLoading ? (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : null}
            Continue
          </button>

          <div className="text-center">
            <a
              href="/signin"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default EmailStep;
