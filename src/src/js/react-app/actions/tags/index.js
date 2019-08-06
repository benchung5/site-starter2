import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	ADD_TAG,
	ADD_TAG_ERROR,
	FETCH_TAGS,
	DELETE_TAG,
	GET_TAG,
	UPDATE_TAG
} from '../types';

export function addCategory(formData) {
	return function(dispatch) {
		// post to: http://localhost:8080/api/tags/create
		axios.post(`${SERVER_URL}/tags/create`, formData)
		.then(response => {
			if(response.data.error) {
				dispatch(addCategoryError(`there was an error adding the tag: ${response.data.error}`));
			} else {
				dispatch({
					type: ADD_TAG,
					payload: response.data
				});
			}
		})
		.catch((err) => {
			//todo: if request is bad
			dispatch(addCategoryError(`there was an error adding the tag: ${err}`));
		});
	}
}

export function fetchTags() {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/tags/all`)
		.then((response) => {
			dispatch({
				type: FETCH_TAGS,
				payload: response.data
			});
		}).catch((err) => {
			console.log('error fetching tags: ', err);
		});

	}
}

export function deleteCategory({ slug }) {
	return function(dispatch) {
		axios.post(`${SERVER_URL}/tags/delete`, { slug })
		.then((response) => {
			if(response.data.error) {
				console.log('error: ', response.data.error);
			} else {
				dispatch(fetchTags());
			}
		}).catch((err) => {
			console.log('error deleting the tag: ', err);
		});
	}
}

export function getCategory(slug) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/tags/single/${slug}`)
			.then((response) => {
				dispatch({
					type: GET_TAG,
					payload: response.data
				});
			})
			.catch((err) => {
				console.log('error getting tag: ', err);
			});
		}
}

export function updateCategory(formData) {
	return function(dispatch){
		axios.post(`${SERVER_URL}/tags/update`, formData)
			.then((response) => {
				if(response.data.error) {
					dispatch(updateCategoryError(`there was an error updating the tag: ${response.data.error}`));
				} else {
					dispatch({
						type: UPDATE_TAG,
						payload: response.data
					});
				}
			})
			.catch((err) => {
				console.log('error upating tag: ', err);
			});
	}

}

export function clearUpdateCategory() {
	return {
		type: UPDATE_TAG,
		payload: ''
	}
}

export function clearCategory() {
	return {
		type: ADD_TAG,
		payload: ''
	}
}

export function addCategoryError(error) {
    return {
        type: ADD_TAG_ERROR,
        payload: error
    }
}