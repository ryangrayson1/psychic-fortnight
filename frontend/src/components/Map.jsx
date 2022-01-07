import React, { useRef, useEffect, useState } from 'react';
//eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import '../css/mapbox-gl.css';

function Map() {

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-122.17);
    const [lat, setLat] = useState(37.47);
    const [zoom, setZoom] = useState(11.2);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(2));
        setLat(map.current.getCenter().lat.toFixed(2));
        setZoom(map.current.getZoom().toFixed(1));
        });
    });

    return(
        <div>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map;