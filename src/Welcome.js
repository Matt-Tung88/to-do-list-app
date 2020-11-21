import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {CredentialsContext} from './App';
import Todo from './Todo';

const Welcome = () => {
    const [credentials] = useContext(CredentialsContext);
    return (
        <div>
            <h1>Welcome {credentials && credentials.username}</h1>
            {!credentials && <Link to="/register">Register</Link>}
            <br/>
            {!credentials && <Link to="/login">Login</Link>}
            {credentials && <Todo/>}
        </div>
    )
}

export default Welcome;
