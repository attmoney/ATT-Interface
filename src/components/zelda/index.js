import React  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';
import { Link } from 'react-router-dom'

function ZeldaComponent() {
  return (
    <div className="mdb-container">
      <Container style={{ marginTop: '50px' }}></Container>
      <div className="row" style={{ marginTop: '0px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Rewards
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Slots
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Win Count
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div
          className="nes-container is-dark with-title"
          style={{ marginTop: '50px' }}
        >
          <p className="title" style={{ color: '#f7d51d' }}>
            ZELDA Zone
          </p>
          <p>Trade ATT & win a chance to get reward of 50 ATT every hour.</p>
          <Row style={{ marginTop: '35px' }}>
            <Col md>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  Pending Claim
                </p>
                ... Coming Soon ...
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Container>
        <div
          className="nes-container is-dark with-title "
          style={{ marginTop: '60px' }}
        >
          <p className="title" style={{ color: '#f7d51d' }}>
            ZELDA History
          </p>
          <Row style={{ marginTop: '35px' }}>
            <Col md>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  Recent Winners
                </p>
                ... Coming Soon ...
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

export default ZeldaComponent;
