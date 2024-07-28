import { useState } from "react"


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex-1 ' >
    <div className="max-w-[300px] w-full mx-auto mt-20" >
    <h1 className="font-bold text-3xl text-center mb-5" >Log in</h1>
    <form className="flex flex-col gap-5" >
      <div className="flex flex-col">
      <label className="font-bold" htmlFor="username">Username</label>
      <input value={username} onChange={(e)=>setUsername(e.target.value)} type="text" className="bg-[#FFFFFF1A] outline-none p-4 rounded-md" placeholder='Type your username' name="username" id="username" />
      </div>
      <div className="flex flex-col" >
      <label htmlFor="password" className="font-bold" >Password</label>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="bg-[#FFFFFF1A] outline-none p-4 rounded-md" placeholder='Type your password' name="password" id="password" />
       <p className="font-extralight text-xs cursor-pointer mt-1 ml-auto" >Forgot password?</p>
      </div>
      <input type="submit" className="cursor-pointer p-3 font-bold bg-[#81b64c] rounded-md" value="LOGIN" />
    </form>
    </div>
  </div>
  )
}

export default Login
