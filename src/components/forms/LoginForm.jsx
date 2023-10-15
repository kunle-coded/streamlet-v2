import React from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";

function LoginForm({
  onLogin,
  onFormInput,
  email,
  password,
  onCloseModal,
  onFormSubmit,
}) {
  return (
    <form className="form-user" name="login" onSubmit={onFormSubmit}>
      <FormTitle onClose={onCloseModal}>Login to your account</FormTitle>

      <div className="form-inputs-area">
        <FormInput onInput={onFormInput} formValue={email}>
          Email
        </FormInput>
        <FormInput onInput={onFormInput} formValue={password}>
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

export default LoginForm;
