/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import FormTitle from "../forms/FormTitle";
import Buttons from "../buttons/Buttons";
import { useForms } from "../../contexts/FormContext";
import { useNavigate } from "react-router-dom";

function Success() {
  const { username, signupSuccessMessage } = useForms();

  const navigate = useNavigate();
  return (
    <div className="success-message">
      <FormTitle>Welcome {username}</FormTitle>
      <div className="message">
        <p>
          {signupSuccessMessage} <span>🍿</span>
        </p>
        <p>Login, grab a popcorn and enjoy all our amazing movies</p>
      </div>
      <Buttons
        width="100%"
        height="45px"
        background="#00925d"
        border={false}
        borderRadius="10px"
        color="#fff"
        fontWeight="800"
        onClick={() => navigate("/user/login")}
      >
        Login
      </Buttons>
    </div>
  );
}

export default Success;
