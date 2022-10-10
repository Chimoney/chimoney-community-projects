import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import swal from 'sweetalert';
import {API_KEY} from '../SecretKeys' 



const Redeem = () => {
    const [errorMsg, seterrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    const [formDetails, setformDetails] = useState({
        chiRef: '',
        countryToSend: '',
        phoneNumber:''
    });

    const { id } = useParams();
    let validated = false;

    const getCountries = () => {
        let config = {
            method: 'GET',
            url: 'https://api.chimoney.io/v0.2/info/airtime-countries',
            headers: {'X-API-Key': API_KEY }
        };
        axios(config)
          .then(function (response) {
              setCountries(response.data.data)
            //   console.log(JSON.stringify(response.data.data));
          })
            .catch(function (error) {
              console.log(error)
          });
    }

    useEffect(() => {
        if (id) {
            setformDetails({
                ...formDetails,
                chiRef: id
            })
        }
        getCountries()
    }, [id])
    

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setformDetails({
            ...formDetails,
            [name] : value
        })
        console.log(formDetails)
    }

    const validateFormInput = () => {
        let Phone = formDetails.phoneNumber;

        if (!formDetails.chiRef || !formDetails.countryToSend || !formDetails.phoneNumber) {
            console.log('error')
            seterrorMsg('Please input all details')
        } else {
            setLoading(true)
            //copy the first digit
            let firstDigit = Phone.slice(0, 1);
            
            //check if it is a valid phone number
            let CheckPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(Phone);

            //check if the first digit is "+" and it is a valid phone number
            if (firstDigit === '+' && CheckPhone) {

                //remove unneccessary symbols from phone number and
                // concatenate it with '+' to form a perfect phone number
                Phone = '+' + Phone.replace(/\D/g, '');
                validated = true;
            } else {
                setLoading(false);
                seterrorMsg('make sure your phone number follows the correct format')
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        validateFormInput();
   
        if (validated) {
            let config = {
                method: 'POST',
                url: 'https://api.chimoney.io/v0.2/redeem/airtime',
                headers: {'X-API-Key': API_KEY },
                data: formDetails
            };
            axios(config)
              .then(function (response) {
                  // console.log(JSON.stringify(response.data));
                  setLoading(false);
                  setformDetails({});
                  swal({
                      title: 'Airtime Redeemed Successfully!',
                      showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                      },
                      hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                      }
                    })
              })
                .catch(function (error) {
                  setLoading(false);
                  seterrorMsg('confirm the ticket is still valid');
                  console.log(error)
              });
        }
    }
        
    const clearErrorMsg = () => {
        seterrorMsg('')
    }

  return (
      <FormContainer>
         <h1>Convert Chimoney to Airtime</h1>
          <form onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
              {errorMsg ? <p className='error'>{errorMsg}</p> : ''}
            
              <div>
              <p>Ticket ID</p>
                  <input type="text" value={formDetails.chiRef} name="chiRef" onChange={handleChange} id="country" placeholder='enter ticket  id'  disabled/>
              </div>
              <div>
              <p>Phone number (+2349023..)</p>
                <input type="tel" name="phoneNumber" onChange={handleChange} id="phone-number" placeholder='enter phone number' />
              </div>
              <div>
                  <p>Country</p>
                  <select name="countryToSend" value={formDetails.countryToSend} id="country" onChange={handleChange} >
                        <option value=''>Select Your Country</option>
                        {countries.length !== 0 ? countries.map((country, index) => (       
                            <option key={index} value={country}>{country}</option>
                        )): <option value=''>Loading..</option>}
                    </select>
                {/* <input type="text" name="countryToSend" onChange={handleChange} id="country" placeholder='e.g: nigeria' /> */}
              </div>
            <div className='button'>
            <button type='submit' onClick={handleSubmit}>  {loading ? 'Loading...' : 'Redeem Airtime' }</button>
            </div>
        </form>
    </FormContainer>
)
}

const FormContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: white;
    h1{
        text-align: center;
        font-size: 2.5rem;
    }
    
    form{
    padding: 1rem;
    margin: 0 auto;
    width: 50vw;
    /* box-shadow: 0 5px 5px 0px #70dfd6e4; */
    p{
        font-size: 1.2rem;
        margin-bottom: 0.3rem;
    }
    .error{
        font-size: 1.1rem;
        color: #1a04048f;
        text-transform: capitalize;
        padding: 1rem;
        text-align: center;
        font-weight: 600;
    }
    }

    input, select{
    width: 50%;
    outline: none;
    font-size: 1.2rem;
    padding: 1rem;
    border: 1px solid #f8f8f8;
    background-color: #f8f8f8;
    margin-bottom:2rem;
    }
    input{
        width: 90%;
    }
    .button{
        text-align: center;
        width: 90%;
       button{
        padding: 1rem 2rem;
        box-shadow: 0 5px 5px 0px #70dfd6e4; 
        background: linear-gradient(135deg, rgba(142, 68, 173, 1)  0%, rgba(26, 188, 156, 1) 100%);
        border: none;
        text-transform: uppercase;
        color: white;
        font-size: 1rem;
        transition: all ease-in 0.5secs;
        font-weight: 600;
        :hover{
            cursor: pointer;
            font-size: 1.05rem;
        }
       }
       
    }
`

export default Redeem