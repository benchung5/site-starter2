import { FETCH_TAGS } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function reducerTags(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_TAGS:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}