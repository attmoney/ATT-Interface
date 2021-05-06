import React, { useState } from 'react';
import { Nav, Container, Row } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';
import PledgeFarm from './pledgeFarm';
import LiquidFarm from './liquidFarm';

function StakeComponent() {
  const [activeKey, setActiveKey] = useState('1');

  function handleSelect(key) {
    setActiveKey(key);
  }

  return (
    <div className="mdb-container">
      <div className="margintop50 marginbottom50 col-md-12">
        <Container style={{ marginTop: '40px' }}></Container>
        <div style={{ marginTop: '10px' }}>
          <Nav
            fill="red"
            variant="tabs"
            justify
            activeKey={activeKey}
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey={1}>
                <span className="nes-text is-error">ATT Liquid Farm</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey={2}>
                <span className="nes-text is-error">ATT Pledge Farm</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <div>
            {activeKey === '1' ? <LiquidFarm /> : null}
            {activeKey === '2' ? <PledgeFarm /> : null}
          </div>
        </div>
      </div>

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
              <a href="#">
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
              <a href="https://pancakeswap.finance/">
                <button className="nes-btn is-disabled" disabled={true}>
                  BUY ATT
                </button>
              </a>
            </Row>
          </div>
        </div>
      </Container>
      <Container style={{ marginTop: '10px' }}></Container>
    </div>
  );
}

export default StakeComponent;
