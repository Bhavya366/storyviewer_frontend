import React from 'react';
const { createContext, useState ,useEffect,useRef} = require("react");
const StoryContext = createContext();

const Provider = ({ children }) => {
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState(false);
  const [LogginPopUp,setLogginPopUp] = useState(false);
  const [RegisterPopUp,setRegisterPopUp] = useState(false);
  const [user,setUser] = useState("");
  const [logout,setLogout] = useState(false)
  const [AddFormPopup,setAddFormPopup] =  useState(false);
  const [id,setId] = useState('');
  const [selected,setSelected] = useState('All');
  const [storyids,setStoryIds]=  useState([]);
  const [storyWithSlides,setstoryWithSlides] = useState([]);
  const [carousel,setCarousel] = useState(false);
  const [bookmarks,setBookmarks] = useState([]);
  const [firstSlide,setFirstSlide] = useState([]);
  const [edit,setEdit] = useState(false);
  const [change,setChange] = useState(false);
  const [food,setFood] = useState([]);
  const [movies,setMovies] = useState([]);
  const [travel,setTravel] = useState([]);
  const [health,setHealth] = useState([]);
  const [education,setEducation] = useState([]);
  const [story,setStory] = useState([]);
  const active = useRef(null);
  const foodRef = useRef(null);
    const moviesRef = useRef(null);
    const educationRef = useRef(null);
    const healthRef = useRef(null);
    const travelRef = useRef(null);
  
  useEffect(()=>{
  
    if(localStorage.getItem('token')!='')
    setLoggedIn(false)
  },[])
  

  const valueToShare = {
    movies,setMovies,
    health,setHealth,
    travel,setTravel,
    loggedIn,setLoggedIn,
    education,setEducation,
    food,setFood,
    popup,setPopup,
    LogginPopUp,setLogginPopUp,
    RegisterPopUp,setRegisterPopUp,
    user,setUser,
    logout,setLogout,
    AddFormPopup,setAddFormPopup,
    id,setId,
    selected,setSelected,
    storyids,setStoryIds,
    storyWithSlides,setstoryWithSlides,
    carousel,setCarousel,
    bookmarks,setBookmarks,
    firstSlide,setFirstSlide,
    edit,setEdit,
    change,setChange,
    story,setStory,
    active,foodRef,moviesRef,educationRef,healthRef,travelRef,
  };

  return (
    <StoryContext.Provider value={valueToShare}>
      {children}
    </StoryContext.Provider>
  );
};

export { Provider };

export default StoryContext;
