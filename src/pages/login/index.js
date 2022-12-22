import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { ProgressBar } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {userLoginInfo} from '../../slices/userSlice';


const Login = () => {
  const auth = getAuth();
  let dispatch=useDispatch()
  let navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [loader, setLoader] = useState(false);

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };
  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider).then((user) => {
        navigate("/home");
    });
  };
  let handlelogin = () => {
    if (!email) {
      setEmailerr("Your Email is Requierd");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("Invalid Email");
    }
    if (!password) {
      setPassworderr("Your Password is Requierd");
    }
    if (
      email &&
      password &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          setLoader(true);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        })
        .catch((error) => {
          if (error.code.includes("auth/user-not-found")) {
            setEmailerr("Email Not Found");
          } else if (error.code.includes("auth/wrong-password")) {
            setPassworderr("Wrong Password");
          }
        });
    }
  };
  return (
    <div className="flex">
      <div className="w-2/4 flex justify-end mr-14 mt-40">
        <div>
          <h3 className="font-nunito text-4xl text-primary font-bold">
            Login to your account!
          </h3>

          <button
            onClick={handleGoogleLogin}
            className="font-opensanse text-primary font-semibold text-sm py-6 pr-10 pl-12 border inline-block border-solid mt-7 relative	rounded-md	"
            href="#"
          >
            {" "}
            Login with Google
          </button>

          <div className="relative mt-10">
            <input
              onChange={handleEmail}
              className="border-b border-solid border-secondary w-96	py-6 outline-0	"
              type="email"
            />
            <p className="font-nunito font-samilod text-sm text-primary absolute top-[-10px]  bg-white ">
              Email Address
            </p>
            {emailerr && (
              <p className="text-poppin text-white bg-red-600 w-96 p-2.5">
                {emailerr}
              </p>
            )}
          </div>

          <div className="relative mt-10 w-96">
            <input
              onChange={handlePassword}
              className="border-b border-solid border-secondary w-96	py-6 outline-0 "
              type="password"
            />
            {passworderr && (
              <p className="text-poppin text-white bg-red-600 w-96 p-2.5">
                {passworderr}
              </p>
            )}

            <p className="font-nunito font-samilod text-sm text-primary absolute top-[-10px] bg-white ">
              Password
            </p>
            {loader ? (
              <div className="flex justify-center w-96">
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
                onClick={handlelogin}
                className="w-96 bg-primary text-white rounded-full font-nunito samibold py-5 mt-16"
              >
                Login
              </button>
            )}
            <p className="font-opensanse text-primary text-xs w-96 text-left mt-[35px] normal">
              Don’t have an account ?{" "}
              <Link to="/" className="text-[#EA6C00]">
                Sign up
              </Link>
            </p>
            <p className="font-opensanse text-primary text-xs w-96 text-center mt-[35px] normal">
              <Link to="/forget" className="text-[#EA6C00]">
                Forget Passowrd
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/4	">
        <img src="images/login.png" className="w-full h-screen object-cover	" />
      </div>
    </div>
  );
};

export default Login;
