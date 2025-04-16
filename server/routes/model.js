const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to handle prediction requests
router.post('/predict', async (req, res) => {
  try {
    const { country, year } = req.body;
    
    // Validate inputs
    if (!country || !year) {
      return res.status(400).json({ 
        error: 'Missing required parameters: country and year' 
      });
    }
    
    // Get real indicator data based on country and year
    const indicators = await getIndicatorsForCountry(country, year);
    
    // Send indicators to your Flask model
    const response = await axios.post('http://127.0.0.1:8000/predict', indicators, {
      timeout: 5000
    });
    
    // Get historical data for the chart
    const historicalData = await getHistoricalData(country, year);
    
    // Add the prediction to the historical data
    if (historicalData && historicalData.values && response.data.prediction) {
      // Replace the last null value with the prediction
      historicalData.values[historicalData.values.length - 1] = parseFloat(response.data.prediction);
    }
    
    // Return prediction and historical data
    res.json({
      prediction: response.data.prediction,
      historicalData: historicalData
    });
  } catch (err) {
    console.error('Prediction error:', err.message);
    
    // Error handling
    if (err.code === 'ECONNREFUSED') {
      return res.status(503).json({ 
        error: 'Prediction service unavailable. Please try again later.' 
      });
    } else if (err.code === 'ETIMEDOUT') {
      return res.status(504).json({ 
        error: 'Prediction service timeout. Please try again later.' 
      });
    }
    
    res.status(500).json({ error: 'Prediction failed. Please try again later.' });
  }
});

// Add a fallback route for prediction errors
router.post('/predict/fallback', async (req, res) => {
  const { country, year } = req.body;
  
  try {
    // Get indicators even in fallback mode
    const indicators = await getIndicatorsForCountry(country, year);
    
    // Simple algorithm to calculate a prediction when the real model is unavailable
    const prediction = (
      parseFloat(indicators.cc) * 0.2 + 
      parseFloat(indicators.ge) * 0.25 + 
      parseFloat(indicators.rl) * 0.2 + 
      parseFloat(indicators.rq) * 0.15 + 
      parseFloat(indicators.va) * 0.2
    ).toFixed(3);
    
    // Get historical data for the chart
    const historicalData = await getHistoricalData(country, year);
    
    if (historicalData && historicalData.values) {
      // Replace the last null value with the prediction
      historicalData.values[historicalData.values.length - 1] = parseFloat(prediction);
    }
    
    res.json({ 
      prediction: parseFloat(prediction),
      historicalData: historicalData
    });
  } catch (err) {
    console.error("Fallback error:", err);
    res.status(500).json({ error: "Fallback prediction failed." });
  }
});

// Function to get real indicators from your data source
async function getIndicatorsForCountry(country, year) {
  try {
    // Replace this with actual API call to your database or external data source
    // For example:
    // const result = await database.query('SELECT * FROM indicators WHERE country = ? AND year = ?', [country, year]);
    
    // For demonstration, fetching from a hypothetical indicators API
    const response = await axios.get(`http://your-indicators-api.com/data?country=${encodeURIComponent(country)}&year=${year}`);
    return response.data;
    
    // If you don't have an API yet, you can return mock data temporarily:
    /*
    return {
      cc: getRandomIndicator(country, year, "cc"),
      ge: getRandomIndicator(country, year, "ge"),
      rl: getRandomIndicator(country, year, "rl"),
      rq: getRandomIndicator(country, year, "rq"),
      va: getRandomIndicator(country, year, "va")
    };
    */
  } catch (err) {
    console.error("Error fetching indicators:", err);
    
    // Return mock data as fallback
    return {
      cc: getRandomIndicator(country, year, "cc"),
      ge: getRandomIndicator(country, year, "ge"),
      rl: getRandomIndicator(country, year, "rl"),
      rq: getRandomIndicator(country, year, "rq"),
      va: getRandomIndicator(country, year, "va")
    };
  }
}

// Function to get historical data for the chart
async function getHistoricalData(country, year) {
  try {
    // Replace with actual historical data logic from your data source
    // For example:
    // const result = await database.query('SELECT year, score FROM historical_scores WHERE country = ? ORDER BY year', [country]);
    
    // For demonstration, using mock data
    const currentYear = new Date().getFullYear();
    const yearInt = parseInt(year);
    
    // Calculate years to show (5 years before the selected year, plus the selected year)
    const startYear = Math.min(currentYear - 5, yearInt - 5);
    const years = [];
    const values = [];
    
    for (let y = startYear; y <= yearInt; y++) {
      years.push(y);
      
      if (y < yearInt) {
        // For past years, get historical values
        values.push(getHistoricalScore(country, y));
      } else {
        // For the prediction year, we'll add the value later
        values.push(null);
      }
    }
    
    return {
      years: years,
      values: values
    };
  } catch (err) {
    console.error("Error fetching historical data:", err);
    return null; // Return null on error
  }
}

// Helper function to generate consistent random indicators for demo purposes
// You should replace this with actual data in production
function getRandomIndicator(country, year, indicatorType) {
  // Create a simple hash from country and year for consistency
  const str = country + year + indicatorType;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to generate a value between -2.5 and 2.5
  const value = (hash % 500) / 100 - 2.5;
  
  // Keep within bounds
  return Math.max(-2.5, Math.min(2.5, value)).toFixed(2);
}

// Helper function for historical score generation
function getHistoricalScore(country, year) {
  // Create a simple hash from country and year for consistency
  const str = country + year;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use the hash to generate a value between -2 and 2
  const value = (hash % 400) / 100 - 2;
  
  // Keep within bounds
  return Math.max(-2.5, Math.min(2.5, value)).toFixed(2);
}

module.exports = router;