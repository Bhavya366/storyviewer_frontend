import React, { useEffect, useState ,forwardRef} from 'react';
import useStoryContext from '../../../hooks/useStoryContext'
import axios from 'axios';
import Carousel from '../carouselfolder/Carousel'
import './foodcategory.css';

const Foodrelated = forwardRef((props,ref) => {

    const [slides, setSlides] = useState([]);
    const { setCarousel, carousel,setFood, setMovies, setTravel, setEducation, setHealth, setStory } = useStoryContext();
    const [carouselData, setCarouselData] = useState([]);
    const [seemore, setSeemore] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:4500/slide/getFilteredCategory?category=${props.category}`)
            .then((response) => {
                setSlides(response.data.slide);
            })
            .catch((err) => { console.log(err) })
        if (props.category === 'food')
            setFood(slides);
        else if (props.category === 'movies')
            setMovies(slides);
        else if (props.category === 'travel')
            setTravel(slides);
        else if (props.categroy === 'education')
            setEducation(slides)
        else
            setHealth(slides)
    }, [])

    return (
        <div ref={ref}>
            {seemore ? <div><br></br><br></br>
                <center><h2>Your Top stories on {props.category}</h2></center><br></br><br></br>
                <div className='all-firstslides'>
                    {slides ?
                        slides.map((item, index) => {
                            return (
                                <div key={index} className='img-each-firstslide' style={{ backgroundImage: `url(${item.imageLink})` }} onClick={() => {
                                    axios.get(`http://localhost:4500/slide/getFilteredCategory?category=${item.category}`)
                                        .then((response) => {

                                            console.log(response.data.slide);
                                            setStory(response.data.slide);
                                            setCarouselData(response.data.slide);
                                            setCarousel(true);
                                        })
                                        .catch((err) => { console.log(err) })
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
                <div className="homepage"><br></br><br></br>
                    <center><h2>Your Top stories on {props.category}</h2></center><br></br><br></br>
                    <div className='all-firstslides'>
                        {slides ?
                            (slides.slice(0, 3)).map((item, index) => {
                                return (
                                    <div key={index} className='img-each-firstslide' style={{ backgroundImage: `url(${item.imageLink})` }} onClick={() => {
                                        axios.get(`http://localhost:4500/slide/getFilteredCategory?category=${item.category}`)
                                            .then((response) => {

                                                console.log(response.data.slide);
                                                setStory(response.data.slide);
                                                setCarouselData(response.data.slide);
                                                setCarousel(true);
                                            })
                                            .catch((err) => { console.log(err) })
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
});

export default Foodrelated;

//