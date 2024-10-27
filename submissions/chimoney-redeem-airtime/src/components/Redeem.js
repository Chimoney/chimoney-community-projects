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
