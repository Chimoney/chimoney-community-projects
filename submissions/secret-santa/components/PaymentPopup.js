import React, { useState } from 'react';
import { initiateMomoPayment, initiateChimoneyPayment, verifyPayment } from '@/utility';
import PaymentVerification from './paymentverification';



const PaymentPopup = ({ onClose }) => {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMomoCode, setSelectedMomoCode] = useState('');
  const [showverificationPopup, setShowVerificationPopup] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(false);

  const [chimoneypopupVisible, setchimoneyPopupVisible] = useState(false);
  const [chimoneyformData, setchimoneyFormData] = useState({
    email: '',
    phone: '',
    valueInUSD: '',
  });

  const [airtimepopupVisible, setairtimePopupVisible] = useState(false);
  const [bankpopupVisible, setbankPopupVisible] = useState(false);

  const [momopopupVisible, setmomoPopupVisible] = useState(false);
  const [momoformData, setmomoFormData] = useState({
    country: '',
    phone: '',
    valueInUSD: '',
    momoCode: '',
  });

  const handlebankPayment = () => {
    setbankPopupVisible(true);
  }
  const handleairtimePayment = () => {
    setairtimePopupVisible(true);
  }
  const handlemomoPayment = () => {
    setmomoPopupVisible(true);
  }

  const handleChimoneyPayment = () => {
    setchimoneyPopupVisible(true);
  };

  const handleConfirmmomoPayment = async () => {
    setShowLoader(true);
    setShowVerificationPopup(true);
    try {
      const paymentResponse = await initiateMomoPayment(momoformData.country, momoformData.phone, momoformData.valueInUSD, momoformData.momoCode);

      if (paymentResponse.status === 'success') {
        setShowLoader(false);
        setPaymentStatus(true);
        // console.log(paymentStatus);
      } else {
        setShowLoader(false);
        setPaymentStatus(false);
        // console.log(paymentStatus);
      }
    } catch (error) {
      setShowLoader(false);
      console.error(error);
      setPaymentStatus(false);
      // console.log(paymentStatus);
    }
  }


  const handleConfirmChimoneyPayment = async () => {
    setShowLoader(true);
    setShowVerificationPopup(true);
    try {
      const paymentResponse = await initiateChimoneyPayment(chimoneyformData.email, chimoneyformData.phone, chimoneyformData.valueInUSD);

      if (paymentResponse.status === 'success') {
        // console.log('issue id', paymentResponse.data.payouts.issueID)
        const verifyResponse = await verifyPayment(paymentResponse.data.payouts.issueID);
        // console.log('VERIFY RESPONSE', verifyResponse)
        if (verifyResponse && verifyResponse.status === 'success') {
          setShowLoader(false);
          setPaymentStatus(true);
          // console.log(paymentStatus);
        } else {
          // console.log(verifyResponse);
          setShowLoader(false);
          setPaymentStatus(false);
          // console.log(paymentStatus);
        }
      } else {
        setShowLoader(false);
        setPaymentStatus(false);
        // console.log(paymentStatus);
      }
    } catch (error) {
      setShowLoader(false);
      console.error(error);
      setPaymentStatus(false);
      // console.log(paymentStatus);
    }
  };


  const handlemomoInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setSelectedCountry(value);
      setSelectedMomoCode('');
    }

    setmomoFormData({
      ...momoformData,
      [name]: value,
    });
  };
  const handlechimoneyInputChange = (e) => {
    const { name, value } = e.target;
    setchimoneyFormData({
      ...chimoneyformData,
      [name]: value,
    });
  };


  const momoCodesByCountry = {
    "Cameroon": ["FMM-XAF", "EUMOBILE"],
    "Cote d'Ivoire": ["FMM-XOF"],
    "Ethiopia": ["ETBAMOLE"],
    "Ghana": ["VODAFONE", "MTN", "AIRTEL"],
    "Kenya": ["MPS", "MPX"],
    "Rwanda": ["MTN-RW", "AIRTEL-RW"],
    "Senegal": ["FMM"],
    "Tanzania": ["VODACOM-TZS", "TIGOPESA-TZS", "AIRTEL-TZS"],
    "Uganda": ["MTN-UG", "AIRTEL-UG"],
  };
  const momoCodeOptions = momoCodesByCountry[selectedCountry] || [];

  const momoCodeSelectOptions = momoCodeOptions.map((code) => (
    <option key={code} value={code}>
      {code}
    </option>
  ));


  return (
    <div className="black_overlay fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center">
      <div className=" fixed top-0 left-0 z-50 bg-black opacity-80 w-full h-full"></div>
      <div className="white_content bg-black w-96 h-64 p-4 border-2 border-orange-500 z-50 rounded-lg flex flex-col justify-between">
        {chimoneypopupVisible ? (
          <div className='text-white'>
            <h2 className="text-lg font-semibold mb-2">Enter Payment Details</h2>
            <div className='flex justify-between'>
              <div className="text-black">
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={chimoneyformData.email}
                  onChange={handlechimoneyInputChange}
                  className="border rounded-md py-1 px-2 mb-2"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={chimoneyformData.phone}
                  onChange={handlechimoneyInputChange}
                  className="border rounded-md py-1 px-2 mb-2"
                />
                <input
                  type="text"
                  name="valueInUSD"
                  placeholder="Value in USD"
                  value={chimoneyformData.valueInUSD}
                  onChange={handlechimoneyInputChange}
                  className="border rounded-md py-1 px-2 mb-2"
                />

              </div>
              <div className='text-[70px]'>🎅</div>
            </div>
            <div className="text-red-500 font-bold">
              {showverificationPopup && <PaymentVerification
                verificationStatus={paymentStatus}
                onClose={() => setShowVerificationPopup(false)}
                isLoading={showLoader}
              />}
            </div>
            <div className='flex justify-between mt-2'>

              <button
                className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-500 bg duration-150"
                onClick={handleConfirmChimoneyPayment}
              >
                Confirm Payment
              </button>
              <button
                className="bg-orange-500 text-white px-3 py-1.5 rounded-lg self-end hover:bg-gray-500 bg duration-150"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : momopopupVisible ? (
          <div className='text-white'>
            <h2 className="text-lg font-semibold mb-2">Enter Payment Details</h2>
            <div className='flex justify-between'>
              <div className="text-black font-sm">
                <select
                  name="country"
                  value={momoformData.country}
                  onChange={handlemomoInputChange}
                  className="border rounded-md py-0.25 px-2 mb-2 font-sm"
                >
                  <option value="">Select Country</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Cote d'Ivoire">Cote d'Ivoire</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Uganda">Uganda</option>

                </select>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={momoformData.phone}
                  onChange={handlemomoInputChange}
                  className="border rounded-md py-0.25 px-2 mb-2"
                />
                <input
                  type="text"
                  name="valueInUSD"
                  placeholder="Value in USD"
                  value={momoformData.valueInUSD}
                  onChange={handlemomoInputChange}
                  className="border rounded-md py-0.25 px-2 mb-2"
                />
                <select
                  name="momoCode"
                  value={selectedMomoCode}
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    setSelectedMomoCode(selectedCode);
                    setmomoFormData({ ...momoformData, momoCode: selectedCode });
                  }}
                  className="border rounded-md py-0.25 px-2 mb-2"
                >
                  <option value="">Select MOMO Code</option>
                  {momoCodeSelectOptions}
                </select>

              </div>
              <div className='text-[70px]'>🎅</div>
            </div>
            <div className="text-red-500 font-bold">
              {showverificationPopup && <PaymentVerification
                verificationStatus={paymentStatus}
                onClose={() => setShowVerificationPopup(false)}
                isLoading={showLoader}
              />}
            </div>
            <div className='flex justify-between mt-2'>

              <button
                className="bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-500 bg duration-150"
                onClick={handleConfirmmomoPayment}
              >
                Confirm Payment
              </button>
              <button
                className="bg-orange-500 text-white px-3 py-1.5 rounded-lg self-end hover:bg-gray-500 bg duration-150"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        ) : airtimepopupVisible ? (
          <div className='text-white text-center font-bold '>
            Airtime Payment is still under development
            <div className='text-[100px]'>🎅</div>
            <button
              className="mt-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-500 bg duration-150"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : bankpopupVisible ? (
          <div className='text-white text-center font-bold '>
            Bank Payment is still under development
            <div className='text-[100px]'>🎅</div>
            <button
              className="mt-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-500 bg duration-150"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold mb-2">Select Payment Option </h2>

            </div>
            <div className='flex flex-col'>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-red-500 bg duration-150"
                  onClick={handlebankPayment}
                >
                  Bank
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-red-500 bg duration-150"
                  onClick={handleairtimePayment}
                >
                  Airtime
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-red-500 bg duration-150"
                  onClick={handleChimoneyPayment}
                >
                  Chimoney
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-red-500 bg duration-150"
                  onClick={handlemomoPayment}
                >
                  Mobile Money
                </button>
              </div>
              <button
                className="bg-orange-500 text-white px-3 py-1.5 rounded-lg self-end hover:bg-gray-500 mt-6 bg duration-150"
                onClick={onClose}
              >
                Close
              </button>

            </div>

          </div >


        )}

      </div >
    </div >
  );
};

export default PaymentPopup;
