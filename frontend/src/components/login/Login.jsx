import React from "react";
import Loader from "../loader/Loader";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import Success from "./Success";

function Login({
  formHeight = "490px",
  onFormInput,
  username,
  email,
  password,
  confirmPassword,
  passwordError,
  onCloseModal,
  login,
  signup,
  onSignup,
  signupSuccess,
  isSuccess,
  onLogin,
  onFormSubmit,
  isUserExist,
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
            passwordError={passwordError}
            onCloseModal={onCloseModal}
            onFormSubmit={onFormSubmit}
            onSignup={onSignup}
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
            onLogin={onLogin}
            onFormSubmit={onFormSubmit}
            isUserExist={isUserExist}
            onCloseModal={onCloseModal}
          />
        </div>
      )}
      {isSuccess && (
        <div className="form-container" style={formStyle}>
          <Success
            signupSuccess={signupSuccess}
            username={username}
            onLogin={onLogin}
            onCloseModal={onCloseModal}
          />
        </div>
      )}
    </main>
  );
}

export default Login;
