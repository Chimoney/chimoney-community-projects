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
      <Box onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
        <input type="text" name="ChiREF" placeholder="Enter your Ticket ID or Chi-REF" onChange={handleChange} />
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
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

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  box-shadow: 0 5px 5px 0px #70dfd6e4;
  background: linear-gradient(135deg, rgba(142, 68, 173, 1) 0%, rgba(26, 188, 156, 1) 100%);
  border: none;
  text-transform: uppercase;
  color: white;
  font-size: 1rem;
  transition: all ease-in 0.3s;
  font-weight: 600;

  :hover {
    cursor: pointer;
    font-size: 1.1rem;
    background: linear-gradient(135deg, rgba(142, 68, 173, 1) 0%, rgba(22, 160, 133, 1) 100%);
    transform: scale(1.05);
  }
`;

export default Home;
