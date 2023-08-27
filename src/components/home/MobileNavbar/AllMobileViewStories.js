import React, { useEffect} from 'react';
import axios from 'axios';
import useStoryContext from "../../../hooks/useStoryContext";
import Mystory from './Mystory';
import { ToastContainer, toast } from "react-toastify";
import BASEURL from '../../../constants/base';

const AllMobileViewStories = () => {

    const {setStoryIds ,setFirstSlide ,change ,user} = useStoryContext();
    
    useEffect(()=>{
        axios.get(`${BASEURL}/story?user=${user}`)
        .then((response)=>{
            setStoryIds(response.data.unique)
            setFirstSlide(response.data.array)
            if(response.data.array.length === 0){
                toast.error("Sorry you haven't added any story yet!!", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
            })}
        })
        .catch((err)=>{console.log(err)})           
    },[change])

    return (
        <div>
           <Mystory />
           <ToastContainer />
        </div>
    );
};

export default AllMobileViewStories;