import {
    LANGUAGE
} from '../actions/types';

const INITIAL_STATE = { lang: 'en' };

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LANGUAGE:
            return {...state, lang: action.payload};
        default:
            return state;
    }
}