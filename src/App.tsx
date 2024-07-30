import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './Home'
import Navbar from './components/Navbar'
import   Leaderboard  from './pages/Leaderboard'
import Footer from './components/Footer'
import Play from './pages/Play'

function App() {
  

  return (
    <div className={`bg-[url(./assets/bglarge.jpg)] bg-cover bg-center w-full min-h-screen flex flex-col`}>
      <BrowserRouter>
      <Navbar user = {false} />
      <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path = '/signup' element= {<Signup/>}/>
          <Route path = '/login' element = {<Login/>} />
          <Route path = '/leaderboard' element ={<Leaderboard/>} />
          <Route path = 'play' element = {<Play/>} />
      </Routes>
        {/* <Footer/> */}
      </BrowserRouter>
    </div>
  )
}

export default App
