import React from 'react';
const { createContext, useState } = require("react");

const StoryContext = createContext();

const Provider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState(false);
  const [LogginPopUp,setLogginPopUp] = useState(false);
  const [RegisterPopUp,setRegisterPopUp] = useState(false);
  const [user,setUser] = useState("");
  const [logout,setLogout] = useState(false)

  const valueToShare = {
    loggedIn,setLoggedIn,
    popup,setPopup,
    LogginPopUp,setLogginPopUp,
    RegisterPopUp,setRegisterPopUp,
    user,setUser,
    logout,setLogout,
  };

  return (
    <StoryContext.Provider value={valueToShare}>
      {children}
    </StoryContext.Provider>
  );
};

export { Provider };

export default StoryContext;
