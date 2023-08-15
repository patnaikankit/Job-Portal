import './App.css'
import NotFound from './Pages/NotFound.jsx'
import Home from './Pages/home.jsx'
import Login from "./Pages/login.jsx"
import Register from "./Pages/register.jsx"
import Dashboard from "./Pages/dashboard.jsx"
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthRoute } from "./components/routes/authRoute.jsx"
import PublicRoute from './components/routes/publicRoute.jsx'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
        <PublicRoute>
        <Home />
        </PublicRoute>
        }/>
        <Route path='/login' element={
        <PublicRoute>
        <Login />
        </PublicRoute>
        }/>
        <Route path='/register' element={
        <PublicRoute>
        <Register />
        </PublicRoute>
        }/>
        <Route path='/*' element={<NotFound />}/>
        <Route path='/dashboard' 
        element={
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
        }/>
      </Routes> 
    </>
  )
}

export default App
