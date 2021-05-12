import { Types } from './types';
import Web3 from 'web3';
import { contract } from '../common/contractconfig';

export const DASH = {
  getPrimaryStats,
};

function getPrimaryStats() {
  return async (dispatch) => {
    try {
      const fResponse = {
        circulatingSupply: 0,
        tvl: 0,
        oracleRate: 0,
        marketCap: 0,
        basePrice: 1,
        nextBuyBack: 'NA',
        lastRebase: 'NA',
        nextRebase: 'NA',
        canRebase: false
      };
      const web3 = new Web3(contract.RPCURL);
      const Instance = new web3.eth.Contract(
        contract.WatchTowerABI,
        contract.WatchTowerAddress
      );
      const _scResult = await Instance.methods.statsDash().call();
     
      console.log('_scResult', _scResult)

      fResponse.circulatingSupply = parseFloat(web3.utils.fromWei(_scResult.circulatingSupply, 'gwei')).toFixed(2)
      fResponse.tvl = parseFloat(web3.utils.fromWei(_scResult.tvl, 'ether')).toFixed(2)
      fResponse.oracleRate = parseFloat(web3.utils.fromWei(_scResult.oracleRate, 'ether')).toFixed(2)
      fResponse.basePrice = parseFloat(web3.utils.fromWei(_scResult.basePrice, 'ether')).toFixed(2)
      fResponse.marketCap = fResponse.oracleRate * fResponse.circulatingSupply;

      const _result = fResponse;
      dispatch(setPrimaryStats(_result));
    } catch (err) {
      console.log(err);
    }
  };
}

function setPrimaryStats(value) {
  return { type: Types.DASH_PRIMARY_STATS, value };
}
