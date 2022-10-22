import { Bank, Cards, DeviceMobile } from 'phosphor-react'

import heroTwo from '../assets/hero-two.png'
import globe from '../assets/globe.png'

const MoreInfo = () => {
    return (
        <section className='container mx-auto px-20 flex flex-col py-14 justify-between items-center'>
            <h3 className='font-epilogue font-semibold text-4xl text-slate-900'>
                Why should you choose us?
            </h3>

            <div className='w-full flex flex-row mt-14 justify-between items-center'>
                <div className='flex flex-row items-center'>
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

                <div className='flex flex-col justify-between items-start space-y-10'>
                    <div className='grid grid-cols-2 gap-x-2 gap-y-5'>
                        {/* ITEM 1 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-6'>
                                <Bank weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Bank icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-3xl text-slate-900'>
                                    1000+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    banks accessible
                                </p>
                            </div>
                        </div>

                        {/* ITEM 2 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-6'>
                                <Cards weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Giftcard icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-3xl text-slate-900'>
                                    500+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    Giftcards supported
                                </p>
                            </div>
                        </div>

                        {/* ITEM 3 */}
                        <div className='flex flex-row justify-start items-center space-x-4'>
                            <div className='rounded-full bg-gray-200 p-6'>
                                <DeviceMobile weight='duotone'
                                    color='hsl(214, 100%, 48%)'
                                    size={36}
                                    alt={'Mobile Money icon'}
                                />
                            </div>

                            <div className='flex flex-col justify-between items-start'>
                                <h3 className='font-epilogue font-semibold text-3xl text-slate-900'>
                                    10+
                                </h3>
                                <p className='font-epilogue text-slate-600 text-sm'>
                                    MoMo providers available
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className='font-epilogue font-sm text-slate-600 max-w-md'>
                        Supercharge your payment capabilites
                    </p>

                    <button aria-label='signup button' className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
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