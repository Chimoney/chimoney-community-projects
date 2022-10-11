import chimoneyLogo from './assets/chimoney-logo.svg'
import Giftcards from './components/Giftcards'

function App() {

  return (
    <div className='container mx-auto px-32 py-12 flex flex-col justify-evenly items-start'>
      <img
        src={chimoneyLogo}
        alt='Chimoney Logo' />

      <div className='w-full flex flex-col justify-center'>
          <Giftcards />
      </div>
    </div>
  )
}

export default App
