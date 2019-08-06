import {
    INITIAL_LOAD
} from '../actions/types';

const INITIAL_STATE = { isLoading: true };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case INITIAL_LOAD:
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
}