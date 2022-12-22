import React, { useEffect, useState } from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref, onValue,set,push} from "firebase/database";
import { useSelector } from 'react-redux';
const UserList = () => {

  const db = getDatabase();
  let [userList,setUserlist]=useState([])
  let [friendrequestlist,setFriendrequestlist]=useState([])
  let [friendlist,setFriendlist]=useState([])
  let [blocklist,setBlocklist]=useState([])
  let data=useSelector((state)=>state.userLoginInfo.userInfo);
  useEffect(()=>{
    const usersRef = ref(db, 'users/' );
    onValue(usersRef, (snapshot) => {
     let arr=[]
     snapshot.forEach((item)=>{
      if(data.uid!=item.val().userid){
        arr.push(item.val())
      }
     })
     setUserlist(arr)
    });
  },[])
  let handleFriendreq=(item)=>{
    set(push(ref(db, 'friendrequest/')), {
      sendername:data.displayName,
      senderid:data.uid,
      recivername:item.username,
      reciverid:item.userid,
    });
  }
  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest/' );
    onValue(friendrequestRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      arr.push(item.val().senderid+item.val().reciverid)
    })
    setFriendrequestlist(arr)
    });
  },[])
  useEffect(()=>{
    const friendRef = ref(db, 'friend/' );
    onValue(friendRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      arr.push(item.val().senderid+item.val().reciverid)
    })
    setFriendlist(arr)
    });
  },[])
  useEffect(()=>{
    const blockRef = ref(db, 'block/' );
    onValue(blockRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      arr.push(item.val().blockid+item.val().blockbyid)
    })
    setBlocklist(arr)
    });
  },[])
  return (
    <div className='mt-5 relative h-[430px] shadow-lg	w-full overflow-y-scroll	'>
    <BsThreeDotsVertical className='absolute top-2 right-3 text-xl'/>
        <h2 className='font-poppins font-semibold text-xl mb-4'>User List</h2>
        {userList.map((item)=>(
           <div className='flex w-full items-center gap-x-4 py-3.5 border-b '>
           <div className='w-[20%]'>
               <div className='w-[60px] h-[60px]'>
               <img className='w-full h-full' src="images/group.png" alt="" />
               </div>
           </div>
           <div className='w-[60%]'>
           <h2 className='font-poppins font-semibold text-xl'>{item.username}</h2>
           <h2 className='font-poppins font-normal text-sm'>{item.email}</h2>
           </div>
           {blocklist.includes(data.uid+item.userid)||blocklist.includes(item.userid+data.uid)
           ?
           <div className='w-[20%] flex justify-end'>
           <button  className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5'>B</button>
           </div>
            :
            friendlist.includes(data.uid+item.userid)||friendlist.includes(item.userid+data.uid)
           ?
           <div className='w-[20%] flex justify-end'>
           <button  className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5'>F</button>
           </div>
          :
          friendrequestlist.includes(data.uid+item.userid)||friendrequestlist.includes(item.userid+data.uid)
          ?
          <div className='w-[20%] flex justify-end'>
          <button onClick={()=>handleFriendreq(item)} className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5'>P</button>
          </div>
          :
          <div className='w-[20%] flex justify-end'>
          <button onClick={()=>handleFriendreq(item)} className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5'>Join</button>
          </div>
            }
       </div>
        ))}
       
    </div>
  )
}

export default UserList