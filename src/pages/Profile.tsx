import React from "react";
import logo from "../assets/cards.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress";
import { AiOutlineClose } from "react-icons/ai";
import { RiNotification2Fill } from "react-icons/ri";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { BsShare } from "react-icons/bs";
import { GrShareOption } from "react-icons/gr";
import { HiOutlineUser } from "react-icons/hi2";

const Profile = () => {

   const handleClose = () =>{
      console.log('Close button clicked');
   }

  return <div className="flex-1 bg-gray-800 p-4 profile" >
     {/* <div className="flex items-center gap-5" >
        <div className="w-10 h-10" >
          <img src={logo} alt="" className="object-contain" />
        </div>
        <div>
           <p>User_90653</p>
           <p>0532625003</p>
        </div>

     </div> */}
     <div>
       <AiOutlineClose className="ml-auto"  onClick={handleClose} />
        <div className="flex flex-col items-center gap-4 mt-10" >
        <Avatar className="w-20 h-20" >
              <AvatarImage src = "https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-center" >
              <p className="font-extrabold text-xl" >@Jaeymax</p>
             <p className="text-sm" >azagojunior2@gmail.com</p>
            </div>
            <div className="w-full flex flex-col gap-2" >
            <button className="w-full bg-green-600 flex rounded-full p-2" >
               <div className="flex items-center gap-2 mx-auto" >
                  <HiOutlineUser className="w-5 h-5" />
                  <p className="font-bold" >View profile</p>
               </div>
            </button>
            <button className="w-full bg-blue-500 flex rounded-full p-2" >
            <div className="flex items-center gap-2 mx-auto" >
                  <GrShareOption className="w-5 h-5" />
                  <p className="font-bold" >Share profile</p>
               </div>
            </button>
            </div>
        </div>
        <div className="bg-blue-950 mt-10 p-5" >
         <div className="flex justify-between" >
            <p className="text-xs font-semibold" >Your profile is 60% complete</p>
            <p className="text-sm font-semibold" >Complete Now</p>
         </div>
        <Progress value={6} />
         
        </div>
        <div className="mt-10 flex flex-col gap-4" >
          <div className="flex gap-3 items-center" >
             <RiNotification2Fill/>
             <p>Notification preferences</p>
          </div>
          <div className="flex gap-3 items-center" >
             <MdOutlinePrivacyTip/>
             <p>Privacy preferences</p>
          </div>
          <div className="flex gap-3 items-center" >
             <IoSettings/>
             <p>Account settings</p>
          </div>
          <div className="flex gap-3 items-center" >
             <IoLogOutOutline/>
             <p>Log out</p>
          </div>
        </div>
     </div>
  </div>;
};

export default Profile;
