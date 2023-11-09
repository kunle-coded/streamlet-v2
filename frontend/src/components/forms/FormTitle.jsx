/* eslint-disable react/prop-types */
import React from "react";
import logo from "/Streamlet.svg";
import "./form.css";
import Buttons from "../buttons/Buttons";
import { useNavigate } from "react-router-dom";

function FormTitle({ children }) {
  const navigate = useNavigate();

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
          name="close"
          background="#0d0c0f"
          height="inherit"
          width="max-content"
          border={true}
          borderColor="#28262d"
          borderRadius="6px"
          padding="10px 15px"
          color="#fff"
          onClick={() => navigate("/")}
        >
          Close
        </Buttons>
      </div>
    </div>
  );
}

export default FormTitle;
