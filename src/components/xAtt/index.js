import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { XATT } from '../../actions'
import { FormControl, InputGroup, Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap'
import 'nes.css/css/nes.min.css'
import Web3 from 'web3'
import { contract } from '../../common/contractconfig'
import MultiWallet from '../../Modals/ConnectWallet'
import { Error } from '../../actions'
import { Link } from 'react-router-dom'

function XAttComponent() {
  const dispatch = useDispatch()
  const address = useSelector((store) => store.wallet.walletAddress)
  const stats = useSelector((store) => store.xatt.stats)
  const userstake = useSelector((store) => store.xatt.userstake)
  const [walletOpen, setWalletOpen] = useState(false)
  const [loaderState, setScreenLoader] = useState(false)
  const currentProvider = useSelector((store) => store.wallet.provider)

  const [sAmt, setStake] = useState(0)
  const [uAmt, setUnstake] = useState(0)

  useEffect(() => {
    console.log('Getting xatt info ...')
    dispatch(XATT.getStats())
    if (address !== '') {
      setOpen()
      dispatch(XATT.getUserstake(address))
    }
  }, [address])

  function setOpen() {
    setWalletOpen(false)
  }

  async function xMint() {
    try {
      if (parseFloat(sAmt) === 0 || sAmt === '0') {
        Error.toastifyMsg('err', 'amount undefined')
      } else if (parseFloat(sAmt) > parseFloat(userstake.userAttbalance)) {
        Error.toastifyMsg('err', 'amount overbounds ')
      } else {
        const web3WalletWrapper = new Web3(currentProvider)
        const Instance = new web3WalletWrapper.eth.Contract(contract.XAttABI, contract.XAttAddress)
        const _enteredValue = await web3WalletWrapper.utils.toWei(sAmt, 'gwei')
        const _result = await Instance.methods.mint(address, _enteredValue).send({ from: address })

        console.log(_result)
        if (_result) {
          dispatch(XATT.getUserstake(address))
          Error.toastifyMsg('info', ' Success')
        } else {
          Error.toastifyMsg('err', ' Failed')
        }
      }
      //setStake(0);
    } catch (err) {
      console.log('err', err)
      Error.toastifyMsg('err', ' Failed')
    }
    setScreenLoader(false)
  }

  async function xUnstake() {
    try {
      if (parseFloat(uAmt) === 0 || uAmt === '0') {
        Error.toastifyMsg('err', 'amount undefined')
      } else if (parseFloat(uAmt) > parseFloat(userstake.userxAttStake)) {
        Error.toastifyMsg('err', 'amount overbounds ')
      } else {
        const web3WalletWrapper = new Web3(currentProvider)
        const Instance = new web3WalletWrapper.eth.Contract(contract.XAttABI, contract.XAttAddress)
        const _enteredValue = await web3WalletWrapper.utils.toWei(uAmt, 'ether')
        const _result = await Instance.methods.burn(_enteredValue).send({ from: address })

        console.log(_result)
        if (_result) {
          dispatch(XATT.getUserstake(address))
          Error.toastifyMsg('info', ' Success')
        } else {
          Error.toastifyMsg('err', ' Failed')
        }
      }
      //setUnstake(0);
    } catch (err) {
      console.log('err', err)
      Error.toastifyMsg('err', ' Failed')
    }
    setScreenLoader(false)
  }
  return (
    <div className="mdb-container">
      <MultiWallet open={walletOpen} setOpen={() => setOpen()} />
      <Container style={{ marginTop: '50px' }}></Container>
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Supply
              </p>
              <span className="nes-text is-success">{stats.currentSupply} xATT</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                CurrentRate
              </p>
              <span className="nes-text is-success">{stats.currentRate} ATT/xATT</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                AttLocked
              </p>
              <span className="nes-text is-success">{stats.totalAttLocked} ATT</span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div className="nes-container is-dark with-title " style={{ marginTop: '50px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            xATT ZONE
          </p>
          <p>Convert your ATT tokens to non-rebasing xATT tokens or vice-versa.</p>
          <Row style={{ marginTop: '40px' }}>
            <Col>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  Convert / Redeem
                </p>
                {address !== '' ? (
                  <div className="mdb-container ">
                    <Tabs defaultActiveKey="stake" id="uncontrolled-tab-example">
                      <Tab eventKey="stake" title="Mint">
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">MINT xATT</span>{' '}
                        </p>
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">
                            Available Balance : {userstake.userAttBalance} ATT
                          </span>{' '}
                        </p>
                        <InputGroup>
                          <FormControl
                            placeholder="Amount of ATT"
                            className="addliquidity"
                            style={{ marginTop: '10px' }}
                            type="number"
                            onChange={(e) => setStake(e.target.value)}
                          />
                          <InputGroup.Append>
                            <button
                              className="nes-input is-warning"
                              disabled={loaderState}
                              style={{ marginLeft: '20px' }}
                              onClick={() => {
                                setScreenLoader(true)
                                xMint()
                              }}
                            >
                              {loaderState && <span>wait ...</span>}
                              {!loaderState && <span>Mint</span>}
                            </button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Tab>
                      <Tab eventKey="unstake" title="Redeem">
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">Redeem ATT</span>{' '}
                        </p>
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">
                            Available Balance : {userstake.userXAttBalance} xATT
                          </span>{' '}
                        </p>

                        <InputGroup className=" col-md-offset-3">
                          <FormControl
                            placeholder="Amount of xATT"
                            className="addliquidity"
                            style={{ marginTop: '10px' }}
                            type="number"
                            onChange={(e) => setUnstake(e.target.value)}
                          />
                          <InputGroup.Append>
                            <button
                              className="nes-input is-warning"
                              disabled={loaderState}
                              style={{ marginLeft: '20px' }}
                              onClick={() => {
                                setScreenLoader(true)
                                xUnstake()
                              }}
                            >
                              {loaderState && <span>wait ...</span>}
                              {!loaderState && <span>Redeem</span>}
                            </button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Tab>
                    </Tabs>
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

      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title ">
          <p className="title" style={{ color: '#f7d51d' }}>
            Connect{' '}
          </p>
          <div>
            <Row className="is-centered" style={{ paddingLeft: '130px' }}>
              <a href="https://twitter.com/att_money" target="_blank" rel="noreferrer">
                <button type="button" className="nes-btn is-primary" style={{ marginRight: '18px' }}>
                  Twitter
                </button>
              </a>
              <a href="https://medium.com/@attmoney/" target="_blank" rel="noreferrer">
                <button type="button" className="nes-btn is-error" style={{ marginRight: '18px' }}>
                  Medium
                </button>
              </a>
              <a href="https://github.com/attmoney" target="_blank" rel="noreferrer">
                <button type="button" className="nes-btn is-error" style={{ marginRight: '18px' }}>
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
  )
}

export default XAttComponent
