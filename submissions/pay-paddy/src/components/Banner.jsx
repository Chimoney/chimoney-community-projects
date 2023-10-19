import { useDispatch } from "react-redux"
import { showSignUpModal } from "../store/modalReducer"

const Banner = () => {
    const dispatch = useDispatch()

    return (
        <section className='bg-gradient-to-r from-purple-600 to-blue-500'>
            <div className='container mx-auto flex flex-col px-5 py-14 justify-between items-center space-y-4 
                md:space-y-0 md:items-center md:flex-row md:px-12 lg:px-20'>
                <h3 className='font-epilogue font-semibold text-2xl text-white text-center md:text-start md:text-3xl md:max-w-md'>
                    Start making seamless transactions with us today.
                </h3>

                <div className='flex flex-col justify-between items-center'>
                    <button aria-label='Signup button'
                        className='font-epilogue font-medium rounded-3xl group py-3 px-8 bg-white
                             hover:bg-white hover:shadow-lg hover:scale-105 transition-all'
                        onClick={() => dispatch(showSignUpModal(true))}>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Get started
                        </span>
                    </button>

                    <p className='mt-1 text-white text-xs'>Powered by <span className='font-semibold'>
                        Chimoney Developer API</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Banner