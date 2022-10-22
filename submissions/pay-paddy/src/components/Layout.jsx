import Footer from "./Footer"
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

            <main className='flex flex-col'>
                {children}
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default Layout