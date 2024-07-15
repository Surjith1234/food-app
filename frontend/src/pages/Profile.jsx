import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../../context/userContext';

const Profile = () => {
   const {user,setUser}=useUserContext()
   console.log(user.user.email+" user3")
    const [image,setImage]=useState({})
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate()
  
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
      // const handlesubmit=async(e)=>{
      //   e.preventDefault()
      //   const form=e.target
      //   const name=form.name.value
      //   const email=form.email.value
      //   const country=form.country.value
      //   const city=form.city.value
      //   const state=form.state.value
      //   const zipcode=form.zipcode.value
      //   const profileImage=image?.url
       
      //   try{
      //     const res=await axios.put(
      //         'http://localhost:5000/api/user/updateprofile',
      //         {
      //            userId:user.user._id,
      //            name,
      //            email,
      //            country,
      //            city,
      //            state,
      //            zipcode,
      //            profileImage
      //         },{
      //             headers:{
      //                 Authorization:`Bearer ${localStorage.getItem("token")}`
      //             }
      //         }
      //     )
      //     if(res.data.success)
      //     {
      //         toast.success(res.data.message)
      //         from.reset()
      //       navigate('/')
      //     }
      //     else
      //     {
      //       toast.error(res.data.message)
      //     }
         
      // }
      // catch(err)
      // {
      //     console.log(err);
      // }
      // }
      const handlesubmit = async (e) => {
        e.preventDefault();
    
        // Ensure user is available before proceeding
        if (!user) {
            console.log("User data is not available");
            return;
        }
    
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const country = form.country.value;
        const city = form.city.value;
        const state = form.state.value;
        const zipcode = form.zipcode.value;
        const profileImage = image?.url;
    
        try {
            const res = await axios.put(
                'http://localhost:5000/api/user/updateprofile',
                {
                    userId: user._id, // Assuming user is directly available here, without the need for user.user
                    name,
                    email,
                    country,
                    city,
                    state,
                    zipcode,
                    profileImage
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
    
            if (res.data.success) {
                toast.success(res.data.message);
                form.reset(); // Reset the form upon successful submission
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    
  return (
     <div className='profile'>
         <div className='w-full  mx-auto pt-[16vh]  h-[100%] '>
            <form className='ease-in duration-300 w-max w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-white/80
              lg:w-max mx-auto rounded-md px-8 py-5' onSubmit={handlesubmit}>
             <label htmlFor='file-upload' className='custom-file-upload'>
                 <img src={user.user.profileImage} alt="" className='h-32 w-32 bg-contain rounded-full mx-auto cursor-pointer'/></label>
                 <label className='block text-center text-gray-900 text-base mb-2'>Profile Picture</label>
                <input type='file' label='Image' name='myFile' id='file-upload'  accept='.jpeg, .png, .jpg' className='hidden' onChange={handleImage}/>
                <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-4 mb-5'>
                <input type='text' placeholder={user.user.name}  name="name" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                <input type='email' disabled placeholder={user.user.email} name="email" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               <input type='text' placeholder={user.user.country||"country"} name="country" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                 <input type='text' placeholder={user.user.city||"city"} name="city" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                 <input type='text' placeholder={user.user.state||"state"} name="state" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
                 <input type='text' placeholder={user.user.zipcode||"zipcode"} name="zipcode" className='shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></input>
               
            </div>
             <button className='bg-[#f54748] active:scale-90 transition duration-150 tranform
               hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3' type='submit'>Update Profile</button>
             <ToastContainer />
           </form>
      </div>
     </div>
    
  )
}

export default Profile