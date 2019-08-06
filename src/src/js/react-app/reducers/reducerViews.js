import {
    VIEWS_TOGGLE
} from '../actions/types';

// 'open', 'close'
// must start it with this initial class for css
// animation to work properly
const INITIAL_STATE = { view: 'initial' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {

        case VIEWS_TOGGLE:
        //return a new object, take what's initially stored in state
        //then add on a new property all with action.payload as the value;
            return {...state, view: action.payload};

        default:
            return state;
    }
}