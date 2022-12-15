import React, { useCallback, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import LoadMapScript from './LoadMapScript';

const Map = ({ trip }) => {

    const apiKey = process.env.REACT_APP_GOOGLE_CLIENT_API_KEY;
    const destinations = trip.destinations;

    const getMinMaxLatitude = () => {
        const lats = destinations.map(d => d.latitude);
        return [Math.min(...lats), Math.max(...lats)];
    }

    const getMinMaxLongitude = () => {
        const lngs = destinations.map(d => d.longitude);
        return [Math.min(...lngs), Math.max(...lngs)];
    }

    const getCenter = () => {
        const minMaxLat = getMinMaxLatitude();
        const minMaxLng = getMinMaxLongitude();
        const x = (minMaxLat[0] + minMaxLat[1]) / 2;
        const y = (minMaxLng[0] + minMaxLng[1]) / 2;
        return { lat: x, lng: y };
    }

    const [map, setMap] = useState(null);
    const onLoad = useCallback((map) => {setMap(map)}, []);


    useEffect(() => {
        if (map) {
            if (destinations.length > 1) {
                const bounds = new window.google.maps.LatLngBounds();
                destinations.map((marker) => {
                    bounds.extend({
                        lat: marker.latitude,
                        lng: marker.longitude,
                    });
                });
                map.fitBounds(bounds);
            } else {
                map.setZoom(8);
            }
        }
    }, [map, destinations]);

    return (
        <div className="mapContainer my-3" style={{ height: '80vh', width: '90vh', margin: 'auto' }}>
            <LoadMapScript 
                googleMapsApiKey={apiKey}
            >
                    <GoogleMap
                        id="google-map"
                        center={getCenter()}
                        onLoad={onLoad}
                        mapContainerStyle={{height: "100%", width: "100%"}}
                    >
                        {destinations &&
                            destinations.map((destination, index) => {
                                return (
                                    <Marker
                                        key={index}
                                        position={{
                                            lat: destination.latitude,
                                            lng: destination.longitude
                                        }}
                                    />
                                )
                            })
                        }
                    </GoogleMap>
            </LoadMapScript>
        </div>
    );
}

export default Map;