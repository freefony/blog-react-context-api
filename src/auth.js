import React, { Component } from "react";
import { firebaseAuth } from "./firebase";
import { toKeyVal } from "./utils";
import { Redirect } from "react-router-dom";

const defaultValue = {}; // for orphan Consumers
const AuthContext = React.createContext(defaultValue);

export const login = ({ email, password }) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

export const logout = () => firebaseAuth.signOut();

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
  return ChildComponent => props => (
    <Consumer>
      {user => {
        if (!(user && user.uid)) {
          console.warn("redirecting: no user object found");
          return <Redirect push to="/login" />;
        }

        const authorisedUserData = authoriserFunc
          ? authoriserFunc(user)
          : { ...user };

        const developedProps = { ...authorisedUserData, ...props };
        return <ChildComponent {...developedProps} />;
      }}
    </Consumer>
  );
};
