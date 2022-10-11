const Giftcard = ({ cardImg, name }) => {
    return (
        <div className='flex flex-col overflow-hidden justify-between
             rounded-lg w-[200px] min-h-[200px] border hover:bg-purple-50/0.9
             hover:cursor-pointer hover:scale-105 shadow-sm animate-slideup transition-all'>
            <img
                src={cardImg}
                alt={name}
                className='max-h-[50%]'
            />

            <p className='text-slate-700 break-normal 
                        font-semibold text-sm px-2 py-4 text-center'>
                {name}
            </p>
        </div>
    )
}

export default Giftcard