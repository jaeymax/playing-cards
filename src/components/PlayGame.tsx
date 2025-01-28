
import inviteFriendLogo from '../assets/best-friend.png'
import robotLogo from '../assets/robot.png'
import playLogo from '../assets/play.png'
import starLogo from '../assets/star.png'
import { useNavigate } from 'react-router-dom'


const PlayGame = () => {

    const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 items-center flex-1 borde">
          <h1 className="font-extrabold text-4xl text-center" >Play Cards Online on the #1 Site!</h1>
          <div onClick={()=>navigate('/play')} className="bg-green-600 hover:bg-green-700 w-full text-center rounded p-2 hover:cursor-pointer shadow-md">
            <div  className="flex gap-3 mx-auto w-fit items-center" >
                 <div className="w-6 h-6" >
                  <img className="w-full h-full object-cover" src={playLogo} alt="" />
                 </div>
                 <p>
                  Play game
                 </p>
            </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
              <div className="flex gap-3 mx-auto w-fit items-center" >
                <div className="w-6 h-6" >
                  <img className="w-full h-full object-cover" src={starLogo} alt="" />
                </div>
                <p>
            Create game
                </p>
              </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            <div className="flex gap-3 mx-auto w-fit items-center">
            <div className="w-6 h-6" >
              <img src={inviteFriendLogo} className="w-full h-full object-cover" alt="" />
            </div>
            <p  className="">
              Invite a friend
            </p>
            </div>
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            <div className="flex gap-3 mx-auto w-fit items-center" >
            <div className="w-6 h-6" >
              <img src={robotLogo} className="w-full h-full object-cover" alt="" />
            </div>
            <p>
            Play with Computer
            </p>
            </div>
          </div>
          <div className="flex justify-between items-center borde w-full">
            <p className="font-bold text-xs">
              13533<span className="font-normal"> players</span>
            </p>
            <p className="font-bold text-xs">
              4844972 <span className="font-normal"> playing now</span>
            </p>
          </div>
        </div>
  )
}

export default PlayGame
