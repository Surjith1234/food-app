import React, { useState } from 'react'
import Profile from '../assets/th.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [image,setImage]=useState({})
  const [uploading,setUploading]=useState(false);
  const navigate=useNavigate();
  const handlesubmit=async(e)=>{
    e.preventDefault()
    const from=e.target
    const name=from.name.value
    const email=from.email.value
    const password=from.password.value
    const confirmpassword=from.confirmpassword.value
    const profileImage=image?.url
    const userData={name,email,password,confirmpassword,profileImage}
    console.log(name)
    console.log()

    fetch('http://localhost:5000/api/user/register',{
      method:"Post",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(userData)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success)
      {
        localStorage.setItem("token",data.data.token),
        toast.success(data.message)
        from.reset()
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    })
  }
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
      }
        catch(err)
        {
          console.log(err)
        }

        console.log(image)

  }
  return (
    <div className='register'>
      <div className='w-full  mx-auto pt-[16vh]  h-[100%] '>
           <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80
             lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handlesubmit}>
            <label htmlFor='file-upload' className='custom-file-upload'>
                <img src={image?.url || Profile} alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer'/></label>
                <label className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
                <input type='file' label='Image' name='myFile' id='file-upload'  accept='.jpeg, .png, .jpg' className='hidden' onChange={handleImage}/>
                <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>
                    Name
                </label>
                <input type='text' placeholder='Enter your name' name="name" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               </div>
                <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>
                    Email
                </label>
                <input type='email' placeholder='Enter your email' name="email" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               </div>
            <div className='flex flex-col md:flex-row md:gap-4'>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>
                    Password
                </label>
                <input type='password' placeholder='****************' name="password" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               </div>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm mb-2'>
                   Confirm Password
                </label>
                <input type='password' placeholder='***************' name="confirmpassword" className='shadow-sm bg-white appearance-none border rounded w-full py-2 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               </div>
            </div>
            <button className='bg-[#f54748] active:scale-90 transition duration-150 tranform
               hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3' type='submit'>Register</button>
             <Link to='/login' className='text-[#fdc55e] text-center font-semibold w-full mb-3 py-2 px-4 rounded mt-4'>Already Account</Link>
             <ToastContainer/>
           </form>
      </div>
    </div>
  )
}

export default Register