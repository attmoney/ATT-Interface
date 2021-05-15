import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { Wallet, Error, DASH, BUY, ZELDA, XATT, FARM } from '../reducers'

const middleWare = applyMiddleware(thunk)
const Init = () => {
  const reducer = combineReducers({
    wallet: Wallet,
    error: Error,
    dash: DASH,
    buy: BUY,
    zelda: ZELDA,
    xatt: XATT,
    farm: FARM,
  })
  const store = createStore(reducer, middleWare)
  return store
}

export { Init }
