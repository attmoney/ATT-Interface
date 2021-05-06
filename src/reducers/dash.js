import { Types } from '../actions';

const initialState = {
  primaryStats: '',
};

export const DASH = (state = initialState, action) => {
  switch (action.type) {
    case Types.DASH_PRIMARY_STATS:
      return {
        ...state,
        primaryStats: action.value,
      };

    default:
      return state;
  }
};
