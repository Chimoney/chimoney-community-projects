const Navbar = () => {
    return (
        <nav className='container mx-auto p-12'>
            <div className='flex flex-row justify-between items-center'>
                <p className='font-epilogue text-xl font-medium'>
                    PayPaddy
                </p>

                <div className='flex flex-row justify-evenly items-center space-x-12'>
                    <button aria-label='login button'
                        className='font-epilogue font-medium py-1.5 hover:text-purple-500 
                        transition-all hover:border-b-[3px] hover:border-purple-500'>
                        Login
                    </button>
                    <button className='font-epilogue font-medium rounded-lg py-2 px-6 ring-2 ring-gray-400
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                        Signup
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar