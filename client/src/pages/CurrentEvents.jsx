import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CurrentEventsComponent from '../components/currentEvent/CurrentEventsComponent'
import Footer from '../components/Footer/Footer'

const CurrentEvents = () => {
  return (
    <div className='current-events-container'>
        <div className='current-events-navbar'>
            <Navbar />
        </div>
        <div className="current-events-details">
            <CurrentEventsComponent />
        </div>
        <div className="current-events-footer">
            <Footer />
        </div>
    </div>
  )
}

export default CurrentEvents