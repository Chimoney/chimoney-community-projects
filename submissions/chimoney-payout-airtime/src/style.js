import styled from "styled-components";

export const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5rem;
  justify-content: center;
  box-sizing: border-box;
  color: white;
  margin-bottom: 10rem;

  h1 {
    margin-top: 4rem;
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }

  form {
    padding: 1rem;
    margin: 2rem auto;
    width: 40vw;
    p {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }
    @media (max-width: 1050px) {
      width: 70vw;
    }

    .error-container {
      width: 90%;
      margin: 1rem;
      p {
        font-size: 1.2rem;
        color: white;
        text-decoration: wavy;
        text-transform: capitalize;
        padding: 1rem;
        text-align: center;
        font-weight: 600;
      }
    }
  }

  input,
  select {
    width: 50%;
    outline: none;
    font-size: 1.2rem;
    padding: 1rem;
    border: 1px solid #f8f8f8;
    background-color: #f8f8f8;
    margin-bottom: 2rem;
  }
  input {
    width: 90%;
  }
  .button-container {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    @media (max-width: 1050px) {
      flex-direction: column;
    }
  }
  button {
    width: 220px;
    height: 60px;
    box-shadow: 0 5px 5px 0px #70dfd6e4;
    background: linear-gradient(
      135deg,
      rgba(43, 123, 191) 0%,
      rgba(43, 123, 191) 100%
    );
    border: none;
    text-transform: uppercase;
    color: white;
    font-size: 1rem;
    transition: all ease-in 0.5secs;
    font-weight: 600;
    :hover {
      cursor: pointer;
      font-size: 1.05rem;
    }
  }
  button + button {
    margin-left: 2rem;
    @media (max-width: 1050px) {
      margin-left: 0 !important;
      margin-top: 1rem;
    }
  }

  .last-btn {
    box-shadow: none;
    margin-top: 1rem;
  }

  .sub-class {
    overflow-x: scroll;
  }
`;

export const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  text-align: center;
  width: 100%;
  color: black;

  tr{
    background-color: #f8f8f8;
  }

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  td {
    font-size: 1rem;
    text-overflow: ellipsis;
  }
  tr {
    padding: 1rem;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    background-color: rgb(43, 123, 191);
    color: white;
  }
 
  .edit,
  .delete {
    width: 120px;
    height: 40px;
    /* padding: 0.5rem 2rem; */
    background: #e8a84c;
    box-shadow: none;
    border: none;
  }
  .delete {
    background: #b92a25;
    color: #f8f8f8;
    /* margin-left: 1rem; */
  }
  .edit+.delete{
    margin-left: 1rem !important;
  }

  @media only screen and (max-width: 860px){
    width: 90vw;
    text-align: left;

    .edit+.delete{
    margin-left: 1rem;
  }

    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

     thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      border: 1px solid #ccc;
    }
    tr+tr{
      margin-top: 2rem;
    }

    td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 45%;
      overflow: hidden;
    }

    td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 40%;
      padding-right: 10px;
      white-space: nowrap;
    }

    /*
	Label the data
	*/
    td:nth-of-type(1):before {
      content: "id";
    }
    td:nth-of-type(2):before {
      content: "Email";
    }
    td:nth-of-type(3):before {
      content: "Amount in USD";
    }
    td:nth-of-type(4):before {
      content: "Twitter Handle";
    }
    td:nth-of-type(5):before {
      content: "Action";
    }
  }
`;
