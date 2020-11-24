import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "./App";


//if any errors, return the error message
export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

//login is almost the same as register 
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);


//fetch login data and post to the server
//have different states for errors, username/password
//when user clicks on register, it takes them to the homepage - useHistory
  const login = (e) => {
    e.preventDefault();
    fetch(`https://to-do-list-app-mt.herokuapp.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(handleErrors)
      .then(() => {
        setCredentials({
          username,
          password,
        });
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };
  const history = useHistory();

  return (
    <div>
      <h1>Login!</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          required
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
