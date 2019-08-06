import { globals } from '../config.js';
import { 
	FETCH_TREES,
	SEARCH_TREES,
    SEARCH_TREES_ADMIN,
} from '../actions/types';

const INITIAL_STATE = { 
    all:[],
    searchResults: {
        trees: [],
        count: 0,
        // offset: 0,
        // limit: globals.ADMIN_ENTRIES_PER_PAGE 
    }
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_TREES:
            return {...state, all: action.payload};
        case SEARCH_TREES:
        	return {...state, searchResults: action.payload};
        default:
            return state;
    }
}