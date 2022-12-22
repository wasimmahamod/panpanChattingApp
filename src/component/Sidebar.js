import React, { useState } from 'react';
import {FaCloudUploadAlt} from 'react-icons/fa'
import {AiOutlineHome,AiOutlineSetting} from 'react-icons/ai'
import {BiMessageSquareDetail} from 'react-icons/bi'
import {BsBell} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth, updateProfile,signOut } from "firebase/auth";
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";

const Sidebar = () => {
  const auth = getAuth();
  const storage = getStorage();
  let [modalShow,setModalShow]=useState(false)
  let data=useSelector((state)=>state.userLoginInfo.userInfo)
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let handleLogOut=()=>{
    signOut(auth).then(() => {
      dispatch(userLoginInfo(null));
      localStorage.removeItem('userInfo');
      navigate('/login');

    }).catch((error) => {
    });
  }
  // img upload profile picture 
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropper.getCroppedCanvas().toDataURL();
    uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
     
        updateProfile(auth.currentUser,{
         photoURL:downloadURL,
        }).then(()=>{
          setModalShow(false)
          setImage('');
          setCropData('')
          setCropper('')

        })
      });
    });
    }
  };
  let handleUploadShow=()=>{
    setModalShow(!modalShow)
  }
  // img upload end

  return (
    <>
    {modalShow
    ?
    <div className='w-full h-screen absolute top-0 left-0 bg-primary z-50 flex justify-center items-center'>
      <div className='w-2/4 bg-white p-10 rounded-md'>
        <h3 className='font-poppins text-2xl text-primary font-semibold mb-5'>Upload Your Profile Photo</h3>
        {image ? 
         
         <div className='w-28 h-28 rounded-full overflow-hidden mx-auto'>
         <div
           className="img-preview w-full h-full"/>
         </div>:
        <div className='w-28 h-28 rounded-full overflow-hidden mx-auto'>
            <img className='w-full h-full rounded-full'  src="images/demoprofile.png"/>
        </div>
         }
        <input onChange={onChange}  className='font-poppins text-xl text-primary font-semibold' type="file" />
        {image
        &&
        <div>
        <Cropper
          style={{ height: 300, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        </div>
        }
      
      
        <div className='mt-5'>
        <button onClick={getCropData} className='bg-primary p-2.5 rounded-sm text-white font-poppins '>Upload</button>
        <button onClick={()=>setModalShow(false)} className='bg-red-500 p-2.5 rounded-sm text-white font-poppins ml-5'>Go Back</button>
        </div>
      </div>
    </div>
    :
    <div className='w-full h-screen rounded-3xl bg-primary'>
    <div className='flex justify-center'>
          <div className='group mt-8 w-[80px] h-[80px] rounded-full overflow-hidden relative'>
          <img className='' src={data.photoURL} alt="" />
            <div onClick={handleUploadShow} className='absolute top-0 left-0 bg-[rgba(0,0,0,.4)] w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-100'>
              <FaCloudUploadAlt className='text-white text-2xl '/>
            </div>
          </div>
        </div>
        <h2 className='flex justify-center font-poppins font-semibold text-white text-2xl mt-5'>{data.displayName}</h2>
        <div className="mt-[80px] relative z-[1] after:bg-white after:absolute after:top-[-15px] after:right-0 after:w-[161px] after:h-[89px] after:content[''] after:z-[-1] after:rounded-tl-xl after:rounded-bl-xl flex justify-center items-center">
        <AiOutlineHome className='text-5xl text-primary '/>
        </div>
        <div className="mt-[80px] relative z-[1] after:bg-none after:absolute after:top-[-15px] after:right-0 after:w-[161px] after:h-[89px] after:content[''] after:z-[-1] after:rounded-tl-xl after:rounded-bl-xl flex justify-center items-center">
        <BiMessageSquareDetail className='text-5xl text-[#BAD1FF] '/>
        </div>
        <div className="mt-[80px] relative z-[1] after:bg-none after:absolute after:top-[-15px] after:right-0 after:w-[161px] after:h-[89px] after:content[''] after:z-[-1] after:rounded-tl-xl after:rounded-bl-xl flex justify-center items-center">
        <BsBell className='text-5xl text-[#BAD1FF]  '/>
        </div>
        <div className="mt-[80px] relative z-[1] after:bg-none after:absolute after:top-[-15px] after:right-0 after:w-[161px] after:h-[89px] after:content[''] after:z-[-1] after:rounded-tl-xl after:rounded-bl-xl flex justify-center items-center">
        <AiOutlineSetting className='text-5xl text-[#BAD1FF]  '/>
        </div>
        <div className="mt-[80px] relative z-[1] after:bg-none after:absolute after:top-[-15px] after:right-0 after:w-[161px] after:h-[89px] after:content[''] after:z-[-1] after:rounded-tl-xl after:rounded-bl-xl flex justify-center items-center">
        <FiLogOut onClick={handleLogOut}  className='text-5xl text-[#BAD1FF]  '/>
        </div>
      </div>
    }
    </>
   
  )
}

export default Sidebar