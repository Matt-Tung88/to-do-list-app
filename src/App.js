import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Register";
import Welcome from "./Welcome";
import Login from "./Login";


export const CredentialsContext = React.createContext();

//make credentials persist throughout the application - useContext
//routes within the homepage of the application
function App() {
  const credentialState = useState(null);
  return (
    <div className="App">
      <CredentialsContext.Provider value={credentialState}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  );
}

export default App;
