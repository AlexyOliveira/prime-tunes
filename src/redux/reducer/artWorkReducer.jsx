import { SET_ART_WORK } from '../actions';

const INITIAL_STATE = {
  artWork: 'https://http2.mlstatic.com/D_NQ_NP_276705-MLB25071094077_092016-O.jpg',
  name: 'Artist',
  track: 'Song',
};

const artWorkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_ART_WORK:
    return {
      ...state,
      artWork: action.payload.art,
      name: action.payload.name,
      track: action.payload.track,
    };
  default:
    return state;
  }
};

export default artWorkReducer;
