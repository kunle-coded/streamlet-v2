import React from "react";
import logo from "../../assets/Streamlet.svg";
import "./form.css";
import Buttons from "../buttons/Buttons";

function FormTitle({ onClose, children }) {
  return (
    <div className="form-title-area">
      <div className="form-logo">
        <div className="form-logo-area">
          <img src={logo} alt="company logo" />
        </div>
        <p>{children}</p>
      </div>
      <div className="form-close">
        <Buttons
          background="#0d0c0f"
          height="inherit"
          width="max-content"
          border={false}
          borderRadius="6px"
          padding="4px 6px"
          color="#fff"
          onClick={onClose}
        >
          Close
        </Buttons>
      </div>
    </div>
  );
}

export default FormTitle;
