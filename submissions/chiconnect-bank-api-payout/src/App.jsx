import { useEffect, useState } from "react";
import { API_KEY, getBanks } from "./service/fetchApi";
import chimoneyLogo from './assets/chimoney-logo.svg';

function App() {
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [paymentData, setPaymentData] = useState({
    bank: '',
    accountNumber: '',
    amount: ''
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setPaymentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePayClick = async (event) => {
    event.preventDefault();

    // Input Validation
    if (paymentData.bank.length === 0) {
      setError('Please select a valid bank.');
      return;
    }
    if (paymentData.accountNumber.length === 0) {
      setError('Please enter a valid account number.');
      return;
    }
    if (isNaN(Number(paymentData.amount)) || Number(paymentData.amount) < 1) {
      setError('Amount must be at least $1.');
      return;
    }

    setError('');
    setInfo('Please wait while the payment is being processed...');
    setLoading(true);

    // API Request to Chimoney
    try {
      const response = await fetch('https://api.chimoney.io/v0.2/payouts/bank', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': API_KEY
        },
        body: JSON.stringify({
          banks: [{
            countryToSend: 'Nigeria',
            account_bank: paymentData.bank,
            account_number: paymentData.accountNumber,
            valueInUSD: Number(paymentData.amount)
          }]
        })
      });

      const data = await response.json();
      const chimoneys = data?.data?.chimoneys;

      if (chimoneys && chimoneys.length > 0) {
        const successInfo = `${chimoneys[0].valueInUSD} USD has been successfully sent to account number ${chimoneys[0].account_number}`;
        setInfo(successInfo);
      } else {
        setError("Transaction failed. Please try again.");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await getBanks();
        setBanks(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load banks. Please refresh the page.");
      }
    };

    fetchBanks();
  }, []);

  return (
    <div className='flex flex-row justify-center items-center bg-purple-400/60 w-screen h-screen'>
      <div className='flex flex-col justify-center items-start p-6 rounded-xl shadow-sm bg-white/70'>
        <img className='ml-auto' src={chimoneyLogo} alt='Chimoney Logo' />

        <span className='mt-4 block text-md font-medium text-slate-700'>
          Bank
        </span>
        <select name='bank' value={paymentData.bank} onChange={handleFormChange}
          className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1'>
          {
            banks?.data?.length > 0 ? (
              banks.data.map((bank) => (
                <option key={bank.id} value={bank.code}>
                  {bank.name}
                </option>
              ))
            ) : (
              <option value=''>Loading banks...</option>
            )
          }
        </select>

        <div className='w-full flex flex-row mt-4 justify-between items-center'>
          <div className='pr-2'>
            <span className='block text-md font-medium text-slate-700'>
              Account number
            </span>
            <input name='accountNumber' placeholder='1234567890'
              value={paymentData.accountNumber} onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1' />
          </div>

          <div className='pl-2'>
            <span className='block text-md font-medium text-slate-700'>
              Amount (USD)
            </span>
            <input name='amount' placeholder='10'
              value={paymentData.amount} onChange={handleFormChange}
              className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-purple-500 w-full rounded-md sm:text-sm focus:ring-1' />
          </div>
        </div>

        <div className='w-full flex flex-col justify-center items-center'>
          {
            error && <span className='text-red-500 text-sm font-semibold mt-8'>{error}</span>
          }
          {
            info && <span className='text-purple-500 text-sm font-semibold mt-8'>{info}</span>
          }

          <button onClick={handlePayClick} disabled={loading}
            className={`${loading ? 'cursor-not-allowed' : ''} ${error.length === 0 ? 'mt-8' : 'mt-2'} px-12 py-2 border shadow-sm text-white rounded-xl font-semibold bg-purple-500 hover:border-purple-500 tracking-wider hover:bg-purple-50 hover:text-purple-500 hover:scale-95 transition-all`}>
            {loading ? 'Processing...' : 'PAY NOW'}
          </button>

          <p className='mt-2 text-xs'>Powered by <span className='font-semibold text-purple-500'>Chimoney</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;
