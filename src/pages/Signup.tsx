import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex-1 ">
      <div className="max-w-[300px] w-full mx-auto mt-20">
        <h1 className="font-bold text-3xl text-center mb-5">Sign up</h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="bg-[#FFFFFF1A] outline-none p-4 rounded-md"
              placeholder="Type your username"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <div className="flex bg-[#FFFFFF1A] items-center rounded-md p-4">
              <input
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" outline-none bg-transparent rounded-md"
                placeholder="Type your password"
                name="password"
                id="password"
              />
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="comfirm-password" className="font-bold">
              Confirm Password
            </label>
            <div className="flex bg-[#FFFFFF1A] items-center rounded-md p-4" >
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="outline-none bg-transparent rounded-md"
              type={`${showConfirmPassword?'text':'password'}`}
              placeholder="Confirm your password"
              name="confirm-password"
              id="confirm-password"
            />
            <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div>
          </div>
          <input
            type="submit"
            className="cursor-pointer p-3 font-bold bg-[#81b64c] rounded-md"
            value="SIGNUP"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
