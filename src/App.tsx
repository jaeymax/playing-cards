import { BrowserRouter, Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './Home'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <div className={`bg-[url(./assets/wallpaper.jeg)] bg-cover bg-center w-full min-h-screen flex flex-col`}>
      <BrowserRouter>
      <Navbar user = {false} />
      <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path = '/signup' element= {<Signup/>}/>
          <Route path = '/login' element = {<Login/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
