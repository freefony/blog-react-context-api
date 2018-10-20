import React, { Component } from "react";
import { firebaseAuth } from "./firebase";
import { toKeyVal } from "./utils";
import { Redirect } from "react-router-dom";

const defaultValue = {}; // for orphan Consumers
const AuthContext = React.createContext(defaultValue);

export const login = ({ email, password }) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

export class AuthProvider extends Component {
  constructor() {
    super();
    this.state = {
      waiting: true
    };
  }
  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      this.setState(toKeyVal("user", user));
      this.setState(toKeyVal("waiting", false));
    });
  }
  render() {
    const { children } = this.props;
    const { user, waiting } = this.state;
    const { Provider } = AuthContext;
    if (waiting) {
      return "Loading....";
    }
    return <Provider value={user}>{children}</Provider>;
  }
}

export const withAuth = authoriserFunc => {
  const { Consumer } = AuthContext;
  return (
    <Consumer>
      {user => {
        if (!user || !user.uid) {
          return <Redirect push to="/signin" />;
        }
        const authorisedUserData = authoriserFunc
          ? authoriserFunc(user)
          : { ...user };
        return ChildComponent => {
          return class AuthConsumer extends Component {
            render() {
              return <ChildComponent {...authorisedUserData} />;
            }
          };
        };
      }}
    </Consumer>
  );
};
