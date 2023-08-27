import React, { useEffect,useState } from 'react';
import axios from 'axios';
import useStoryContext from "../../../hooks/useStoryContext";
import BASEURL from '../../../constants/base';
import MyStory from '../MobileNavbar/Mystory';

const AllStories = () => {

    const {setStoryIds,setFirstSlide ,change,user} = useStoryContext();
    

    useEffect(()=>{
        axios.get(`${BASEURL}/story?user=${user}`)
        .then((response)=>{
            setStoryIds(response.data.unique)
            var arr = response.data.array;
            arr.filter(n => n)
            setFirstSlide(arr)            
        })
        .catch((err)=>{console.log(err)})           
    },[change])

    return (
        <div>
            <MyStory />
        </div>
    );
};

export default AllStories;