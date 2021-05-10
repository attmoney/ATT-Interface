import master from '../helpers/abi/MASTER.json'
import watchtower from '../helpers/abi/WATCHTOWER.json'
import zelda from '../helpers/abi/ZELDA.json'
import xattABI from '../helpers/abi/XATT.json'
import lFarmABI from '../helpers/abi/LIQUIDFARM.json'
import pFarmABI from '../helpers/abi/PLEDGEFARM.json'

export const contract = {
  RPCURL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',

  MasterABI: master,
  MasterAddress: '0xecDAeF770B89E89eaf1Cf97fF915BA17a80d7b10',

  WatchTowerABI: watchtower,
  WatchTowerAddress: '0x3c48Ba5CcADEA695ac63726227b23D4e574157AB',

  ZeldaABI: zelda,
  ZeldaAddress: '0x09C394C704eECFcC849Ec80d898B446BBFCf67dB',

  XAttABI: xattABI,
  XAttAddress: '0x0031bE097c8f10D72D8a2af64Dc61DA98f872833',

  LFarmABI: lFarmABI,
  LFarmAddress: '0xfaE73C56eD3D0a03C2B89a8d8BfCa7817373C39B',

  PFarmABI: pFarmABI,
  PFarmAddress: '0x3f4A5856cb529eeD97c98C4F84f34C3D14E15c25',
}
