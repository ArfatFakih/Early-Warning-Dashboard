import React from 'react';
import './HotSpotMap.css';
import map1 from '../../assets/map_1.png';
import map2 from '../../assets/map_2.png';

const HotSpotMap = () => {
  return (
    <div className="hotspot-maps">
      <div className="gradient-background"></div>
      
      <div className="title-container">
        <h2 className="main-title">Socio-Political Event Severity in Commonwealth Countries</h2>
        <div className="main-line-connector">
          <div className="ball-end top"></div>
          <div className="ball-end bottom"></div>
        </div>
      </div>
      
      <div className="map-section no-margin">
        <div className="section-header no-line">
          <h3>Commonwealth Nations Highlighted</h3>
        </div>
        
        <div className="map-content">
          <div className="map-wrapper">
            <img src={map1} alt="Commonwealth Nations Map" className="map-image" />
          </div>
          <div className="map-description">
            <p>This map highlights all Commonwealth nations across the globe, showing their geographical distribution and relative positions. The Commonwealth comprises 54 independent countries that were mostly territories of the former British Empire.</p>
          </div>
        </div>
      </div>
      
      <div className="map-section reverse">
        <div className="section-header right-aligned">
          <div className="line-connector vertical">
            <div className="ball-end top"></div>
            <div className="ball-end bottom"></div>
          </div>
          <h3>Socio-Political Severity in Commonwealth Countries</h3>
        </div>
        
        <div className="map-content">
          <div className="map-description left-aligned">
            <p>This heat map indicates the relative severity of socio-political events across Commonwealth nations. Areas with darker shading represent regions experiencing higher levels of political instability, social unrest, or governance challenges.</p>
          </div>
          <div className="map-wrapper">
            <img src={map2} alt="Socio-Political Severity Map" className="map-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotSpotMap;