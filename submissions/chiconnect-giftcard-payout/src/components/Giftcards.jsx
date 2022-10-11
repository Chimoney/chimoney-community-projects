import { useEffect, useState } from 'react'
import { getGiftcards } from '../service/fetchApi'
import Giftcard from './Giftcard'

const Giftcards = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [giftcards, setGiftcards] = useState([])
    const [originalCards, setOriginalCards] = useState([])
    const [productId, setProductId] = useState(null)
    const [selected, setSelected] = useState(null)

    const handleChange = (event) => {
        const searchQuery = event.target.value
        console.log(searchQuery)
        setSearchTerm(searchQuery)
        let filteredCards = []
        if (searchQuery.length > 0) {
            filteredCards = giftcards.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setGiftcards(filteredCards)
        } else {
            setGiftcards(originalCards)
        }
    }

    const handleClick = (productId) => {
        setProductId(productId)
        setSelected(productId)
    }

    useEffect(() => {
        const fetchGiftcards = async () => {
            const data = await getGiftcards()
            const newData = data.data.benefitsList.filter(
                (asset) => asset.code === 'giftcard'
            )
            setGiftcards(newData)
            setOriginalCards(newData)
        }

        fetchGiftcards()
    }, [])

    return (
        <div className='flex flex-col'>
            <input placeholder='Filter gift cards' onChange={handleChange}
                value={searchTerm}
                className='ml-auto mt-3 px-3 py-2 max-w-xs bg-white border shadow-sm 
                border-slate-300 focus:outline-none focus:border-purple-500
                w-full rounded-md sm:text-sm focus:ring-1' />

            <div className='flex flex-row mt-6 h-1/3 justify-between items-start'>
                <div>
                    <h3 className='text-2xl text-slate-700 font-medium'>
                        Pay with Gift Card
                    </h3>
                    <p className='text-slate-500 text-sm max-w-[250px]'>
                        Specify what kind of gift card you like to pay to
                    </p>
                </div>

                <div className='grid grid-cols-3 gap-6 max-h-10 justify-evenly items-center'>
                    {
                        giftcards.map((item) =>
                            <Giftcard
                                key={item.productId}
                                cardImg={item.logoUrls[0]}
                                name={item.name}
                                selected={item.productId === selected ? true : false}
                                handleClick={() => handleClick(item.productId)}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Giftcards