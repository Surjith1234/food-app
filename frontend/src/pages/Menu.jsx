import React, { useEffect, useState } from 'react'
import { useFoodContext } from '../../context/foodContext.jsx';
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import { Link, useParams} from 'react-router-dom';
import { useUserContext } from '../../context/userContext.jsx';
import { useCartContext } from '../../context/cartContext.jsx';
const Menu = () => {
  
  const [active,setActive]=useState(0)
  const {food,setFood}=useFoodContext(null)
  const [value,setValue]=useState('all')
  const category=[
    {
      id: 0,
      name: 'All',
      value: 'all'
    },
    {
      id: 1,
      name: 'Rice',
      value: 'Rice'
    },
    {
      id: 2,
      name: 'Desert',
      value: 'Desert'
    },
    {
      id: 3,
      name: 'Drinks',
      value: 'Drinks'
    },
    {
      id: 4,
      name: 'Fruits',
      value: 'Fruits'
    },
    {
      id: 5,
      name: 'Chicken',
      value: 'Chicken'
    },
    {
      id: 6,
      name: 'Mutton',
      value: 'Mutton'
    },
    
  ]
  const handlebutton=(btn)=>{
    setActive(btn.id)
    setValue(btn.value)
  }
  const getFoods=async()=>{
    try{
      const res=await axios.get(`http://localhost:5000/api/food/getfood?category=${value}`)
    if(res.data.success)
    {
      setFood(res.data.data.food)
    }
    }
    catch(err)
    {
      console.log(err)
    }
  }
  useEffect(()=>{
    getFoods()
  },[value])
  console.log(food+"h")
  const {addToCart}=useCartContext()
  return (
    <div className='pt-[16vh]'>
        <div className='container mx-auto py-8'>
          <div className='p-5 mb-14'>
             <div className='flex flex-wrap justify-center mb-8 gap-5'>
                {
                  category?.map(btn=>(
                    <button className={active===btn.id?"text-xl px-4 py-3 text-center text-white bg-red-500 border-red-500 border-2 rounded-sm justify-center font-medium":"text-xl px-4 py-3 text-red-500 border-red-500 border-2 rounded-md font-medium"} onClick={()=>{
                      handlebutton(btn)
                    }}>{btn.name}</button>
                  ))
                }
             </div>
             <div className='grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
              {
                food?.map((element)=>(
                  <div className='food-card flex flex-col cursor-pointer items-center p-5' >
                  <div className='relative mb-3'>
                    <Link to={`/fooddetails/${element._id}`}>
                   <img src={element.foodImage} className='h-40 w-60 rounded-lg'/>
                   </Link>
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
                  <button className='bg-[#f54748] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white ' onClick={()=>addToCart(element)}>Add to cart</button>
              </div>
                ))
              }
             </div>
          </div>
        </div>
    </div>
  )
}
export default Menu

