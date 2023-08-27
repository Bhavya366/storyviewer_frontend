import React, { useEffect,useState } from 'react';
import Navbar from '../home/Navbar/Navbar'
import Mobilenavbar from '../home/MobileNavbar/Mobilenavbar'
import useStoryContext from "../../hooks/useStoryContext";
import AddStory from "../addForm/AddStory";
import LoginPopup from '../home/Popup/LoginPopup';
import { useMediaQuery } from 'react-responsive'
import BASEURL from '../../constants/base';
import axios from 'axios';
import Carousel from '../home/carouselfolder/Carousel';

import './bookmark.css';

const Bookmark = () => {

    const [slides,setSlides] = useState([]);
    const {storyids,setCarousel,carousel,firstSlide,setStory} = useStoryContext();

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const user = localStorage.getItem("username")
    const { popup,AddFormPopup,loggedIn} = useStoryContext();
    useEffect(()=>{
        axios.get(`${BASEURL}/slide/getbookmarks/${user}`)
        .then((response)=>{
            setSlides(response.data)
        })
        .catch((err)=>{console.log("No data available")})
    },[])

    return (
        <div className="homepage">
            {isDesktopOrLaptop ? <Navbar /> : ""}
            {isTabletOrMobile ? <Mobilenavbar /> : ""}
            {popup ? <LoginPopup /> : ""}
            {popup && AddFormPopup && loggedIn ? <AddStory /> : ""}<br></br><br></br><br></br><br></br>
            <center><h2>Your Bookmarks</h2></center><br></br><br></br>
            <div className='all-firstslides'>
            {slides?
            slides.map((item,index)=>{
                return (
                    <div key={index} className='img-each-slide' style={{backgroundImage:`url(${item.imageLink})`}} onClick={()=>{
                            setStory(slides) 
                            setCarousel(true);               
                    }}>
                        
                        <div className='imgs'>
                            <img 
                            src={item.imageLink}
                            alt="hii"
                            /> 
                        </div>
                        <div className='heading-description'>
                            <h2>{item.heading}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                )
            })
            :""}
            </div>
            {carousel ? <div className='carousel-class'><Carousel /></div>:""}     
        </div>
    );
};

export default Bookmark;