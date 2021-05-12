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
        totalSold: 100000000000,
        totalRaised: 1000,
        endDate: '28/3/2020',
      };
      const web3 = new Web3(contract.RPCURL);
      const Instance = new web3.eth.Contract(
        contract.WatchTowerABI,
        contract.WatchTowerAddress
      );
      const _scResult = await Instance.methods.statsDash().call();
     
      console.log('_scResult', _scResult)

      // fResponse.circulatingSupply = parseFloat(web3.utils.fromWei(_scResult.circulatingSupply, 'gwei')).toFixed(2)
      // fResponse.tvl = parseFloat(web3.utils.fromWei(_scResult.tvl, 'ether')).toFixed(2)
      // fResponse.oracleRate = parseFloat(web3.utils.fromWei(_scResult.oracleRate, 'ether')).toFixed(2)
      // fResponse.basePrice = parseFloat(web3.utils.fromWei(_scResult.basePrice, 'ether')).toFixed(2)
      // fResponse.marketCap = fResponse.oracleRate * fResponse.circulatingSupply;

      const _result = fResponse;
      dispatch(setStats(_result));
    } catch (err) {
      console.log(err);
    }
  };
}

function setStats(value) {
  return { type: Types.BUY_STATS, value }
}
