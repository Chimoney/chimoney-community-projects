
import heroOne from '../assets/hero-one.png'
import heroTwo from '../assets/hero-two.png'
import heroThree from '../assets/hero-three.png'
import heroFour from '../assets/hero-four.png'
import heroFive from '../assets/hero-five.png'

const Hero = () => {
    return (
        <div className='container mx-auto px-12 flex flex-row justify-center items-center'>

            {/* first column */}
            <div className='flex flex-col items-start'>
                <img
                    src={heroOne}
                    alt={''}
                    className='rounded-lg p-2 shadow-inner shadow-pink-300/50 drop-shadow-md w-32'
                />
                <img
                    src={heroThree}
                    alt={''}
                    className='rounded-lg p-2 ml-20 mt-16 shadow-inner shadow-green-300/50 drop-shadow-md w-32'
                />
            </div>

            {/* second column */}
            <div className='flex flex-col justify-between items-center space-y-6'>
                <h1 className='text-center text-5xl max-w-3xl font-epilogue font-semibold'>
                    Make hassle-free payments across Africa
                </h1>
                <p className='text-center font-epilogue max-w-md'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia vero
                    quas cupiditate iste! Maiores harum, Quis saepe cum placeat
                </p>
                <button className='font-epilogue font-medium rounded-lg py-2 px-6 ring-2 ring-gray-400
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                    Get Started
                </button>
            </div>

            {/* third column */}
            <div className='flex flex-col items-end'>
                <img
                    src={heroFour}
                    alt={''}
                    className='rounded-lg p-2 shadow-inner shadow-purple-300/50 drop-shadow-md w-32'
                />
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