import React from 'react'
import './css/HomePage.css'
import Navbar from '../components/Navbar/Navbar'
import FilterPanel from '../components/FilterPanel/FilterPanel'
import HotSpotMap from '../components/HotSpotMap/HotSpotMap'
import Footer from '../components/Footer/Footer'

const HomePage = () => {
  return (
    <div className='home-page-container'>
      <div className='home-page-navbar'>
        <Navbar />
      </div>
      <div className='home-page-filterPanel'>
        <FilterPanel />
      </div>
      <div>
        <HotSpotMap />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default HomePage