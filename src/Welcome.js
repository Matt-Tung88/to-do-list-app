import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CredentialsContext} from './App';
import Todo from './Todo';

const Welcome = () => {
    const [credentials, setCredentials] = useContext(CredentialsContext);
    const logout = () => {
        setCredentials(null);
    }
    return (
        <div>
            {credentials && <button onClick={logout}>Logout</button>}
            <h1>Welcome {credentials && credentials.username}</h1>
            {!credentials && <Link to="/register">Register</Link>}
            <br/>
            {!credentials && <Link to="/login">Login</Link>}
            {credentials && <Todo/>}
        </div>
    )
}

export default Welcome;
