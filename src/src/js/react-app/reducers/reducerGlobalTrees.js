import { globals } from '../config.js';
import {
    CATEGORIES_TREES_FILTER,
    ORIGINS_FILTER,
    ZONES_FILTER,
    TREES_FILTER,
    OFFSET_TREES_FILTER,
    SEARCH_TREES_FILTER,
} from '../actions/types';

const INITIAL_STATE = {
	categoriesTrees: [],
    origins: [],
    zones: [],
    search: '',
    offset: 0,
    //count: 0,
    limit: globals.ADMIN_ENTRIES_PER_PAGE
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CATEGORIES_TREES_FILTER:
            return { ...state, categoriesTrees: action.payload };
        case ORIGINS_FILTER:
            return { ...state, origins: action.payload };
        case ZONES_FILTER:
            return { ...state, zones: action.payload };
        case OFFSET_TREES_FILTER:
            return { ...state, offset: action.payload };
        case SEARCH_TREES_FILTER:
            return { ...state, search: action.payload };
    }
    return state;
}