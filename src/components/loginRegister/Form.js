import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import passwordlock from '../../assets/passwordlock.png'
import "react-toastify/dist/ReactToastify.css";
import useStoryContext from "../../hooks/useStoryContext";
import './Form.css';

const Form = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { setPopup, setLoggedIn,setUser} = useStoryContext();
    const [error,setError] = useState("");
    const [showicon,setShowIcon] = useState(false);
    const handlePassowrdChange = (e) => {
        setPassword(e.target.value);
    };

    const handleusernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username,
            password,
        };
        try {
            const response = await axios.post(`http://localhost:4500/${props.mode}`, data);
            localStorage.setItem("token", response.data.token);
            console.log(response.data)
            toast.success(`${props.text} Successfull`, {
                position: "top-center",
                autoClose: 1000,
            });
            setTimeout(() => {
                setPopup(false);
                setLoggedIn(true);
                setUser(response.data.username)
            }, 1000);

        } catch (err) {
            console.log(err)
           
            if (err.response.status != 201 || err.response.status != 200) {
                toast.error("Invalid Credentials", {
                    position: "top-center",
                    autoClose: 1000,
                });
                setError(err.response.data.err)
                return;
            } else {
                toast.error("Please check user details");
                return;
            }
        }
    };

    return (
        <div className="form-popup">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none" className="into-mark" onClick={()=>setPopup(false)}>
<path d="M17.8191 0C7.99395 0 0 7.99395 0 17.8191C0 27.6442 7.99395 35.6381 17.8191 35.6381C27.6442 35.6381 35.6381 27.6442 35.6381 17.8191C35.6381 7.99395 27.6442 0 17.8191 0ZM17.8191 2.7414C26.1611 2.7414 32.8967 9.47709 32.8967 17.8191C32.8967 26.1611 26.1611 32.8967 17.8191 32.8967C9.47709 32.8967 2.7414 26.1611 2.7414 17.8191C2.7414 9.47709 9.47709 2.7414 17.8191 2.7414ZM12.6361 10.6657L10.6657 12.6361L15.8487 17.8191L10.6657 23.002L12.6361 24.9724L17.8191 19.7894L23.002 24.9724L24.9724 23.002L19.7894 17.8191L24.9724 12.6361L23.002 10.6657L17.8191 15.8487L12.6361 10.6657Z" fill="#FF0000"/>
</svg><br></br>
            <h3>{props.text} to SwipTory</h3><br></br><br></br>
            <form className="login-form">
                <div className="inputs">
                    <h4>Username</h4>
                    <input
                        value={username}
                        onChange={handleusernameChange}
                        type="username"
                        placeholder="Enter username"
                        required
                    />
                </div><br></br><br></br>
                <div className="inputs">
                    <h4>Password</h4>
                    <div className="input_lock">
                    <input
                        value={password}
                        onChange={handlePassowrdChange}
                        type="password"
                        placeholder="Enter password"
                        required
                    /><br></br>
                    <img src={passwordlock} alt="" />
                    </div>
                    
                </div><br></br>
                <p className="error">{error}</p><br></br>
                <button 
                    type="submit"
                    onClick={handleSubmit}
                    className="form-button"> {props.text}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Form;