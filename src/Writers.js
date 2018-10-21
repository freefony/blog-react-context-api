import React, { Fragment } from "react";
import { withAuth } from "./auth";

const Writer = ({ error }) => {
  const view = [];
  if (error) {
    view.push(<div key="1-irwr">Failed to load: {error}</div>);
  } else {
    view.push(<div key="4-fkjjs">Welcome Writer you</div>);
  }
  return <Fragment>{view}</Fragment>;
};

const authReducer = user => {
  /**
   * DANGERFOOL!!! Do not try this at home or anywhere else
   * firebase handles Access Control with idTokens and claims
   * read about it here https://firebase.google.com/docs/auth/admin/custom-claims
   * whatever you do here and in any clientside security should be for UX purposes
   * only and NEVER as the actual means to secure your app
   */
  const type = user.email.split("@")[0];
  if (!(type === "writer" || type === "moderator")) {
    return { error: "Only moderators and writers can view this page" };
  }
  return { ...user };
};
export default withAuth(authReducer)(Writer);
