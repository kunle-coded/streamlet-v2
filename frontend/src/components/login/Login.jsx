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
        <Outlet />
      </div>
    </main>
  );
}

export default Login;
