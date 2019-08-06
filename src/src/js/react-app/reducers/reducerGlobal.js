import { globals } from '../config.js';
import {
    CATEGORIES_FILTER,
    THEMES_FILTER,
    OFFSET_FILTER,
    SEARCH_FILTER
} from '../actions/types';

const INITIAL_STATE = {
	categories: [],
	themes: [],
    search: '',
    offset: 0,
    limit: globals.ADMIN_ENTRIES_PER_PAGE
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CATEGORIES_FILTER:
            return { ...state, categories: action.payload };
        case THEMES_FILTER:
            return { ...state, themes: action.payload };
        case OFFSET_FILTER:
            return { ...state, offset: action.payload };
        case SEARCH_FILTER:
            return { ...state, search: action.payload };
    }
    return state;
}