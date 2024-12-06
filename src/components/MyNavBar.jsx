import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import WhiteLogo from "../data/image/my-logo-white.png";

const MyNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-my-navbar ">
      <Container fluid>
        <img src={WhiteLogo} alt="Logo" className="logo" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Link to="/" className="mx-4 text-white text-decoration-none fs-6">
              Home
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
