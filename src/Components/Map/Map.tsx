import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

import Navigation from '../Navigation/Navigation';

import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css'
import parseTubeLineData from '../../utils/parseTubeLineData';

function Map() {

  const mapRef = useRef()
  const mapContainerRef = useRef()

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
    } else {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-0.128655, 51.507548], // Add this line (example coordinates)
        zoom: 15,
        pitch: 45,
        // bearing: -17.6,
        antialias: true
      });
    }

    mapRef.current.on('style.load', () => {
      const layers = mapRef.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      mapRef.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: parseTubeLineData()
          }
        }
      });

      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#888',
          'line-width': 10
        }
      });

      mapRef.current.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, // below this zoom, 
              0, // height is zero
              15.05, // above this zoom, height comes from data source
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15, // below this zoom, 
              0, // height is zero
              15.05, // above this zoom, height comes from data source
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );

    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  const handleAngleInput = ( pitchInput: number ) => {
    mapRef.current.setPitch(pitchInput, { duration: 200 });
  }

  return (
    <>
      <div
        id='map-container'
        ref={mapContainerRef}
      />
      <Navigation
        handleAngleInput={handleAngleInput}
      />
    </>
  )
}

export default Map
