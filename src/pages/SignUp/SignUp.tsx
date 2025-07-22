import React, { useState } from "react";
import EmailStep from "./steps/EmailStep";
import VerificationStep from "./steps/VerificationStep";
import CredentialsStep from "./steps/CredentialsStep";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { baseUrl } from "@/config/api";

type SignUpStep = "email" | "verification" | "credentials";

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<SignUpStep>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
 
  verificationCode
  const {updateUser} = useAppContext();

  const navigate = useNavigate();

  const steps = [
    { key: "email", label: "Email" },
    { key: "verification", label: "Verify" },
    { key: "credentials", label: "Account" },
  ];

  const handleEmailSubmit = (email: string) => {
    setEmail(email);
    // Simulate sending verification code

    setCurrentStep("verification");
  };

  const handleVerificationSubmit = (code: string) => {
    setVerificationCode(code);
    setCurrentStep("credentials");
  };

  const handleCredentialsSubmit = async (username: string, password: string, setIsLoading:any) => {
    // Handle final signup
    console.log("Sign up complete", { email, username, password });
    try {
      const response = await fetch(
        `${baseUrl}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email }),
        }
      );

      const data = await response.json();
      if (response.status === 201) {
        // Successful registration
        console.log(data);
        sessionStorage.setItem('accessToken', data.token);
        updateUser(data);
        navigate('/')
      } else if (response.status === 400) {
        alert("Email, username, and password are required");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-indigo-700 to-blue-500 border-b border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-white">NEXUS CARDS</h1>
          </div>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.key}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.key === currentStep
                          ? "bg-blue-600"
                          : steps.indexOf({ key: currentStep } as typeof step) >
                            index
                          ? "bg-green-500"
                          : "bg-gray-700"
                      }`}
                    >
                      {steps.indexOf({ key: currentStep } as typeof step) >
                      index ? (
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="text-white">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-400 mt-2">
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-px bg-gray-700 mx-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
            {currentStep === "email" && (
              <EmailStep onSubmit={handleEmailSubmit} />
            )}
            {currentStep === "verification" && (
              <VerificationStep
                email={email}
                onSubmit={handleVerificationSubmit}
                onResend={() => console.log("Resend code")}
              />
            )}
            {currentStep === "credentials" && (
              <CredentialsStep onSubmit={handleCredentialsSubmit} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Cards. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;
