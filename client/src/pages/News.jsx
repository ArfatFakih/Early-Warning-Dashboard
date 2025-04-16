import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import NewsFeed from '../components/NewsFeed/NewsFeed'

const News = () => {
  return (
    <div className='news-page-container'>
      <div className='news-page-navbar'>
        <Navbar />
      </div>
      <div>
        <NewsFeed />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default News