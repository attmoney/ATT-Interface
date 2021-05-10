import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FARM } from '../../actions'
import { FormControl, InputGroup, Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap'
import 'nes.css/css/nes.min.css'
import Web3 from 'web3'
import { contract } from '../../common/contractconfig'
import MultiWallet from '../../Modals/ConnectWallet'
import { Error } from '../../actions'

function LiquidComponent() {
  const dispatch = useDispatch()

  const address = useSelector((store) => store.wallet.walletAddress)
  const stats = useSelector((store) => store.farm.statsLiquid)
  const userstake = useSelector((store) => store.farm.userStakeLiquid)
  const [walletOpen, setWalletOpen] = useState(false)
  const [loaderState, setScreenLoader] = useState(false)
  const currentProvider = useSelector((store) => store.wallet.provider)
  const [sAmt, setStake] = useState(0)
  const [uAmt, setUnstake] = useState(0)

  useEffect(() => {
    console.log('Getting Liquid Farm info ...')
    dispatch(FARM.getStatsLiquid())
    if (address !== '') {
      setOpen()
      dispatch(FARM.getUserStakeLiquid(address))
    }
  }, [address])

  function setOpen() {
    setWalletOpen(false)
  }

  async function xStake() {
    try {
      if (parseFloat(sAmt) === 0 || sAmt === '0') {
        Error.toastifyMsg('err', 'amount undefined')
      } else if (parseFloat(sAmt) > parseFloat(userstake.userbalance)) {
        Error.toastifyMsg('err', 'amount overbounds ')
      } else {
        const web3WalletWrapper = new Web3(currentProvider)
        const Instance = new web3WalletWrapper.eth.Contract(contract.LFarmABI, contract.LFarmAddress)
        const _enteredValue = await web3WalletWrapper.utils.toWei(sAmt, 'ether')
        const _result = await Instance.methods.deposit(0, _enteredValue).send({ from: address })

        console.log(_result)
        if (_result) {
          dispatch(FARM.getStatsLiquid())
          dispatch(FARM.getUserStakeLiquid(address))
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
      if (parseFloat(uAmt) === 0 || uAmt === 0) {
        Error.toastifyMsg('err', 'amount undefined')
      } else if (parseFloat(uAmt) > parseFloat(userstake.userStake)) {
        Error.toastifyMsg('err', 'amount overbounds ')
      } else {
        const web3WalletWrapper = new Web3(currentProvider)
        const Instance = new web3WalletWrapper.eth.Contract(contract.LFarmABI, contract.LFarmAddress)
        const _enteredValue = await web3WalletWrapper.utils.toWei(uAmt, 'ether')
        const _result = await Instance.methods.withdraw(0, _enteredValue).send({ from: address })

        console.log(_result)
        if (_result) {
          dispatch(FARM.getStatsLiquid())
          dispatch(FARM.getUserStakeLiquid(address))
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
      <Container style={{ marginTop: '40px' }}></Container>
      <div className="row">
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Staked
              </p>
              <span className="nes-text is-success">{stats.totalStaked} ATT/BNB LP</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Reward
              </p>
              <span className="nes-text is-success">{stats.totalRewardLeft} {'\n'} ATT</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                APY
              </p>
              <span className="nes-text is-success">{stats.apy} {' '}%</span>
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
              <span className="nes-text is-success">{stats.rewardReset} BLOCK</span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div className="nes-container is-dark with-title " style={{ marginTop: '50px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            ATT LP STAKING (LIQUID)
          </p>
          <p>Stake your ATT/BNB LP takens & Earn more ATT tokens. STAKE & UNSTAKE anytime.</p>
          <Row style={{ marginTop: '75px' }}>
            <Col>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  LIQUID FARMING ZONE
                </p>

                {address !== '' ? (
                  <div className="mdb-container">
                    <Tabs defaultActiveKey="stake" id="uncontrolled-tab-example">
                      <Tab eventKey="stake" title="Stake">
                      <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">Stake LP</span>{' '}
                        </p>
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">
                            Available Balance : {userstake.userbalance} BNB/ATT LP
                          </span>{' '}
                        </p> 
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">
                            Staked Amount : {userstake.userStake} BNB/ATT LP
                          </span>{' '}
                        </p> 
                        <InputGroup>
                          <FormControl
                            placeholder="Amount of LP"
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
                                xStake()
                              }}
                            >
                              {loaderState && <span>wait ...</span>}
                              {!loaderState && <span>Stake</span>}
                            </button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Tab>
                      <Tab eventKey="unstake" title="Unstake">
                      <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">Unstake LP</span>{' '}
                        </p>
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">
                            Staked Amount : {userstake.userStake} BNB/ATT LP
                          </span>{' '}
                        </p> 
                        <p style={{ marginTop: '30px' }}>
                          <span className="nes-text is-success">RETURN est. : {userstake.userExpectedReturn} ATT</span>{' '}
                        </p>

                        <InputGroup>
                          <FormControl
                            placeholder="Amount of LP"
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
                              {!loaderState && <span>UnStake</span>}
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
    </div>
  )
}

export default LiquidComponent
