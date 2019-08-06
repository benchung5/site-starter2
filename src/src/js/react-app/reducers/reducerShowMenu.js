import {
    SHOW_MENU
} from '../actions/types';

const INITIAL_STATE = {
	// 'open', 'close'
	// must start it with blank class for css
	// animation to work properly
  showMenu: ''
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case SHOW_MENU:
    return { ...state, showMenu: action.payload };
  }
  return state;
}