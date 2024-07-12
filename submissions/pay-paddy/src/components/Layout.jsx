import Footer from "./Footer"
import Hero from "./Hero"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
    return (
        <>
            <header
                className='h-screen flex flex-col justify-start items-center 
                    bg-gradient-to-bl from-purple-50 to-blue-100 
                    md:h-full md:pb-8 xl:pb-0 xl:h-screen'>
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