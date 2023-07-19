import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Mobilenavbar from './MobileNavbar/Mobilenavbar'
import useStoryContext from "../../hooks/useStoryContext";
import AddStory from "../addForm/AddStory";
import LoginPopup from "./Popup/LoginPopup";
import AllStories from "./stories/AllStories";
import AllCategories from "./storyCategories/AllCategories";
import { useMediaQuery } from 'react-responsive'
import EditStory from "../editform/EditStory";
import MainCategory from "./foodCategory/MainCategory";

const MainPage = () => {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const { popup,AddFormPopup,loggedIn,edit} = useStoryContext();
  
  return (

    <div className="homepage">
      {isDesktopOrLaptop ?<Navbar />:""}
      {isTabletOrMobile ?<Mobilenavbar />:""}
      {popup?<LoginPopup />:""} 
      {popup && AddFormPopup && loggedIn ?<AddStory />:""}
      {popup && edit && loggedIn ? <EditStory />:''}
      <AllCategories />
      {loggedIn ? <>
        <AllStories />
      </>:""}
      <MainCategory />
      
    </div>

  );
};

export default MainPage;