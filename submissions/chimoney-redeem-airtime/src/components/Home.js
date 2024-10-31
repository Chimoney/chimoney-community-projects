import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Home = () => {
  const [ChiREF, setChiREF] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setChiREF(value);
  };

  const handleSubmit = (e) => {
    if (!ChiREF) {
      setErrorMsg("Input cannot be empty");
    } else {
      navigate(`/redeem-airtime/${ChiREF}`);
    }
  };

  const clearErrorMsg = () => {
    setErrorMsg("");
  };

  return (
    <div className="home-page">
      <h1 className="page-title">Welcome To Keeplite</h1>
      <p className="home-page-text">
        To redeem your Chimoney as Airtime, enter your <span className="home-page-special-text">Ticket ID</span> or
        <span className="home-page-special-text">Chi-REF</span> in the input below
      </p>
      <div onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
        <input type="text" name="ChiREF" placeholder="Enter your Ticket ID or Chi-REF" onChange={handleChange} className="mr-1" />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      {errorMsg ? <p className="error">{errorMsg}</p> : ""}
    </div>
  );
};

export default Home;
