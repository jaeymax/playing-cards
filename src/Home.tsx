
//<a href="https://www.flaticon.com/free-icons/best-friend" title="best friend icons">Best friend icons created by Freepik - Flaticon</a>
import friendLogo from './assets/best-friend.png'
import bot from './assets/robot-assistant.png'
import createGame from './assets/playing-cards.png'
import playCards from './assets/playcards.png'
import Leaderboard from './components/Leaderboard'
import PlayOptionItem from './components/PlayOptionItem'
import TournamentWinners from './components/TournamentWinners'



const Home = () => {

  const playOptions = [
    {
      imageUrl:playCards,
      option:'PLAY GAME'
    },
    {
      imageUrl:createGame,
      option:'CREATE GAME'
    },
    {
      imageUrl:friendLogo,
      option:'INVITE A FRIEND'
    },
    {
      imageUrl:bot,
      option:'PLAY WITH COMPUTER'
    }
  ]

  return (
    <div className='p-5' >
      
      <div className='items-center gap-5 flex max-sm:flex-col ' >
        {
          playOptions.map((item, index)=><PlayOptionItem key={index} index = {index} imageUrl={item.imageUrl} playOption={item.option} />)
        }
        
      </div>
      <Leaderboard/>
      <TournamentWinners/>
    </div>
  )
}

export default Home
