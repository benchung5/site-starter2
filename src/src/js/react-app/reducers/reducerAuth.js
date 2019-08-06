import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    ADD_USER
} from '../actions/types';

export default function(state = '', action) {
    switch (action.type) {
        // case CHANGE_AUTH:
        case AUTH_USER:
            //if user successfully logins/signs up, we should clear any errors: error:''
            return { ...state, error: '', authenticated: true };
        case UNAUTH_USER:
            return { ...state, authenticated: false };
        case ADD_USER:
            return { ...state, error: '', user: action.payload };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case FETCH_MESSAGE:
            return { ...state, message: action.payload };
    }
    
    return state;
}
