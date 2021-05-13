import { Types } from './types'
import Web3 from 'web3'
import { contract } from '../common/contractconfig'

export const BUY = {
  getStats,
}

function getStats() {
  return async (dispatch) => {
    try {
      const fResponse = {
        totalSold: 0,
        totalRaised: 0,
        saleStatus: 'END',
      }
      const web3 = new Web3(contract.RPCURL)
      const Instance = new web3.eth.Contract(contract.WatchTowerABI, contract.WatchTowerAddress)
      const _scResult = await Instance.methods.statsBuy().call()

      fResponse.totalSold = parseFloat(web3.utils.fromWei(_scResult.totalSold, 'gwei')).toFixed(2)
      fResponse.totalRaised = parseFloat(web3.utils.fromWei(_scResult.totalRaised, 'ether')).toFixed(2)
      if (_scResult.isActive === true) {
        fResponse.saleStatus = 'ACTIVE'
      }

      const _result = fResponse
      dispatch(setStats(_result))
    } catch (err) {
      console.log(err)
    }
  }
}

function setStats(value) {
  return { type: Types.BUY_STATS, value }
}
