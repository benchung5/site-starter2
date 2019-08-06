import {
    ADD_TREE,
    UPDATE_TREE,
    DELETE_TREE,
    ADD_TREE_ERROR,
    UPDATE_TREE_ERROR,
    GET_TREE
} from '../actions/types';

const INITIAL_STATE = {
    treeAdded: '',
    treeSingle: {
        specific_epithet: '',
        other_species: '',
        subspecies: '',
        variety: '',
        cultivar: '',
        // also in database this is an 
        // int and default is set to 0
        height_min: 0,
        height_max: 0,
        width_min: 0,
        width_max: 0,
        lifespan_min: 0,
        lifespan_max: 0,
        body: '',
        category: [],
        themes: [],
        // make images null so we know it's an intentional clear
        // an empty array makes it show the placeholder image
        images: null,
    },
    treeDeleted: '',
    addTreeError: '',
    treeUpdateError: ''
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {

        case ADD_TREE:
            return { ...state, treeAdded: action.payload };
        case UPDATE_TREE:
            return { ...state, treeUpdated: action.payload };
        case GET_TREE:
            return { ...state, treeSingle: action.payload };
        case DELETE_TREE:
            return { ...state, treeDeleted: action.payload };
        case ADD_TREE_ERROR:
            return { ...state, addTreeError: action.payload };
        case UPDATE_TREE_ERROR:
            return { ...state, treeUpdateError: action.payload };
    }
    
    return state;
}