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
    <HomeContainer className="home-page">
      <h1>Welcome To Keeplite</h1>
      <p>
        To redeem your Chimoney as Airtime, enter your <span>Ticket ID</span> or <span>Chi-REF</span> in the input below
      </p>
      <div onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
        <input type="text" name="ChiREF" placeholder="Enter your Ticket ID or Chi-REF" onChange={handleChange} />
        <button onClick={handleSubmit} className="button">
          Submit
        </button>
      </div>
      {errorMsg ? <p className="error">{errorMsg}</p> : ""}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
  input {
    width: 50%;
    outline: none;
    font-size: 1.2rem;
    padding: 1rem;
    border: 1px solid #f8f8f8;
    background-color: #f8f8f8;
    margin-right: 1rem;
    ::placeholder {
      color: #888;
      font-size: 1.2rem;
    }
  }
  span {
    background-color: #00000078;
    text-transform: uppercase;
    font-size: 1.4rem;
    padding: 1rem;
    display: inline-block;
  }

  .error {
    font-size: 1.2rem;
    margin-top: 0.3rem;
    color: #1a04048f;
    text-transform: capitalize;
    padding: 1rem;
    text-align: center;
    font-weight: 600;
  }
`;

export default Home;
