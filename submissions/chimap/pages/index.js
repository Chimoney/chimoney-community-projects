import Head from 'next/head'
import GlobalMap from '../components/map/global.map'

export default function Home() {





  return (
    <div >
      <Head>
        <title>Chimap</title>
        <meta name="description" content="Map showing chimoney's supported countries and products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='max-h-screen w-full'>
        <div className='w-full h-screen flex flex-col '>
          {/* map component */}
          <div className='lg:w-full h-full lg:h-full w-full '>
            <GlobalMap/>
            </div>
        </div>




      </main>

    </div>
  )
}
