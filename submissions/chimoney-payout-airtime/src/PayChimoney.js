import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import validator from 'validator';
import { FormContainer, Table } from "./style.js";

const PayOut = () => {
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [receivers, setReceivers] = useState([]);
  const [receiver, setReceiver] = useState({
    email: "",
    twitter: "",
    valueInUSD: "",
  });

  const API_KEY = process.env.REACT_APP_CHICONNECT_KEY ;

  let validated = false;
  let multipleUsers = receivers.length;


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
      !receiver.email ||
      !receiver.valueInUSD
    ) {
      console.log("error");
      seterrorMsg("Please input all details");
    } else {
      setLoading(true);
      if (validator.isEmail(receiver.email)) {
        validated=true;
      } else {
        setLoading(false);
        seterrorMsg('Enter a valid Email!')
      }
    }
  };

  const sendChimoney = () => {
    console.log(API_KEY)
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
          url: "https://api.chimoney.io/v0.2/payouts/initiate-chimoney",
          headers: { "X-API-Key": API_KEY },
          data: {
            chimoneys: receivers,
          },
        };
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data.data.paymentLink)
            setLoading(false);
            setReceivers([]);
            Swal.fire({
              title: "Success!",
              text: "Redirecting in 2 seconds.",
              type: "success",
              timer: 2000,
              showConfirmButton: false 
            }).then(() => {
              console.log('triggered redirect here');
              window.location.href = response.data.data.paymentLink;
            });         
            setReceiver({
              email: "",
              twitter: "",
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

      sendChimoney();
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

    const id = receiver.email;

    //find duplicate entry
    const item = receivers.find((item) => item.email === id);

    if (validated && item) {
      seterrorMsg("user already exist, please update instead");
      setLoading(false);
    } else if (validated && !item) {
      setReceivers([...receivers, receiver]);
      setReceiver({
        email: "",
        twitter: "",
        valueInUSD: receiver.valueInUSD,
      });
      setLoading(false);
      validated = false;
    }
  };

  const handleEdit = (id, email) => {
    setEditing(true);
    setCurrentIndex(id);
    const item = receivers.find((item) => item.email === email);
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
        email: "",
        twitter: "",
        valueInUSD: receiver.valueInUSD,
      });
    } else return;
  };

  const deleteReceiver = (id) => {
    setReceivers(receivers.filter((m) => m.email !== id));
  };

  const clearErrorMsg = () => {
    seterrorMsg("");
  };

  return (
    <FormContainer onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
      <h1>Payout Chimoney</h1>
      <p>Enter The Receivers Details Below...</p>
      <form>
        <div>
          <p>Email Address</p>
          <input
            type="mail"
            name="email"
            value={receiver.email}
            onChange={handleChange}
            id="email"
            placeholder="test@gmail.com"
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

        <div>
          <p>Twitter Handle</p>
          <input
            type="text"
            name="twitter"
            value={receiver.twitter}
            onChange={handleChange}
            id="twitter"
            placeholder="@testing"
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
                <th>Email Address</th>
                <th>Amount($)</th>
                <th>Twitter Handle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receivers.map(
                ({ email, twitter, valueInUSD }, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{email}</td>
                    <td>{valueInUSD}</td>
                    <td>{twitter ? twitter : "__"}</td>
                    <td className="flex-box">
                      <button
                        className="edit"
                        onClick={() => handleEdit(index, email)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => deleteReceiver(email)}
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
            <button type="submit" onClick={sendChimoney} className="last-btn">
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
