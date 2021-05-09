import { Types } from './types'
import Web3 from 'web3'
import { contract } from '../common/contractconfig'

export const ZELDA = {
  getStats,
  getHistory,
  getClaim,
}

function getStats() {
  return async (dispatch) => {
    try {
      const fResponse = {
        totalRewardPerDay: 0,
        totalWinningPositions: 0,
        distributionCounter: 0,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.getStatsZelda().call()
      fResponse.totalRewardPerDay = parseFloat(web3.utils.fromWei(_scResult.totalRewardPerDay, 'gwei')).toFixed(0)
      fResponse.totalWinningPositions = _scResult.totalWinPositionsPerDay
      fResponse.distributionCounter = _scResult.winCounter
      console.log('_scResult', _scResult)
      const _result = fResponse
      dispatch(setStats(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getHistory() {
  return async (dispatch) => {
    try {
      let fResponse = {
        circulatingSupply: 0,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.getHistoryZelda().call()
      fResponse = _scResult
      console.log('_scResult', _scResult)
      const _result = fResponse
      dispatch(setHistory(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getClaim(address) {
  return async (dispatch) => {
    try {
      const fResponse = {
        hasPendingClaim: false,
        claimAmount: 0,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.getClaimZelda(address).call()
      fResponse.hasPendingClaim = _scResult.hasClaim
      fResponse.claimAmount = parseFloat(web3.utils.fromWei(_scResult.claimAmount, 'gwei')).toFixed(2)

      console.log('_scResult', _scResult)
      const _result = fResponse
      dispatch(setClaim(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function setStats(value) {
  return { type: Types.ZELDA_STATS, value }
}

function setHistory(value) {
  return { type: Types.ZELDA_HISTORY, value }
}

function setClaim(value) {
  return { type: Types.ZELDA_CLAIM, value }
}
