import {
    ROUTES_FILTER
} from '../actions/types';

// [list, map]
const INITIAL_STATE = { 
	route:[
            { _id: 'biking', title: 'Cycling', fr_title: 'Cyclisme', active: false },
            // { _id: 'walking', title: 'Walking/Hiking', fr_title: 'Marche/Randonnée pédestre', active: true },
            { _id: 'walking', title: 'Walking/Hiking', fr_title: 'Marche/Randonnée pédestre', active: false },
            { _id: 'hospitality', title: 'Hospitality', fr_title: 'Hospitalité', active: false }
		] 
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case ROUTES_FILTER:
        //return a new object, take what's initially stored in state
        //then add on a new property all with action.payload as the value;
            return {...state, route: action.payload};

        default:
            return state;
    }
}



