import React from "react";

const Login = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading
}) => {
  const btnChildren = isLoading ? "Loading..." : "Submit";
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => onEmailChange(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => onPasswordChange(e.target.value)}
        placeholder="Password"
      />
      <button type="submit" onClick={onSubmit}>
        {btnChildren}
      </button>
    </form>
  );
};

export default Login;
