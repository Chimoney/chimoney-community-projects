
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
  const [ChiREF, setChiREF] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.currentTarget;
    setChiREF(value);
  };

  const handleSubmit = (e) => {
    if (!ChiREF) {
      setErrorMsg('Input cannot be empty');
    } else {
      navigate(`/redeem-airtime/${ChiREF}`);

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { API_KEY } from "../SecretKeys";

const Redeem = () => {
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [formDetails, setformDetails] = useState({
    chiRef: "",
    countryToSend: "",
    phoneNumber: "",
  });

  const { id } = useParams();
  let validated = false;

  const getCountries = () => {
    let config = {
      method: "GET",
      url: "https://api.chimoney.io/v0.2/info/airtime-countries",
      headers: { "X-API-Key": API_KEY },
    };
    axios(config)
      .then(function (response) {
        setCountries(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id) {
      setformDetails({
        ...formDetails,
        chiRef: id,
      });
    }
    getCountries();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setformDetails({
      ...formDetails,
      [name]: value,
    });
    console.log(formDetails);
  };

  const validateFormInput = () => {
    let Phone = formDetails.phoneNumber;

    if (!formDetails.chiRef || !formDetails.countryToSend || !formDetails.phoneNumber) {
      console.log("error");
      seterrorMsg("Please input all details");
    } else {
      setLoading(true);
      //copy the first digit
      let firstDigit = Phone.slice(0, 1);

      //check if it is a valid phone number
      let CheckPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(Phone);

      //check if the first digit is "+" and it is a valid phone number
      if (firstDigit === "+" && CheckPhone) {
        //remove unneccessary symbols from phone number and
        // concatenate it with '+' to form a perfect phone number
        Phone = "+" + Phone.replace(/\D/g, "");
        validated = true;
      } else {
        setLoading(false);
        seterrorMsg("make sure your phone number follows the correct format");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateFormInput();

    if (validated) {
      let config = {
        method: "POST",
        url: "https://api.chimoney.io/v0.2/redeem/airtime",
        headers: { "X-API-Key": API_KEY },
        data: formDetails,
      };
      axios(config)
        .then(function (response) {
          setLoading(false);
          setformDetails({});
          swal({
            title: "Airtime Redeemed Successfully!",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        })
        .catch(function (error) {
          setLoading(false);
          seterrorMsg("confirm the ticket is still valid");
          console.log(error);
        });

    }
  };

  const clearErrorMsg = () => {

    setErrorMsg('');
  };

  return (
    <HomeContainer>
      <Header>
        <h1>Welcome To Keeplite</h1>
      </Header>
      
      <MainContent>
        <Description>
          To redeem your Chimoney as Airtime, enter your{' '}
          <Highlight>Ticket ID</Highlight> or{' '}
          <Highlight>Chi-REF</Highlight> in the input below
        </Description>

        <InputSection onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
          <StyledInput 
            type="text" 
            name="ChiREF" 
            placeholder="Enter your Ticket ID or Chi-REF" 
            onChange={handleChange} 
          />
          <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        </InputSection>

        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </MainContent>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(142, 68, 173, 1) 0%, rgba(26, 188, 156, 1) 100%);
  color: white;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  padding: 2rem;
  text-align: center;

  h1 {
    font-size: 3.5rem;
    font-weight: bold;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 200px);
  padding: 0 2rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  text-align: center;
  max-width: 800px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const Highlight = styled.span`
  background-color: #00000078;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.4rem;
  display: inline-block;
`;

const InputSection = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  max-width: 800px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 1.2rem;
  border: 1px solid #f8f8f8;
  background-color: #f8f8f8;
  transition: all 0.3s ease;

  &::placeholder {
    color: #888;
    font-size: 1.2rem;
  }

  &:focus {
    outline: none;
    border-color: #f8f8f8;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(135deg, rgba(142, 68, 173, 1) 0%, rgba(26, 188, 156, 1) 100%);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 5px 0px #70dfd6e4;

  &:hover {
    cursor: pointer;
    font-size: 1.1rem;
    background: linear-gradient(135deg, rgba(142, 68, 173, 1) 0%, rgba(22, 160, 133, 1) 100%);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ErrorMessage = styled.div`
  color: #D2122E;
  padding: 1rem;
  margin-top: 0.3rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
`;

export default Home;

    seterrorMsg("");
  };

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [countryName, setCountryName] = useState("");
  const countryNameHandler = (country) => {
    setformDetails({
      ...formDetails,
      countryToSend: country,
    });
    setCountryName(country);
    setIsSelectOpen(false);
  };

  return (
    <div>
      <h1 className="page-title">Convert Chimoney to Airtime</h1>
      <form onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
        {errorMsg ? <p className="error">{errorMsg}</p> : ""}
        <div>
          <p className="form-label">Ticket ID</p>
          <input
            type="text"
            value={formDetails.chiRef}
            name="chiRef"
            onChange={handleChange}
            id="country"
            placeholder="Enter Ticket ID"
            className="mb-2 w-90"
            disabled
          />
        </div>
        <div>
          <p className="form-label">Phone number (+2349023..)</p>
          <input
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
            id="phone-number"
            placeholder="Enter Phone Number"
            className="mb-2 w-90"
          />
        </div>
        <div>
          <p className="form-label">Country</p>
          <div className="select-area">
            <div
              value={formDetails.countryToSend}
              onClick={() => {
                setIsSelectOpen(!isSelectOpen);
              }}
              className="select"
            >
              <div>{countryName ? countryName : "Select Your Country"}</div>
              <div className="dropdown-arrow"></div>
            </div>
            {isSelectOpen ? (
              <div className="option-area">
                <div className="option">Select Your Country</div>
                {countries.length !== 0 ? (
                  countries.map((country, index) => (
                    <div key={index} onClick={() => countryNameHandler(country)} className="option">
                      {country}
                    </div>
                  ))
                ) : (
                  <div value="" className="option">
                    Loading..
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className="button-area">
          <button type="submit" onClick={handleSubmit}>
            {loading ? "Loading..." : "Redeem Airtime"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Redeem;
