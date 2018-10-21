import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./LoginContainer";
import Moderators from "./ModeratorsOnly";
import Writer from "./Writers";
import { AuthProvider, logout, withAuth } from "./auth";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>React Auth with Context API and Firebase</h2>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthProvider>
            <Route path="/moderators" component={Moderators} />
            <Route path="/writers" component={Writer} />
            <Route
              render={withAuth()(() => (
                <Fragment>
                  <p>
                    <Link to="/moderators">Moderators</Link>
                  </p>
                  <Link to="/writers">Writers</Link>
                  <p>
                    <button onClick={() => logout()}>Logout</button>
                  </p>
                </Fragment>
              ))}
            />
          </AuthProvider>
          <Route path="/" render={() => <Link to="/login">Login</Link>} />
        </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
