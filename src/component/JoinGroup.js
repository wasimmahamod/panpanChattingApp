import React, { useState, useEffect } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const JoinGroup = () => {
  const db = getDatabase();
  let [groupshow,setGroupshow]=useState(false)
  let [groupname,setGroupname]=useState('')
  let [grouptag,setGrouptag]=useState('')
  let [grouplist, setGrouplist] = useState([]);
  let [groupJoinRequest, setGroupJoinRequest] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  let handleGroupCreate=()=>{
  set(push(ref(db, 'Group/')), {
    Groupname:groupname,
    Grouptag:grouptag,
    admin:data.displayName,
    adminid:data.uid,
  }).then(()=>{
    setGroupshow(false)
  })
  }
  useEffect(()=>{
    const myGroupRef = ref(db, 'Group/' );
    onValue(myGroupRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid!=item.val().adminid){
          arr.push({...item.val(),id:item.key})
        }
      })
      setGrouplist(arr)
    });
  },[])

  let handleGroupJoin=(item)=>{
    set(push(ref(db, 'groupjoin/')), {
      groupname:item.Groupname,
      grouptag:item.Grouptag,
      groupid:item.id,
      admin:item.admin,
      adminid:item.adminid,
      username:data.displayName,
      userid:data.uid,
    });
  }
  useEffect(()=>{
    const GroupRequestRef = ref(db, 'groupjoin/' );
    onValue(GroupRequestRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
      arr.push(item.val().adminid+item.val().groupid)
      })
      setGroupJoinRequest(arr)
    });
  },[])
  return (
    <div className="mt-11 relative h-[347px] shadow-lg	w-full overflow-y-scroll">
      <div className="relative">
        <h2 className="font-poppins font-semibold text-xl mb-4">
          Groups Request
        </h2>
        <button onClick={()=>setGroupshow(!groupshow)} className="absolute top-0 right-3 font-poppins font-semibold text-xl p-1.5 bg-primary text-white rounded cursor-pointer">Create Group</button>
      </div>
      {groupshow
      ?
      <>
      <input onChange={(e)=>setGroupname(e.target.value)} className='border border-solid border-secondary w-full p-2.5	 rounded-md	outline-0 mt-5' type="text" placeholder='Group Name' />
  
      <input onChange={(e)=>setGrouptag(e.target.value)} className='border border-solid border-secondary w-full p-2.5	 rounded-md	outline-0 mt-5' type="text" placeholder='Group Tag'/>
     
      <button onClick={handleGroupCreate} className=' w-full  bg-primary text-white rounded-md font-nunito samibold p-2.5 mt-5' >Create</button>
      </>
      :
      grouplist.length==0
      ?
      <h1 className='bg-red-500 font-poppins font-semibold text-2xl text-white p-2.5'>No Group  Found</h1>
      :
      grouplist.map((item)=>(
      <div className="flex w-full items-center gap-x-4 py-3.5 border-b ">
        <div>
          <img src="images/group.png" alt="" />
        </div>
        <div>
          <h2 className="font-poppins font-normal text-sm">Admin:{item.admin}</h2>
          <h2 className="font-poppins font-semibold text-xl">{item.Groupname}</h2>
          <h2 className="font-poppins font-normal text-sm">{item.Grouptag}</h2>
        </div>
        {groupJoinRequest.includes(item.adminid+item.id)||groupJoinRequest.includes(item.id+data.uid)
        ?
        <button onClick={()=>handleGroupJoin(item)} className="font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5">
        P
      </button>
      :
        <button onClick={()=>handleGroupJoin(item)} className="font-poppins font-semibold text-xl bg-primary p-2 text-white rounded-lg ml-5">
          Join
        </button>
        }
      </div>
      ))
      }
      
    </div>
  );
};

export default JoinGroup;
