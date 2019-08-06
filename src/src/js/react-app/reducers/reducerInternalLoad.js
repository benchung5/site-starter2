import {
    INTERNAL_LOAD
} from '../actions/types';

const INITIAL_STATE = { isLoading: false };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case INTERNAL_LOAD:
            return {...state, isLoading: action.payload};
        default:
            return state;
    }
}