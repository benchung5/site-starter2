import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];

import {
	NEAR_ME,
	FOCUS_LOCATION,
	SEARCH_ARTICLES
} from '../types';

//near me settings

export function focusLocation(isFocus) {
	return {
		type: FOCUS_LOCATION,
		payload: isFocus
	}
}

export function nearMeToggle(settings) {
	//dispatch to update near me state only
	return {
	    type: NEAR_ME,
	    payload: settings
	 };
}

export function nearMeSearch(settings) {
	return function(dispatch) {
		//send the obj in the get request
	    axios.get(`${SERVER_URL}/articles/near-me/`, { params: settings })
	    .then(response => {
	        dispatch({
	            type: SEARCH_ARTICLES,
	            payload: response.data
	         });
	    })
	    .catch((err) => {
	        console.log('error getting near me articles: ', err);
	    });
	}
}