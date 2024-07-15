import {createContext, useState, useContext} from 'react'

const FoodContext=createContext()

const FoodProvider=({children})=>{
    const [food,setFood]=useState(null)
    return (
        <FoodContext.Provider value={{food,setFood}}>
            {
                children
            }
        </FoodContext.Provider>
    )
}
const useFoodContext=()=>{
    return useContext(FoodContext)
}
export {FoodProvider,useFoodContext}