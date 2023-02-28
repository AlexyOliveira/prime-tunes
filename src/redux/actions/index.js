export const SET_FAVORITE = 'SET_FAVORITE';
export const SET_ART_WORK = 'SET_ART_WORK';
export const SET_ISPLAY = 'SET_ISPLAY';

export const saveEdited = (payload) => ({
  type: SET_FAVORITE,
  payload,
});

export const saveArtWork = (payload) => ({
  type: SET_ART_WORK,
  payload,
});

export const setIsPlay = (payload) => ({
  type: SET_ISPLAY,
  payload,
});
