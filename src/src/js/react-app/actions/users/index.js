import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
    FETCH_USERS
    } from '../types';


export function fetchUsers() {
    return function(dispatch) {
        axios.get(`${SERVER_URL}/users/all`)
        .then(response => {
            dispatch({
                type: FETCH_USERS,
                payload: response.data
             });
        })
        .catch(() => {
            console.log('error fetching users: ', err);
        });
    }
}

export function deleteUser({ email }) {
        return function(dispatch) {
        // post to http://192.168.99.100/articles/delete
        axios.post( `${SERVER_URL}/users/delete`, { email } )
        .then( response => {
            if(response.data.error) {
                //dispatch(deleteUserError(`there was an error deleting the user: ${response.data.error}`));
            } else {
                dispatch(fetchUsers());
            }
        })
        .catch((err) => {
            console.log('error deleting the user: ', err);
        });
    }
}