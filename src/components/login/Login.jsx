import React from "react";
import Loader from "../loader/Loader";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";

function Login({
  formHeight = "490px",
  onFormInput,
  username,
  email,
  password,
  confirmPassword,
  onCloseModal,
  login,
  signup,
  onFormSubmit,
}) {
  const formStyle = {
    height: formHeight,
  };
  return (
    <main className="login-page">
      {login && (
        <div className="form-container" style={formStyle}>
          <LoginForm
            onFormInput={onFormInput}
            email={email}
            password={password}
            onCloseModal={onCloseModal}
            onFormSubmit={onFormSubmit}
          />
        </div>
      )}
      {signup && (
        <div className="form-container" style={formStyle}>
          <SignupForm
            onFormInput={onFormInput}
            username={username}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onFormSubmit={onFormSubmit}
            onCloseModal={onCloseModal}
          />
        </div>
      )}
    </main>
  );
}

export default Login;
