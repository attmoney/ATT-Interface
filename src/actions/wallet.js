import { Types } from './types';

export const WalletAction = {
  setWalletAddress,
  setWalletEth,
  selectWallet,
  setATT,
  setProvider,
};
function setWalletAddress(address) {
  return (dispatch) => {
    dispatch(setwallet(address));
  };
}
function setWalletEth(eth) {
  return (dispatch) => {
    dispatch(setEth(eth));
  };
}

function selectWallet(wallet) {
  return (dispatch) => {
    dispatch(selectWalletType(wallet));
  };
}

function setATT(token) {
  return (dispatch) => {
    dispatch(setATTValue(token));
  };
}

function setProvider(provider) {
  return (dispatch) => {
    dispatch(setWalletProvider(provider));
  };
}

function setwallet(address) {
  return { type: Types.GET_WALLET, address };
}
function setEth(eth) {
  return { type: Types.SET_ETH, eth };
}
function selectWalletType(wallettype) {
  return { type: Types.SELECT_WALLET_TYPE, wallettype };
}
function setATTValue(token) {
  return { type: Types.SET_ATT, token };
}
function setWalletProvider(provider) {
  return { type: Types.SET_PROVIDER, provider };
}
