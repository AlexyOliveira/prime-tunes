import { combineReducers } from 'redux';
import favoriteSongsReducer from './favoriteSongsReducer';
import artWorkReducer from './artWorkReducer';

const rootReducer = combineReducers({ favoriteSongsReducer, artWorkReducer });

export default rootReducer;
