/* eslint-disable react/prop-types */
import React from "react";
import Loader from "../loader/Loader";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import Success from "./Success";
import { Outlet, useParams, useSearchParams } from "react-router-dom";

function Login({
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
  return (
    <main className="login-page">
      <div className="form-container">
        {/* <LoginForm
          onFormInput={onFormInput}
          email={email}
          password={password}
          passwordError={passwordError}
          onCloseModal={onCloseModal}
          onFormSubmit={onFormSubmit}
          onSignup={onSignup}
        /> */}
        <Outlet />
      </div>

      {signup && (
        <div className="form-container">
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
        <div className="form-container">
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
