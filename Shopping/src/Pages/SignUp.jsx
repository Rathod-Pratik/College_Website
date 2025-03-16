import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from '../lib/api-Client';
import { useAppStore } from '../Store';

const SignUp = (props) => {
  const {setUserInfo}=useAppStore();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();
  const handleSignup=async()=>{
   if(validateSignup()){
     try {
      const response=await apiClient.post(`/user`,{name,email,password},{withCredentials:true});
    const {data}=response;
    if(response.status==200){
      props.ShowAlert('text-green-800','SignUp Successfully','bg-green-50');
      setUserInfo(data.user);
      navigate('/');
    }
    } catch (error) {
      console.log(error);
    }}
  }
  const validateSignup = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
  
    if (!email.length) {
      props.ShowAlert('text-red-800', "Email is required", 'bg-red-50');
      return false;
    }
    
    if (!emailPattern.test(email)) {
      props.ShowAlert('text-red-800', "Please enter a valid email address", 'bg-red-50');
      return false;
    }
  
    if (!password.length) {
      props.ShowAlert('text-red-800', "Password is required", 'bg-red-50');
      return false;
    }
  
    if (password.length < 8) {
      props.ShowAlert('text-red-800', "Password must be at least 8 characters long", 'bg-red-50');
      return false;
    }
  
    if (!name.length) {
      props.ShowAlert('text-red-800', "Name is required", 'bg-red-50');
      return false;
    }
  
    return true;
  };
  
  return (
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly w-75 mx-auto gap-4 py-5 py-md-4">
    {/* Image Section */}
    <div data-aos="fade-right" className="w-50 d-none d-md-flex align-items-center justify-content-center p-4">
      <img src="/Images/Side Image.png" alt="Side visual illustration" className="img-fluid mx-auto" />
    </div>
  
    {/* Form Section */}
    <div data-aos="fade-left" className="d-flex flex-column gap-3 w-50 w-md-33">
      <div>
        <h2 className="fs-4 fw-semibold">Create an Account</h2>
        <span className="text-secondary">Enter your details below</span>
      </div>
      <form className="d-flex flex-column gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          aria-label="Name"
          className="border-bottom border-secondary outline-none form-control px-2 py-2"
        />
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
      <div>
        <button
          onClick={handleSignup}
          className="w-100 btn btn-danger py-2 rounded"
        >
          Create Account
        </button>
        <div className="d-flex justify-content-center mt-3">
          <span className="text-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-danger text-decoration-none">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default SignUp
