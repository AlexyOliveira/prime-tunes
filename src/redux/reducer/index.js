import { combineReducers } from 'redux';
import favoriteSongsReducer from './favoriteSongsReducer';

const rootReducer = combineReducers({ favoriteSongsReducer });

export default rootReducer;
