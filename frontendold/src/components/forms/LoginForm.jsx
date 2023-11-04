import React from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";

function LoginForm({
  onLogin,
  onFormInput,
  email,
  password,
  passwordError,
  onSignup,
  onCloseModal,
  onFormSubmit,
}) {
  const bgColor = email && password ? "#00925d" : "#fff";
  const color = email && password ? "#fff" : "#9ca4ab";

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
        <div className="signup-error-message">
          <span
            className={`password-mismatch ${passwordError ? "mismatch" : ""}`}
          >
            {passwordError}
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
          Don't have an account? <span onClick={onSignup}>Sign up</span>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
