import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageNavigation from '../components/PageNavigation';
import axios from 'axios';

const FoodPage = () => {
    const {id}=useParams();
    console.log(id+"hcgt")
    const [foodDetails,setfoodDetails]=useState([])
    const getfooddetails=async()=>{
        try{
            const res=await axios.get(`http://localhost:5000/api/food/getfood/${id}`)
    if(res.data.success)
    {
      setfoodDetails(res.data.data.food)
    }
        }catch(err)
        {
            console.log(err);
        }
    }
    useEffect(()=>
    {
      getfooddetails()
    },[])
    console.log(foodDetails+"hii")
  return (
    <div className='pt-[16vh]'>
        <div className='py-3 px-10 sm:px-4 md:px-6 lg:px-6'>
           <div className='container mx-auto'>
                 <PageNavigation title={foodDetails.name}/>
           </div>
        </div>
    </div>
  )
}

export default FoodPage