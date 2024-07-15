import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/cartContext'
import { useUserContext } from '../../context/userContext'
import { FaMinus, FaPlus } from 'react-icons/fa'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyOrder = () => {
    const {cartItems,addToCart,removeItem}=useCartContext()
    const {user,setUser}=useUserContext()
    const [order,setOrder]=useState([])

    const getMyOrders=async()=>{
        try{
           
            const  res=await axios.post('http://localhost:5000/api/order/getorder',{
              userId:user.user._id,
              token:localStorage.getItem("token")
            },{
              headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
              }
            })
            console.log(res.data.data)
            if(res.data.success)
            {
              setOrder(res.data.data)
            }
            else{
              toast.error(res.data.message)
            }
        }
        catch(err)
        {
            console.log(err)
            toast.error("something went wrong")
        }
    }
    useEffect(()=>{
        getMyOrders()
    },[])
    console.log(order+"fd")
  return (
    <div className=''>
    <div className='pt-14 h-screen'>
        <div className='container mx-auto py-6'>
            <div className='w-full bg-white px-10 py-5 text-black rounded-md'>
                <div className='flex justify-between border-b pb-8'>
                    <h1 className='font-semibold text-2xl'>
                        My food Cart
                    </h1>
                   
                </div>
                <div className='mt-10 flex mb-5'>
                   <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Food details</h3>
                   <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>category</h3>
                   <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Price</h3>
                   <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Total Price</h3>
                </div>
                {
                    order?.map((food)=>{
                        return(
                        <CartFood food={food}/>
                        )
                  }  )
                }
               
            </div>
        </div>

    
</div>
</div>
  )
}

export default MyOrder



const CartFood=({food})=>{
    const {cartItems,addToCart,removeItem}=useCartContext()
    return(
        <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div className='flex w-2/5'>
                <div className='grid grid-cols-3'>
                    {
                        food.items.map((item)=><>
                        <div className='flex flex-col justify-between ml-4 flex-grow'>
                            <div>
                                <img src={item.food.foodImage} className='h-20'/>
                            </div>
                            <span className='font-bold text-sm'>
                                  {item.food.name}
                            </span>
                            <span className='font-bold text-sm'>
                                qty:<span className='text-red-500 px-3 py-2 bg-slate-50 text-lg font-medium'>{item?.qty}</span>
                            </span>
                        </div>
                        </>)
                    }
                    <img src={food?.foodImage} alt="" className='h-20'/>
                </div>
                <div className='flex flex-col justify-between ml-4 flew-grow'>
                <span className='font-bold text-sm'>{food.name}</span>
                <span className='flex items-center space-x-4'>
                    {/* <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative'>
                        <FaMinus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={()=>removeItem(food)}/>
                    </div>
                    <span className='text-red-500 px-3 py-2 bg-scale-100 text-lg font-medium'>{food.qty}</span>
                    <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative'>
                        <FaPlus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={()=>addToCart(food)}/>
                    </div> */}
                </span>

            </div>
            </div>
            
            <div className='flex justify-center w-1/5 cursor-pointer'>
                {
                    food.payment===false&&<span className='font-bold text-sm'>Not paid</span>
                }
                {
                    food.payment&&<span className='font-bold text-green-600 text-sm'>Paid</span>
                }
                </div>
            <div className='flex justify-center w-1/5 cursor-pointer'>
                
                <span className='font-bold text-sm'>{food.status}</span>
                
               
                </div>
                <span className='font-bold text-center w-1/5 text-sm'>
                    {food.createdAt}
                </span>
                <span className='font-bold text-center w-1/5 text-sm'>
                    {food.totalAmount}
                </span>
            
        </div>
    )
}