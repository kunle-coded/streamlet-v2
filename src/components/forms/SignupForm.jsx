import React, { useEffect, useState } from "react";
import Buttons from "../buttons/Buttons";
import FormTitle from "./FormTitle";
import FormInput from "./FormInput";

function SignupForm({
  onLogin,
  onFormInput,
  email,
  password,
  username,
  confirmPassword,
  onFormSubmit,
  onCloseModal,
}) {
  const [checked, setChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!(username && email && password && confirmPassword)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [onFormInput]);

  function handleChecked(e) {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  return (
    <form className="form-user" name="signup" onSubmit={onFormSubmit}>
      <FormTitle onClose={onCloseModal}>
        Register to enjoy all features
      </FormTitle>

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
          disabled={isDisabled}
        >
          Continue
        </Buttons>
        <p className="form-account">
          Already have an account? <span>Login</span>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
