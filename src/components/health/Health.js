import React, { useState, useEffect } from "react";
import "./Health.css";
import Loading from "../loading/Loading";
import axios from "axios";
import Notfound from "../notfound/Notfound";


const Health = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://swiptory-u41l.onrender.com/health`)
      .then((res) => {
        setHealthData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="health-component">
      <h1>Health Status</h1>
      {loading ? (
        <Loading />
      ) : healthData ? (
        <>
          <p>Server is  {healthData.server}</p>
          <p>Database  {healthData.database}</p>
        </>
      ) : (
        <Notfound />
      )}
    </div>
  );
};

export default Health;