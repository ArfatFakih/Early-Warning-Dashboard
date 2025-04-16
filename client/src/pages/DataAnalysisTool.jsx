import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import DataAnalysisComponent from '../components/DataAnalysis/DataAnalysisComponent'
import StabilityPredictor from '../components/StabilityPredictor/StabilityPredictor'

const DataAnalysisTool = () => {
  return (
    <div className='data-analysis'>
        <div className='data-analysis-navbar'>
            <Navbar />
        </div>
        <div>
          <StabilityPredictor />
        </div>
    </div>
  )
}

export default DataAnalysisTool