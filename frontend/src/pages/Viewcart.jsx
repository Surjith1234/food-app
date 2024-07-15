import React from 'react'
import { useCartContext } from '../../context/cartContext'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';
const Viewcart = () => {
    const {cartItems,addToCart,removeItem}=useCartContext()
    console.log(cartItems+"ewd")
    const itemsPrice=cartItems.reduce((a,c)=>a+c.qty+c.price,0)
    const taxPrice=itemsPrice*0.14;
    const shippingPrice=itemsPrice>2000?0:20
    const totalPrice=itemsPrice+shippingPrice+taxPrice
  return (
    <div className='pt-14'>
        <div className={cartItems.length===0?'bg-gray-100 h-96':'bg-gray-100'}>
            <div className='container mx-auto py-6'>
                <div className='w-full bg-white px-10 py-5 text-black rounded-md'>
                    <div className='flex justify-between border-b pb-8'>
                        <h1 className='font-semibold text-2xl'>
                            My food Cart
                        </h1>
                        <h2 className='font-semibold text-2xl'>
                            {cartItems.length||0}
                        </h2>

                    </div>
                    <div className='mt-10 flex mb-5'>
                       <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Food details</h3>
                       <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>category</h3>
                       <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Price</h3>
                       <h3 className='font-semibold text-gray-900 text-x uppercase w-2/5'>Total Price</h3>
                    </div>
                    {
                        cartItems?.map((food)=>{
                            return(
                            <CartFood food={food}/>
                            )
                      }  )
                    }
                    <div className={cartItems.length===0?"mx-auto hidden items-end justify-center px-6 flex-col":"mx-auto justify-center px-6 flex-col"}>
                        <div className='text-right mb-2 font-semibold text-red-900'>Shipping :{shippingPrice}</div>
                        <div className='text-right mb-2 font-semibold text-red-900'>Total Price :{totalPrice}</div>
                        <Link to='/order'>
                        <button className='btn text-right ml-auto text-white hover:bg-red-600 hover:border-red-600 btn-sm bg-red-500'>
                              Check Out
                        </button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Viewcart

const CartFood=({food})=>{
    const {cartItems,addToCart,removeItem}=useCartContext()
    return(
        <div className='flex items-center hover:bg-gray-100 -mx-8 px-6 py-5'>
            <div className='flex'>
                <div className='w-20'>
                    <img src={food?.foodImage} alt="" className='h-20'/>
                </div>
                <div className='flex flex-col justify-between ml-4 flew-grow'>
                <span className='font-bold text-sm'>{food.name}</span>
                <span className='flex items-center space-x-4'>
                    <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative'>
                        <FaMinus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={()=>removeItem(food)}/>
                    </div>
                    <span className='text-red-500 px-3 py-2 bg-scale-100 text-lg font-medium'>{food.qty}</span>
                    <div className='shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-4 rounded-full relative'>
                        <FaPlus size={20} className='absolute font-semibold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' onClick={()=>addToCart(food)}/>
                    </div>
                </span>

            </div>
            </div>
            
            <div className='flex justify-center w-1/5 cursor-pointer'>
                <span className='font-bold  text-sm'>
                    {
                        food?.category
                    }
                </span>
                </div>
                <span className='font-bold text-center w-1/5 text-sm'>
                    {food.price}{food.qty}
                </span>
                <span className='font-bold text-center w-1/5 text-sm'>
                    {food.qty*food.price}
                </span>
            
        </div>
    )
}