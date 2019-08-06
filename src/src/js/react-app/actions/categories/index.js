import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	ADD_CATEGORY,
	ADD_CATEGORY_ERROR,
	FETCH_CATEGORIES,
	DELETE_CATEGORY,
	GET_CATEGORY,
	UPDATE_CATEGORY
} from '../types';

export function addCategory(formData) {
	return function(dispatch) {
		// post to: http://localhost:8080/api/categories/create
		axios.post(`${SERVER_URL}/categories/create`, formData)
		.then(response => {
			if(response.data.error) {
				dispatch(addCategoryError(`there was an error adding the category: ${response.data.error}`));
			} else {
				dispatch({
					type: ADD_CATEGORY,
					payload: response.data
				});
			}
		})
		.catch((err) => {
			//todo: if request is bad
			dispatch(addCategoryError(`there was an error adding the category: ${err}`));
		});
	}
}

export function fetchCategories() {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/categories/all`)
		.then((response) => {
			dispatch({
				type: FETCH_CATEGORIES,
				payload: response.data
			});
		}).catch((err) => {
			console.log('error fetching categories: ', err);
		});

	}
}

export function deleteCategory({ slug }) {
	return function(dispatch) {
		axios.post(`${SERVER_URL}/categories/delete`, { slug })
		.then((response) => {
			if(response.data.error) {
				console.log('error: ', response.data.error);
			} else {
				dispatch(fetchCategories());
			}
		}).catch((err) => {
			console.log('error deleting the category: ', err);
		});
	}
}

export function getCategory(slug) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/categories/single/${slug}`)
			.then((response) => {
				dispatch({
					type: GET_CATEGORY,
					payload: response.data
				});
			})
			.catch((err) => {
				console.log('error getting category: ', err);
			});
		}
}

export function updateCategory(formData) {
	return function(dispatch){
		axios.post(`${SERVER_URL}/categories/update`, formData)
			.then((response) => {
				if(response.data.error) {
					dispatch(updateCategoryError(`there was an error updating the category: ${response.data.error}`));
				} else {
					dispatch({
						type: UPDATE_CATEGORY,
						payload: response.data
					});
				}
			})
			.catch((err) => {
				console.log('error upating category: ', err);
			});
	}

}

export function clearUpdateCategory() {
	return {
		type: UPDATE_CATEGORY,
		payload: ''
	}
}

export function clearCategory() {
	return {
		type: ADD_CATEGORY,
		payload: ''
	}
}

export function addCategoryError(error) {
    return {
        type: ADD_CATEGORY_ERROR,
        payload: error
    }
}