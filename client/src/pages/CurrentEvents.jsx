import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import CurrentEventsComponent from '../components/currentEvent/CurrentEventsComponent'

const CurrentEvents = () => {
  return (
    <div className='current-events-container'>
        <div className='current-events-navbar'>
            <Navbar />
        </div>
        <div className="current-events-details">
            <CurrentEventsComponent />
        </div>
    </div>
  )
}

export default CurrentEvents