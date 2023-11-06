import { Outlet } from "react-router-dom";
import Login from "./Login";

function LoginLayout() {
  return (
    <div className="login-modal">
      <Login />
    </div>
  );
}

export default LoginLayout;
