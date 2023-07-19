import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStoryContext from "../../../hooks/useStoryContext";
import Carousel from '../carouselfolder/Carousel'
import './displaycarousel.css';
import EditStory from '../../editform/EditStory';
import { useMediaQuery } from 'react-responsive'
const DisplayStories = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const { setCarousel, carousel, firstSlide, loggedIn, edit, setEdit ,story,setStory} = useStoryContext();
    
    const [datatoEdit, setDatatoEdit] = useState([]);
    
    return (
        <div>
            <center><h2>Your Stories</h2></center>
            <div className='all-firstslides'>
                {firstSlide ?
                    firstSlide.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='img-each-firstslide' onClick={() => {
                                    
                                    axios.get(`https://swiptory-u41l.onrender.com/slide/getSlides?storyId=${item.storyId}`)
                                        .then((response) => {
                                            setStory(response.data)
                                            setCarousel(true);
                                            if (edit) {
                                                setCarousel(false);
                                            }
                                            if (carousel) {
                                                setEdit(true);
                                            }

                                        })
                                    .catch((err) => { console.log(err) })
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
                                    <div>
                                        {loggedIn ? <button className='edit-btn' onClick={() => {
                                            setEdit(true)
                                            setCarousel(false);                                            
                                            axios.get(`https://swiptory-u41l.onrender.com/slide/getSlides?storyId=${item.storyId}`)
                                                .then((response) => {
                                                    setDatatoEdit(response.data)
                                                    setCarousel(false);
                                                })
                                                .catch((err) => { console.log(err) })
                                        }} >Edit</button>:""}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : ""}
                {edit && datatoEdit.length > 0 ? <EditStory data={datatoEdit} /> : ''}
                {(carousel && edit==false) ? <div className='carousel-class'>
                    {console.log(story)}
                    <Carousel  /></div> 
                : ""}
            </div><br></br><br></br>
        </div>
    );
};

export default DisplayStories;