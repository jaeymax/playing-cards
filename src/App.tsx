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
import { useAppContext } from './contexts/AppContext'

function App() {
  
  const {sidebarOpen} = useAppContext();

  return (
    <div className={`bg-[url(./assets/bglarge.jp)] relative bg-cover bg-center w-full min-h-screen flex flex-col`}>
      <div className={`overlay absolute top-0 left-0 right-0 bottom-0 ${sidebarOpen?"":"hidden"}`}></div>
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
