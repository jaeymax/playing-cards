import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import Main from './MainPage'
import   Leaderboard  from './pages/Leaderboard'
import Play from './pages/Play'
import Support from './pages/Support'
import Profile from './pages/Profile'
import Deposit from './pages/Deposit'
import { useAppContext } from './contexts/AppContext'



function App() {
  
  const {overlay} = useAppContext();

  return (
    <div className={`bg-[url(./assets/bglarge.jp)] relative bg-cover bg-center w-full  min-h-screen flex flex-col`}>

      {overlay && <div className={`overlay absolute top-0 left-0 right-0 bottom-0`}></div>}
      
      <BrowserRouter>
      {/* <Navbar user = {false}  /> */}
      <Routes>
          <Route path='/' element = {<Main />} />
          <Route path = '/leaderboard' element ={<Leaderboard/>} />
          <Route path = '/play' element = {<Play/>} />
          <Route path = "/support" element = {<Support/>} />
          <Route path='/profile' element = {<Profile/>}  />
          <Route path='/deposit' element = {<Deposit/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
