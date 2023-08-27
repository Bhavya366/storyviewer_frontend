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
import BASEURL from '../../../constants/base';

const AllCategories = () => {

    let lst = [food,movies,education,Health,travel];
    const { selected,setSelected,setChange,change} = useStoryContext();
    const [categories,setCategories] = useState([])

    useEffect(()=>{
        axios.get(`${BASEURL}/slide`)
        .then((response)=>setCategories(response.data.categories))
        .catch((err)=>{console.log(err)})
    },[])    
    
  

    return (
        <div className='all-categories'>
                <div className={selected == 'All' ? "each-category-selected" : "each-category"} style={{backgroundImage:`url(${All})`,backgroundSize:'cover'}} onClick={()=>{
                    setSelected("All");
                    setChange(!change)}}>
                All
                </div> 
                {categories ? categories.map((item,index)=>{
                return (
                <div key={index}  onClick={()=>{
                    setSelected(item);
                    setChange(!change)}} className={selected == item ? "each-category-selected" : "each-category"} style={{backgroundImage:`url(${lst[index]})`,backgroundSize:'cover'}}>
                    {item}
                </div>
            )}):""}
        </div>
    );
};

export default AllCategories;