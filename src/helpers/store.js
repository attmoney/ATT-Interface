import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { Wallet, Error, DASH } from '../reducers';

const middleWare = applyMiddleware(thunk);
const Init = () => {
  const reducer = combineReducers({
    wallet: Wallet,
    error: Error,
    dash: DASH,
  });
  const store = createStore(reducer, middleWare);
  return store;
};

export { Init };
