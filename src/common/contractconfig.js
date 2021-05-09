import att from '../helpers/abi/ERC20.json';
import watchtower from '../helpers/abi/WATCHTOWER.json';
import zelda from '../helpers/abi/ZELDA.json';

export const contract = {
  RPCURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',

  ATTABI: att,
  ATTAddress: '0x01D3156549912d435B0feA7B4C229a9E1cB1723E',

  WatchTowerABI: watchtower,
  //hasClaim : true
   WatchTowerAddress: '0x6a195821eFf23aC505394a68e314fC671477f81B',
  //hasClaim : false
  // WatchTowerAddress: '0x0068DA91342f36Cb08868B48bb077690b7b36980',

  ZeldaABI: zelda,
  ZeldaAddress: '0x09C394C704eECFcC849Ec80d898B446BBFCf67dB',

};
