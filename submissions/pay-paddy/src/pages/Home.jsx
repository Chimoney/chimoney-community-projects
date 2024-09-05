import MoreInfo from '../components/MoreInfo'
import Feature from '../components/Feature'
import Banner from '../components/Banner'
import { useSelector } from 'react-redux'
import LoginModal from '../components/auth/LoginModal'
import SignUpModal from '../components/auth/SignUpModal'

const Home = () => {
    const modalState = useSelector(state => state.modal)

    return (
        <>
            <MoreInfo />
            <Feature />
            <Banner />
            {
                modalState.showSignInModal && <LoginModal />
            }

            {
                modalState.showSignUpModal && <SignUpModal />
            }
        </>
    )
}

export default Home