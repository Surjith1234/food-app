import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import header from '../assets/banner.jpg'
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="py-3 px-10 sm:px-4 md:px-6 lg:px-6">
    <div className="container mx-auto py-[16vh]">
      <div className="grid grid-cols-1 relative lg:grid-cols-2 gap-8 items-center">
        <div className="lg:w-[32rem] w-full flex flex-col space-y-6">
          <div className="text-4xl md:text-5xl font-bold text-[#2e2e2e] lg:text-6xl"> 
           <span className="text-[#Fdc55e]">Food</span>  <span className="text-[#Fdc55e]">Delivery</span>
          </div>
          <div className='lg:text-xl text-[#191919] md:text-lg '>Explore an extensive array of cuisines, from traditional favorites to trendy fusion creations. Our curated selection of dishes caters to every palate, ensuring there's something delightful for everyone.</div>
            <div className='flex rounded-full py-2 px-4 justify-between items-center bg-white'>
              <div className='flex items-center'>
                <FaSearch size={22} className='cursor-pointer'/>
                <input type='text' placeholder='Search your foods here---' className=' w-full border-none outline-none py-2 px-4'/>
              </div>
              <div className='h-10 w-10 relative bg-[#fdc55e] rounded-full'>
              <FaSearch size={22} className='cursor-pointer text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
              </div>
            </div>
            <div className='flex flex-col sm:flex-row gap-8 items-center'>
              <Link to='/menu'>
                <button className='bg-[#f54748] active:scale-90 transition duration-500 transform
                hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white'> explore now</button></Link>
                <div className='flex gap-4 items-center'>
                   <div className='h-14 w-14 shadow-md cursor-pointer relative bg-white rounded-full'>
                     <FaPlay className='cursor-pointer text-[#f54748] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
                   </div>
                   <div className='lg:text-xl text-[#191919] md:text-lg text-base cursor-pointer'>
                    Watch now
                   </div>
                </div>
            </div>
        </div>
        <img src={header} className='h-[28rem] mx-auto justify-end'/>
      </div>
    </div>
  </div>
  )
}

export default Header