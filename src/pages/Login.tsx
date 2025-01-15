import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex-1 logi bg-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <div className="max-w-[300px] w-full mx-auto mt-20">
        <h1 className="font-bold text-3xl text-center mb-5">Log in</h1>
        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="username">
              Username
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="form-input outline-none p-4 rounded focus:ring-1 ring-green-600"
              placeholder="Email"
              name="username"
              id="username"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <div className="flex form-input items-center rounded p-4 ring-1 ring-green-600">
              <input
                type={`${showPassword ? "text" : "password"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent outline-none  rounded-md"
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
            <p className="font-extralight text-xs cursor-pointer mt-1 ml-auto">
              Forgot password?
            </p>
          </div>
          <input
            type="submit"
            className="cursor-pointer p-3 font-bold bg-green-600 rounded"
            value="LOG IN"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
