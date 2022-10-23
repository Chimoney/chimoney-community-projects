import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { API_KEY } from "./SecretKeys";
import { FormContainer, Table } from "./style.js";

const PayOut = () => {
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receivers, setReceivers] = useState([]);
  const [receiver, setReceiver] = useState({
    countryToSend: "",
    phoneNumber: "",
    valueInUSD: "",
  });

  let validated = false;
  let multipleUsers = receivers.length;

  const getCountries = () => {
    let config = {
      method: "GET",
      url: "https://api.chimoney.io/v0.2/info/airtime-countries",
      headers: { "X-API-Key": API_KEY },
    };
    axios(config)
      .then(function (response) {
        setCountries(response.data.data);
        //   console.log(JSON.stringify(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;

    if (name === "valueInUSD") {
      setReceiver({
        ...receiver,
        [name]: Number(value),
      });
    } else {
      setReceiver({
        ...receiver,
        [name]: value,
      });
    }
  };

  const validateFormInput = () => {
    if (
      !receiver.countryToSend ||
      !receiver.phoneNumber ||
      !receiver.valueInUSD
    ) {
      console.log("error");
      seterrorMsg("Please input all details");
    } else {
      setLoading(true);
      //copy the first digit
      let Phone = receiver.phoneNumber;
      let firstDigit = Phone.slice(0, 1);

      //check if it is a valid phone number
      let CheckPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(
        Phone
      );

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

  const sendAirtime = () => {
    setLoading(true);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Pay Out Airtime!",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "POST",
          url: "https://api.chimoney.io/v0.2/payouts/airtime",
          headers: { "X-API-Key": API_KEY },
          data: {
            airtimes: receivers,
          },
        };
        axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setLoading(false);
            setReceivers([]);
            Swal.fire("Sent!", "Airtime paid out successfully.", "success");
            setReceiver({
              countryToSend: receiver.countryToSend,
              phoneNumber: "",
              valueInUSD: receiver.valueInUSD,
            });
            validated = false;
          })
          .catch(function (error) {
            setLoading(false);
            seterrorMsg(error.response.data.error);
            console.log(error);
          });
      } else {
        setLoading(false);
      }
    });
  };

  const SinglePayOut = async () => {
    await validateFormInput();

    if (validated) {
      let receiversCopy = receivers;
      receiversCopy.push(receiver);
      setReceivers(receiversCopy);

      sendAirtime();
    } else {
      seterrorMsg("something went wrong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editing ? updateReceiver() : SinglePayOut();
  };

  const AddMore = async (e) => {
    e.preventDefault();

    await validateFormInput();

    const id = receiver.phoneNumber;

    //find duplicate entry
    const item = receivers.find((item) => item.phoneNumber === id);

    if (validated && item) {
      seterrorMsg("item already exist, please update instead");
      setLoading(false);
    } else if (validated && !item) {
      setReceivers([...receivers, receiver]);
      setReceiver({
        countryToSend: receiver.countryToSend,
        phoneNumber: "",
        valueInUSD: receiver.valueInUSD,
      });
      setLoading(false);
      validated = false;
    }
  };

  const handleEdit = (id, phoneNumber) => {
    setEditing(true);
    setCurrentIndex(id);
    const item = receivers.find((item) => item.phoneNumber === phoneNumber);
    setReceiver(item);
  };

  const updateReceiver = () => {
    validateFormInput();
    if (validated) {
      const receiversCopy = [...receivers];

      receiversCopy[currentIndex] = receiver; //an object

      setReceivers(receiversCopy);

      Swal.fire("Updated!", "Details updated successfully.", "success");
      setLoading(false);
      setEditing(false);
      setReceiver({
        countryToSend: receiver.countryToSend,
        phoneNumber: "",
        valueInUSD: receiver.valueInUSD,
      });
    } else return;
  };

  const deleteReceiver = (id) => {
    setReceivers(receivers.filter((m) => m.phoneNumber !== id));
  };

  const clearErrorMsg = () => {
    seterrorMsg("");
  };

  return (
    <FormContainer onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
      <h1>Payout Chimoney as Airtime</h1>

      <form>
        <div>
          <p>Country</p>
          <select
            name="countryToSend"
            value={receiver.countryToSend}
            id="country"
            onChange={handleChange}
          >
            <option value="">Select Your Country</option>
            {countries.length !== 0 ? (
              countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))
            ) : (
              <option value="">Loading..</option>
            )}
          </select>
        </div>
        <div>
          <p>Phone number (+2349023..)</p>
          <input
            type="tel"
            name="phoneNumber"
            value={receiver.phoneNumber}
            onChange={handleChange}
            id="phone-number"
            placeholder="enter phone number"
          />
        </div>
        <div>
          <p>Amount in USD ($)</p>
          <input
            type="number"
            name="valueInUSD"
            value={receiver.valueInUSD}
            onChange={handleChange}
            id="valueInUSD"
            placeholder="eg: 10"
          />
        </div>

        <div className="button-container">
          {!editing ? <button onClick={AddMore}> Add More People </button> : ""}
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              display: multipleUsers !== 0 && !editing ? "none" : "inline",
            }}
          >
            {editing ? "Update" : "Payout Airtime"}
          </button>
        </div>

        {errorMsg ? (
          <div className="error-container">
            <p>{errorMsg}</p>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="error-container">
            <p className="loading">Loading...</p>
          </div>
        ) : (
          ""
        )}
      </form>

      {/* table */}

      {receivers.length !== 0 ? (
        <div className="sub-class">
          <Table className="table">
            <thead>
              <tr>
                <th>id</th>
                <th>Phone number</th>
                <th>Country</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map(
                ({ countryToSend, phoneNumber, valueInUSD }, index) => (
                  <tr key={phoneNumber}>
                    <td>{index + 1}</td>
                    <td>{phoneNumber}</td>
                    <td>{countryToSend}</td>
                    <td>{valueInUSD}</td>
                    <td>
                      <button
                        className="edit"
                        onClick={() => handleEdit(index, phoneNumber)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteReceiver(phoneNumber)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>

          {/* final submission */}

          <div className="button-container">
            <button type="submit" onClick={sendAirtime} className="last-btn">
              Payout Airtime
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </FormContainer>
  );
};

export default PayOut;
