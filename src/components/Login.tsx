import { FormEvent, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { toast } = useToast();
  const { updateLoginOpen, updateSignupOpen, updateUser } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const [emailError] = useState("");
  const [passwordError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    /*updateUser({
      username: "jaeymax",
      email: email,
    });*/
    try {
      console.log(email, password);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.status === 401) {
        toast({
          variant: "destructive",
          description: data.message,
        });
      } else if (response.status === 200) {
        updateUser(data);
        toast({
          variant: "default",
          description: "Login successful",
        });
        updateLoginOpen(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    //updateLoginOpen(false);
  };

  const disableSubmit = () => {
    return (
      !email.trim() ||
      !password.trim() ||
      !/\S+@\S+\.\S+/.test(email) ||
      password.length < 8
    );
  };

  const handleCreateAccount = () => {
    updateLoginOpen(false);
    updateSignupOpen(true);
  };

  ("left-0 top-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[450px]");
  return (
    <div className="bottom-nav z-50 fixed left-0 top-0 w-full bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 p-8 rounded-md shadow-md sm:max-w-[450px] pb-[400px]">
      <div className="flex items-center justify-between">
        <h1 className="font-extrabold text-xl">Sign In</h1>
        <div
          onClick={() => updateLoginOpen(false)}
          className="button p-1 rounded-full"
        >
          <IoClose />
        </div>
      </div>
      <form className="mt-5 flex flex-col gap-4 " onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <div className="border border-gray-600 rounded-md relative p-6 form-input flex">
            <input
              type="email"
              required
              placeholder="Email"
              className="absolute placeholder:text-xs p-3 left-0 right-0 top-0 bottom-0 rounded-md focus:ring-1 focus:ring-green-600 bg-transparent outline-none focus:font-normal flex-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-xs text-red-500">{emailError}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="border relative border-gray-600 rounded-md p-4 form-input flex items-center justify-end gap-2">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              placeholder="Password"
              className="absolute placeholder:text-xs left-0 right-0 top-0 bottom-0 p-3 rounded-md focus:ring-1 focus:ring-green-600 outline-none bg-transparent focus:font-normal borde flex-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="cursor-pointer" />
              ) : (
                <AiFillEye className="cursor-pointer" />
              )}
            </div>
          </div>
          <p className="text-xs text-red-500">{passwordError}</p>
        </div>
        <p className="font-light ml-auto text-xs">Forgot your password?</p>
        <button
          className="font-bold bg-green-600 disabled:bg-green-700 hover:bg-green-700 p-3 rounded-md mt-5"
          disabled={disableSubmit()}
        >
          Sign In
        </button>
        <p className="text-center mt-4 text-xs">
          Don't have an account?
          <span
            onClick={handleCreateAccount}
            className="text-green-500 ml-3 cursor-pointer hover:text-green-600"
          >
            Sign up
          </span>
        </p>
      </form>
      {/* <Button
        onClick={() => {
          toast({
            variant: "destructive",
            description: "Invalid username or password",
          });
        }}
      >
        Show Toast
      </Button>*/}
    </div>
  );
};

export default Login;
