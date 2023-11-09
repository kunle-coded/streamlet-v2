/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";
import { Link } from "react-router-dom";
import { useForms } from "../../contexts/FormContext";

function SignupForm() {
  const {
    username,
    email,
    password,
    confirmPassword,
    userExists,
    onFormInput,
    onFormSubmit,
  } = useForms();

  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledCheck, setIsDisabledCheck] = useState(true);
  const [misMatch, setMismatch] = useState(false);

  useEffect(() => {
    if (!(username && email && password && confirmPassword)) {
      setIsDisabled(true);
      setChecked(false);
    } else if (password !== confirmPassword) {
      // setIsDisabled(true);
      setMismatch(true);
    } else {
      setMismatch(false);
      setIsDisabled(false);
    }
  }, [confirmPassword, email, onFormInput, password, username]);

  function handleChecked(e) {
    if (e.target.checked) {
      setChecked(true);
      setIsDisabledCheck(false);
    } else {
      setChecked(false);
      setIsDisabledCheck(true);
    }
  }

  return (
    <form className="form-user" name="signup" onSubmit={onFormSubmit}>
      <FormTitle>Register to enjoy all features</FormTitle>

      <div className="form-inputs-area">
        <FormInput onInput={onFormInput} formValue={username}>
          Username
        </FormInput>
        <FormInput onInput={onFormInput} formValue={email}>
          Email
        </FormInput>
        <FormInput onInput={onFormInput} formValue={password}>
          Password
        </FormInput>
        <FormInput onInput={onFormInput} formValue={confirmPassword}>
          Confirm password
        </FormInput>
        <div className="signup-error-message">
          <span className={`password-mismatch ${misMatch ? "mismatch" : ""}`}>
            Passwords do not match
          </span>

          <span
            className={`password-mismatch ${
              userExists && !misMatch ? "mismatch" : ""
            }`}
          >
            User Already Exist. Please Login
          </span>
        </div>
      </div>
      <div className="form-btn-area">
        <div className="form-terms-conditions">
          <span className="privacy">
            <label>
              <input
                type="checkbox"
                disabled={isDisabled}
                onChange={handleChecked}
              />
              <span className="privacy-check"></span>
            </label>
          </span>
          <p>
            I agree to our <span>Privacy Policy</span> and{" "}
            <span>Term & Conditions</span>
          </p>
        </div>

        <Buttons
          width="100%"
          height="45px"
          background={checked ? "#00925d" : "#fff"}
          border={false}
          borderRadius="10px"
          color={checked ? "#fff" : "#9ca4ab"}
          fontWeight="800"
          disabled={isDisabledCheck}
        >
          Continue
        </Buttons>

        <p className="form-account">
          Already have an account?{" "}
          <span>
            <Link to="/user/login">Login</Link>
          </span>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
