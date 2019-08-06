import { FETCH_TREE_TABLES } from '../actions/types';

const INITIAL_STATE = {
	all: {
		'genuses' : [],
		'origins' : [],
		'eco_benefits' : [],
		'native_to' : [],
		'zones' : [],
		'trees_category' : [],
		'tags' : [],
		'shapes' : [],
		'light' : [],
		'soil' : [],
		'natural_habitat' : [],
		'common_uses' : [],
		'transplanting' : [],
		'unique_attractions' : [],
		'tolerances' : [],
		'reproduction_types' : [],
		'insects' : [],
		'diseases' : [],
		'conifer_leaf_types' : [],
		'conifer_leaf_structures' : [],
		'conifer_leaf_cross_sections' : [],
		'conifer_cone_features' : []
	}
};

export default function reducerTreeTables(state = INITIAL_STATE , action) {
	switch(action.type) {
		case FETCH_TREE_TABLES:
			return { ...state, all: action.payload }
		default:
			return state;
	}

}