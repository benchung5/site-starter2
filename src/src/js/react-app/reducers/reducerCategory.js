import {
    ADD_CATEGORY,
    ADD_CATEGORY_ERROR,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    GET_CATEGORY
} from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        case ADD_CATEGORY:
            return { ...state, categoryAdded: action.payload };
        case ADD_CATEGORY_ERROR:
            return { ...state, addCategoryError: action.payload };
        case DELETE_CATEGORY:
        	return { ...state, deletedCategory: action.payload };
        case UPDATE_CATEGORY:
            return { ...state, categoryUpdated: action.payload };
        case GET_CATEGORY:
            return { ...state, categorySingle: action.payload };
    }
    return state;
}