import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DASH } from '../../actions'
import { Container, Row, Col, Card } from 'react-bootstrap'
import 'nes.css/css/nes.min.css'
import cgl from '../../assets/enablers/cg_logo.png'
import bscl from '../../assets/enablers/bsc_logo.png'
import bscsl from '../../assets/enablers/bscs_logo.png'
import cmcl from '../../assets/enablers/cmc_logo.png'
import pcsl from '../../assets/enablers/pcsl.png'
import Web3 from 'web3'
import { contract } from '../../common/contractconfig'
import MultiWallet from '../../Modals/ConnectWallet'
import { Error } from '../../actions'

function DashComponent() {
  const dispatch = useDispatch()
  const primaryStats = useSelector((store) => store.dash.primaryStats)
  const currentProvider = useSelector((store) => store.wallet.provider)
  const [walletOpen, setWalletOpen] = useState(false)
  const [loaderState, setScreenLoader] = useState(false)
  const address = useSelector((store) => store.wallet.walletAddress)
  const canRebase = false

  useEffect(() => {
    if (address !== '') {
      setOpen()
    }
    dispatch(DASH.getPrimaryStats())
  }, [address])

  function setOpen() {
    setWalletOpen(false)
  }

  async function performRebase() {
    try {
      const web3WalletWrapper = new Web3(currentProvider)
      const Instance = new web3WalletWrapper.eth.Contract(contract.ATTRebaseABI, contract.ATTRebaseAddress)
      const _result = await Instance.methods.rebase().send({ from: address })
      if (_result) {
        dispatch(DASH.getPrimaryStats())
        Error.toastifyMsg('info', 'Rebase Success')
      } else {
        Error.toastifyMsg('err', 'Rebase Failed')
      }
    } catch (err) {
      Error.toastifyMsg('err', 'Rebase Failed')
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
                TVL
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                OracleRate
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                MarketCap
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="row" style={{ marginTop: '20px' }}>
        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                BasePrice
              </p>
              <span className="nes-text is-success">$1 (1% tolerance)</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Supply
              </p>
              <span className="nes-text is-success">{primaryStats.circulatingSupply} ATT</span>
            </div>
          </Card>
        </div>

        <div className="col-md-4">
          <Card className="mb-2 ">
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                Next BuyBack
              </p>
              <span className="nes-text is-success">NA</span>
            </div>
          </Card>
        </div>
      </div>

      {/* <div>
        <img src={Logo} style={{ alignContent: 'center' }} />
      </div> */}

      <Container>
        <Row style={{ marginTop: '50px' }}>
          <Col md>
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                WHAT IS ATT ?
              </p>
              <p style={{ marginTop: '25px' }}>
                ATT is a conditional rebasing elastic supply token designed to propel platform features in decentralised manner. Core features includes Lending/Borrowing, Margin Trading DEX, Advance Trading - Futures & Options with option to span cross chain.
              </p>
            </div>
          </Col>
          <Col md>
            <div className="nes-container is-dark with-title is-centered">
              <p className="title" style={{ color: '#f7d51d' }}>
                WHY ATT ?
              </p>
              <p style={{ textAlign: 'left' }}>* Designed for continuous advance trading</p>
              <p style={{ textAlign: 'left' }}>* Massive Incentives</p>
              <p style={{ textAlign: 'left' }}>* Programmed recovery rebases</p>
              <p style={{ textAlign: 'left' }}>* Easy Lending / Borrowing</p>
              <p style={{ textAlign: 'left' }}>* 100% on-chain functioning</p>
              <p style={{ textAlign: 'left' }}>* Margin Trading</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title " style={{ marginTop: '50px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            ATT ENABLERS
          </p>
          <a href="#">
            <img src={pcsl} style={{ alignContent: 'center', marginRight: '15px'}} />
            {''}
          </a>
          <a href="https://www.binance.org/en" target="_blank" rel="noreferrer">
            <img src={bscl} style={{ alignContent: 'center', marginRight: '15px' }} />
          </a>
          <a href="https://bscscan.com/address/0xc667Dd95F5f3a2919DFc4c80C68753C0C6AcCBD0/" target="_blank" rel="noreferrer">
            <img src={bscsl} style={{ alignContent: 'center', marginRight: '15px' }} />
          </a>
          <a href="#">
            <img src={cgl} style={{ alignContent: 'center', marginRight: '15px' }} />
          </a>
          <a href="#">
            <img src={cmcl} style={{ alignContent: 'center', marginRight: '15px' }} />
          </a>
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title " style={{ marginTop: '50px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            MORE ABOUT ATT
          </p>
          <p>
            Learn more about ATT architecture, economics, functionalities and roadmap through the series of Medium posts
            below:
          </p>
          <div className="lists" style={{ color: '#f7d51d' }}>
            <ul className="nes-list is-circle" style={{ textAlign: 'left' }}>
              <li>
                * Conditional Rebasing Elastic Supply Token -{''}
                <a
                  className="nes-text is-success"
                  href="https://attmoney.medium.com/what-is-att-money-41f59993f0ef"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Here
                </a>
              </li>
              <li>
                * Negative Rebase & Price Protection -{''}
                <a
                  className="nes-text is-success"
                  href="https://attmoney.medium.com/att-negative-rebases-price-protection-bd147b05356d"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Here
                </a>
              </li>
              <li>
                * The Rewarding Game Theory -{''}
                <a
                  className="nes-text is-success"
                  href="https://attmoney.medium.com/zelda-rewarding-game-theory-5d4ebff45621"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Here
                </a>
              </li>
              <li>
                * Whats there for Liquidity Providers -{''}
                <a
                  className="nes-text is-success"
                  href="https://attmoney.medium.com/how-to-earn-att-busd-de61a53d2457"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read Here
                </a>
                {/* <span className="nes-text is-error">Coming Soon</span> */}
              </li>
              <li>
                * Margin Trading & Induced Volatility -{''}
                <span className="nes-text is-error">Coming Soon</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container style={{ marginLeft: '10px' }}>
        <div className="row" style={{ marginTop: '50px' }}>
          <div className="col-md-4">
            <Card className="mb-2 ">
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  Last Rebase
                </p>
                <span className="nes-text is-success">NA</span>
              </div>
            </Card>
          </div>
          {canRebase !== false ? (
            <div>
              {address !== '' ? (
                <div>
                  <button
                    type="button"
                    className="nes-btn is-success"
                    style={{ marginTop: '30px' }}
                    disabled={loaderState}
                    onClick={() => {
                      setScreenLoader(true)
                      performRebase()
                    }}
                  >
                    {loaderState && (
                      <span>
                        {'> '} REBASING ... {' <'}
                      </span>
                    )}
                    {!loaderState && (
                      <span>
                        {'>'}REBASE TRIGGER{'<'}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  className="nes-btn is-error"
                  style={{ marginTop: '30px' }}
                  onClick={() => setWalletOpen(true)}
                  disabled={true}
                >
                  Connect wallet
                </button>
              )}
            </div>
          ) : (
            <div>
              <button type="button" className="nes-btn is-disabled" style={{ marginTop: '30px', marginBottom: '30px' }}>
                {'>'}REBASE TRIGGER{'<'}
              </button>
            </div>
          )}

          <div className="col-md-4">
            <Card className="mb-2 ">
              <div className="nes-container is-dark with-title is-centered">
                <p className="title" style={{ color: '#f7d51d' }}>
                  Next Rebase
                </p>
                <span className="nes-text is-success">NA</span>
              </div>
            </Card>
          </div>
        </div>
      </Container>
      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title" style={{ marginTop: '60px' }}>
          <p className="title" style={{ color: '#f7d51d' }}>
            ATT Rebase Factors{''}
          </p>
          <div className="nes-table-responsive">
            <table className="nes-table is-bordered is-dark">
              <thead>
                <tr className="nes-text is-warning">
                  <th>SN.</th>
                  <th>CASE</th>
                  <th>CONDITION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Price hits below base price</td>
                  <td>1% deviation threshold is breached</td>
                  <td className="nes-text is-success">REBASE</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Price hits below base price</td>
                  <td>Maintains 1% deviation threshold</td>
                  <td className="nes-text is-error">NO REBASE</td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>Price remains above base price</td>
                  <td>Not applicable</td>
                  <td className="nes-text is-error">NO REBASE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <div className="nes-container is-dark with-title ">
          <p className="title" style={{ color: '#f7d51d' }}>
            Connect{''}
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

export default DashComponent
