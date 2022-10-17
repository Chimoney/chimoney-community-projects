import Hero from "./Hero"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <>
            <header
                className='h-screen flex flex-col justify-start items-center 
                    bg-gradient-to-bl from-purple-50 to-blue-100'>
                <Navbar />
                <Hero />
            </header>

            <main className=''>
                {children}
            </main>

            <footer>

            </footer>
        </>
    )
}

export default Layout