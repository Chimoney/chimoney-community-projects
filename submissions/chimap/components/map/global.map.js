import React, { useState, useRef, useCallback } from "react";
import Map, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { useRouter } from "next/router";

const GlobalMap = (props) => {
  const geolocateControlRef = React.useCallback((ref) => {
    if (ref) {
      // Activate as soon as the control is loaded
      ref.trigger();
    }
  }, []);

  const router= useRouter()

  const mapRef = useRef();

  const onSelectCity = useCallback(({ longitude, latitude }) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], duration: 2000 });
  }, []);

  return (
    <Map
      onLoad={props.onload}
      mapboxAccessToken="pk.eyJ1IjoiY29kcmVjdCIsImEiOiJjbDF4cnByb3gwNHY0M2NtdHdpMnBvdjJrIn0.hCjjxe_0OXzAWGDIfupAfA"
      initialViewState={{
        longitude: props.longitude,
        latitude: props.latitude,
        zoom: 1.5,
       
      }}
      style={{ width: '100%', height: '100%' }}
      projection='globe'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={(i)=>console.log(i)}
    >
      <NavigationControl/>
    

     
    </Map>
  )
}

export default GlobalMap;