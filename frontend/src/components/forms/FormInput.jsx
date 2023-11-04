/* eslint-disable react/prop-types */
import React, { useState } from "react";
// import { ReactComponent as HidePassword } from "/hide-password.svg";
// import { ReactComponent as ShowPassword } from "/show-password.svg";

function FormInput({ onInput, formValue = "", children }) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  const password =
    children === "Password"
      ? true
      : children === "Confirm password"
      ? true
      : false;

  const isEmail = children === "Email" ? true : false;

  return (
    <div className="form-input">
      <label>{children}</label>
      <div className={`input-field ${isFocused ? "focus" : ""}`}>
        <input
          type={
            !password
              ? isEmail
                ? "email"
                : "text"
              : !showPassword
              ? "password"
              : "text"
          }
          name={children}
          value={formValue}
          className="form-input-field"
          placeholder={`${children}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onInput(e.target)}
        />
        {password && (
          <div
            className={`hide-show-password ${isFocused ? "fill-svg" : ""}`}
            onClick={handleShowPassword}
          >
            {/* {showPassword ? <ShowPassword /> : <HidePassword />} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default FormInput;
