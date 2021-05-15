import React  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';
import { Link } from 'react-router-dom'

function XAttComponent() {
  return (
    <div className="mdb-container">
      <Container style={{ marginTop: '50px' }}></Container>

      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Supply
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                CurrentRate
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                AttLocked
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div
          className="nes-container is-dark with-title "
          style={{ marginTop: '50px' }}
        >
          <p className="title" style={{ color: '#f7d51d' }}>
            xATT ZONE
          </p>
          <p>Deposit & Convert your ATT tokens to xATT tokens.</p>
          <Row style={{ marginTop: '50px' }}>
            <Col>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  xATT ZONE
                </p>
                <div className="mdb-container ">... Coming Soon ...</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title ">
          <p className="title" style={{ color: '#f7d51d' }}>
            Connect{' '}
          </p>
          <div>
            <Row className="is-centered" style={{ paddingLeft: '130px' }}>
              <a href="https://twitter.com/att_money" target="_blank" rel="noreferrer">
                <button
                  type="button"
                  className="nes-btn is-primary"
                  style={{ marginRight: '18px' }}
                >
                  Twitter
                </button>
              </a>
              <a href="https://medium.com/@attmoney/" target="_blank" rel="noreferrer">
                <button
                  type="button"
                  className="nes-btn is-error"
                  style={{ marginRight: '18px' }}
                >
                  Medium
                </button>
              </a>
              <a href="https://github.com/attmoney" target="_blank" rel="noreferrer">
                <button
                  type="button"
                  className="nes-btn is-error"
                  style={{ marginRight: '18px' }}
                >
                  GitHub
                </button>
              </a>
              <Link to="/buy">
                <button className="nes-btn is-success">BUY ATT</button>
              </Link>
            </Row>
          </div>
        </div>
      </Container>
      <Container style={{ marginTop: '10px' }}></Container>
    </div>
  );
}

export default XAttComponent;
