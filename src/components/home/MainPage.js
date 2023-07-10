import React, { useEffect,useState } from "react";
import Navbar from "./Navbar/Navbar";
import Mobilenavbar from './MobileNavbar/Mobilenavbar'
import useStoryContext from "../../hooks/useStoryContext";
import LoginPopup from "./Popup/LoginPopup";
import { useMediaQuery } from 'react-responsive'

const MainPage = () => {
  
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const { popup} = useStoryContext();
  
  return (
    <div className="homepage">

      {isDesktopOrLaptop ?<Navbar />:""}
      {isTabletOrMobile ?<Mobilenavbar />:""}
      {popup?<LoginPopup />:""} 

    </div>
  );
};

export default MainPage;