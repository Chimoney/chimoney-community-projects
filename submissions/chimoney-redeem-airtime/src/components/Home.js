import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

const Home = () => {
    const [ChiREF, setChiREF] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {value} = e.currentTarget;
        setChiREF(value);
    }

    const handleSubmit = (e) => { 
        if (!ChiREF) {
            setErrorMsg('input cannot be empty')
        } else {
           navigate(`/redeem-airtime/${ChiREF}`)
        }
    }

    const clearErrorMsg = () => {
        setErrorMsg('')
    }

  return (
    <HomeContainer>
        <h1>Welcome To Keeplite </h1>
          <p> To redeem your Chimoney as Airtime, Enter your <span>Ticket ID</span> or <span>Chi-REF</span> in the input below </p>
          
          <Box onMouseDown={clearErrorMsg} onKeyDown={clearErrorMsg}>
          <input type="text" name="ChiREF" onChange={handleChange}/>
            <Button  onClick={handleSubmit}>Submit</Button>
          </Box>
          {errorMsg ? <p className='error'>{errorMsg}</p> : ''}
    </HomeContainer>
  )
}

const HomeContainer = styled.div`
height: 100vh;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: white;

h1{
    font-size: 4rem;
}
p{
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 3rem;
}
input{
    width: 50%;
    outline: none;
    font-size: 1.2rem;
    padding: 1rem;
    border: 1px solid #f8f8f8;
    background-color: #f8f8f8;
    margin-right: 1rem;
}
span{
    background-color: #00000078;
    text-transform: uppercase;
    font-size: 1.4rem;
    padding: 1rem;
}
.error{
    font-size: 1.5rem;
    color: #1a04048f;
    text-transform: capitalize;
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    }
`

const Box = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Button = styled.button`
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
`

export default Home;