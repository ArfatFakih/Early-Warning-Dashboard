import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import DataAnalysisComponent from '../components/DataAnalysis/DataAnalysisComponent'

const DataAnalysisTool = () => {
  return (
    <div className='data-analysis'>
        <div className='data-analysis-navbar'>
            <Navbar />
        </div>
        <div>
          <h1>content</h1> 
        </div>
    </div>
  )
}

export default DataAnalysisTool