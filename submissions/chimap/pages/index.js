import Head from 'next/head'
import useInfo from '../hooks/getInfo'
import GlobalMap from '../components/map/global.map'
import countryData from '../utils/countries.json'
import { useEffect, useState } from 'react'
import wc from 'which-country'
import { filterByCountry, filterByType, parseAssetType } from '../helpers/query'

export default function Home() {


  const countryList = countryData

  const [country, setCountry] = useState("Afghanistan")
  const [status, setStatus] = useState(false)
  const data = useInfo()

  const [filteredData, setFilteredData] = useState([])
  const [filteredType, setFilteredType] = useState([])

  // handles mapbox position 
  function positionChange(i) {
    // wc is an helper that returns country ISO3 from position
    const countryObj = wc([i.lngLat.lng, i.lngLat.lat])
    setStatus(true)
    // filters the country list from util
    const data = countryList.filter((val) => val.code == countryObj)
    setCountry(data[0].name)
    setStatus(false)
  }

  // status tha check if  api call is successful
  const apiStatus = data.status == "success" ? true : false



  useEffect(() => {
    const benefits = data.data?.benefitsList

    setStatus(apiStatus)

    if (status) {
      setFilteredData(filterByCountry(country, benefits))
      setFilteredType(parseAssetType(filteredData))
    }

  }, [data?.data?.benefitsList, apiStatus, status, country, filteredData])



  return (
    <div >
      <Head>
        <title>Chimap</title>
        <meta name="description" content="Map showing chimoney's supported countries and products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='lg:max-h-screen w-full'>
        <div className='w-full lg:h-screen flex flex-col lg:flex-row'>
          {/* map */}
          <div className='lg:w-3/5 h-64 lg:h-full w-full lg:border-r'><GlobalMap onclick={(i) => positionChange(i)} /></div>
          <div className='lg:w-2/5 lg:h-screen lg:overflow-y-auto w-full p-2'>
            <label className='mr-4 ' htmlFor='country'>
              Country
            </label>
            {/* lists countries from util*/}
            <select value={country} onChange={(e) => setCountry(e.target.value)} className='w-full p-2 mt-2' id='country'>
              {
                countryList.map((i) => (
                  <option value={i.name} key={i.code}>{i.name}</option>
                ))
              }

            </select>

            <div className='mt-4 border-t'>
              {!status ?
                <div className='text-center mt-4'>Loading...</div>
                :
                <div>{
                  // render filtered data and types
                  filteredType.map((i, index) => (
                    <div key={index}><div className='font-bold border-l-8 px-2 border-black text-lg my-4'>{i}</div>
                     
                      {filterByType(i, filteredData).map((i, index) => (
                        <div key={index}>{i.name}</div>

                      ))}

                    </div>
                  ))

                }</div>
              }
            </div>
          </div>


        </div>

      </main>

    </div>
  )
}
