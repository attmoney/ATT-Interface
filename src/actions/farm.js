import { Types } from './types'
import Web3 from 'web3'
import { contract } from '../common/contractconfig'

export const FARM = {
  getStatsLiquid,
  getUserStakeLiquid,
  getStatsPledge,
  getUserStakePledge,
}

function getStatsLiquid() {
  return async (dispatch) => {
    try {
      const fResponse = {
        totalStaked: 0,
        totalRewardLeft: 0,
        rewardReset: '',
        apy: 100,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.statsLiquid().call()

      console.log('_scResult', _scResult)

      fResponse.totalStaked = parseFloat(web3.utils.fromWei(_scResult.totalStaked, 'ether')).toFixed(2)
      fResponse.totalRewardLeft = parseFloat(web3.utils.fromWei(_scResult.totalRewardLeft, 'gwei')).toFixed(2)
      fResponse.rewardReset = _scResult.rewardReset

      const _result = fResponse
      console.log('_result', _result)
      dispatch(setStatsLiquid(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getUserStakeLiquid(address) {
  return async (dispatch) => {
    try {
      const fResponse = {
        userbalance: 0,
        userStake: 0,
        userExpectedReturn: 0,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.userStakeStatsLiquid(0, address).call()

      console.log('_scResult', _scResult)

      fResponse.userbalance = parseFloat(web3.utils.fromWei(_scResult.userbalance, 'ether')).toFixed(2)
      fResponse.userStake = parseFloat(web3.utils.fromWei(_scResult.userStake, 'ether')).toFixed(2)
      fResponse.userExpectedReturn = parseFloat(web3.utils.fromWei(_scResult.userExpectedReturn, 'gwei')).toFixed(2)

      const _result = fResponse
      console.log('_result', _result)
      dispatch(setUserStakeLiquid(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getStatsPledge() {
  return async (dispatch) => {
    try {
      const fResponse = {
        totalStaked: 0,
        totalRewardLeftAtt: 0,
        totalRewardLeftBusd: 0,
        rewardEnd: 0,
        apy: 100,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.statsPledge().call()

      //console.log('_scResult', _scResult)

      fResponse.totalStaked = parseFloat(web3.utils.fromWei(_scResult.totalStaked, 'ether')).toFixed(2)
      fResponse.totalRewardLeftAtt = parseFloat(web3.utils.fromWei(_scResult.totalRewardLeftAtt, 'gwei')).toFixed(2)
      fResponse.totalRewardLeftBusd = parseFloat(web3.utils.fromWei(_scResult.totalRewardLeftBusd, 'ether')).toFixed(2)
      fResponse.rewardEnd = _scResult.rewardEnd

      const _result = fResponse
      //console.log('_result', _result)

      dispatch(setStatsPledge(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function getUserStakePledge(address) {
  return async (dispatch) => {
    try {
      const fResponse = {
        userbalance: 0,
        userStake: 0,
        userExpectedReturnAtt: 0,
        userExpectedReturnBusd: 0,
        canUnstake: false,
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.userStakeStatsPledge(0, address).call()

      console.log('_scResult', _scResult)

      fResponse.userbalance = parseFloat(web3.utils.fromWei(_scResult.userbalance, 'ether')).toFixed(2)
      fResponse.userStake = parseFloat(web3.utils.fromWei(_scResult.userStake, 'ether')).toFixed(2)
      fResponse.userExpectedReturnAtt = parseFloat(web3.utils.fromWei(_scResult.userExpectedReturnAtt, 'gwei')).toFixed(
        2
      )
      fResponse.userExpectedReturnBusd = parseFloat(
        web3.utils.fromWei(_scResult.userExpectedReturnBusd, 'ether')
      ).toFixed(2)
      fResponse.canUnstake = _scResult.canUnstake

      const _result = fResponse
      console.log('_result', _result)

      dispatch(setUserStakePledge(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function setStatsLiquid(value) {
  return { type: Types.FARM_STATS_LIQUID, value }
}

function setUserStakeLiquid(value) {
  return { type: Types.FARM_USER_STAKE_LIQUID, value }
}

function setStatsPledge(value) {
  return { type: Types.FARM_STATS_PLEDGE, value }
}

function setUserStakePledge(value) {
  return { type: Types.FARM_USER_STAKE_PLEDGE, value }
}
