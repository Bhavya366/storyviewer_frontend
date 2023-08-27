import React, {useEffect, useState } from 'react';
import axios from 'axios';
import useStoryContext from "../../../hooks/useStoryContext";
import BASEURL from '../../../constants/base';
import EditStory from '../../editform/EditStory';
import Mobilenavbar from './Mobilenavbar';
import { useMediaQuery } from 'react-responsive';

const Mystory = () => {

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const {carousel, firstSlide, loggedIn, edit, setEdit } = useStoryContext();
    const [datatoEdit, setDatatoEdit] = useState([]);
    
    return (
        <div>
            {isTabletOrMobile ?<><Mobilenavbar /><br></br><br></br></>:"" }
            <center><h2>Your Stories</h2></center><br></br>
            <div className='all-firstslides'>
                {firstSlide ? 
                    firstSlide.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='img-each-firstslide' >
                                    <div className='imgs'>
                                        {item && (<img
                                            src={item.imageLink}
                                            alt="hii"
                                        />)}
                                    </div>
                                    <div className='heading-description'>
                                        {item && (<><h2>{item.heading}</h2>
                                        <p>{item.description}</p></>)}
                                    </div>
                                    <div>
                                        {loggedIn ? <button className='edit-btn' onClick={() => {                                           
                                            axios.get(`${BASEURL}/slide/getSlides?storyId=${item.storyId}`)
                                                .then((response) => {
                                                    setDatatoEdit(response.data)
                                                    setEdit(true)
                                                })
                                                .catch((err) => { console.log(err) })
                                        }} >Edit</button>:""}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : ""}
                {edit && datatoEdit.length > 0 && !carousel ? <EditStory data={datatoEdit} /> : ''}
            </div><br></br><br></br>
        </div>
    );
};

export default Mystory;