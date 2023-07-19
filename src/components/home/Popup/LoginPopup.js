import React,{useEffect} from 'react';
import useStoryContext from "../../../hooks/useStoryContext";
import Form from '../../loginRegister/Form'
import './popup.css';

const LoginPopup = () => {
    
    const { setLoggedIn, LogginPopUp, RegisterPopUp } = useStoryContext();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div className="popup">
            {LogginPopUp?<Form  mode = "login" text = "Login"/>:""}
            {RegisterPopUp?<Form mode = "register" text = "Register" />:""}
            {/* {AddForm} */}
        </div>
    );
};

export default LoginPopup;