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
        zoom: 18,
        bearing: 90,
        pitch: 90,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v10"
    >
      
      {props.places?.map((place,i) => {
if(i!=0){ return(
{/* <Marker  key={place?._id}
   
          longitude={place?.location?.coordinates[1].toFixed(2)}
          latitude={place?.location?.coordinates[0].toFixed(2)}
          >
            <div className="cursor-pointer bg-white border border-white rounded-full" onClick={()=>router.push(`/place/${place._id}/profile`)}><img className={'rounded-full w-10 h-10 '} src={place?.image || '/images/avatar.jpeg'} /></div>
           
        </Marker>
           */}
         )
   
}
       
      }
      )}

      {/* your location */}
      {/* <Marker color="rgb(250 204 21)" longitude={props.longitude ? props.longitude : 0} latitude={props.latitude ? props.latitude : 0} anchor="bottom" /> */}
      {/* <NavigationControl /> */}
      {/* <GeolocateControl trackUserLocation showUserHeading ref={geolocateControlRef} /> */}
    </Map>
  )
}

export default GlobalMap;