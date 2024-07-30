import { Link } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import logo from '../assets/logo1.png'
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

interface NavbarProps{
    user:boolean;
}

const Navbar:React.FC<NavbarProps> = ({user}) => {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex header px-2 bg[#FFFFFF1A] w-full gap-4 py h-14 items-center  shadow-md" >
       <div onClick={()=>setShowMenu(!showMenu)} >
        {showMenu?(
          <IoMdClose className="flex md:hidden  min-w-[40px] text-gray-400 cursor-pointer" fontSize={'45px'}  />
        ):(
          <IoMenu className="flex md:hidden  min-w-[40px] text-gray-400 cursor-pointer" fontSize={'45px'}  />
        )}
       </div>
        
        
       <Link to={'/'} className="flex items-center gap-5 mr-12" >
         <div className="w-12 h-10">
            <img className="w-full h-full object-contain" src={logo} alt="" />
         </div>
          <h1 className="items-center hidden sm:flex font-extrabold text-2xl" >PlayingCards.<span className="text-[#81b64c]" >com</span></h1>
       </Link>
       <div className="flex gap-5 flex-1 hidden md:flex" >
          <Link to = '/' className="font-medium" >Play</Link>
          <Link to={'/'} className="font-medium" >Watch</Link>
          <Link to='/' className="font-medium" >Learn</Link>
          <Link to={'/'} className="font-medium">Community</Link>
          <Link to = '/' className="font-medium" >Tools</Link>
       </div>
       <div className="flex gap-3  ml-auto" >
        {user?(
          <></>
        ):(
          <>
          <Link className="bg-[#81b64c border border-gray-400 h-10 rounded-sm min-w-fit p-2 font-bold" to={'/login'} >
           Login
         </Link>
         <Link className="bg-[#81b64c] rounded-sm p-2 font-bold min-w-fit"  to={'/signup'} >
           Sign Up
         </Link>
          </>
        )}
       </div>
    </nav>
  )
}

export default Navbar
