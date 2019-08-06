import { FETCH_CATEGORIES } from '../actions/types';

const INITIAL_STATE = { all: [] };

export default function reducerCategories(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_CATEGORIES:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}