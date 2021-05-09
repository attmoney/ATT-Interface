import att from '../helpers/abi/ERC20.json';
import watchtower from '../helpers/abi/WATCHTOWER.json';
import zelda from '../helpers/abi/ZELDA.json';
import xattABI from '../helpers/abi/XATT.json';

export const contract = {
  RPCURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',

  ATTABI: att,
  ATTAddress: '0x01D3156549912d435B0feA7B4C229a9E1cB1723E',

  WatchTowerABI: watchtower,
  WatchTowerAddress: '0x634238bE20207773ABdA82774CdD7d7345B34Fb0',

  ZeldaABI: zelda,
  ZeldaAddress: '0x09C394C704eECFcC849Ec80d898B446BBFCf67dB',

  XAttABI: xattABI,
  XAttAddress: '0x0031bE097c8f10D72D8a2af64Dc61DA98f872833',

};
