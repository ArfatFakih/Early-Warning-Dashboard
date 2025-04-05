import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<HomePage />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/signup" element = {<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
