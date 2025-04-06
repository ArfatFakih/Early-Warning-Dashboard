import React from 'react'
import './HotSpotMap.css'
import map1 from '../../assets/map_1.png'
import map2 from '../../assets/map_2.png'

const HotSpotMap = () => {
    return (
        <div className="hotspot-maps">
          <h2>Socio-Political Event Severity in Commonwealth Countries</h2>
          <div className="map-container">
            <img src={map1} alt="Map 1" className="map-image" />
            <img src={map2} alt="Map 2" className="map-image" />
          </div>
        </div>
    );
}

export default HotSpotMap