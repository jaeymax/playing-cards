import { SlSocialInstagram } from "react-icons/sl"
import { TiSocialFacebookCircular, TiSocialYoutube } from "react-icons/ti"

const Footer = () => {
  return (
    <div className="flex flex-col gap-1 borde sm:mb-0 mb-10">
        <div className="flex gap-2 font-bold text-xs mx-auto borde flex-wrap">
          <p className="min-w-fit">About Lichess</p>
          <p className="min-w-fit">FAQ</p>
          <p className="min-w-fit">Contact</p>
          <p className="min-w-fit">Mobile App</p>
          <p className="min-w-fit">Terms of Service</p>
          <p className="min-w-fit">Privacy</p>
          <p className="min-w-fit">Source Code</p>
          <p className="min-w-fit">Ads</p>
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
