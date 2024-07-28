import { Link } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import logo from '../assets/logo1.png'

interface NavbarProps{
    user:boolean;
}

const Navbar:React.FC<NavbarProps> = ({user}) => {
  return (
    <nav className="flex px-2 bg-[#FFFFFF1A] w-full gap-4 py h-16 items-center  shadow-md" >
        <IoMenu className="flex md:hidden  min-w-[40px] text-gray-400 cursor-pointer" fontSize={'50px'}  />
       <Link to={'/'} className="flex items-center gap-5 mr-12" >
         <div className="w-12 h-12">
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
          <Link className="bg-[#81b64c border border-gray-400 rounded-sm min-w-fit p-2 font-medium" to={'/login'} >
           Login
         </Link>
         <Link className="bg-[#81b64c] rounded-sm p-2 font-medium min-w-fit"  to={'/signup'} >
           Sign Up
         </Link>
          </>
        )}
       </div>
    </nav>
  )
}

export default Navbar
