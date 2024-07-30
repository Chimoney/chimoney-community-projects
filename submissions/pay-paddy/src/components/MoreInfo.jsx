import { Bank, Cards, DeviceMobile } from 'phosphor-react'

import heroTwo from '../assets/hero-two.png'
import globe from '../assets/globe.png'
import { useDispatch, useSelector } from 'react-redux'
import { showSignUpModal } from '../store/modalReducer'

const MoreInfo = () => {
    const dispatch = useDispatch()

    return (
        <section className='container mx-auto px-5 flex flex-col py-14 justify-between items-center md:px-12 lg:px-20'>
            <h3 className='font-epilogue font-semibold text-center text-xl text-slate-900 md:text-4xl'>
                Why should you choose us?
            </h3>

            <div className='w-full flex flex-col mt-7 justify-between items-center md:flex-row md:mt-14'>
                <div className='flex flex-row justify-center items-center md:justify-start'>
                    <img
                        src={globe}
                        alt={'The globe'}
                        className='w-3/5'
                    />

                    <img
                        src={heroTwo}
                        alt={'Flying happy black businesswoman'}
                        className='w-[25%]'
                    />
                </div>

                <div className='flex flex-col justify-between items-start space-y-5 mt-4 md:mt-0'>
                    <div className='grid grid-cols-1 gap-x-2 gap-y-5 md:grid-cols-2'>
                        {/* ITEM 1 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-4 lg:p-6'>
                                <Bank weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Bank icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-md text-slate-900 md:text-xl lg:text-3xl'>
                                    1000+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    banks accessible
                                </p>
                            </div>
                        </div>

                        {/* ITEM 2 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-4 lg:p-6'>
                                <Cards weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Giftcard icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-md text-slate-900 md:text-xl lg:text-3xl'>
                                    500+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    Giftcards supported
                                </p>
                            </div>
                        </div>

                        {/* ITEM 3 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-4 lg:p-6'>
                                <DeviceMobile weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Mobile Money icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-md text-slate-900 md:text-xl lg:text-3xl'>
                                    10+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    MoMo providers available
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className='font-epilogue text-sm text-slate-600 max-w-md'>
                        Fund your wallet and get ready to supercharge your payment capabilites
                    </p>

                    <button aria-label='signup button' className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                                focus:ring-4 focus:outline-none focus:ring-purple-500/50
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'
                        onClick={() => dispatch(showSignUpModal(true))}>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Get Started
                        </span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MoreInfo