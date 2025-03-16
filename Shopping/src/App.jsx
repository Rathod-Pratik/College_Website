import './App.css'
import Footer from './Components/Footer';
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Alert from './Components/Alert';
import WishList from './Pages/WishList';
import { useState } from 'react';
import Account from './Pages/Account';
function App() {
  const [show,SetShow]=useState();
  const ShowAlert = async (color, message, bgcolor) => {
    setAlert({
      color: color,
      message: message,
      bgcolor: bgcolor,
    });
    SetShow(true)
    setTimeout(() => {
      SetShow(false)
      setAlert(null);
    }, 1500);
  };
  return (
    <>
     <Router>
     <Navbar/>
     {show && <Alert alert={alert}/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/wishList" element={<WishList ShowAlert={ShowAlert} />} />
        <Route path="/login" element={<Login ShowAlert={ShowAlert} />} />
        <Route path="/signup" element={<SignUp ShowAlert={ShowAlert} />} />
      </Routes>
     <Footer/>
    </Router>
    </>
  )
}

export default App
