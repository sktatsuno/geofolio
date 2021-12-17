import * as React from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, IconLayer } from '@deck.gl/layers';

const Map = ({ width, height, viewport, onViewportChange, mapStyle, mapboxApiAccessToken}) => {
    const sourceData = [{
        "icon_url": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        "incident_id": 893251,
        "date": "7/1/2013",
        "n_killed": 50,
        "n_injured": 1,
        "latitude": 37.3346,
        "longitude": -122.0090,
        "location": 0,
        "notes": "Traffic stop; backed car into approaching officer  knocked him to ground",
        "categories": "Shot - Wounded/Injured||Officer Involved Incident||Officer Involved Shooting - subject/suspect/perpetrator shot||Drug involvement"
       },
       {
        "icon_url": "https://i1.wp.com/eodhistoricaldata.com/financial-apis-blog/wp-content/uploads/2019/04/MSFT.png",
        "incident_id": 964582,
        "date": "11/22/2013",
        "n_killed": 20,
        "n_injured": 1,
        "latitude": 39.9683,
        "longitude": -75.2238,
        "location": 0,
        "notes": "Pit gang suspect fired into rival Grounds territory  hit bystander",
        "categories": "Shot - Wounded/Injured||Gang involvement"
       }];
    const layers = [
        new IconLayer({
            id: 'icon-layer',
            data: sourceData,
            // iconAtlas and iconMapping should not be provided
            // getIcon return an object which contains url to fetch icon of each data point
            getIcon: d => ({
            url: d.icon_url,
            width: 128,
            height: 128,
            anchorY: 128
            }),
            // icon size is based on data point's contributions, between 2 - 25
            getSize: 5 * (2/viewport.zoom),
            pickable: true,
            sizeScale: 15,
            getPosition: d => [d.longitude, d.latitude]
        }),
        new ColumnLayer({
            id: 'column',
            data: sourceData,
            getPosition: d => [d.longitude, d.latitude],
            getElevation: d => (d.n_killed * 2) + d.n_injured,
            getFillColor: d => [135,206,235],
            getLineColor: [0, 0, 0],
            elevationScale: 30000,
            extruded: true,
            radius: 15000 * (20/viewport.zoom),         
            opacity: 0.2,        
            coverage: 0.88,
        })
        ];
        
    return (
      <ReactMapGL
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxApiAccessToken}
        width={width}
        height={height}
        {...viewport}
        onViewportChange={onViewportChange}
        >
        {/* <Marker 
        latitude={37.3346} 
        longitude={-122.0090} >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png"
              width={50}
              height={50}
              />
        </Marker> */}

        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers}
        />
    </ReactMapGL>
    );
};

export default Map;
