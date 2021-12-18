import React from "react";
import Map from './Map.js';
import StockForm from './StockForm.js';

const App = () => {
    const [viewport, setViewport] = React.useState({
        latitude: 40,
        longitude: -100,
        zoom: 3,
        pitch: 50
    })
    const mapboxApiAccessToken = "pk.eyJ1Ijoic3RhdHN1bm8iLCJhIjoiY2t4NnUwdWRlMGk5cDJ2cW0xNzI3eXJjcCJ9.P2MekVGXfEld3SmY1-6dlw"
    const mapStyle="mapbox://styles/mapbox/light-v10"
    return (
        <div>
            <Map 
            width="100vw"
            height="100vh"
            viewport={viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle={mapStyle}
            mapboxApiAccessToken={mapboxApiAccessToken}
            />
            <StockForm></StockForm>
        </div>
        
    );
};

export default App;