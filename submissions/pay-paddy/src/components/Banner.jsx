const Banner = () => {
    return (
        <section className='bg-gradient-to-r from-purple-600 to-blue-500'>
            <div className='container mx-auto flex flex-row justify-between items-center px-20 py-14'>
                <h3 className='font-epilogue font-semibold text-3xl max-w-md text-white'>
                    Start making seamless transactions with us today.
                </h3>

                <div className='flex flex-col justify-between items-center'>
                    <button aria-label='Signup button'
                        className='font-epilogue font-medium rounded-3xl group py-3 px-8 bg-white
                             hover:bg-white hover:shadow-lg hover:scale-105 transition-all'>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Get started
                        </span>
                    </button>

                    <p className='mt-1 text-white text-xs'>Powered by <span className='font-semibold'>
                        ChiConnect</span>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Banner