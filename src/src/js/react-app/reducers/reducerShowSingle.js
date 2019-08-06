import { SHOW_SINGLE } from '../actions/types';

const INITIAL_STATE = { slug: '' };

export default function reducerShowSingle(state = INITIAL_STATE , action) {
	switch(action.type) {
		case SHOW_SINGLE:
			return { ...state, slug: action.payload }
		default:
			return state;
	}

}