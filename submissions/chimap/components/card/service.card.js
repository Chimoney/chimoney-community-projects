
import { filterByType } from '../../helpers/query'

export default function ServiceCard(props) {



  return (
    <div className=' h-64 overflow-y-auto w-full p-2'>
      <div className='font-bold text-lg text-center'>{props.country}</div>
      <div className='mt-4 border-t'>

        {!props.status ?
          <div className='text-center mt-4'>Loading data ...</div>
          :
          <div>{
            // empty nonactive location
            props.country==""?
            <div>{"This is not a valid location"}</div>:
            // render filtered data and types
            props.type.map((i, index) => (
              <div key={index}>
                <div className='font-bold border-l-8 px-2 border-black text-lg my-4'>{i}</div>

                {filterByType(i, props.data).map((i, index) => (
                  <div className='border-t py-2' key={index}>{i.name}</div>

                ))}

              </div>
            ))

          }</div>
        }
      </div>
    </div>

  )
}
