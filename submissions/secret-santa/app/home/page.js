"use client"
import React, { useState } from 'react';
import PaymentPopup from 'components/PaymentPopup.js'

const HomePage = () => {
    const [showPaymentPopup, setShowPaymentPopup] = useState(false);

    const handlePayoutInitiation = () => {
        setShowPaymentPopup(true);
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center overflow-hidden">
            <h1 className="text-6xl font-semibold absolute top-10 text-center w-full">Secret Santa🎅</h1>
            <h2 className="text-2xl font-normal absolute top-24 text-center w-full">Send a gift to your friends anonymously</h2>
            <h3 className='text-md font-normal absolute top-32 text-center w-full'>Powered by <a href='https://chimoney.io' className='text-blue-500'>Chimoney</a></h3>

            <div className="flex flex-col justify-center items-center">
                <button
                    className="bg-[#f2f2f2] text-black p-4 rounded-lg text-lg hover:bg-red-500 font-semibold transition bg duration-150"
                    onClick={handlePayoutInitiation}
                >
                    Surprise Your Friends 💐
                </button>
                {showPaymentPopup && (
                    <PaymentPopup
                        onClose={() => setShowPaymentPopup(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default HomePage;
