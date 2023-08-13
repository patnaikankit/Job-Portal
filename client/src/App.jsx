import './App.css'
import NotFound from './Pages/NotFound.jsx'
import Home from './Pages/home.jsx'
import Login from "./Pages/login.jsx"
import Register from "./Pages/register.jsx"
import Dashboard from "./Pages/dashboard.jsx"
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/*' element={<NotFound />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes> 
    </>
  )
}

export default App
