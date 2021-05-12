import { Types } from '../actions';

const initialState = {
  stats: '',
};

export const BUY = (state = initialState, action) => {
  switch (action.type) {
    case Types.BUY_STATS:
      return {
        ...state,
        stats: action.value,
      };

    default:
      return state;
  }
};
