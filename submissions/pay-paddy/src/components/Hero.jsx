import heroOne from '../assets/hero-one.png'
import heroThree from '../assets/hero-three.png'
import heroFour from '../assets/hero-four.png'
import heroFive from '../assets/hero-five.png'
import paperPlane from '../assets/paper-plane.png'
import { showSignUpModal } from '../store/modalReducer'
import { useDispatch } from 'react-redux'

const Hero = () => {

    const dispatch = useDispatch()

    return (
        <div className='container mx-auto px-5 flex flex-col md:flex-row md:justify-center md:items-center md:px-12 lg:px-20'>

            {/* first column */}
            <div className='relative flex flex-col items-start'>
                <img
                    src={heroOne}
                    alt={''}
                    className='rounded-lg p-2 w-28 shadow-inner shadow-pink-300/50 drop-shadow-md md:w-24 lg:w-32'
                />

                <div className='absolute top-32 left-28 -rotate-[66deg] w-20 opacity-75 md:opacity-95 
                    md:top-[120px] md:w-10 md:left-4 md:-rotate-45 lg:w-16 lg:top-40'>
                    <img
                        src={paperPlane}
                        alt={''}
                    />
                </div>

                <img
                    src={heroThree}
                    alt={''}
                    className='rounded-lg p-2 w-28 ml-auto mt-16 shadow-inner shadow-green-300/50 drop-shadow-md 
                        md:w-24 md:ml-14 lg:w-32 lg:ml-20'
                />
            </div>

            {/* second column */}
            <div className='flex flex-col justify-between items-center mt-4 space-y-6 md:mt-0 lg:space-y-8'>
                <h1 className='text-center text-xl max-w-3xl font-epilogue font-semibold md:text-3xl lg:text-5xl'>
                    Make <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>hassle-free </span>
                    payments across the globe
                </h1>
                <p className='text-center font-epilogue text-slate-700 text-sm max-w-xs lg:text-base lg:max-w-lg'>
                    PayPaddy allows you to make rapid
                    transactions ranging from bank transfers to bulk airtime payments and more.
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

            {/* third column */}
            <div className='hidden md:relative md:flex md:flex-col md:items-end'>
                <img
                    src={heroFour}
                    alt={''}
                    className='rounded-lg p-2 shadow-inner shadow-purple-300/50 drop-shadow-md md:w-24 lg:w-32'
                />

                <div className='absolute top-32 right-4 -rotate-180 w-16 opacity-95 
                    md:top-24 md:w-10 lg:w-16 lg:top-32'>
                    <img
                        src={paperPlane}
                        alt={''}
                    />
                </div>

                <img
                    src={heroFive}
                    alt={''}
                    className='rounded-lg p-2 mr-20 mt-16 shadow-inner shadow-blue-300/50 drop-shadow-md 
                        md:w-24 md:mr-14 lg:w-32 lg:mr-20'
                />
            </div>
            
        </div>


    )
}

export default Hero