import { Types } from './types'
import Web3 from 'web3'
import { contract } from '../common/contractconfig'

export const XATT = {
  getStats,
  getUserstake,
}

function getStats() {
  return async (dispatch) => {
    try {
      const fResponse = {
        currentSupply: 0,
        totalAttLocked: 0,
        currentRate: '',
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.getStatsXAtt().call()

      // console.log('_scResult', _scResult)
      fResponse.currentSupply = parseFloat(web3.utils.fromWei(_scResult.currentSupply, 'ether')).toFixed(2)
      fResponse.totalAttLocked = parseFloat(web3.utils.fromWei(_scResult.totalAttLocked, 'gwei')).toFixed(2)
      fResponse.currentRate = parseFloat(web3.utils.fromWei(_scResult.currentRate, 'gwei')).toFixed(2)

      const _result = fResponse
      // console.log('_result', _result)
      dispatch(setStats(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getUserstake(address) {
  return async (dispatch) => {
    try {
      const fResponse = {
        userAttBalance: 0,
        userXAttBalance: 0,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.getStakeStatsXAtt(address).call()

      console.log('_scResult', _scResult);

      fResponse.userAttBalance = parseFloat(web3.utils.fromWei(_scResult.userAttbalance, 'gwei')).toFixed(2);
      fResponse.userXAttBalance = parseFloat(web3.utils.fromWei(_scResult.userXAttBalance, 'ether')).toFixed(2);

      const _result = fResponse
      console.log('_result', _result)
      dispatch(setUserStake(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function setStats(value) {
  return { type: Types.XATT_STATS, value }
}

function setUserStake(value) {
  return { type: Types.XATT_USER_STAKE, value }
}
