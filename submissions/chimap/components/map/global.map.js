import React, { useState, useEffect } from "react";
import Map, { NavigationControl, Popup } from "react-map-gl";
import useInfo from '../../hooks/getInfo'
import countryData from '../../utils/countries.json'
import ServiceCard from "../card/service.card";

import wc from 'which-country'
import { filterByCountry,parseAssetType } from '../../helpers/query'



const GlobalMap = (props) => {
  const [showPopup, setShowPopup] = useState(false)
  const [lngLat, setlngLng] = useState({ lng: 0, lat: 0 })

  const countryList = countryData

  const [country, setCountry] = useState("")
  const [status, setStatus] = useState(false)
  const data = useInfo()
  // status tha check if  api call is successful
  const apiStatus = data.status == "success" ? true : false

  const [filteredData, setFilteredData] = useState([])
  const [filteredType, setFilteredType] = useState([])

  // handles mapbox position 
  function positionChange(i) {
    // wc is an helper that returns country ISO3 from position
    const countryObj = wc([i.lngLat.lng, i.lngLat.lat])
    setStatus(true)
    // filters the country list from util
    const data = countryList.filter((val) => val.code == countryObj)
    setCountry(data[0]?.name?data[0].name:"")
    
    setFilteredType(parseAssetType(filteredData))
    setStatus(false)
  }





  useEffect(() => {
    const benefits = data.data?.benefitsList

    setStatus(apiStatus)

    if (status) {
      setFilteredData(filterByCountry(country, benefits))
    }

  }, [data?.data?.benefitsList, apiStatus, status, country,])





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
      onClick={(i) => { setlngLng(i.lngLat); setShowPopup(true); positionChange(i) }}
    >
      <NavigationControl />
      {showPopup && (
        <Popup longitude={lngLat.lng} latitude={lngLat.lat} anchor="top" onClose={() => setShowPopup(!showPopup)}>
          <div>
           <ServiceCard country={country} data={filteredData} type={filteredType} status={status}/>


          </div>
        </Popup>
      )

      }


    </Map>
  )
}


export default GlobalMap;
