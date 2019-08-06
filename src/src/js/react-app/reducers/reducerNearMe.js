import {
    NEAR_ME,
    FOCUS_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
  nearMe: {
    active: false, 
    lat: 0, 
    lng: 0, 
    distance: 10000
  },
  isFocus: false
}


export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case NEAR_ME:
      return { ...state, nearMe: action.payload };
    case FOCUS_LOCATION:
      return { ...state, isFocus: action.payload };
  }

  return state;
}