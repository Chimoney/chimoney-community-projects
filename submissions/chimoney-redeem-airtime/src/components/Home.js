import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import {CHI_REF} from '../SecretKeys';

const Home = () => {
  return (
    <HomeContainer>
        <img src="" alt="" />
        <h1>Congratulations.. </h1>
        <p> You have just received 1000 Chimoney ($1USD) from Keeplite!</p>
        <Box>
            <StyledLink  to={`/redeem-airtime/${CHI_REF}`}>Redeem Now as Airtime</StyledLink>
        </Box>
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
    margin: 3rem auto;
    font-size: 2rem;
}
`

const Box = styled.div`
@keyframes float {
	0% {
		box-shadow: 0 5px 15px 0px rgba(255,255,255,0.6);
		transform: translatey(0px);
	}
	50% {
		box-shadow: 0 25px 15px 0px rgba(255,255,255,0.2);
		transform: translatey(-20px);
	}
	100% {
		box-shadow: 0 5px 15px 0px rgba(255,255,255,0.6);
		transform: translatey(0px);
	}
}
box-shadow: 0 5px 5px 0px #70dfd6e4;
background-color: white;
transform: translatey(0px);
animation: float 6s ease-in-out infinite;
text-align: center;
padding: 1rem;

`

const StyledLink = styled(Link)`
padding: 1rem;
font-size: 1.5rem;
font-weight: 700;
text-decoration: none;
:active{
    color: purple;
}
`

export default Home;