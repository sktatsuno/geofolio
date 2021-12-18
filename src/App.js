import React from "react";
import CsvReader from "./CsvReader.js";
import Map from './Map.js';

const App = () => {
    const [viewport, setViewport] = React.useState({
        latitude: 40,
        longitude: -100,
        zoom: 3,
        pitch: 50
    })
    const [holdings, setHoldings] = React.useState([])
    const mapboxApiAccessToken = "pk.eyJ1Ijoic3RhdHN1bm8iLCJhIjoiY2t4NnUwdWRlMGk5cDJ2cW0xNzI3eXJjcCJ9.P2MekVGXfEld3SmY1-6dlw"
    const mapStyle="mapbox://styles/mapbox/light-v10"
    const changeHoldingsHandler = (newHoldings) => setHoldings(newHoldings)
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
            <CsvReader
            changeHoldingsHandler={changeHoldingsHandler}
            ></CsvReader>

        </div>
        
    );
};

export default App;