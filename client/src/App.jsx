import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignUp />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/home" element = {<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
