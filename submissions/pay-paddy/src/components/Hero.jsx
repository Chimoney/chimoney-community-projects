import heroOne from '../assets/hero-one.png'
import heroThree from '../assets/hero-three.png'
import heroFour from '../assets/hero-four.png'
import heroFive from '../assets/hero-five.png'
import paperPlane from '../assets/paper-plane.png'

const Hero = () => {

    return (
        <div className='container mx-auto px-20 flex flex-row justify-center items-center'>

            {/* first column */}
            <div className='relative flex flex-col items-start'>
                <img
                    src={heroOne}
                    alt={''}
                    className='rounded-lg p-2 shadow-inner shadow-pink-300/50 drop-shadow-md w-32'
                />

                <div className='absolute top-40 left-4 -rotate-45 w-16 opacity-95'>
                    <img
                        src={paperPlane}
                        alt={''}
                    />
                </div>

                <img
                    src={heroThree}
                    alt={''}
                    className='rounded-lg p-2 ml-20 mt-16 shadow-inner shadow-green-300/50 drop-shadow-md w-32'
                />
            </div>

            {/* second column */}
            <div className='flex flex-col justify-between items-center space-y-8'>
                <h1 className='text-center text-5xl max-w-3xl font-epilogue font-semibold'>
                    Make <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>hassle-free </span>
                    payments across the globe
                </h1>
                <p className='text-center font-epilogue text-slate-700 max-w-lg'>
                    PayPaddy serves as your personal payment assistant, allowing you to make rapid
                    transactions ranging from bank transfers to bulk airtime payments and more.
                </p>
                <button aria-label='signup button' className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                    <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                        Get Started
                    </span>
                </button>
            </div>

            {/* third column */}
            <div className='relative flex flex-col items-end'>
                <img
                    src={heroFour}
                    alt={''}
                    className='rounded-lg p-2 shadow-inner shadow-purple-300/50 drop-shadow-md w-32'
                />

                <div className='absolute top-32 right-4 -rotate-180 w-16 opacity-95'>
                    <img
                        src={paperPlane}
                        alt={''}
                    />
                </div>

                <img
                    src={heroFive}
                    alt={''}
                    className='rounded-lg p-2 mr-20 mt-16 shadow-inner shadow-blue-300/50 drop-shadow-md w-32'
                />
            </div>
        </div>
    )
}

export default Hero