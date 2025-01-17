import { FormEvent, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useAppContext } from "@/contexts/AppContext";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const { updateLoginOpen } = useAppContext();
  ("left-0 top-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[450px]");
  return (
    <div className="bottom-nav z-50 absolute left-0 top-0 w-full bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 p-8 rounded-md shadow-md sm:max-w-[450px] pb-[400px]">
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
        <div className="border border-gray-600 rounded-md p-3 form-input flex">
          <input
            type="text"
            placeholder="Email / Phone Number"
            className="bg-transparent outline-none font-bold focus:font-normal flex-1"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="border border-gray-600 rounded-md p-3 form-input flex items-center gap-2">
          <input
            type={showPassword?"text":"password"}
            placeholder="Password"
            className="outline-none bg-transparent font-bold focus:font-normal borde flex-1"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
        </div>
        <p className="font-bold ml-auto">Forgot your password?</p>
        <button className="font-bold bg-green-600 hover:bg-green-700 p-3 rounded-md mt-5">
          Sign In
        </button>
        <p className="font-bold mt-4">
          New to BC.GAME?
          <span className="text-green-500 ml-3">Create account</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
