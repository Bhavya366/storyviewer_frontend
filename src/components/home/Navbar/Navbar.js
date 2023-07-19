import React, { useEffect, useState } from "react";
import "./Navbar.css";
import useStoryContext from "../../../hooks/useStoryContext";
import profile from '../../../assets/profile.png'
import hamburger from '../../../assets/hamburger.png'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
 
  const { loggedIn, setLoggedIn, setPopup, setRegisterPopUp, setLogginPopUp, user, setUser, logout, setLogout,setAddFormPopup,setId} = useStoryContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  const onNavbarLogin = () => {
    setPopup(true);
    setLogginPopUp(true);
    setRegisterPopUp(false);
  };
  const onNavbarSignup = () => {
    setPopup(true);
    setRegisterPopUp(true);
    setLogginPopUp(false);
  };
  const AddStory = () =>{
    let data={}
    data.user = user;
    axios.post('https://swiptory-u41l.onrender.com/story',data,{
			headers: {
			  authorization: `${localStorage.getItem("token")}`,
		}}).then((response) => setId(response.data.id)).catch((err)=>console.log(err))
    setPopup(true);
    setRegisterPopUp(false);
    setLogginPopUp(false)
    setAddFormPopup(true);
  }

  

  return (
    <>
      <div className="navbar">
        <span>SwipTory</span>
        {loggedIn ? 
          <div className="navbar-buttons">
            <button className="loggedin-register-button" onClick={()=>navigate('bookmark')}>
              Bookmarks
            </button>
            <button className="loggedin-register-button" onClick={AddStory}>
              Add Story
            </button>
            <img className="img"
              src={profile}
              alt="user"
            />
            <img src={hamburger} alt="hamburger" onClick={()=>{setLogout(true)}} />
          </div>
         : 
          <div className="navbar-buttons">
            <button className="loggedin-register-button" onClick={onNavbarSignup}>
              Register Now
            </button>
            <button className="signin-button" onClick={onNavbarLogin}>
              Sign In
            </button>
          </div>
        }
      </div> 

      {logout ? <div className="logout">
        <p>{user}</p>
        <button onClick={() => {
          setUser("")
          localStorage.removeItem("token");
          setLoggedIn(false)
          setLogout(false)
        }}>Logout</button>
      </div> : ""}
    </>
  );
};

export default Navbar;