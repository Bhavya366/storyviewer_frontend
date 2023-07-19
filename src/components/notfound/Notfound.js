import React from "react";
import "./Notfound.css";

const Notfound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="title">404 Error - Page Not Found</h1>
        <p className="message">
          Sorry, this page does not exist.
        </p>
      </div>
    </div>
  );
};

export default Notfound;