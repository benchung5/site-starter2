import {
    GET_LOCATION
} from '../actions/types';

const INITIAL_STATE = {
  //location: [-79.2450337, 43.156970699999995]
  location: [0, 0]
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case GET_LOCATION:
    return { ...state, location: action.payload };
  }
  return state;
}