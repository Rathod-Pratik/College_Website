import React, { useState } from "react";
import { useAppStore } from "../Store";
import { Link } from "react-router-dom";
import { apiClient } from "../lib/api-Client";

const Account = () => {
  const { userInfo,setUserInfo } = useAppStore();
  const [address, setAddress] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const { userInfo,setUserInfo } = useAppStore();
  console.log(userInfo)
  const UpdateData = async () => {
    if(validataion()){
    try {
      const response = await apiClient.patch(
        `/user/${userInfo._id}`,
        {
          email: userInfo.email,
          user: userInfo._id,
          address:address,
          password:newPassword
        },
        { withCredentials: true },{timeout: 10000}
      );
      if (response.status == 200) {
        setUserInfo(response.data.user);
        // toast.success("Profile Updated");
      } else {
        // toast.error("Failed to update Profile");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };

  const validataion=()=>{
    if(!address || userInfo.address){
      return false;
    }
    if(!oldPassword || !newPassword || !confirmPassword){
      return false;
    }
    return true;
  }
  return (
    <div className="container mt-4 p-4">
  <p data-aos="fade-left" className="text-center text-lg text-danger">
    {/* <span className="text-black">Welcome</span> {userInfo.name} */}
  </p>

  <section className="row mt-4">
    {/* Sidebar Links */}
    <div data-aos="fade-right" className="col-lg-3 col-md-4 mb-4">
      <div>
        <h2 className="fw-medium fs-5 mb-2">Manage My Account</h2>
        <div className="d-flex flex-column text-secondary">
          <Link to="/account" className="text-decoration-none text-dark">My Profile</Link>
          <Link to="/account" className="text-decoration-none text-dark">Address Book</Link>
          <Link to="/account" className="text-decoration-none text-dark">My Payment Options</Link>
        </div>
      </div>

      <div className="mt-3">
        <h2 className="fw-medium fs-5 mb-2">My Orders</h2>
        <div className="d-flex flex-column text-secondary">
          <Link to="/returns" className="text-decoration-none text-dark">My Returns</Link>
          <Link to="/cancellations" className="text-decoration-none text-dark">My Cancellations</Link>
        </div>
      </div>

      <Link to="/wishlist" className="fw-medium fs-5 text-decoration-none text-dark d-block mt-3">My Wishlist</Link>
    </div>

    {/* Profile Update Form */}
    <div data-aos="fade-left" className="col-lg-9 col-md-8">
      <h2 className="text-danger fs-4 fw-semibold mb-4">Edit Your Profile</h2>

      <div className="row g-3">
        {/* Name Input */}
        <div className="col-12">
          <label className="text-black fw-medium">Name</label>
          <input
            value={userInfo.name}
            disabled
            className="form-control bg-light text-secondary border-0"
            type="text"
          />
        </div>

        {/* Email & Address */}
        <div className="col-md-6">
          <label className="text-black fw-medium">Email</label>
          <input
            disabled
            value={userInfo.email}
            className="form-control bg-light text-secondary border-0"
            type="text"
          />
        </div>

        <div className="col-md-6">
          <label className="text-black fw-medium">Address</label>
          {userInfo.address ? (
            <input
              disabled
              value={userInfo.address}
              className="form-control bg-light text-secondary border-0"
              type="text"
            />
          ) : (
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control bg-light text-secondary border-0"
              type="text"
            />
          )}
        </div>

        {/* Password Inputs */}
        <div className="col-12">
          <p className="text-black fw-medium">Password Changes</p>
          <input
            value={oldPassword}
            placeholder="Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
            className="form-control bg-light text-secondary border-0"
            type="password"
          />
        </div>

        <div className="col-md-6">
          <input
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control bg-light text-secondary border-0"
            type="password"
          />
        </div>

        <div className="col-md-6">
          <input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control bg-light text-secondary border-0"
            type="password"
          />
        </div>

        {/* Save Button */}
        <div className="col-12 text-center text-md-end">
          <button className="btn btn-danger px-4 py-2" onClick={UpdateData}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </section>
</div>


  );
};

export default Account;
