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
  margin-top: 4rem;
  margin-bottom: 10rem;
  h1 {
    text-align: center;
    margin-bottom: 3rem;
    font-size: 2.5rem;
  }

  form {
    padding: 1rem;
    margin: 0 auto;
    width: 40vw;
    p {
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
    }

    .error-container{
      width: 90%;
      margin: 1rem;
      p{
        font-size: 1.2rem;
        color: #e8a84c;
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
    text-align: center;
    width: 90%;
  }
  button {
      padding: 1rem 2rem;
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
      margin-left: 4rem;
    }

.last-btn{
  box-shadow: none;
  margin-top: 1rem;
}
`;

export const Table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  margin-top: 2rem;
  text-align: center;
  background-color: #f8f8f8;
  color: black;

  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  td {
    font-size: 1rem;
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
    padding: 0.5rem 2rem;
    background: #e8a84c;
    box-shadow: none;
    border: none;
  }
  .delete {
    background: #B92A25;

    color: #f8f8f8;
    margin-left: 1rem;
  }
`;