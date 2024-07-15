import React, { useState } from 'react'
import { useUserContext } from '../../context/userContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const [otp,setOtp]=useState(["","","","","",""])
    const {user}=useUserContext();
    const navigate=useNavigate();
    const handleInputChange=(index,value)=>{
        const newOtp=[...otp]
        newOtp[index]=value;
        setOtp(newOtp)
    }
    
    const combineOtp=parseInt(otp.join(''))
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const email=user?.user?.email;
        const dataOtp={email,combineOtp}
        fetch('http://localhost:5000/api/user/veifyotp',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(dataOtp)
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.success)
      {
        
        toast.success(data.message)
        location.reload()
        navigate('/')
      }
      else{
        toast.error(data.message)
      }
    })
    }
  return (
    <div className="relative pt-[15vh] flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className='relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto max-w-lg rounded-2xl'>
            <div className='max-auto flex w-full max-w-md flex-col space-y-16'>
                <div className='flex flex-col items-center justify-center text-center space-y-2'>
                  <div className='font-semibold text-3xl'>
                      <p>Email Verification</p>
                  </div>
                 <div className='flex flex-row text-sm font-medium text-gray-400'>
                   Verification mail send to your email {user?.user?.email}
                 </div>
                </div>
                  <div>
                    <form onSubmit={handlesubmit}>
                       <div className='flex flex-col space-y-16'> 
                          {
                            otp.map((digit,index)=>{
                                <input 
                                key={index} 
                                type='text' 
                                value={digit} 
                                maxLength="1"
                                onChange={(e)=>handleInputChange(index,e.target.value)} 
                                className='w-12 h-12 mx-2 border border-gray-900 rounded text-center text-xl'/>
                            })
                          }
                       </div>
                       <button className='w-full py-3 px-4 bg-red-700 pt-5' type='submit'>
                            Verify
                       </button>
                    </form>
                  </div>
            </div>
        </div>
        
    </div>
  )
}

export default VerifyOtp