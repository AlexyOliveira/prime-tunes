import { SET_ISPLAY } from '../actions';

const INITIAL_STATE = {
  isPlay: false,
};

const isPlayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_ISPLAY:
    return {
      ...state,
      isPlay: action.payload,
    };
  default:
    return state;
  }
};

export default isPlayReducer;
