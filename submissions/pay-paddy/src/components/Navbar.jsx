import { List, X } from "phosphor-react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { showSignInModal, showSignUpModal } from "../store/modalReducer"

const ButtonLink = ({ title }) => {
    return (
        <button aria-label={title} onClick={() => { }}
            className='font-epilogue font-medium py-1.5 hover:text-purple-500 group
                        transition-all hover:border-b-[3px] hover:border-purple-500'>
            <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                {title}
            </span>
        </button>
    )
}

const Navbar = () => {
    const dispatch = useDispatch()
    const [showNav, setShowNav] = useState(false)

    return (
        <nav className='container mx-auto px-5 py-6 md:px-12 md:py-8 lg:px-20 lg:py-12'>
            <div className='relative flex flex-row justify-between items-center'>
                <p className='font-epilogue text-xs  font-medium tracking-widest md:text-md'>
                    PAYPADDY
                </p>

                <div className='hidden justify-between items-center space-x-10 -mr-20 lg:flex lg:flex-row '>
                    <Link to={'/'}>
                        <ButtonLink title={'Home'} />
                    </Link>
                    <Link>
                        <ButtonLink title={'Features'} />
                    </Link>
                    <Link>
                        <ButtonLink title={'About'} />
                    </Link>
                    <Link>
                        <ButtonLink title={'Contact'} />
                    </Link>
                </div>

                {/* LOGIN/SIGNUP FOR LARGE SCREENS */}
                <div className='hidden lg:flex lg:flex-row lg:justify-evenly lg:items-center lg:space-x-6'>
                    <button aria-label='login button' onClick={() => dispatch(showSignInModal(true))}
                        className='font-epilogue font-medium py-1.5 hover:text-purple-500 group
                        transition-all hover:border-b-[3px] hover:border-purple-500'>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Login
                        </span>
                    </button>
                    <button aria-label='Signup button' onClick={() => dispatch(showSignUpModal(true))}
                        className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                               focus:ring-4 focus:outline-none focus:ring-purple-500/50
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                        <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                            Signup
                        </span>
                    </button>
                </div>

                {/* HAMBURGER TO TOGGLE LOGIN/SIGNUP MODAL */}
                <button className='lg:hidden' onClick={() => setShowNav((prev) => !prev)}>
                    {   !showNav ? 
                        <List size={24} weight={'duotone'} /> :
                        <X size={24} weight={'duotone'} />
                    }
                </button>

                {/* NAV LINKS FOR MEDIUM SCREENS & BELOW */}
                <div className={`${showNav ? 'md:flex' : 'hidden'} absolute top-8 px-6 py-5 container flex-row bg-white/60
                    backdrop-blur-md shadow-md rounded-xl z-10 animate-slidedown
                     md:flex-row md:justify-between md:items-center lg:hidden`}>
                    <div className='flex flex-col space-y-2 justify-between items-center md:space-x-6 md:space-y-0 md:flex-row'>
                        <Link to={'/'}>
                            <ButtonLink title={'Home'} />
                        </Link>
                        <Link>
                            <ButtonLink title={'Features'} />
                        </Link>
                        <Link>
                            <ButtonLink title={'About'} />
                        </Link>
                        <Link>
                            <ButtonLink title={'Contact'} />
                        </Link>
                    </div>

                    {/* LOGIN/SIGNUP FOR LARGE SCREENS */}
                    <div className='flex flex-row justify-evenly mt-5 md:mt-0 md:flex-row md:justify-evenly md:items-center md:space-x-6 lg:hidden'>
                        <button aria-label='login button' onClick={() => dispatch(showSignInModal(true))}
                            className='font-epilogue font-medium py-1.5 hover:text-purple-500 group
                        transition-all hover:border-b-[3px] hover:border-purple-500'>
                            <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                                Login
                            </span>
                        </button>
                        <button aria-label='Signup button' onClick={() => dispatch(showSignUpModal(true))}
                            className='font-epilogue font-medium rounded-lg py-2 px-6 group ring-2 ring-gray-400
                               focus:ring-4 focus:outline-none focus:ring-purple-500/50
                             hover:ring-purple-500 hover:shadow-lg hover:scale-105 transition-all'>
                            <span className='group-hover:text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500'>
                                Signup
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar