import React from 'react';

const PaymentVerification = ({ onClose, verificationStatus, isLoading }) => {
    return (
        <div className="black_overlay fixed top-0 left-0 w-screen h-screen z-50 flex justify-center items-center">
            <div className="fixed top-0 left-0 z-50 bg-black opacity-80 w-full h-full"></div>
            <div className="white_content bg-black w-96 h-64 p-4 border-2 border-orange-500 z-50 rounded-lg flex flex-col justify-between relative">
                {isLoading ? (
                    <div className="top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url('/images/santa-molang.gif')` }}>
                        <h2 className="sr-only">Processing Payment</h2>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl text-center font-semibold text-white mb-2">Payment Status</h2>
                        {verificationStatus ? (
                            <div className="text-center text-green-500 text-3xl mt-14 font-bold">Payment Successful!</div>
                        ) : (
                            <div className="text-red-500 text-center text-3xl mt-14 font-bold">Payment Failed!</div>
                        )}
                        <button
                            className="absolute bottom-4 right-4 bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-gray-500 transition duration-150"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentVerification;
