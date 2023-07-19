import React,{useEffect, useState,useRef} from 'react';
import axios from 'axios';
import './AllCategories.css'
import useStoryContext from "../../../hooks/useStoryContext";
import food from '../../../assets/food.jpeg';
import travel from '../../../assets/travel.jpeg';
import education from '../../../assets/education.jpg';
import movies from '../../../assets/movies.jpeg';
import Health from '../../../assets/Health.png';
import All from '../../../assets/All.jpeg';

const AllCategories = () => {

    // images
    let lst = [food,movies,education,Health,travel];

    const { selected,setSelected,setChange,change,active,foodRef,moviesRef,educationRef,healthRef,travelRef} = useStoryContext();
    const [categories,setCategories] = useState([])
    
    const arr = []
    useEffect(()=>{
        axios.get('https://swiptory-u41l.onrender.com/slide')
        .then((response)=>setCategories(response.data.categories))
        .catch((err)=>{console.log(err)})
    },[])    
    
    const handleScrollTo = (item)=>{
        if(item === "food")
        foodRef.current.scrollIntoView({behavior:"smooth"});
        else if(item === "travel")
        travelRef.current.scrollIntoView({behavior:"smooth"});
        else if(item === "movies")
        moviesRef.current.scrollIntoView({behavior:"smooth"});
        else if(item === "education")
        educationRef.current.scrollIntoView({behavior:"smooth"});
        else if(item === "health and fitness")
        healthRef.current.scrollIntoView({behavior:"smooth"});
    }

    return (
        <div className='all-categories'>
                <div className={selected == 'All' ? "each-category-selected" : "each-category"} style={{backgroundImage:`url(${All})`,backgroundSize:'cover'}}>
                All
                </div> 
                {categories ? categories.map((item,index)=>{
                return (
                <div key={index}  onClick={()=>{
                    handleScrollTo(item)
                    setSelected(item);
                    setChange(!change)}} className={selected == item ? "each-category-selected" : "each-category"} style={{backgroundImage:`url(${lst[index]})`,backgroundSize:'cover'}}>
                    {item}
                </div>
            )}):""}
        </div>
    );
};

export default AllCategories;