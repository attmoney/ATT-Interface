import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ZELDA } from '../../actions'
import { Container, Row, Col, Card } from 'react-bootstrap'
import 'nes.css/css/nes.min.css'
import Web3 from 'web3'
import { contract } from '../../common/contractconfig'
import MultiWallet from '../../Modals/ConnectWallet'
import { Error } from '../../actions'
import { Link } from 'react-router-dom'

function ZeldaComponent() {
  const dispatch = useDispatch()
  const address = useSelector((store) => store.wallet.walletAddress)
  const stats = useSelector((store) => store.zelda.stats)
  // const history = useSelector((store) => store.zelda.history)
  const claim = useSelector((store) => store.zelda.claim)
  const [walletOpen, setWalletOpen] = useState(false)
  const [loaderState, setScreenLoader] = useState(false)
  const currentProvider = useSelector((store) => store.wallet.provider)

  useEffect(() => {
    console.log('Getting zelda info ...')
    dispatch(ZELDA.getStats())
    dispatch(ZELDA.getHistory())
    if (address !== '') {
      setOpen()
      dispatch(ZELDA.getClaim(address))
    }
  }, [address])

  function setOpen() {
    setWalletOpen(false)
  }

  async function claimRewards() {
    try {
      const web3WalletWrapper = new Web3(currentProvider)
      const Instance = new web3WalletWrapper.eth.Contract(contract.ZeldaABI, contract.ZeldaAddress)
      const _result = await Instance.methods.claim().send({ from: address })
      console.log(_result)
      if (_result) {
        dispatch(ZELDA.getClaim(address))
        Error.toastifyMsg('info', 'Claim Success')
      } else {
        Error.toastifyMsg('err', 'Claim Failed')
      }
    } catch (err) {
      console.log('err', err)
      Error.toastifyMsg('err', 'Claim Failed')
    }
    setScreenLoader(false)
  }
  return (
    <div className="mdb-container">
      <MultiWallet open={walletOpen} setOpen={() => setOpen()} />
      <Container style={{ marginTop: '50px' }}></Container>
      <div className="row" style={{ marginTop: '0px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Rewards
              </p>
              <span className="nes-text is-success">{stats.totalRewardPerDay} ATT/DAY</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Slots
              </p>
              <span className="nes-text is-success">{stats.totalWinningPositions} SLOTS/DAY</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Win Count
              </p>
              <span className="nes-text is-success">{stats.distributionCounter} Wins </span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div className="nes-container is-dark with-title" style={{ marginTop: '50px' }}>
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
                {address !== '' ? (
                  <div>
                    {claim !== '' ? (
                      <div>
                        <p>
                          <span className="nes-text is-success">
                            {claim.claimAmount} ATT
                            {/* {console.log('=======================',claim.hasPendingClaim)} */}
                          </span>{' '}
                        </p>
                        {claim.hasPendingClaim === true ? (
                          <button
                            type="button"
                            className="nes-btn is-success"
                            disabled={loaderState}
                            onClick={() => {
                              setScreenLoader(true)
                              claimRewards()
                            }}
                          >
                            {loaderState && <span>Claiming Rewards ...</span>}
                            {!loaderState && <span>Claim Rewards</span>}
                          </button>
                        ) : (
                          <button type="button" className="nes-btn is-disabled">
                            No Pending Claim
                          </button>
                        )}
                      </div>
                    ) : (
                      <Card body className="css-card margintop30 is-centered">
                        {' '}
                        <p className="connectwallettext">No data found</p>
                      </Card>
                    )}
                  </div>
                ) : (
                  <button className="nes-btn is-error" onClick={() => setWalletOpen(true)}>
                    Connect wallet
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <Container>
        <div
          className="nes-container is-dark with-title "
          style={{ marginTop: '50px' }}
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
                ... No Winner Announced ...
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
