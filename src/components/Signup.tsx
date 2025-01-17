import { useAppContext } from '@/contexts/AppContext'
import { FormEvent, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5'

const Signup = () => {

  const {updateSignupOpen} = useAppContext();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e:FormEvent) =>{
      e.preventDefault();
  }

  return (
    <div className="bottom-nav z-50 absolute w-full p-8 rounded-md shadow-md  pb-[400px] left-0 top-0 bottom-0 sm:bottom-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:max-w-[450px]" >
        <div className="flex items-center justify-between" >
            <h1 className="font-extrabold text-xl" >Sign Up</h1>
            <div onClick={()=> updateSignupOpen(false)} className="button p-1 rounded-full" >
            <IoClose />
            </div>
        </div>
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit} >
            <div className="border border-gray-600 rounded-md p-3 form-input" >
                <input type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className="bg-transparent outline-none" />
            </div>
            <div className="border border-gray-600 rounded-md p-3 form-input" >
                <input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-transparent outline-none" />
            </div>
            <div className="border border-gray-600 rounded-md p-3 form-input flex items-center gap-2">
                <input type={`${showPassword?"text":"password"}`} placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="outline-none bg-transparent flex-1" />
                <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div>
            <div className="border border-gray-600 rounded-md p-3 form-input flex items-center gap-2">
                <input type={`${showConfirmPassword?"text":"password"}`} placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className="outline-none bg-transparent flex-1" />
                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? (
                  <AiFillEyeInvisible className="cursor-pointer" />
                ) : (
                  <AiFillEye className="cursor-pointer" />
                )}
              </div>
            </div>
            
            <button className="font-bold bg-green-600 hover:bg-green-700 p-3 rounded-md mt-10" >Sign Up</button>
            <p className="font-bold mt-4" >Already have an account?<span className="text-green-500 ml-3" >Sign In</span></p>
        </form>
    </div>
  )
}

export default Signup
