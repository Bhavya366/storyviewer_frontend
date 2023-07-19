import React, { useRef, useState } from "react";
import gt from './gt.png'
import lt from './lt.png'
import "./Carousel.css";
import useStoryContext from "../../../hooks/useStoryContext";
import axios from 'axios'

const Carousel = (props) => {

    const [slide, setSlide] = useState(0);
    const { setCarousel,setBookmarks,bookmarks ,story,loggedIn,setLogginPopUp,setPopup} = useStoryContext();
    const [data, setData] = useState(story)
    const [ClipboardMessage, setClipboardMessage] = useState(false);
    const [ClickedBookmark, setClickedBookmark] = useState(false);
    const [ClickedLike, setClickedLike] = useState(false);

    const increaseLike = () => {
        try {
            const response = axios.put(`https://swiptory-u41l.onrender.com/slide/${data[slide]._id}/like`)
                .then((response) => {
                    setData([
                        ...data.slice(0, slide),
                        {
                          ...data[slide],
                          ["likeCount"]: response.data.likeCount,
                        },
                        ...data.slice(slide + 1),
                    ])
                })                
        } catch (error) {
            console.log(error);
        }
    };
    const setBooked = ()=>{
        try {
           
            const response = axios.put(`https://swiptory-u41l.onrender.com/slide/${data[slide]._id}/bookmarks`)
                .then((response) => { 
                    console.log(response.data)
                    setData([
                        ...data.slice(0, slide),
                        response.data,
                        ...data.slice(slide + 1),
                    ])
                })                
        } catch (error) {
            console.log(error);
        }
    }

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
        setClipboardMessage(false);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
        setClipboardMessage(false);
    };
    return (
        <div className="main-container">
            <p className="arrow arrow-left" onClick={prevSlide}>
                <img src={lt} alt="" />
            </p>
            <div className="carousel">
                <span className="indicators">
                    {data ?data.map((_, idx) => {
                        return (
                            <div className="indicator" style={{ height: 3, flex: 1, backgroundColor:idx <= slide ? 'white'  :'rgba(255,255,255,0.5)' , marginLeft: 10 }} key={idx}></div>
                        );
                    }):""}&nbsp;&nbsp;
                </span>
                <div className="cross-share">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" onClick={() => { setCarousel(false) }}>
                        <g clipPath="url(#clip0_239_259)">
                            <path d="M17 17L-1 -1M17 -1L-1 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_239_259">
                                <rect width="16" height="16" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    {data ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" onClick={

                        () => {
                            navigator.clipboard.writeText(data[slide].imageLink);
                            setClipboardMessage(true)
                        }}>
                        <path d="M9.99958 14L20.9996 3M9.99958 14L13.4996 21C13.5435 21.0957 13.6139 21.1769 13.7025 21.2338C13.7912 21.2906 13.8943 21.3209 13.9996 21.3209C14.1049 21.3209 14.208 21.2906 14.2966 21.2338C14.3853 21.1769 14.4557 21.0957 14.4996 21L20.9996 3M9.99958 14L2.99958 10.5C2.90384 10.4561 2.82271 10.3857 2.76583 10.2971C2.70895 10.2084 2.67871 10.1053 2.67871 10C2.67871 9.89468 2.70895 9.79158 2.76583 9.70295C2.82271 9.61431 2.90384 9.54387 2.99958 9.5L20.9996 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg> : ""}
                </div>

                <div className="description">
                    {ClipboardMessage ? <div className="clipboard-message"><p>Link Copied to Clipboard</p></div> : ""}
                    <h2>{data[slide].heading}</h2>
                    <p>{data[slide].description}</p>
                    <div className="likes-bookmark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="blue" onClick={() => { 
                            
                            
                            if(loggedIn){
                                setClickedBookmark(!ClickedBookmark)
                                setBooked();
                            }
                            else{
                                setCarousel(false)
                                setPopup(true);
                                setLogginPopUp(true)
                            }
                            
                            }}>
                            <path d="M19.1795 24.5071L9.58974 17.3148L0 24.5071V0H19.1795V24.5071Z" fill={data[slide].bookmark ? "blue" : "white"} />
                        </svg>
                        <div className="likes"><svg xmlns="http://www.w3.org/2000/svg" width="29" height="27" viewBox="0 0 29 27" fill="red" onClick={() => {
                            if(loggedIn){
                                
                                setClickedLike(!ClickedLike);
                                increaseLike()
                            }
                            else{
                                setCarousel(false)
                                setPopup(true);
                                setLogginPopUp(true)
                            }
                            
                        }}>
                            <path d="M14.207 26.0699L12.147 24.1946C4.83039 17.5599 0 13.1699 0 7.81387C0 3.42389 3.4381 0 7.81386 0C10.2859 0 12.6585 1.15077 14.207 2.95506C15.7556 1.15077 18.1282 0 20.6002 0C24.976 0 28.4141 3.42389 28.4141 7.81387C28.4141 13.1699 23.5837 17.5599 16.267 24.1946L14.207 26.0699Z" fill={ClickedLike ? "red" : "white"} />
                        </svg>
                            {data[slide].likeCount}</div>
                    </div>
                </div>

                {data.map((item, idx) => {
                    return (
                        <img
                            src={item.imageLink}
                            alt="hii"
                            key={idx}
                            className={slide === idx ? "slide" : "slide slide-hidden"}
                        />
                    );
                })}

            </div>
            <p onClick={nextSlide} className="arrow arrow-right">
                <img src={gt} alt="" />
            </p>

        </div>
    );
};

export default Carousel