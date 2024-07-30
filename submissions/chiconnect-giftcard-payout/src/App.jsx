import { useState } from 'react'

import chimoneyLogo from './assets/chimoney-logo.svg'
import Giftcards from './components/Giftcards'

function App() {

  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const API_KEY = `${process.env.API_KEY}`

  const [paymentData, setPaymentData] = useState({
    'email': '',
    'productId': '',
    'name': '',
    'countryCode': 'US',
    'amount': '',
    'max': null,
    'min': null,
    'denominations': null
  })

  const setProduct = (id, name, countryCode, max, min, denominations) => {
    setPaymentData(prevData => ({
      ...prevData,
      'productId': id,
      'name': name,
      'countryCode': countryCode,
      'max': max,
      'min': min,
      'denominations': denominations
    }))
    denominations && setPaymentData(prevData => ({...prevData, 'amount': denominations[0]}))
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setPaymentData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const sendGiftcard = async () => {
    const baseUrl = 'https://api.chimoney.io/v0.2/'

    fetch(`${baseUrl}/payouts/initiate-chimoney`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify({
        chimoneys: [
          {
            email: paymentData.email,
            valueInUSD: Number(paymentData.amount),
            redeemData: {
              productId: Number(paymentData.productId),
              countryCode: paymentData.countryCode
            }
          }
        ]
      })
    }).then(response => response.json())
      .then(result => {
        setLoading(false)
        if (result.status === 'error') {
          setError(result.error)
          setInfo('')
        } else {
          const paymentLink = result.data.paymentLink
          window.open(paymentLink)  // redirect to chimoney redeem payment page
        }
      })
      .catch(err => console.error(err.message))
  }

  const handleClick = () => {
    if (paymentData.email.length === 0) {
      setError('Email cannot be empty')
      return
    } else {
      const emailPattern = new RegExp(/^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/)
      const isMatch = paymentData.email.match(emailPattern)
      if (!isMatch) {
        setError('Invalid email')
        return
      }
    }

    if (paymentData.denominations === null && paymentData.max === null && paymentData.min === null) {
      setError('Select a giftcard')
      return
    }

    if (paymentData.amount.length === 0) {
      setError('Amount cannot be empty')
      return
    } else if (paymentData.denominations === null) {
      const amount = paymentData.amount
      if (amount < paymentData.min) {
        setError(`Amount cannot be below $${paymentData.min}`)
        return
      } else if (amount > paymentData.max) {
        setError(`Amount cannot be above $${paymentData.max}`)
        return
      }
    }

    if (paymentData.countryCode.length === 0) {
      setError('Country code cannot be empty')
      return
    }

    if (paymentData.productId.length === 0) {
      setError('Select a giftcard above')
      return
    }

    setLoading(true)
    setError('')
    setInfo('Please wait...')

    sendGiftcard()
  }

  return (
    <div className='container mx-auto px-8 py-12 flex flex-col justify-evenly items-start lg:px-24'>
      <img
        src={chimoneyLogo}
        alt='Chimoney Logo' />

      <div className='w-full divide-y space-y-8 flex flex-col justify-center'>
        <Giftcards handleCardClick={(id, name, countryCode, max, min, denominations) =>
          setProduct(id, name, countryCode, max, min, denominations)} />

        <div className='grid grid-cols-1 pt-8 md:grid-cols-2 md:gap-x-1'>

          <div className='flex flex-col justify-start'>
            <h3 className='text-2xl text-slate-700 font-medium'>
              Payment Details
            </h3>
            <p className='text-slate-500 text-sm max-w-[250px]'>
              Specify the recipient's information and amount
            </p>
          </div>

          <div className='flex flex-col items-end space-y-2 md:space-y-5'>
            <div className='w-full flex flex-col md:space-x-5 md:mr-3 md:flex-row'>
              <div className='w-full flex flex-col mt-2 md:mt-0'>
                <span className='block text-md font-medium text-slate-700'>
                  Recipient email
                </span>

                <input type={'email'} name={'email'}
                  placeholder='user@mail.com' onChange={handleFormChange}
                  className='px-3 py-2 bg-white border shadow-sm 
                border-slate-300 focus:outline-none focus:border-purple-500
                w-full rounded-md sm:text-sm focus:ring-1' />
              </div>

              <div className='w-full flex flex-col mt-2 md:mt-0'>
                <span className='block text-md font-medium text-slate-700'>
                  Amount (USD)
                </span>

                {
                  paymentData.denominations ?
                    <select name='amount' value={paymentData.bank}
                      onChange={handleFormChange}
                      className='mt-1 px-3 py-2 bg-white border shadow-sm 
                      border-slate-300 focus:outline-none focus:border-purple-500
                      w-full rounded-md sm:text-sm focus:ring-1' >
                      {
                        paymentData.denominations.map((denomination, index) => (
                          <option
                            key={index}
                            value={denomination}>
                            {denomination}
                          </option>
                        ))
                      }
                    </select>
                    :
                    <>
                      <input placeholder='10' name='amount' onChange={handleFormChange}
                        className='px-3 py-2 bg-white border shadow-sm 
                    border-slate-300 focus:outline-none focus:border-purple-500
                      w-full rounded-md sm:text-sm focus:ring-1' />
                      <div className='flex flex-row justify-between'>
                        <p className='text-slate-700 text-sm'>
                          <span className='font-semibold'>${paymentData.min}</span> min
                        </p>

                        <p className='text-slate-700 text-sm'>
                          <span className='font-semibold'>${paymentData.max}</span> max
                        </p>
                      </div>
                    </>
                }
              </div>

            </div>

            <div className='w-full flex flex-col md:space-x-5 md:mr-3 md:flex-row'>
              <div className='w-full flex flex-col'>
                <span className='block text-md font-medium text-slate-700'>
                  Country code
                </span>

                <input placeholder='US' name={'countryCode'}
                  value={paymentData.countryCode} disabled
                  className='px-3 py-2 bg-white border shadow-sm 
                border-slate-300 disabled:bg-slate-100 disabled:text-slate-500 
                disabled:border-slate-200 disabled:shadow-none w-full rounded-md sm:text-sm focus:ring-1' />
              </div>

              <div className='w-full flex flex-col mt-2 md:mt-0'>
                <span className='block text-md font-medium text-slate-700'>
                  Product ID
                </span>

                <input placeholder='12345' disabled
                  value={paymentData.productId} name={'productId'}
                  className='px-3 py-2 bg-white border shadow-sm 
                border-slate-300 w-full rounded-md sm:text-sm disabled:bg-slate-100 disabled:text-slate-500 
                disabled:border-slate-200 disabled:shadow-none' />
              </div>

            </div>

            <div className='w-full flex flex-col justify-center items-center'>
              {
                error.length > 0 &&
                <span className='text-red-500 text-sm font-semibold'>
                  {error}
                </span>
              }

              {
                info.length > 0 &&
                <span className='text-purple-500 max-w-[500px] text-center break-all text-sm font-semibold'>
                  {info}
                </span>
              }

              <button onClick={() => handleClick()}
                disabled={loading ? true : false}
                className={`${error.length === 0 || info.length === 0 ? 'mt-2' : 'mt-4'} 
                px-12 py-2 border self-center shadow-sm text-white rounded-xl inline-flex justify-center items-center
                font-semibold w-full mt-5 bg-purple-500 hover:border-purple-500 tracking-wider
              hover:bg-purple-50 hover:text-purple-500 hover:scale-95 transition-all
              disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 
                disabled:hover:scale-100 disabled:hover:cursor-wait md:w-1/4 md:mt-0`}>
                {
                  loading &&
                  <svg className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-500 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                }
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
