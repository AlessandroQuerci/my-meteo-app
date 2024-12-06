import { Container, Row, Col } from "react-bootstrap";
import Logo from "../data/image/my-logo-spin.png";
import MySearch from "./MySearch";

const Home = () => {
  return (
    <>
      <div>
        <Container fluid className="bg-home py-5">
          <Row className="d-flex justify-content-center align-items-center">
            <Col xs={12} className="d-flex justify-content-center align-items-center flex-column pt-5">
              <img src={Logo} alt="" className="App-logo" />
              <p className="display-6 text-white pt-3">The Weather in your pocket...</p>
            </Col>

            <Col xs={6} className="pt-5">
              <MySearch />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
