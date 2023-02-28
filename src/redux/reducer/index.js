import { combineReducers } from 'redux';
import favoriteSongsReducer from './favoriteSongsReducer';
import artWorkReducer from './artWorkReducer';
import isPlayReducer from './isPlayReducer';

const rootReducer = combineReducers({
  favoriteSongsReducer,
  artWorkReducer,
  isPlayReducer,
});

export default rootReducer;
