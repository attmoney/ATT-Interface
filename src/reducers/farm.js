import { Types } from '../actions'

const initialState = {
  statsLiquid: '',
  userStakeLiquid: '',
  userUnstakeLiquid: '',
  statsPledge: '',
  userStakePledge: '',
  userUnstakePledge: '',
}

export const FARM = (state = initialState, action) => {
  switch (action.type) {
    case Types.FARM_STATS_LIQUID:
      return {
        ...state,
        statsLiquid: action.value,
      }

    case Types.FARM_USER_STAKE_LIQUID:
      return {
        ...state,
        userStakeLiquid: action.value,
      }

    case Types.FARM_STATS_PLEDGE:
      return {
        ...state,
        statsPledge: action.value,
      }

    case Types.FARM_USER_STAKE_PLEDGE:
      return {
        ...state,
        userStakePledge: action.value,
      }

    case Types.FARM_USER_UNSTAKE_PLEDGE:
      return {
        ...state,
        userUnstakePledge: action.value,
      }

    default:
      return state
  }
}
