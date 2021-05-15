import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Wallet, Error, DASH, BUY, ZELDA, XATT } from '../reducers';

const middleWare = applyMiddleware(thunk);
const Init = () => {
  const reducer = combineReducers({
    wallet: Wallet,
    error: Error,
    dash: DASH,
    buy: BUY,
    zelda: ZELDA,
    xatt: XATT,
  });
  const store = createStore(reducer, middleWare);
  return store;
};

export { Init };
