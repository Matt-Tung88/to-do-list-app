import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {CredentialsContext} from './App';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [, setCredentials] = useContext(CredentialsContext);



const login = (e) => {
    e.preventDefault();
    fetch('/login ', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
    })
    .then(() => {
        history.push('/')
        setCredentials({username, password})
    })
    .catch((error) => {
        console.log(error);
        setError("Error");
    })
};
const history = useHistory();

    return (
        <div>
            <h1>Login!</h1>
            {error}
            <form onSubmit={login}>
                <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" required/>
                <br/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" required/>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}


export default Login;
