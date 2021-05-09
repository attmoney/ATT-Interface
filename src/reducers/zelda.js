import { Types } from '../actions';

const initialState = {
  stats: '',
  history: '',
  claim: '',
};

export const ZELDA = (state = initialState, action) => {
  switch (action.type) {
    case Types.ZELDA_STATS:
      return {
        ...state,
        stats: action.value,
      };

    case Types.ZELDA_HISTORY:
      return {
        ...state,
        history: action.value,
      };
      
    case Types.ZELDA_CLAIM:
      return {
        ...state,
        claim: action.value,
      };

    default:
      return state;
  }
};
