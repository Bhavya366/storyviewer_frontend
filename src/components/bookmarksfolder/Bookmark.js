import React, { useEffect,useState } from 'react';
import Navbar from '../home/Navbar/Navbar'
import Mobilenavbar from '../home/MobileNavbar/Mobilenavbar'
import useStoryContext from "../../hooks/useStoryContext";
import AddStory from "../addForm/AddStory";
import LoginPopup from '../home/Popup/LoginPopup';
import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import Carousel from '../home/carouselfolder/Carousel';
import './bookmark.css';

const Bookmark = () => {

    const [slides,setSlides] = useState([]);
    const {storyids,setCarousel,carousel,firstSlide,} = useStoryContext();
    const [story,setStory] = useState([]);

    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const { popup,AddFormPopup,loggedIn} = useStoryContext();
    useEffect(()=>{
        axios.get("http://localhost:4500/slide/getbookmarks")
        .then((response)=>{setSlides(response.data)})
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
                        axios.get(`http://localhost:4500/slide/getSlides?storyId=${item.storyId}`)
                        .then((response)=>{
                            setStory(response.data) 
                            setCarousel(true);               
                        })
                        .catch((err)=>{console.log(err)})
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
            {carousel ? <div className='carousel-class'><Carousel story={story}/></div>:""}
        </div>
    );
};

export default Bookmark;