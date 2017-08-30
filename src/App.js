import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import AutoRedirectPanel from './AutoRedirectPanel';
import BlockDetectorPanel from './BlockDetectorPanel';


// first time on react, i am very excited
// so this is our app
class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col md="2" className="left-panel">
            <p><a href="https://gir.im?ref=extension"><img src="assets/images/logo.png" alt="logo" /></a></p>
            <h5>bir web proxy</h5>
            <hr />
            <h3>Ayarlar</h3>
            <hr />
            <p className="open-source-desc">kullandığınız eklenti açık kaynaklıdır, <a href="https://github.com/girimproxy/chromeextension" target="_blank">girimproxy/chromeextension</a> adresinden kodu görüntüleyebilirsiniz</p>
          </Col>
          <Col md="10" className="content-panel offset-md-2">
            <Row className="mb-3">
              <AutoRedirectPanel></AutoRedirectPanel>
            </Row>
            <Row>
              <BlockDetectorPanel></BlockDetectorPanel>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
