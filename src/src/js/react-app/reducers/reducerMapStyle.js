import {
    MAP_STYLE
} from '../actions/types';


const INITIAL_STATE = {
  // mapStyle: 'mapbox://styles/mapbox/streets-v9'
  mapStyle: 'mapbox://styles/formandaffect/cj6fdqrxi2epj2slfnsm97t5j'
}




export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case MAP_STYLE:
    return { ...state, mapStyle: action.payload };
  }
  return state;
}