import React, { useState,useEffect } from 'react';
import hamburger from '../../../assets/hamburger.png'
import useStoryContext from "../../../hooks/useStoryContext";
import profile from '../../../assets/profile.png';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Mobilenavbar = () => {

    const [showMobile, setShowMobile] = useState(false);
    const { loggedIn, setLoggedIn, popup, setPopup, RegisterPopUp, setRegisterPopUp, LogginPopUp, setLogginPopUp, user, setUser, logout, setLogout,id ,setAddFormPopup,setId} = useStoryContext();
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
    const logoutHeader = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setShowMobile(false);
        navigate('/')
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
                
                <button className="loggedin-register-button" onClick={()=>navigate('mystory')}>
                    Your Story
                </button><br></br>
                <button className="loggedin-register-button" onClick={AddStory}>
                    Add Story
                </button><br></br>
                <button className="loggedin-register-button" onClick={()=>navigate('bookmark')}>
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