import { useAppContext } from "@/contexts/AppContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "@/config/api";
import { GoogleOAuthProvider} from "@react-oauth/google";
import GoogleSigninCustom from "../Home/components/GoogleSigninCustom";
import NavBar from "@/components/NavBar";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  //const [error, setError] = useState("");
  const navigate = useNavigate();

  const { updateUser } = useAppContext();

  // const handleSuccess = async (credentialResponse: any) => {
  //   const idToken = credentialResponse.credential;

  //   // Send ID token to backend
  //   const res = await fetch("http://localhost:5000/api/auth/google/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ idToken }),
  //   });

  //   const data = await res.json();
  //   console.log("data", data);
  //   console.log("Our JWT:", data.token);

  //   // Store JWT for authenticated requests
  //   localStorage.setItem("token", data.token);
  // };

  // const handleError = () => {
  //   console.error("Google Login Failed");
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Successful login
        const data = await response.json();
        console.log(data);
        sessionStorage.setItem("accessToken", data.token);
        updateUser(data);
        // Here you might want to store the token in localStorage or context
        navigate("/");
      } else if (response.status === 400) {
        alert("Invalid input. Please check your email and password.");
      } else if (response.status === 401) {
        alert("Invalid credentials. Please try again.");
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
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      
      <NavBar/>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            {/* Card Container */}
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
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white text-center">
                  Sign In
                </h2>
                <p className="text-center text-gray-400 mt-2">
                  Enter your credentials to access the arena
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Email
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
                        className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Password
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
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-blue-600 focus:ring-blue-500"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-blue-400 hover:text-blue-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div>
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
                    SIGN IN
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">
                    New to SpaGameZone?{" "}
                    <button
                      type="button"
                      className="font-medium text-blue-400 hover:text-blue-300 focus:outline-none"
                      onClick={() => navigate("/signup")}
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </form>

              {/* Social Sign-in */}
              <div className="px-6 pb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-800 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  {/* <div className="mt-[0px]">
                  <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                  </div> */}
                  <GoogleSigninCustom />
                </div>
              </div>

              {/* Terms and Privacy Policy */}
              <div className="px-6 pb-6 text-center text-xs text-gray-400">
                By continuing, you agree to our{" "}
                <Link
                  to="/terms-of-service"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Additional Links */}
            <div className="mt-6 text-center space-y-2">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gray-300 block"
              >
                About SpaGameZone
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gray-300 block"
              >
                Contact Support
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-gray-400 text-sm">
              © {new Date().getFullYear()} SpaGameZone. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignInPage;
