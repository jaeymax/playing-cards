import { useAppContext } from "@/contexts/AppContext";
import { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const Signup = () => {
  const { updateSignupOpen, updateLoginOpen } = useAppContext();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleSignIn = () => {
    updateSignupOpen(false);
    updateLoginOpen(true);
  };

  return (
    <>
      {step === 1 && (
        <div className="bottom-nav z-50 absolute w-full p-8 rounded-2xl shadow-md  pb-[400px] left-0 top-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[450px]">
          <div className="flex items-center justify-center">
            <h1 className="font-extrabold  text-xl">Sign Up</h1>
            <div
              onClick={() => updateSignupOpen(false)}
              className="hidden button p-1 rounded-full"
            >
              <IoClose />
            </div>
          </div>
          <div>
            <p className="text-sm mt-2 text-center text-gray-300">
              By continuing, you agree to accept our{" "}
              <span className="text-blue-400">User Agreement</span> and
              acknowledge that you understand the{" "}
              <span className="text-blue-400">Privacy Policy</span>.
            </p>
          </div>
          <button className="flex bg-white items-center justify-between w-full rounded-full p-2 mt-5 relative">
            <img
              className="w-7 h-7"
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt=""
            />
            <p className="text-gray-700 font-medium text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Continue with Google
            </p>
          </button>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-50/10"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-50/10"></div>
          </div>

          <div className="mt-5 flex flex-col gap-4">
            {/* <div className="border border-gray-600 rounded-md p-6 relative form-input">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="placeholder:text-xs left-0 top-0 right-0 bottom-0 absolute p-3 focus:ring-1 rounded-md focus:ring-green-600  bg-transparent  focus:font-normal outline-none"
              />
            </div> */}
            <div className="rounded-2xl p-7 relative form-input">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="placeholder:text-sm placeholder:font-medium left-0 top-0 right-0 bottom-0 absolute p-3 focus:ring-2 rounded-2xl focus:ring-green-600  bg-input  focus:font-normal outline-none"
              />
            </div>
            <p className="text-sm text-cente mt-3">
              Already have an account?
              <span
                onClick={handleSignIn}
                className="text-green-500 ml-1 cursor-pointer hover:text-green-600"
              >
                Sign In
              </span>
            </p>
            {/* <div className="border border-gray-600 rounded-md p-4 relative form-input flex items-center justify-end gap-2">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="placeholder:text-xs left-0 right-0 top-0 bottom-0 rounded-md absolute p-3 focus:ring-1 focus:ring-green-600 outline-none  focus:font-normal bg-transparent flex-1"
              />
              <div className="z-10" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div>
            <div className="border border-gray-600 rounded-md p-4 relative form-input flex items-center justify-end gap-2">
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="placeholder:text-xs absolute rounded-md left-0 right-0 top-0 bottom-0 p-3 focus:ring-1 focus:ring-green-600 outline-none focus:font-normal bg-transparent flex-1"
              />
              <div
                className="z-10"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div> */}

            <div className="absolute bottom-8 right-6 left-6">
              <button
                className="font-bold bg-green-600 hover:bg-green-700 p-3 rounded-full w-full"
                onClick={() => setStep((prev) => prev + 1)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="bottom-nav z-50 absolute w-full p-8 rounded-md shadow-md  pb-[400px] left-0 top-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[450px]">
          <div></div>
          <h1 className="font-bold text-center text-2xl">Verify your email</h1>
          <p className="text-center mt-5">
            Enter the 6-digit code we sent to azagojunior2@gmail.com
          </p>
          <div className="rounded-2xl p-7 relative form-input mt-10">
            <input
              type="text"
              placeholder="Verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="placeholder:text-sm placeholder:font-normal left-0 top-0 right-0 bottom-0 absolute p-3 focus:ring-2 rounded-2xl focus:ring-green-600  bg-input  focus:font-normal outline-none"
            />
          </div>

          <div className="absolute bottom-5 left-6 right-6">
            <p className="text-center font-light text-sm">
              Didn't get an email?{" "}
              <span className="ml-3 font-medium underline">Resend</span>
            </p>
            <button
              className="font-bold bg-green-600 hover:bg-green-700 p-3 rounded-full mt-5 w-full"
              onClick={() => setStep((prev) => prev + 1)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {step === 3 && <div></div>}
    </>
  );
};

export default Signup;
