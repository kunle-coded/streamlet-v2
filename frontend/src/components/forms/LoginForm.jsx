/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import { useForms } from "../../contexts/FormContext";

function LoginForm() {
  const { email, password, loginErrorMessage, onFormInput, onFormSubmit } =
    useForms();

  const bgColor = email && password ? "#00925d" : "#fff";
  const color = email && password ? "#fff" : "#9ca4ab";

  return (
    <form className="form-user" name="login" onSubmit={onFormSubmit}>
      <FormTitle>Login to your account</FormTitle>

      <div className="form-inputs-area">
        <FormInput onInput={onFormInput} formValue={email}>
          Email
        </FormInput>
        <FormInput onInput={onFormInput} formValue={password}>
          Password
        </FormInput>
        <div className="signup-error-message">
          <span
            className={`password-mismatch ${
              loginErrorMessage ? "mismatch" : ""
            }`}
          >
            {loginErrorMessage}
          </span>
        </div>
      </div>
      <div className="form-btn-area">
        <p className="forgot-password">Forgot Password?</p>
        <Buttons
          width="100%"
          height="45px"
          background={bgColor}
          border={false}
          borderRadius="10px"
          color={color}
          fontWeight="800"
        >
          Login
        </Buttons>
        <p className="form-account">
          Don't have an account?{" "}
          <span>
            <Link to="/user/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
