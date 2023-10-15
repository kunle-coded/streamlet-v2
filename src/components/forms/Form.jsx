import React from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";

function Form({ onLogin, onEmailInput, email, onPasswordInput, password }) {
  return (
    <form className="form-user">
      <FormTitle>Login to your account</FormTitle>

      <div className="form-inputs-area">
        <FormInput onInput={onEmailInput} formValue={email}>
          Email
        </FormInput>
        <FormInput onInput={onPasswordInput} formValue={password}>
          Password
        </FormInput>
      </div>
      <div className="form-btn-area">
        <p className="forgot-password">Forgot Password?</p>
        <Buttons
          width="100%"
          height="45px"
          background="#fff"
          border={false}
          borderRadius="10px"
          color="#9ca4ab"
          fontWeight="800"
          onClick={onLogin}
        >
          Login
        </Buttons>
        <p className="form-account">
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </form>
  );
}

export default Form;
