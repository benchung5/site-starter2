import {
    ADD_TAG,
    ADD_TAG_ERROR,
    DELETE_TAG,
    UPDATE_TAG,
    GET_TAG
} from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        case ADD_TAG:
            return { ...state, themeAdded: action.payload };
        case ADD_TAG_ERROR:
            return { ...state, addThemeError: action.payload };
        case DELETE_TAG:
        	return { ...state, deletedTheme: action.payload };
        case UPDATE_TAG:
            return { ...state, themeUpdated: action.payload };
        case GET_TAG:
            return { ...state, themeSingle: action.payload };
    }
    return state;
}