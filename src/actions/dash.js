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
      };
      //console.log('Dispatching primaryStat call ...');
      const web3 = new Web3(contract.RPCURL);
      const Instance = new web3.eth.Contract(
        contract.ATTABI,
        contract.ATTAddress
      );
      const rawAmt = await Instance.methods.totalSupply().call();
      fResponse.circulatingSupply = parseFloat(
        web3.utils.fromWei(rawAmt, 'gwei')
      ).toFixed(2);
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
