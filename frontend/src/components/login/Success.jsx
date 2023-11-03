import React, { useEffect, useState } from "react";
import FormTitle from "../forms/FormTitle";
import Buttons from "../buttons/Buttons";

function Success({ signupSuccess, username, onLogin, onCloseModal }) {
  return (
    <div className="success-message">
      <FormTitle onClose={onCloseModal}>Welcome {username}</FormTitle>
      <div className="message">
        <p>
          {signupSuccess} <span>🍿</span>
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
        onClick={onLogin}
      >
        Login
      </Buttons>
    </div>
  );
}

export default Success;
