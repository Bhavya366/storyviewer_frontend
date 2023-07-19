import React,{useRef,useState} from 'react';
import Foodrelated from './foodrelated';
import useStoryContext from '../../../hooks/useStoryContext';

const MainCategory = () => {

    let arr = ['food','movies','education','health and fitness','travel']
    const {foodRef,moviesRef,educationRef,healthRef,travelRef} = useStoryContext();
    const reff = [foodRef,moviesRef,educationRef,healthRef,travelRef];
    return (
        <div>
            {  
                arr.map((item,index)=>{
                    // setChanged()
                    return(
                        <div key={index}>
                            <Foodrelated category = {item} ref={reff[index]}/>
                        </div>
                    )
                })
            }
            
        </div>
    );
};

export default MainCategory;