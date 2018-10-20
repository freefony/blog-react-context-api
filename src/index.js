import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./LoginContainer";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h2>React Auth with Context API and Firebase</h2>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route render={() => <Link to="/login">Login</Link>} />
        </Switch>
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
