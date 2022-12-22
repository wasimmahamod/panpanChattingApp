import React, { useEffect, useState } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue,set,push, remove} from "firebase/database";
import { useSelector } from 'react-redux';
const FirendList = () => {
  const db = getDatabase();
  let data=useSelector((state)=>state.userLoginInfo.userInfo);
  let [friendList,setfriendList]=useState([])

  useEffect(()=>{
    const friendRef = ref(db,'friend/');
    onValue(friendRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().senderid||data.uid==item.val().reciverid)
        arr.push({...item.val(),id:item.key})
      })
      setfriendList(arr)
    });
  },[])
  let handleBlock=(item)=>{

    if(data.uid==item.senderid){
      set(push(ref(db, 'block/')), {
        block:item.recivername,
        blockid:item.reciverid,
        blockby:data.displayName,
        blockbyid:data.uid,
      }).then(()=>{
        remove(ref(db, 'friend/'+item.id))
      })
    }else if(data.uid==item.reciverid){
      set(push(ref(db, 'block/')), {
        block:item.sendername,
        blockid:item.senderid,
        blockby:data.displayName,
        blockbyid:data.uid,
      }).then(()=>{
        remove(ref(db, 'friend/'+item.id))
      })
    }
  }
  return (
    <div className="mt-5 relative h-[430px] shadow-lg	w-full overflow-y-scroll	">
      <BsThreeDotsVertical className="absolute top-2 right-3 text-xl" />
      <h2 className="font-poppins font-semibold text-xl mb-4">Friends</h2>
      {friendList.map((item)=>(

      <div className="flex w-full items-center gap-x-4 py-3.5 border-b ">
        <div className="w-20%">
          <img src="images/group.png" alt="" />
        </div>
        <div className="w-[60%]">
          {data.uid==item.senderid
          ?
          <h2 className="font-poppins font-semibold text-xl">{item.recivername}</h2>
          :
          <h2 className="font-poppins font-semibold text-xl">{item.sendername}</h2>
          }

          <h2 className="font-poppins font-normal text-sm">Hi Guys, Wassup!</h2>
        </div>
        <div className="flex justify-end w-[20%]">
          <button onClick={()=>handleBlock(item)} className="font-poppins  text-xl bg-primary p-2 text-white rounded-lg ">
            Block
          </button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default FirendList;
