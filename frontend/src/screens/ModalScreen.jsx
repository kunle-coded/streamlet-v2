import { Outlet } from "react-router-dom";
import { Footer, Header, Navbar, LoginLayout } from "../components";

function ModalScreen() {
  return (
    <div className="app">
      <Header slider={false}>
        <Navbar />
      </Header>
      <LoginLayout />
      <Footer />
    </div>
  );
}

export default ModalScreen;
