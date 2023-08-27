import React,{useEffect,useState} from 'react';
import axios from 'axios';
import useStoryContext from '../../../hooks/useStoryContext';
import Carousel from '../carouselfolder/Carousel';
import './MainCategory.css';
import BASEURL from '../../../constants/base';

const MainCategory = () => {

    const [slides, setSlides] = useState([]);
    const { setCarousel, carousel, selected,change,setStory,story} = useStoryContext();
    const [seemore,setSeemore] = useState(false);
    useEffect(() => {
        axios.get(`${BASEURL}/slide/getFilteredCategory?category=${selected}`)
            .then((response) => {
                setSlides(response.data.slide);
            })
            .catch((err) => { console.log("error") })
    }, [change])

    return (
        <div>
            {seemore ? <div><br></br><br></br>
                {selected === "All"?<center><h2>Your Top stories on {selected} categories</h2></center>:<center><h2>Your Top stories on {selected}</h2></center>}
                <br></br><br></br>
                <div className='all-firstslides'>
                    {slides ?
                        slides.map((item, index) => {
                            return (
                                <div key={index} className='img-each-firstslide' style={{ backgroundImage: `url(${item.imageLink})` }} onClick={() => {
                                    setStory(slides)
                                    setCarousel(true);
                                }}>
                                    <div className='imgs'>
                                        <img
                                            src={item.imageLink}
                                            alt="image"
                                        />
                                    </div>
                                    <div className='heading-description'>
                                        <h2>{item.heading}</h2>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            )
                        })
                        : ""}
                </div>
                {(carousel) ? <div className='carousel-class'><Carousel /></div> : ""}
            </div> :
                <div><br></br><br></br>
                    {selected === "All"?<center><h2>Your Top stories on {selected} categories</h2></center>:<center><h2>Your Top stories on {selected}</h2></center>}
                <br></br><br></br>
                    <div className='all-firstslides'>
                        {slides ?
                            (slides.slice(0, 3)).map((item, index) => {
                                return (
                                    <div key={index} className='img-each-firstslide' style={{ backgroundImage: `url(${item.imageLink})` }} onClick={() => {
                                        setStory(slides)
                                        setCarousel(true);
                                    }}>
                                        <div className='imgs'>
                                            <img
                                                src={item.imageLink}
                                                alt="image"
                                            />
                                        </div>
                                        <div className='heading-description'>
                                            <h2>{item.heading}</h2>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                            : ""}
                    </div>
                    <center><button style={{ backgroundColor: "#FF7373" }} onClick={()=>{setSeemore(true)}}>See more</button></center>
                    {(carousel) ? <div className='carousel-class'><Carousel /></div> : ""}
                </div>
            }</div>
    );
};

export default MainCategory;