import { useState } from 'react'
import chimoneyLogo from './assets/chimoney-logo.svg'

function App() {

  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  const [paymentData, setPaymentData] = useState({
    country: '',
    phoneNumber: '',
    amount: '',
    momoCode: ''
  })

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setPaymentData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
    console.log(paymentData)
  }

  const handlePayClick = (event) => {
    if (paymentData.country.length === 0) {
      setError('Invalid country')
      return
    }

    if (paymentData.phoneNumber.length === 0) {
      setError('Invalid phone number')
      return
    }

    if (paymentData.momoCode.length === 0) {
      setError('Invalid account number')
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

  }

  return (
    <div className='flex flex-row justify-center items-center bg-purple-400/60 w-screen h-screen'>
      <div className='flex flex-col justify-center items-start p-6
            rounded-xl shadow-sm bg-white/70'>
        <img
          className='ml-auto'
          src={chimoneyLogo}
          alt={'Chimoney Logo'} />

        <div className='w-full flex flex-row mt-4 justify-between items-center'>

          <div className='pr-2'>
            <span className='mt-4 block text-md font-medium text-slate-700'>
              Country
            </span>
            <input name='country' placeholder='Nigeria'
              value={paymentData.country}
              onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm 
          border-slate-300 focus:outline-none focus:border-purple-500
          w-full rounded-md sm:text-sm focus:ring-1' />
          </div>

          <div className='pl-2'>
            <span className='mt-4 block text-md font-medium text-slate-700'>
              Phone number
            </span>
            <input name='phoneNumber' placeholder='+234912345678'
              value={paymentData.phoneNumber}
              onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm 
          border-slate-300 focus:outline-none focus:border-purple-500
          w-full rounded-md sm:text-sm focus:ring-1' />
          </div>

        </div>

        <div className='w-full flex flex-row mt-4 justify-between items-center'>
          <div className='pr-2'>
            <span className='block text-md font-medium text-slate-700'>
              Momo code
            </span>

            <input name='momoCode' placeholder='MPS'
              value={paymentData.momoCode} onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm 
            border-slate-300 focus:outline-none focus:border-purple-500
            w-full rounded-md sm:text-sm focus:ring-1' />
          </div>

          <div className='pl-2'>
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
            <span className='text-purple-500 text-sm font-semibold mt-8'>
              {info}
            </span>
          }

          <button onClick={handlePayClick}
            className={`${error.length === 0 ? 'mt-8' : 'mt-2'} px-12 py-2 border shadow-sm text-white rounded-xl 
            font-semibold bg-purple-500 hover:border-purple-500 tracking-wider
            hover:bg-purple-50 hover:text-purple-500 hover:scale-95 transition-all`}>
            PAY NOW
          </button>

          <p className='mt-2 text-xs'>Powered by <span className='font-semibold text-purple-500'>Chimoney</span></p>

        </div>
      </div>

    </div>
  )
}

export default App
