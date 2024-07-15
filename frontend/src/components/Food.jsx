import React from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'

const Food = ({element}) => {
  return (
    <div className='food-card flex flex-col cursor-pointer items-center p-5' >
    <div className='relative mb-3'>
      {/* <Link to={`/fooddetails/${element._id}`}>*/}
     <img src={element.foodImage} className='h-40 w-60 rounded-lg'/>
     {/* </Link> */}
       <div className='absolute top-2 left-2'>
      <button className='shadow-sm text-white bg-red-500 hover:gb-red-700 */}
     cursor-pointer p-5 rounded-full relative'> 
      <FaHeart className='absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
      </button>   
     </div>
     <div className='absolute bottom-2 right-2'>
        <button className='shadow-sm bottom-4 border-white text-white bg-[#fdc55e] cursor-pointer p-3 h-14 w-14 text-xl font-bold rounded-full relative'>
             <div className='absolute  text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' >{element.price}</div>
        </button>
     </div>
    </div>
    <div className='flex gap-4 items-center'>
      <p className='text-xl text-center font-bold text-[#f54748]'>
          {element.name}
      </p>
      <div className='flex text-sm space-x-2 cursor-pointer'>
            <span className='font-normal text-[#fdc55e]'>4.3</span>
            <FaStar size={16} className='text-yellow-500'/>
            <span className='font-medium'>({element.reviews.length})</span>
      </div>
    </div>
    <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white '>Order now</button>
</div>
  )
}

export default Food