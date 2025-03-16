import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../lib/api-Client";
import { useAppStore } from "../Store";

const Login = ({ShowAlert}) => {
  const {userInfo,setUserInfo}=useAppStore();
  const navigate=useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const validateLogin = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
  
    if (!email.length) {
      ShowAlert('text-red-800', "Email is required", 'bg-red-50');
      return false;
    }
    
    if (!emailPattern.test(email)) {
      ShowAlert('text-red-800', "Please enter a valid email address", 'bg-red-50');
      return false;
    }
  
    if (!password.length) {
      ShowAlert('text-red-800', "Password is required", 'bg-red-50');
      return false;
    }
  
    return true;
  };
  useEffect(() => {
    console.log(userInfo);  // This will log the updated value
  }, [userInfo]); 
  const handleLogin=async()=>{
    if(validateLogin()){
    try {
      const response=await apiClient.post(`/user/login`,{email,password},{withCredentials:true});

      const {data,status}=response;
      console.log(response);
      if(status==200){
        // ShowAlert('text-green-800','Login Successfully','bg-green-50')
        setUserInfo(data.user);
        navigate('/');
        console.log(userInfo)
      }
    } catch (error) {
      console.log(error);
      ShowAlert('text-red-800','Please enter valid email and Password','bg-red-50');
    }
  }
  }
  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly w-75 mx-auto gap-4 py-5 py-md-4">
  {/* Image Section */}
  <div data-aos="fade-right" className="w-50 d-none d-md-flex align-items-center justify-content-center p-4">
    <img src="/Images/Side Image.png" alt="Side visual illustration" className="img-fluid mx-auto" />
  </div>

  {/* Form Section */}
  <div data-aos="fade-left" className="d-flex flex-column gap-3 w-50 w-md-33">
    <div>
      <h2 className="fs-4 fw-semibold">Login Account</h2>
      <span className="text-secondary">Enter your details below</span>
    </div>
    <form className="d-flex flex-column gap-3">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        aria-label="Email"
        className="border-bottom border-secondary outline-none form-control px-2 py-2"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        aria-label="Password"
        className="border-bottom border-secondary outline-none form-control px-2 py-2"
      />
    </form>
    <div className="d-flex justify-content-between align-items-center">
      <button
        onClick={handleLogin}
        className="btn btn-danger px-4 py-2 rounded"
      >
        Login
      </button>
      <div className="d-flex justify-content-center">
        <span className="text-secondary">
          <Link to="/signup" className="text-decoration-none text-secondary">
            Forget Password
          </Link>
        </span>
      </div>
    </div>
  </div>
</div>

  
  );
};

export default Login;
