
//<a href="https://www.flaticon.com/free-icons/best-friend" title="best friend icons">Best friend icons created by Freepik - Flaticon</a>
import friendLogo from './assets/best-friend.png'
import bot from './assets/robot-assistant.png'
import createGame from './assets/playing-cards.png'
import playCards from './assets/playcards.png'

const Home = () => {
  return (
    <div className='p-5' >
      
      <div className='items-center gap-5 flex max-sm:flex-col ' >
          <div className='bg-[#81b64c] flex gap-3 items-center p-2 uppercase cursor-pointer font-medium w-full rounded-sm' >
            <div className="w-10 h-10" >
              <img className="w-full h-full object-contain" src={playCards} alt="" />
            </div>
             Play game
          </div>
          <div className='bg-[#FFFFFF1A] flex gap-3 items-center font-medium cursor-pointer uppercase w-full  p-2 rounded-sm ' >
            <div className='w-10 h-10' >
              <img className="w-full h-full object-contain" src={createGame} alt="" />
            </div>
            Create Game
            </div>
          <div  className='bg-[#FFFFFF1A] flex gap-3 items-center font-medium cursor-pointer uppercase w-full p-2 rounded-sm' >
            <div className='w-10 h-10' >
            <img className="w-full h-full object-contain" src={friendLogo} alt="" />
            </div>
            Invite a friend
            </div>
          <div className='bg-[#FFFFFF1A] flex gap-3 items-center font-medium cursor-pointer uppercase w-full p-2 rounded-sm ' >
            <div className='w-10 h-10' >
            <img className="w-full h-full object-contain" src={bot} alt="" />
            </div>
            Play with computer
            </div>
      </div>
    </div>
  )
}

export default Home
