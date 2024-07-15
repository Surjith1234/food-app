import React, { useEffect, useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useFoodContext } from '../../context/foodContext';
import axios from 'axios';
import Food from './Food';
const Recommendfood = () => {
  const [ratedfood,setRatedFood]=useState([]);
    const {food,setFood}=useFoodContext(null)
    const getFoods=async()=>{
        try{
          const res=await axios.get('http://localhost:5000/api/food/getTopRated')
        if(res.data.success)
        {
          setRatedFood(res.data.data.food)
        }
        }
        catch(err)
        {
          console.log(err)
        }
      }
      useEffect(()=>{
        getFoods()
      },[ratedfood])
  return (
    <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
        <div className='container mx-auto py-[2vh]'>
            <div className='text-2xl md:text-3xl font-bold text-center text-[#2e2e2e] lg:text:4xl'>
                Recommendate <span className='text-[#f54748]'>Food</span>
            </div>
            <div className='grid py-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {
                ratedfood.map(element=> <Food element={element}/>)
            }
        </div>
        </div>
    </div>
  )
}

export default Recommendfood