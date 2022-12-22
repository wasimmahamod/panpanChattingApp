import React, { useEffect, useState } from "react";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const FirendRequest = () => {
  const db = getDatabase();
  let [friendrequestlist, setFriendrequestlist] = useState([]);
  let data = useSelector((state) => state.userLoginInfo.userInfo);

  useEffect(() => {
    const FirendRequestRef = ref(db, "friendrequest/");
    onValue(FirendRequestRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().reciverid) {
          arr.push({...item.val(),id:item.key});
        }
      });
      setFriendrequestlist(arr);
    });
  },[]);
  let handlefriendaccept=(item)=>{
    set(push(ref(db, 'friend/')), {
      ...item
    }).then(()=>{
      remove(ref(db, 'friendrequest/'+item.id),)
    })
  }
  return (
    <div className="mt-11 relative h-[340px] shadow-lg	w-full overflow-y-scroll	">
      <BsThreeDotsVertical className="absolute top-2 right-3 text-xl" />
      <h2 className="font-poppins font-semibold text-xl mb-4">
        Friend Request
      </h2>
      {friendrequestlist.length==0
      ?
      <h1 className='bg-red-500 font-poppins font-semibold text-2xl text-white p-2.5'>No Friend request  Found</h1>
      :
      friendrequestlist.map((item) => (
        <div className="flex w-full items-center gap-x-4 py-3.5 border-b ">
          <div>
            <img src="images/group.png" alt="" />
          </div>
          <div>
            <h2 className="font-poppins font-semibold text-xl">
              {item.sendername}
            </h2>

            <h2 className="font-poppins font-normal text-sm">
              Hi Guys, Wassup!
            </h2>
          </div>
          <button onClick={()=>handlefriendaccept(item)} className="font-poppins  text-xl bg-primary p-2 text-white rounded-lg ml-5">
            Accept
          </button>
        </div>
      ))
      }
    </div>
  );
};

export default FirendRequest;
