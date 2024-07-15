import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const Addfood = () => {
  const [image,setImage]=useState({})
  const [uploading,setUploading]=useState(false);
  const handleImage=async(e)=>{
    const file=e.target.files[0]
    let formData=new FormData()
    formData.append('image',file)
    setUploading(true)
    try{
          const {data}=await axios.post('http://localhost:5000/api/img/upload-image',formData)
          setUploading(false)
          setImage({
           url:data.url,
           public_id:data.public_id
          })
          if(uploading===false)
          {

            toast.success('successfully uploaded')
          }
      }
        catch(err)
        {
          console.log(err)
        }
        console.log(image)
  }
  const handlesubmit=async(e)=>{
    const form=e.target;
    const name=form.name.value;
    const price=form.price.value;
    const category=form.category.value;
    const weight=form.weight.value;
    const location=form.location.value;
    const description=form.description.value;
    const foodImage=image?.url
    const foodData={name,price,foodImage,category,location,description,weight}
    const res=await axios.post("http://localhost:5000/api/food/addfood",{name,price,foodImage,category,location,description,weight},{
      headers:{
        Authorization:`Bearer ${localStorage.getItem("token")}`
      }
    })
    if(res.data.success)
    {
      toast.success(res.data.message)
      form.reset()
    }
    else{
      toast.error(res.data.message)
    }
  }
  return (
    <div className='addfood'>
        <div className='w-full  mx-auto pt-[25vh]  h-[100%] '>
           <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80
             lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handlesubmit}>
          
                <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-5'>
                <input type='text' placeholder='Enter food name' name="name" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               
               
                
            <input type="file" name='myFile' className="file-input text-white file-input-bordered bg-red-500 w-full file-input-md" onChange={handleImage}/>
               
               
           
          
                <input type='number' placeholder='Enter price' name="price" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
              
               <select className="select bg-red-500 text-white select-md w-full max-w-xs" name="category">
                <option disabled selected>Category</option>
                <option>Rice</option>
                <option>Desert</option>
                <option>Drinks</option>
                <option>Fruits</option>
                <option>Chicken</option>
                <option>Mutton</option>
                </select>
                <input type='number' placeholder='Enter weight' name="weight" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                <input type='text' placeholder='Enter location' name="location" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                <textarea className='textarea textarea-ghost shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline col-span-2' placeholder='description' name='description'></textarea>
                </div>
            <button className='bg-[#f54748] active:scale-90 transition duration-150 tranform
               hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3' type='submit'>Add Food</button>
             <ToastContainer/>
           </form>
      </div>
    </div>
  )
}

export default Addfood