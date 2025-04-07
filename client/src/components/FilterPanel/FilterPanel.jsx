import React from 'react';
import './FilterPanel.css';
import { useState } from 'react';
// Import the map image
import home_image from '../../assets/image_2.png';

const FilterPanel = () => {
  const [region, setRegion] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const handleApplyFilters = () => {
    console.log('Filters:', { region, startDate, endDate });
  };
  
  return (
    <div className="filter-panel">
      <h2 className="panel-header">World Map with Hotspots</h2>
      
      <div className="panel-content">
        <div className="filter-section">
          <label htmlFor="region">Filter by Region</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="filter-input"
          >
            <option value="">Select a region</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
          
          <label htmlFor="time">Filter by Time Period</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="filter-input"
          />
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="filter-input"
          />
          
          <button className="apply-button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
        
        <div className="map-preview">
          <img src={home_image} alt="World map preview" className="map-image" />
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;