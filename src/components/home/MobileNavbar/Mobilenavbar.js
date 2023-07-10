import React, { useState,useEffect } from 'react';
import hamburger from '../../../assets/hamburger.png'
import useStoryContext from "../../../hooks/useStoryContext";
import profile from '../../../assets/profile.png';

const Mobilenavbar = () => {

    const [showMobile, setShowMobile] = useState(false);
    const { loggedIn, setLoggedIn, popup, setPopup, RegisterPopUp, setRegisterPopUp, LogginPopUp, setLogginPopUp, user, setUser, logout, setLogout } = useStoryContext();

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
        setShowMobile(false);
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
                <img src={hamburger} alt="hamburger" onClick={() => { setShowMobile(true) }} />
            </div>

            {showMobile && !loggedIn ? <div className="mobile-show-buttons">
                <div className="mobile-into" onClick={() => { setShowMobile(false) }}>x</div>
                <button className="loggedin-register-button" onClick={onNavbarSignup}>Register</button><br></br>
                <button className="loggedin-register-button" onClick={onNavbarLogin}>Login</button>
            </div> : ""}


            {showMobile && loggedIn ? <div className="mobile-show-buttons">
                <div className='mobileview-profile'>
                    <img src={profile} alt="user" />
                    <span>{user}</span>
                    <div className="mobile-into" onClick={() => { setShowMobile(false) }}>x</div>
                </div>
                
                <button className="loggedin-register-button" onClick={logoutHeader}>
                    Your Story
                </button><br></br>
                <button className="loggedin-register-button" onClick={logoutHeader}>
                    Add Story
                </button><br></br>
                <button className="loggedin-register-button" onClick={logoutHeader}>
                    Bookmarks
                </button><br></br>
                <button className="loggedin-register-button" onClick={logoutHeader}>
                    Logout
                </button>
                
            </div> : ""}
        </>
    );
};

export default Mobilenavbar;