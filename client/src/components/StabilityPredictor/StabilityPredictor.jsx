import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
  } from 'chart.js';
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import { Line } from "react-chartjs-2";
  import "./StabilityPredictor.css"; 
  
  // Register Chart.js components
  ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement,  
    LineElement,   
    Title, 
    Tooltip, 
    Legend
  );
  
  // List of valid countries
  const VALID_COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", 
    "Bangladesh", "Brazil", "Canada", "China", "Colombia", 
    "Egypt", "Ethiopia", "France", "Germany", "Ghana", 
    "India", "Indonesia", "Iran", "Iraq", "Israel", 
    "Italy", "Japan", "Kenya", "Malaysia", "Mexico", 
    "Morocco", "Nigeria", "Pakistan", "Peru", "Philippines", 
    "Poland", "Russia", "Saudi Arabia", "South Africa", "South Korea", 
    "Spain", "Sudan", "Sweden", "Switzerland", "Thailand", 
    "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam", 
    "Yemen", "Zimbabwe"
  ];
  
  const StabilityPredictor = () => {
    const [country, setCountry] = useState("");
    const [year, setYear] = useState("");
    const [score, setScore] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
  
    // Filter country suggestions based on input
    useEffect(() => {
      if (country.length > 0) {
        const filtered = VALID_COUNTRIES.filter(c => 
          c.toLowerCase().includes(country.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      } else {
        setSuggestions([]);
      }
    }, [country]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);
      
      // Validate country
      const validCountry = VALID_COUNTRIES.find(
        c => c.toLowerCase() === country.toLowerCase()
      );
      
      if (!validCountry) {
        setError("Please enter a valid country name");
        setIsLoading(false);
        return;
      }
      
      // Validate year
      const yearNum = parseInt(year);
      if (isNaN(yearNum) || yearNum < 2000 || yearNum > 2030) {
        setError("Please enter a valid year between 2000 and 2030");
        setIsLoading(false);
        return;
      }
      
      try {
        // Send country and year directly to the backend
        const res = await axios.post("/api/model/predict", {
          country: validCountry,
          year: yearNum
        });
        
        const prediction = parseFloat(res.data.prediction).toFixed(3);
        setScore(prediction);
        
        // If backend also returns historical data, use it for the chart
        if (res.data.historicalData) {
          setChartData({
            labels: res.data.historicalData.years,
            datasets: [
              {
                label: `${validCountry} Stability Score`,
                data: res.data.historicalData.values,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(75,192,192,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(75,192,192,1)",
                tension: 0.1
              },
            ],
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to get prediction. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
  
    // Function to handle country selection from suggestions
    const selectCountry = (selected) => {
      setCountry(selected);
      setSuggestions([]);
    };
  
    return (
      <div className="stability-container">
        <h2>Political Stability Predictor</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Country (e.g., United States, China)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((suggestion) => (
                  <li 
                    key={suggestion} 
                    onClick={() => selectCountry(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="number"
            placeholder="Year (2000-2030)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2000"
            max="2030"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Predict"}
          </button>
        </form>
  
        {score && (
          <div className="result-container">
            <h3>Predicted Stability Score: {score}</h3>
            <p>
              Score ranges from -2.5 (weak) to 2.5 (strong)
            </p>
          </div>
        )}
  
        {chartData && (
          <div className="chart-container">
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Stability Score Trend'
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `Score: ${context.parsed.y}`;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    min: -2.5,
                    max: 2.5,
                    title: {
                      display: true,
                      text: 'Score (-2.5 to 2.5)'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Year'
                    }
                  }
                }
              }}
            />
          </div>
        )}
  
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  };
  
  export default StabilityPredictor;