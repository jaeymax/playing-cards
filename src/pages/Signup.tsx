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
    <div className="flex-1 login">
      <div className="max-w-[300px] w-full mx-auto mt-20">
        <h1 className="font-bold text-3xl text-center mb-5">Sign up</h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="username">
              Phone
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="form-input outline-none p-4 rounded-sm focus:ring-1 ring-green-600"
              placeholder="Phone"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <div className="flex form-input items-center rounded-sm p-4">
              <input
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 outline-none bg-transparent rounded-md"
                placeholder="Password"
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
            <div className="flex form-input items-center rounded-sm p-4" >
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 outline-none bg-transparent rounded-md"
              type={`${showConfirmPassword?'text':'password'}`}
              placeholder="Confirm password"
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
            className="cursor-pointer p-3 font-bold bg-green-600 rounded-sm"
            value="SIGN UP"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
