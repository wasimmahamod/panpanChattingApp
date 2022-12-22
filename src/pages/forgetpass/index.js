import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from 'react-router-dom';




const Forgetpassword = () => {
  let navigate =useNavigate()
  const auth = getAuth();
  let [forgetemail,setForgetemail]=useState('')
  let [forgetemailerr,setForgetemailerr]=useState('')

  let handleForgetpassword=(e)=>{
    setForgetemail(e.target.value)
  }
  let handleSubmit=()=>{
    if(!forgetemail){
      setForgetemailerr('Email Required')
    }
    sendPasswordResetEmail(auth, forgetemail)
  .then(() => {
   setTimeout(() => {
     navigate('/login')
   }, 2000);
  })
  .catch((error) => {
    console.log(error.code)
  });
  }
  return (
    <div className='w-full bg-primary h-screen flex justify-center items-center'>

    <div className='bg-white p-5 rounded-sm w-96'>
    <h3 className='font-nunito text-4xl text-primary font-bold'>Forget Passowrd</h3>
    <div className='relative mt-10'>
       <input onChange={handleForgetpassword} className='border border-solid border-secondary w-full	py-6 rounded-lg	' type="email"/>
       {forgetemailerr && <p className='text-poppin text-white bg-red-600 w-full p-2.5'>{forgetemailerr}</p>}
       <p className='font-nunito font-samilod text-sm text-primary absolute top-[-10px] left-[34px] bg-white px-[18px]'>Email Address</p>
       </div>
       <button onClick={handleSubmit} className=' bg-primary text-white rounded-sm font-nunito samibold py-5 mt-5 px-7'>Update Password</button>
       <button  className=' bg-primary text-white rounded-sm font-nunito samibold py-5 mt-5 px-5 ml-1'><Link to='/login'>Back To Login</Link></button>
    </div>
</div>
  )
}

export default Forgetpassword