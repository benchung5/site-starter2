import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	FETCH_TREE_TABLES,
} from '../types';

export function fetchTreeTables() {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/tree_tables/all`)
		.then((response) => {
			dispatch({
				type: FETCH_TREE_TABLES,
				payload: response.data
			});
		}).catch((err) => {
			console.log('error fetching origins: ', err);
		});
	}
}