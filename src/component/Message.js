import React,{useEffect,useState} from 'react'
import Sidebar from './Sidebar';


const Message = () => {
  let data=useSelector((state)=>state.userLoginInfo.userInfo)
  let [acceptGroup,setAcceptGroup]=useState([])
  let [myGrouplist,setMyGrouplist]=useState([])
  const db = getDatabase();

useEffect(()=>{
  const acceptGroupRef = ref(db, 'AccpetGroup/');
  onValue(acceptGroupRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      if(data.uid!=item.val().adminid){

        arr.push(item.val())
      }
    })
    setAcceptGroup(arr)
  });
},[])
useEffect(()=>{
  const groupcreateRef = ref(db, 'groupcreate/');
  onValue(groupcreateRef, (snapshot) => {
    let arr=[]
    snapshot.forEach((item)=>{
      if(data.uid==item.val().adminid){

        arr.push(item.val())
      }
    })
    setMyGrouplist(arr)
  });
},[])
  
  return (
    <div className='flex'>
    <div className='w-[186px]'>
        <Sidebar/>
    </div>
    <div className='w-[400px] ml-5'>
    {myGrouplist.map((item)=>(
        <div className='flex w-full items-center gap-x-4 py-3.5 border-b '>
        <div className='w-20%'>
            <img src="images/group.png" alt="" />
        </div>
        <div className='w-[60%]'>
        <h2 className='font-poppins font-normal text-sm'>{item.admin}</h2>
            <h2 className='font-poppins font-semibold text-xl'>{item.Groupname}</h2>
        <h2 className='font-poppins font-normal text-sm'>Hi Guys, Wassup!</h2>
        </div>
     <div className='flex justify-end w-[20%]'>
     <button  className='font-poppins  text-xl bg-primary p-2 text-white rounded-lg '>Block</button>
     </div>
</div>
    ))}
    {acceptGroup.map((item)=>(

    <div className='flex w-full items-center gap-x-4 py-3.5 border-b '>
            <div className='w-20%'>
                <img src="images/group.png" alt="" />
            </div>
            <div className='w-[60%]'>
            <h2 className='font-poppins font-normal text-sm'>{item.admin}</h2>
                <h2 className='font-poppins font-semibold text-xl'>{item.groupname}</h2>
            <h2 className='font-poppins font-normal text-sm'>Hi Guys, Wassup!</h2>
            </div>
         <div className='flex justify-end w-[20%]'>
         <button  className='font-poppins  text-xl bg-primary p-2 text-white rounded-lg '>Block</button>
         </div>
    </div>
    ))}
    </div>
  
    </div>
  )
}

export default Message