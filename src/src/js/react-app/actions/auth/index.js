import axios from 'axios';
import history from '../../history';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
var { POST_CONFIG } = require('../../config')['globals'];
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
  ADD_USER
} from '../types';

export function signinUser({ email, password, key }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${SERVER_URL}/users/sign_in`, { email, password, key }, POST_CONFIG)
      .then(response => {
        // If request is good...
        if(response.data.token) {
          // - Update state to indicate user is authenticated
          dispatch({ type: AUTH_USER });
          // - Save the JWT token
          localStorage.setItem('token', response.data.token);
        } else {
          // - Show an error to the user
          dispatch(authError('Bad Login Info'));
        }
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Error logging in'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${SERVER_URL}/users/create`, { email, password })
      .then(response => {
        if(response.data.error) {
          dispatch(authError(`there was an error signing up user: ${response.data.error}`));
        } else {
          dispatch({
            type: ADD_USER,
            payload: response.data
          });
          //localStorage.setItem('token', response.data.token);
        }
      })
      .catch(err => dispatch(authError(`there was an error signing up: ${err}`)));
  }
}

export function clearUser() {
  return {
    type: ADD_USER,
    payload: ''
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(SERVER_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  }
}
