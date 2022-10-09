import { useEffect, useState } from 'react'

import chimoneyLogo from './assets/chimoney-logo.svg'
import { API_KEY, getMomoCodes } from './service/fetchApi'

function App() {

  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [momoCodes, setMomoCodes] = useState(null)

  const [paymentData, setPaymentData] = useState({
    country: '',
    phoneNumber: '',
    amount: '',
    momoCode: ''
  })

  useEffect(() => {
    const fetchMomoCodes = async () => {
      const data = await getMomoCodes()
      setMomoCodes(data)
    }

    fetchMomoCodes()
  }, [])

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setPaymentData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handlePayClick = (event) => {
    if (paymentData.country.length === 0) {
      setError('Select your momo code')
      return
    }

    if (paymentData.phoneNumber.length === 0) {
      setError('Invalid phone number')
      return
    }

    if (paymentData.momoCode.length === 0) {
      setError('Invalid momo code')
      return
    }

    if (paymentData.amount.length === 0) {
      setError('Invalid amount')
      return
    } else if (Number(paymentData.amount) < 1) {
      setError('Amount cannot be below $1')
      return
    }

    setError('')
    setInfo('Please wait...')

    fetch('https://api.chimoney.io/v0.2/payouts/mobile-money', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify({
        momos: [{
          countryToSend: `${paymentData.country}`,
          phoneNumber: `${paymentData.phoneNumber}`,
          momoCode: `${paymentData.momoCode}`,
          valueInUSD: Number(paymentData.amount)
        }]
      })
    })
      .then(response => response.json())
      .then(data => {
        const successInfo = `${data.data.chimoneys[0].valueInUSD} USD has been successfully sent to the MoMo wallet: ${data.data.chimoneys[0].phoneNumber}`
        setInfo(successInfo)
      })
      .catch(err => console.error(err))

  }

  return (
    <div className='flex flex-row justify-center items-center bg-purple-400/60 w-screen h-screen'>
      <div className='flex flex-col justify-center items-start p-6
            rounded-xl shadow-sm bg-white/70'>
        <img
          className='ml-auto'
          src={chimoneyLogo}
          alt={'Chimoney Logo'} />

        <h1 className='my-5 mx-auto text-2xl font-semibold text-slate-700'>
          Pay with Mobile Money
        </h1>

        <span className='block text-md font-medium text-slate-700'>
          Momo code
        </span>

        <select name='momoCode' placeholder='MPS'
          value={paymentData.momoCode} onChange={handleFormChange}
          className='mt-1 px-3 py-2 bg-white border shadow-sm 
            border-slate-300 focus:outline-none focus:border-purple-500
            w-full rounded-md sm:text-sm focus:ring-1'>
          {
            momoCodes?.data?.map((momoCode) => (
              <option
                key={`${momoCode.name}-${momoCode.code}`}
                value={momoCode.code}
                onClick={() => setPaymentData(prevData => (
                  {
                    ...prevData,
                    country: momoCode.country
                  }
                ))}>
                {`${momoCode.code} — ${momoCode.name}`}
              </option>
            ))
          }
        </select>

        <div className='w-full flex flex-row mt-6 justify-between items-center'>
          <div className='pr-4'>
            <span className='block text-md font-medium text-slate-700'>
              Phone number
            </span>

            <input name='phoneNumber' placeholder='+234912345678'
              value={paymentData.phoneNumber}
              onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm 
          border-slate-300 focus:outline-none focus:border-purple-500
          w-full rounded-md sm:text-sm focus:ring-1' />
          </div>

          <div className='pl-4'>
            <span className='block text-md font-medium text-slate-700'>
              Amount (USD)
            </span>

            <input name='amount' placeholder='10'
              value={paymentData.amount} onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm 
            border-slate-300 focus:outline-none focus:border-purple-500
             w-full rounded-md sm:text-sm focus:ring-1' />
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center'>
          {
            error.length > 0 &&
            <span className='text-red-500 text-sm font-semibold mt-8'>
              {error}
            </span>
          }

          {
            info.length > 0 &&
            <span className='text-purple-500 text-center max-w-md text-sm font-semibold mt-8'>
              {info}
            </span>
          }

          <button onClick={handlePayClick}
            className={`${error.length === 0 ? 'mt-8' : 'mt-2'} px-12 py-2 border shadow-sm text-white rounded-xl 
            font-semibold bg-purple-500 hover:border-purple-500 tracking-wider
            hover:bg-purple-50 hover:text-purple-500 hover:scale-95 transition-all`}>
            PAY NOW
          </button>

          <p className='mt-2 text-xs'>Powered by <span className='font-semibold text-purple-500'>ChiConnect</span></p>
        </div>
      </div>
    </div>
  )
}

export default App