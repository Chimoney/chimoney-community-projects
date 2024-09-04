import React from 'react'

const chimoneypaymentpopup = ({ email, phone, usd }) => {
    return (
        <div className=' bg-white text-white'>
            <h2 className="text-lg font-semibold mb-2">Enter Payment Details</h2>
            <div className='flex justify-between'>
                <div className="text-black">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleInputChange}
                        className="border rounded-md py-1 px-2 mb-2"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={handleInputChange}
                        className="border rounded-md py-1 px-2 mb-2"
                    />
                    <input
                        type="text"
                        name="valueInUSD"
                        placeholder="Value in USD"
                        value={usd}
                        onChange={handleInputChange}
                        className="border rounded-md py-1 px-2 mb-2"
                    />

                </div>
                <div className='text-[70px]'>🎅</div>
            </div>
            <div className="text-red-500 font-bold">{paymentStatus}</div>
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
    )
}

export default chimoneypaymentpopup