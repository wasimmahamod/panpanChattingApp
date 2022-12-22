import React, { useEffect, useState } from "react";
import Sidebar from './component/Sidebar'
import Search from './component/Search'
import JoinGroup from './component/JoinGroup'
import FirendRequest from './component/FirendRequest'
import FirendList from './component/FirendList'
import MyGroups from './component/MyGroups'
import UserList from './component/UserList'
import BlockedUser from './component/BlockedUser';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { userLoginInfo } from "./slices/userSlice";

function App() {
  let [verify,setVerify]=useState(false)
  let dispatch=useDispatch()
  const auth = getAuth();
  let navigate=useNavigate()
  let data=useSelector((state)=>state.userLoginInfo.userInfo)

  onAuthStateChanged(auth, (user) => {
    if(user.emailVerified){
      setVerify(true)
      dispatch(userLoginInfo(user))
      localStorage.setItem('userInfo',JSON.stringify(user))
    }
  });
  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
 

  },[])

  return (
    <>
    {verify
    ?
    <div className='flex justify-evenly'>
    <div className='w-[186px]'>
      <Sidebar/>
    </div>
    <div className='w-[25%]'>
      <Search/>
      <JoinGroup/>
      <FirendRequest/>
    </div>
    <div className='w-[25%]'>
      <FirendList/>
      <MyGroups/>
    </div>
    <div className='w-[25%]'>
      <UserList/>
      <BlockedUser/>
    </div>
  </div>
    :
    <div className="w-full h-screen bg-primary flex justify-center items-center">
      <h1 className="font-poppins text-white font-2xl font-semibold ">Please verify Your Email </h1>
    </div>
    }
 
    
    </>
  );
}

export default App;
