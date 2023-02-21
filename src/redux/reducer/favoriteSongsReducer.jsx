import { SET_FAVORITE } from '../actions';

const INITIAL_STATE = {
  favorites: [],
};

const favoriteSongsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_FAVORITE:
    return {
      ...state,
      favorites: action.payload,
    };
  default:
    return state;
  }
};

export default favoriteSongsReducer;
