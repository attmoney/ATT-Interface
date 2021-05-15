import { Types } from '../actions';

const initialState = {
  stats: '',
  userstake: '',
};

export const XATT = (state = initialState, action) => {
  switch (action.type) {
    case Types.XATT_STATS:
      return {
        ...state,
        stats: action.value,
      };

    case Types.XATT_USER_STAKE:
      return {
        ...state,
        userstake: action.value,
      };

    default:
      return state;
  }
};