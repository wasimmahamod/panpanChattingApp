import React, { useEffect, useState } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroups = () => {
  const db = getDatabase();
  let [requestShow, setRequestShow] = useState(false);
  let [myGroup, setMygroup] = useState([]);
  let [Grouprequest, setGrouprequest] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(()=>{
    const myGroupRef = ref(db, 'Group/' );
    onValue(myGroupRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().adminid){
          arr.push({...item.val(),id:item.key})
        }
      })
      setMygroup(arr)
    });
  },[])
  let handleGroupRequestShow=(Gitem)=>{
    setRequestShow(true)
    const starCountRef = ref(db, 'groupjoin/');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach((item)=>{
        if(data.uid==item.val().adminid&&Gitem.id==item.val().groupid){
          arr.push(item.val())
        }
      })
      setGrouprequest(arr)
    });
  }
  return (
    <div className="mt-5 relative h-[340px] shadow-lg	w-full overflow-y-scroll	">
      <div className="relative">
        <h2 className="font-poppins font-semibold text-xl mb-4">My Group</h2>
        {requestShow
        &&
        <button onClick={()=>setRequestShow(false)} className="absolute top-0 right-3 font-poppins font-semibold text-xl p-1.5 bg-primary text-white rounded cursor-pointer">
          Go back
        </button>
        }
      </div>

      {requestShow
      ?
      Grouprequest.map((item)=>(
     <div className="flex w-full items-center gap-x-4 py-3.5 border-b ">
     <div>
       <img src="images/group.png" alt="" />
     </div>
     <div>
       <h2 className="font-poppins font-normal text-sm">Admin:{item.admin}</h2>
       <h2 className="font-poppins font-semibold text-xl">{item.username}</h2>

     </div>
     <div>
       <button className="font-poppins  text-xl bg-primary p-2 text-white rounded-lg ">
         Aceept
       </button>
       <button className="font-poppins  text-xl bg-red-500 p-2 text-white rounded-lg mt-2">
         Delete
       </button>
     </div>
     </div>
      ))
      :
      myGroup.length==0
      ?
      <h1 className='bg-red-500 font-poppins font-semibold text-2xl text-white p-2.5'>No Group  Found</h1>
      :
      myGroup.map((item)=>(
        <div className="flex w-full items-center gap-x-4 py-3.5 border-b ">
          <div>
            <img src="images/group.png" alt="" />
          </div>
          <div>
            <h2 className="font-poppins font-normal text-sm">Admin:{item.admin}</h2>
            <h2 className="font-poppins font-semibold text-xl">{item.Groupname}</h2>
            <h2 className="font-poppins font-normal text-sm">{item.Grouptag}</h2>
          </div>
          <div>
            <button onClick={()=>handleGroupRequestShow(item)} className="font-poppins  text-xl bg-primary p-2 text-white rounded-lg ">
              Request
            </button>
            <button className="font-poppins  text-xl bg-red-500 p-2 text-white rounded-lg mt-2">
              Delete
            </button>
          </div>
        </div>
        ))
      }
    </div>
  );
};

export default MyGroups;
