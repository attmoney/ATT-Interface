import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../assets/logo.png';
import { Headers } from '../global/constants';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'nes.css/css/nes.min.css';
import MultiWallet from '../../Modals/ConnectWallet';
import ErrorModal from '../../Modals/Error';
import WalletDetail from '../../Modals/walletdetail';
import Provider from '../../helpers/provider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

function Header() {
  const [walletOpen, setWalletOpen] = useState(false);
  const wallet = useSelector((state) => state.wallet.walletAddress);
  const [selectedWallet, setSelectedWallet] = useState(false);
  const [activeLinksClasses, setActiveLinksClasses] = React.useState(
    new Array(Headers.length).fill(false)
  );

  const { pathname } = useLocation();

  function setOpen() {
    setWalletOpen(false);
  }

  function setWalletConnectOpen() {
    setSelectedWallet(false);
  }

  function openWalletType() {
    setSelectedWallet(false);
    setWalletOpen(true);
  }

  useEffect(() => {
    if (wallet !== '') {
      setOpen();
    }
  }, [wallet]);

  useEffect(() => {
    const targetedIndex = Headers.map((_path) => '/' + _path.link).indexOf(
      pathname
    );
    const idealActiveClasses = new Array(Headers.length).fill(false);
    idealActiveClasses[targetedIndex] = true;
    setActiveLinksClasses(idealActiveClasses);
  }, [pathname]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <ToastContainer style={{ fontWeight: '600', fontSize: '12px' }} />
      <MultiWallet open={walletOpen} setOpen={setOpen} />
      <WalletDetail
        open={selectedWallet}
        setOpen={setWalletConnectOpen}
        openWalletType={openWalletType}
      />
      <Provider />
      <ErrorModal />
      <Navbar expand="lg">
        <Navbar.Brand>
          <a href="http://localhost:3000/#" className="nes-badge">
            <button
              type="button"
              className="nes-btn is-success"
              style={{ marginTop: '-5px' }}
            >
              {' '}
              <img
                src={Logo}
                style={{ marginTop: '-10px', margin: 'auto', width: '100px' }}
              />
            </button>
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto" style={{ margin: 'auto' }}>
            {Headers.map((data, index) => (
              <NavLink
                style={{ marginLeft: '8px' }}
                to={data.link}
                exact={true}
                key={index}
              >
                <p
                  className={
                    activeLinksClasses[index]
                      ? 'nes-btn is-warning headerPtag-active'
                      : 'nes-btn is-warning'
                  }
                  key={index}
                >
                  {data.name}
                </p>
              </NavLink>
            ))}
            <a
              href="https://pancakeswap.finance/"
              rel="noreferrer"
              target="_blank"
              className="nes-badge"
              style={{ marginTop: '1px' }}
            >
              <button
                className="nes-btn is-disabled"
                style={{ marginLeft: '12px' }}
                disabled={true}
              >
                BUY ATT
              </button>
            </a>
          </Nav>

          {wallet !== '' ? (
            <button
              onClick={() => setSelectedWallet(true)}
              className="nes-btn is-error"
            >
              {wallet &&
                wallet.substr(0, 6) + '...' + wallet.substr(wallet.length - 4)}
            </button>
          ) : (
            <button
              className="nes-btn is-disabled"
              onClick={() => setWalletOpen(true)}
              disabled={true}
            >
              Connect wallet
            </button>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
