import React, { useEffect, useState } from "react";
import "./Navbar.css";
import useStoryContext from "../../../hooks/useStoryContext";
import profile from '../../../assets/profile.png'
import hamburger from '../../../assets/hamburger.png'

const Navbar = () => {
 
  const { loggedIn, setLoggedIn, popup, setPopup, RegisterPopUp, setRegisterPopUp, LogginPopUp, setLogginPopUp, user, setUser, logout, setLogout } = useStoryContext();
  const [showMobile,setShowMobile] = useState(false)
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

  const logoutHeader = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const onNavbarSignup = () => {
    setPopup(true);
    setRegisterPopUp(true);
    setLogginPopUp(false);
  };

  return (
    <>
      <div className="navbar">
        <span>SwipTory</span>
        {loggedIn ? (
          <div className="navbar-buttons">
            <button className="loggedin-register-button" onClick={logoutHeader}>
              Bookmarks
            </button>
            <button className="loggedin-register-button" onClick={logoutHeader}>
              Add Story
            </button>
            <img className="img"
              src={profile}
              alt="user"
            />
            <img src={hamburger} alt="hamburger" onClick={() => { setLogout(true) }} />
          </div>
        ) : (
          <div className="navbar-buttons">
            <button className="loggedin-register-button" onClick={onNavbarSignup}>
              Register Now
            </button>
            <button className="signin-button" onClick={onNavbarLogin}>
              Sign In
            </button>
          </div>
        )}
      </div> 

      {logout ? <div className="logout">
        <p>{user}</p>
        <button onClick={() => {
          setUser("")
          setLoggedIn(false)
          setLogout(false)
        }}>Logout</button>
      </div> : ""}
    </>
  );
};

export default Navbar;