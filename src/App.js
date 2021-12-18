import React from "react";
import Map from './Map.js';

const App = () => {
    const [viewport, setViewport] = React.useState({
        latitude: 40,
        longitude: -100,
        zoom: 3,
        pitch: 50
    })
    const [holdings, setHoldings] = React.useState([{
        "symbol": "AAPL",
        "weight": 0.75,
        "latitude": 37.3346,
        "longitude": -122.0090,
        "icon_url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
       },
       {
        "symbol": "MSFT",
        "weight": 0.25,
        "latitude": 39.9683,
        "longitude": -75.2238,
        "icon_url": "https://i1.wp.com/eodhistoricaldata.com/financial-apis-blog/wp-content/uploads/2019/04/MSFT.png",
       }])
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
            holdings={holdings}
            />
            {/* <StockForm></StockForm> */}

        </div>
        
    );
};

export default App;