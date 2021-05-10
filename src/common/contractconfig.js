import att from '../helpers/abi/ERC20.json'
import watchtower from '../helpers/abi/WATCHTOWER.json'
import zelda from '../helpers/abi/ZELDA.json'
import xattABI from '../helpers/abi/XATT.json'
import lFarmABI from '../helpers/abi/LIQUIDFARM.json'
import pFarmABI from '../helpers/abi/PLEDGEFARM.json'

export const contract = {
  RPCURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',

  ATTABI: att,
  ATTAddress: '0x01D3156549912d435B0feA7B4C229a9E1cB1723E',

  WatchTowerABI: watchtower,
  WatchTowerAddress: '0x6713e8E48505c5A4597207c20c3A4cd628354a59',

  ZeldaABI: zelda,
  ZeldaAddress: '0x09C394C704eECFcC849Ec80d898B446BBFCf67dB',

  XAttABI: xattABI,
  XAttAddress: '0x0031bE097c8f10D72D8a2af64Dc61DA98f872833',

  LFarmABI: lFarmABI,
  LFarmAddress: '0xfaE73C56eD3D0a03C2B89a8d8BfCa7817373C39B',

  PFarmABI: pFarmABI,
  PFarmAddress: '0x3f4A5856cb529eeD97c98C4F84f34C3D14E15c25',
}
