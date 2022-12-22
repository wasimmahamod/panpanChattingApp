import React, { useEffect, useState } from 'react'
import {BsSearch,BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref, onValue,set,push, remove} from "firebase/database";
import { useSelector } from 'react-redux';


const BlockedUser = () => {
  const db = getDatabase();
  let data=useSelector((state)=>state.userLoginInfo.userInfo);
  let [blockList,setblockList]=useState([])

  useEffect(()=>{
    const blockRef = ref(db, 'block/');
    onValue(blockRef, (snapshot) => {
     let arr=[]
     snapshot.forEach((item)=>{
      if(data.uid==item.val().blockid){
       arr.push({
        id:item.key,
        block:item.val().blockby,
        blockid:item.val().blockbyid,
       })
      }else if(data.uid==item.val().blockbyid){
        arr.push({
          id:item.key,
          blockby:item.val().block,
          blockbyid:item.val().blockid,
         })
      }
     })
     setblockList(arr)
     
    });
  },[])
  let handleUnblock=(item)=>{
    set(push(ref(db, 'friend/')), {
    sendername:item.blockby,
    senderid:item.blockbyid,
    recivername:data.displayName,
    reciverid:data.uid,
    }).then(()=>{
      remove(ref(db, 'block/'+item.id))
    })
  }
  return (
    <div className='mt-5 relative h-[340px] shadow-lg	w-full overflow-y-scroll	'>
    <BsThreeDotsVertical className='absolute top-2 right-3 text-xl'/>
    <h2 className='font-poppins font-semibold text-xl mb-4'>Blocked Users</h2>
    {blockList.length==0
    ?
    <h1 className='bg-red-500 font-poppins font-semibold text-2xl text-white p-2.5'>No Blocked User Found</h1>
    :
    blockList.map((item)=>(
     <div className='flex w-full items-center gap-x-4 py-3.5 border-b '>
     <div>
         <img src="images/group.png" alt="" />
     </div>
     <div>
     <h2 className='font-poppins font-semibold text-xl'>{item.block}</h2>
     <h2 className='font-poppins font-semibold text-xl'>{item.blockby}</h2>
     <h2 className='font-poppins font-normal text-sm'>Hi Guys, Wassup!</h2>
     </div>
     {item.blockbyid
     &&
      <button onClick={()=>handleUnblock(item)}  className='font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5'>Unblock</button>
      }

   </div>
    ))
    }
 

   

        
      
    </div>
  )
}

export default BlockedUser