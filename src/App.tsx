import Calc from "./components/Calc"
import * as CSS from "./components/CalcStyles"
import { Container, Row, Col } from "react-bootstrap";




function App() {
  return (
    <div style={CSS.app}>
      <div >
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>
              <Calc />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
