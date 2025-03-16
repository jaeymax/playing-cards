import { SlSocialInstagram } from "react-icons/sl"
import { TiSocialFacebookCircular, TiSocialYoutube } from "react-icons/ti"

const Footer = () => {
  return (
    <div className="flex flex-col gap-1 borde">
        <div className="font-bold text-xs flex-wrap text-center">
          <span className="">About Us</span>
          <span className="ml-2">FAQ</span>
          <span className="ml-2">Contact</span>
          <span className="ml-2">Mobile App</span>
          <span className="ml-2">Terms of Service</span>
          <span className="ml-2">Privacy</span>
          <span className="ml-2">Source Code</span>
          <span className="ml-2">Ads</span>
        </div>
        <div className="flex gap-3 mx-auto items-center">
          <TiSocialFacebookCircular className="w-6 h-6" />
          <TiSocialYoutube className="w-6 h-6" />
          <SlSocialInstagram className="w-5 h-5" />
        </div>
      </div>
  )
}

export default Footer
