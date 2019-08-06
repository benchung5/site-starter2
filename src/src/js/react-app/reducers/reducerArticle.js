import {
    ADD_ARTICLE,
    UPDATE_ARTICLE,
    DELETE_ARTICLE,
    ADD_ARTICLE_ERROR,
    UPDATE_ARTICLE_ERROR,
    GET_ARTICLE
} from '../actions/types';

const INITIAL_STATE = {
    articleAdded: '',
    articleSingle: {
        categories: [],
        tags: [],
        // make images null so we know it's an intentional clear
        // an empty array makes it show the placeholder image
        images: null,
    },
    articleDeleted: '',
    addArticleError: '',
    articleUpdateError: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ADD_ARTICLE:
            return { ...state, articleAdded: action.payload };
        case UPDATE_ARTICLE:
            return { ...state, articleUpdated: action.payload };
        case GET_ARTICLE:
            return { ...state, articleSingle: action.payload };
        case DELETE_ARTICLE:
            return { ...state, articleDeleted: action.payload };
        case ADD_ARTICLE_ERROR:
            return { ...state, addArticleError: action.payload };
        case UPDATE_ARTICLE_ERROR:
            return { ...state, articleUpdateError: action.payload };
    }
    
    return state;
}