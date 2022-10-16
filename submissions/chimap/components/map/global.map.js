import React, { useState } from "react";
import Map, { NavigationControl, Popup } from "react-map-gl";
import useInfo from '../../hooks/getInfo'
import countryData from '../../utils/countries.json'
import ServiceCard from "../card/service.card";
import wc from 'which-country'
import { filterByCountry, parseAssetType } from '../../helpers/query'




const GlobalMap = (props) => {
  const [showPopup, setShowPopup] = useState(false)
  const [lngLat, setlngLng] = useState({ lng: 0, lat: 0 })

  const countryList = countryData

  const [country, setCountry] = useState("")
  const [filteredData, setFilteredData] = useState([])
  const [filteredType, setFilteredType] = useState([])

  // hook to call api
  const apiData = useInfo()

  // get benefits
  const benefits = apiData?.data?.benefitsList

  // status that check if  api call is successful
  const apiStatus = apiData?.status == "success" ? true : false



  // handles mapbox position 
  function positionChange(i) {
    // wc is an helper that returns country ISO3 from position
    const countryObj = wc([i.lngLat.lng, i.lngLat.lat])
    // filters the country list from util
    const data = countryList.filter((val) => val.code == countryObj)
    // if location is not valid set state to empty
    if (!countryObj) {
      setCountry("")
      setFilteredData([])
      setFilteredType([])
    }
    else {
      setCountry(data[0]?.name)
      const filter = filterByCountry(data[0]?.name, benefits)
      setFilteredData(filter)
      setFilteredType(parseAssetType(filter))
    }


  }











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
      onClick={(i) => { setlngLng(i.lngLat); positionChange(i); setShowPopup(true); }}
    >
      <NavigationControl />
      {showPopup && (
        <Popup className="p-4" longitude={lngLat.lng} latitude={lngLat.lat} anchor="top" onClose={() => setShowPopup(!showPopup)}>
          <div>
            <ServiceCard country={country} data={filteredData} type={filteredType} status={apiStatus} />


          </div>
        </Popup>
      )

      }


    </Map>
  )
}


export default GlobalMap;
