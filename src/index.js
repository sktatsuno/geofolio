import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { HexagonLayer } from '@deck.gl/aggregation-layers';
import { ScatterplotLayer } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';


const sourceData = [
    {
        "incident_id": 893251,
        "date": "7/1/2013",
        "n_killed": 0,
        "n_injured": 1,
        "latitude": 40.888,
        "longitude": -73.5899,
        "location": 0,
        "notes": "Traffic stop; backed car into approaching officer  knocked him to ground",
        "categories": "Shot - Wounded/Injured||Officer Involved Incident||Officer Involved Shooting - subject/suspect/perpetrator shot||Drug involvement"
       },
       {
        "incident_id": 964582,
        "date": "11/22/2013",
        "n_killed": 0,
        "n_injured": 1,
        "latitude": 39.9683,
        "longitude": -75.2238,
        "location": 0,
        "notes": "Pit gang suspect fired into rival Grounds territory  hit bystander",
        "categories": "Shot - Wounded/Injured||Gang involvement"
       }];

const scatterplot = () => new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 20,
    radiusMaxPixels: 50,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
    pickable: true,
    onHover: ({object, x, y}) => {
        const el = document.getElementById('tooltip');
        if (object) {
          const { n_killed, incident_id } = object;
          el.innerHTML = `<h1>ID ${incident_id}</h1>`
          el.style.display = 'block';
          el.style.opacity = 0.9;
          el.style.left = x + 'px';
          el.style.top = y + 'px';
        } else {
          el.style.opacity = 0.0;
        }
    },

    onClick: ({object, x, y}) => {
      window.open(`https://www.gunviolencearchive.org/incident/${object.incident_id}`)
    },
     
  });

  const hexagon = () => new HexagonLayer({
    id: 'hex',
    data: sourceData,
    getPosition: d => [d.longitude, d.latitude],
    getElevationWeight: d => (d.n_killed * 2) + d.n_injured,
    elevationScale: 100,
    extruded: true,
    radius: 1609,         
    opacity: 0.6,        
    coverage: 0.88,
    lowerPercentile: 50
});

  window.initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.0, lng: -100.0},
        zoom: 5,
    });

    const overlay = new GoogleMapsOverlay({
        layers: [
            scatterplot(),
            hexagon()
        ],
    });

    
    overlay.setMap(map);
    
    // overlay.setProps();
}