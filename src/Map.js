import React from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ColumnLayer, IconLayer } from '@deck.gl/layers';

const Map = ({ width, height, viewport, onViewportChange, mapStyle, mapboxApiAccessToken, holdings}) => {
    const [hoverInfo, setHoverInfo] = React.useState("");
    const [onClickInfo, setOnClickInfo] = React.useState("");

    const layers = [
        new IconLayer({
            id: 'icon-layer',
            data: holdings,
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
            getPosition: d => [d.longitude, d.latitude],
             // Update app state
            onHover: info => setHoverInfo(info),
            onClick: info => {
                console.log(info.object.symbol)
                setOnClickInfo(info)
            }
        }),
        new ColumnLayer({
            id: 'column',
            data: holdings,
            getPosition: d => [d.longitude, d.latitude],
            getElevation: d => d.weight * 100,
            getFillColor: d => [135,206,235],
            getLineColor: [0, 0, 0],
            elevationScale: 50000,
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

        <DeckGL
          initialViewState={viewport}
          controller={true}
          layers={layers} >
          {hoverInfo.object && (
            <div className="tooltip" style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: hoverInfo.x + 25, top: hoverInfo.y + 25, fontFamily: 'arial'}}>
              {`${hoverInfo.object.symbol} ${hoverInfo.object.weight}`}
            </div>
          )}
          {onClickInfo.object && (
            window.open(`https://finance.yahoo.com/quote/${onClickInfo.object.symbol}/`)
          )}
        </DeckGL>
    </ReactMapGL>
    );
};

export default Map;
