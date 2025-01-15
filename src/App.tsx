import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Main from './MainPage'
import   Leaderboard  from './pages/Leaderboard'
import Play from './pages/Play'
import Support from './pages/Support'
import Profile from './pages/Profile'
import Deposit from './pages/Deposit'

function App() {
  
  

  return (
    <div className={`bg-[url(./assets/bglarge.jp)] bg-cover bg-center w-full min-h-screen flex flex-col`}>
      <BrowserRouter>
      {/* <Navbar user = {false} open = {open} updateOpen = {setOpen} /> */}
      <Routes>
          <Route path='/' element = {<Main />} />
          <Route path = '/signup' element= {<Signup/>}/>
          <Route path = '/login' element = {<Login/>} />
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
