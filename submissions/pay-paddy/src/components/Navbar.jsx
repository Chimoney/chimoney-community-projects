const Navbar = () => {
    return (
        <nav className='container mx-auto px-20 py-12'>
            <div className='flex flex-row justify-between items-center'>
                <p className='font-epilogue text-md font-medium tracking-widest'>
                    PAYPADDY
                </p>

                <div className='flex flex-row justify-evenly items-center space-x-12'>
                    <button aria-label='login button'
                        className='font-epilogue font-medium py-1.5 hover:text-purple-500 group
                        transition-all hover:border-b-[3px] hover:border-purple-500'>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Login
                        </span>
                    </button>
                    <button aria-label='Signup button'
                        className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Signup
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar