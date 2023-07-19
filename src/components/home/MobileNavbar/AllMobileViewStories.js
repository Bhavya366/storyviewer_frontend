import React, { useEffect,useState } from 'react';
import axios from 'axios';
import useStoryContext from "../../../hooks/useStoryContext";
import Mystory from './Mystory';

const AllMobileViewStories = () => {

    const {setStoryIds,setFirstSlide ,change,setChange,user} = useStoryContext();
    
    useEffect(()=>{
        axios.get(`http://localhost:4500/story?user=${user}`)
        .then((response)=>{
            setStoryIds(response.data.unique)
            setFirstSlide(response.data.array)
        })
        .catch((err)=>{console.log(err)})           
    },[change])

    return (
        <div>
           <Mystory />
        </div>
    );
};

export default AllMobileViewStories;