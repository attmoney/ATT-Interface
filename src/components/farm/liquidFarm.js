import React  from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'nes.css/css/nes.min.css';

function LiquidComponent() {
  return (
    <div className="mdb-container">
      <Container style={{ marginTop: '40px' }}></Container>
      <div className="row">
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Staked
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Reward
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                APY
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-12">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                RewardReset
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
            ATT LP STAKING (LIQUID)
          </p>
          <p>
            Stake your ATT/BNB LP takens & Earn more ATT tokens. STAKE & UNSTAKE
            anytime.
          </p>
          <Row style={{ marginTop: '75px' }}>
            <Col>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  LIQUID FARMING ZONE
                </p>
                <div className="mdb-container">... Coming Soon ...</div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default LiquidComponent;
