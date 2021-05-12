import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BUY } from '../../actions'
import { FormControl, InputGroup, Container, Row, Col, Card } from 'react-bootstrap'
import 'nes.css/css/nes.min.css'
import Web3 from 'web3'
import { contract } from '../../common/contractconfig'
import MultiWallet from '../../Modals/ConnectWallet'
import { Error } from '../../actions'

function BuyComponent() {
  const dispatch = useDispatch()
  const address = useSelector((store) => store.wallet.walletAddress)
  const stats = useSelector((store) => store.buy.stats)
  const [walletOpen, setWalletOpen] = useState(false)
  const [loaderState, setScreenLoader] = useState(false)
  const currentProvider = useSelector((store) => store.wallet.provider)
  const [setAmt, setBnbAmount] = useState(0)
  const [estAmt, setAttAmount] = useState(0)

  useEffect(() => {
    console.log('Getting buy info ...')
    dispatch(BUY.getStats())
    if (address !== '') {
      setOpen()
    }
  }, [address])

  function setOpen() {
    setWalletOpen(false)
  }

  async function updateEst(enteredAmount) {
    if (enteredAmount !== 0 && enteredAmount !== ' ' && enteredAmount !== '') {
      const web3WalletWrapper = new Web3(currentProvider)
      const Instance = new web3WalletWrapper.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _enteredValue = await web3WalletWrapper.utils.toWei(enteredAmount, 'ether')
      console.log('Entered value', _enteredValue)
      const _result = await Instance.methods._getTokenAmount(_enteredValue).call({ from: address })
      const displayAmt = await web3WalletWrapper.utils.fromWei(_result, 'gwei')
      setAttAmount(parseFloat(displayAmt).toFixed(2))
    }
  }

  async function buyTokens() {
    try {
      console.log('setAmount', setAmt)
      const web3WalletWrapper = new Web3(currentProvider)
      const Instance = new web3WalletWrapper.eth.Contract(contract.CrowdsaleABI, contract.CrowdSaleAddress)
      const _enteredValue = await web3WalletWrapper.utils.toWei(setAmt, 'ether');
      const _result = await Instance.methods.buyToken().send({ from: address, value: _enteredValue})
      console.log(_result)
      if (_result) {
        Error.toastifyMsg('info', 'BUY Success')
      } else {
        Error.toastifyMsg('err', 'BUY Failed')
      }
    } catch (err) {
      console.log('err', err)
      Error.toastifyMsg('err', 'BUY Failed')
    }
    setScreenLoader(false)
  }

  return (
    <div className="mdb-container">
      <Container style={{ marginTop: '50px' }}></Container>
      <MultiWallet open={walletOpen} setOpen={() => setOpen()} />
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Total Sold
              </p>
              <span className="nes-text is-success">{stats.totalSold} ATT</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Total Raised
              </p>
              <span className="nes-text is-success">{stats.totalRaised} BNB</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Sale End Date
              </p>
              <span className="nes-text is-success">{stats.endDate}</span>
            </div>
          </Card>
        </div>
      </div>

      <Container>
        <div className="nes-container is-dark with-title " style={{ marginTop: '50px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            BUY ATT
          </p>
          <p>
            Buy ATT today & Invest in the very first conditional rebasing token on BSC that powers complete advance
            trading ecosystem.{' '}
            <a
              className="nes-text is-success"
              href="https://attmoney.medium.com/att-negative-rebases-price-protection-bd147b05356d"
              target="_blank"
              rel="noreferrer"
            >
              WHY TO BUY.
            </a>
          </p>

          <Row style={{ marginTop: '50px' }}>
            <Col>
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  BUY ZONE
                </p>

                {address !== '' ? (
                  <div className="mdb-container ">
                    <InputGroup className=" col-md-offset-3">
                      <FormControl
                        placeholder="Enter Amount of BNB"
                        className="col-md-6"
                        style={{ marginTop: '10px' }}
                        type="number"
                        onChange={(e) => {
                          setBnbAmount(e.target.value)
                          updateEst(e.target.value)
                        }}
                      />
                      <InputGroup.Append>
                        <button
                          className="nes-input is-success col-md-12"
                          disabled={true}
                          style={{ marginLeft: '20px' }}
                        >
                          <span className="nes-text is-success col-md-12">Est. ATT: {estAmt}</span>
                        </button>
                      </InputGroup.Append>
                    </InputGroup>
                    <button
                      className="nes-input is-warning"
                      disabled={loaderState}
                      style={{ marginTop: '15px' }}
                      onClick={() => {
                        setScreenLoader(true)
                        buyTokens()
                      }}
                    >
                      {loaderState && <span>wait ...</span>}
                      {!loaderState && <span>BUY ATT</span>}
                    </button>
                  </div>
                ) : (
                  <button
                    className="nes-btn is-error"
                    onClick={() => {
                      setWalletOpen(true)
                    }}
                  >
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
  )
}

export default BuyComponent
