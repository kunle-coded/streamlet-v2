import React from "react";
import Loader from "../loader/Loader";
import Form from "../forms/Form";

function Login({ onEmailInput, email, onPasswordInput, password }) {
  return (
    <main className="login-page">
      <div className="form-container">
        <Form
          onEmailInput={onEmailInput}
          onPasswordInput={onPasswordInput}
          email={email}
          password={password}
        />
      </div>
    </main>
  );
}

export default Login;
