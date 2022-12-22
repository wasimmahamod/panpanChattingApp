import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification ,updateProfile } from "firebase/auth";
import { ProgressBar } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userLoginInfo} from '../../slices/userSlice'
import { getDatabase, push, ref, set } from "firebase/database";
const Singup = () => {
  const auth = getAuth();
  const db = getDatabase();
  let dispatch=useDispatch()
  // navigate link
  let navigate = useNavigate();
  // navigate link
  let [email, setEmail] = useState("");
  let [fullname, setFullname] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [fullnameerr, setFullnameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  // loader link
  let [loader, setLoader] = useState(false);
  // loader link end
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handleFullname = (e) => {
    setFullname(e.target.value);
    setFullnameerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };
  let handleSubmit = () => {
    if (!email) {
      setEmailerr("Email Required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid Email");
    }
    if (!fullname) {
      setFullnameerr("Full Name Required");
    }
    if (!password) {
      setPassworderr("Password Required");
    }
    if (
      email &&
      fullname &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoader(true);
          sendEmailVerification(auth.currentUser)
          .then(() => {
            updateProfile(auth.currentUser, {
              displayName: fullname, photoURL: "images/demoprofile.png"
            }).then(() => {
              console.log(user)
              dispatch(userLoginInfo(user.user))
              localStorage.setItem('userInfo',JSON.stringify(user))
              set(push(ref(db, 'users/')), {
                username:user.user.displayName,
                email:user.user.email,
                userid:user.user.uid,
              });
              setTimeout(() => {
                navigate("/login");
              }, 2000);
            }).catch((error) => {
              console.log(error)
            });
        
          });
        })
        .catch((error) => {
          console.log(error.code);
          if (error.code.includes("auth/weak-password")) {
            setPassworderr("Password Week");
          }
          if (error.code.includes("auth/email-already-in-use")) {
            setEmailerr("Email Already In use");
          }
        });
    }
  };
  return (
    <div>
      <div className="flex">
        <div className="w-2/4 flex justify-end">
          <div className="mr-16">
            <h2 className="font-nunito text-4xl text-primary font-bold mt-40">
              Get started with easily register
            </h2>
            <p className="font-nunito text-xl font-primary font-normal mt-3">
              Free register and you can enjoy it
            </p>

            <div className="relative mt-12">
              <h4 className="absolute top-[-13px] left-12 bg-white px-2 font-nunito text-primary text-sm">
                Email Address
              </h4>
              <input
                onChange={handleEmail}
                className="border border-slate-300 rounded-xl	px-12 py-6 w-96"
                type="email"
                value={email}
              />
              {emailerr && (
                <p className="text-poppin text-white bg-red-600 w-96 p-2.5">
                  {emailerr}
                </p>
              )}
            </div>

            <div className="relative mt-12">
              <h4 className="absolute top-[-13px] left-12 bg-white px-2 font-nunito text-primary text-sm">
                Full name
              </h4>
              <input
                onChange={handleFullname}
                className="border border-slate-300 rounded-xl	px-12 py-6 w-96"
                type="text"
                value={fullname}
              />
            </div>
            {fullnameerr && (
              <p className="text-poppin text-white bg-red-600 w-96 p-2.5">
                {fullnameerr}
              </p>
            )}
            <div className="relative mt-12 w-96">
              <h4 className="absolute top-[-10px] left-12 bg-white px-2 font-nunito text-primary text-sm">
                Password
              </h4>
              <input
                onChange={handlePassword}
                className="border border-slate-300 rounded-xl	px-12 py-6 w-96"
                type="password"
                value={password}
              />
              {passworderr && (
                <p className="text-poppin text-white bg-red-600 w-96 p-2.5">
                  {passworderr}
                </p>
              )}
            </div>
            {loader ? (
              <div className="w-96 flex justify-center">
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#5F35F5"
                  barColor="green"
                />
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-96 bg-primary text-white rounded-full font-nunito samibold py-5 mt-16"
              >
                Submit
              </button>
            )}
            <p className="font-opensanse text-primary text-xs w-96 text-center mt-[35px] normal">
              Already have an account ?{" "}
              <Link to="/login" className="text-[#EA6C00]">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="w-2/4">
          <img
            className="w-full h-screen object-cover"
            src="images/singup.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Singup;
