
import { filterByType } from '../../helpers/query'

export default function ServiceCard(props) {



  return (
    <div className={`w-full`}>
      <div className='font-bold text-lg text-center'>{props.country}</div>
      <div className='mt-4 border-t'>

        {!props.status ?
          <div className='text-center mt-4'>Loading data ...</div>
          :
          <div className='h-64 overflow-y-auto'>{
            // empty nonactive location
            props.country == "" ?
              <div>{"This is not a valid location"}</div> :
              // render filtered data and types
              props.type.map((i, index) => (
                
                <div key={index}>
                  <div className='font-bold border-l-8 px-2 border-gray-800 text-lg my-4'>{i}</div>

                  {filterByType(i, props.data).map((i, index) => (
                    <div className='border-t py-2' key={index}>
                      <div className=''>{i.name}</div>
                      <ul className="pl-2 border-l-2">
                      {i.name == "Mobile Money" ?
                      props.momo.map(j=>(
                        <li key={j.code}>{j.name}</li>
                      ))
                         : ""}
                    </ul></div>

                  ))}
                  

                </div>
                
                

              ))

             
              
              

          }</div>
        }
      </div>
    </div>

  )
}
