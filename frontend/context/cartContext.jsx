import {createContext, useState, useContext} from 'react'

const cartContext=createContext()

const CartProvider=({children})=>{
    const [food,setFood]=useState(null)
    const [cartItems,setCartItems]=useState([])
    const [cart,setCart]=useState([])
    const addToCart=(food)=>{
        const exist=cartItems.find((x)=>x._id===food._id)
        if(exist)
        {
            setCartItems(
                cartItems.map((x)=>x._id===food._id?{...exist,qty:exist.qty+1}:x)
            )
        }
        else{
            setCartItems(
                [...cartItems,{...food,qty:1}]
            )
        }
    }
    console.log(cartItems+"swd")
    const removeItem=(food)=>{
        const exist=cartItems.find((x)=>x._id===food._id)
        if(exist.qty===1)
        {
            setCartItems(
                cartItems.filter((x)=>x._id!==food._id)
            )
        }
        else{
            setCartItems(
                cartItems.map((x)=>x._id===food._id?{...exist,qty:exist.qty-1}:x)
            )
        }
    }
    return (
        <cartContext.Provider value={{cartItems,addToCart,removeItem}}>
            {
                children
            }
        </cartContext.Provider>
    )
}
const useCartContext=()=>{
    return useContext(cartContext)
}
export {CartProvider,useCartContext}