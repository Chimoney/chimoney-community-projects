import React, {  } from "react";
import Map, { NavigationControl } from "react-map-gl";




const GlobalMap = (props) => {
  


  
  return (
    <Map
      onLoad={props.onload}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      initialViewState={{
        
        zoom: 1,
       
      }}
      style={{ width: '100%', height: '100%' }}
      projection='globe'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onClick={props.onclick}
    >
      <NavigationControl/>
    

     
    </Map>
  )
}


export default GlobalMap;
