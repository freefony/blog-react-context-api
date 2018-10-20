import React, { Component } from "react";
import { toKeyVal } from "./utils";
import { Redirect } from "react-router-dom";

import { login, getCurrentUser } from "./auth";
import Login from "./Login";

class SigninContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      signupComplete: false,
      submitOngoing: false,
      userIsLoggedIn: false
    };
  }

  handleFieldChange(field, value) {
    this.setState(toKeyVal(field, value));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState(toKeyVal("submitOngoing", true));

    login({ email, password })
      .then(user => {
        console.log(user);
        if (user) {
          this.setState(toKeyVal("submitOngoing", false));
          this.setState(toKeyVal("signinComplete", true));
        }
      })
      .catch(e => {
        this.setState(toKeyVal("signinComplete", false));
        this.setState(toKeyVal("submitOngoing", false));
        console.error(e);
      });
  }

  render() {
    const { email, password, signinComplete, submitOngoing } = this.state;

    if (signinComplete) return <Redirect push to="/" />;

    return (
      <Login
        email={email}
        password={password}
        onEmailChange={email => this.handleFieldChange("email", email)}
        onPasswordChange={password =>
          this.handleFieldChange("password", password)
        }
        onSubmit={e => this.handleSubmit(e)}
        isLoading={submitOngoing}
      />
    );
  }
}

export default SigninContainer;
