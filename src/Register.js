import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "./App";
import { handleErrors } from "./Login";

//basically same as login component
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const register = (e) => {
    e.preventDefault();
    fetch(`https://to-do-list-app-mt.herokuapp.com/register`, {
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
        setError(error.message);
      });
  };
  const history = useHistory();

  return (
    <div>
      <h1>Register!</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={register}>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
