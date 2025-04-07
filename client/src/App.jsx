import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import CurrentEvents from './pages/CurrentEvents';
import EventDetails from './components/EventDetails/EventDetails';
import DataAnalysisTool from './pages/DataAnalysisTool';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<SignUp />} />
          <Route path = "/login" element = {<Login />} />
          <Route path = "/home" element = {<HomePage />} />
          <Route path = "/currentevents" element = {<CurrentEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path= "/dataanalysis" element = {<DataAnalysisTool />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
