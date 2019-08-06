import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import {
	BACKUP_DB,
	BACKUP_DB_ERROR
} from '../types';


export function backupDb() {
	return function(dispatch){
		axios.post(`${SERVER_URL}/db/backup`)
			.then((response) => {
				if(response.data.error) {
					dispatch(backupDbError(`there was an error backing up the database: ${response.data.error}`));
				} else {
					dispatch({
						type: BACKUP_DB,
						payload: response.data
					});
				}
			})
			.catch((err) => {
				console.log('error posting with backupDb action: ', err);
			});
	}

}

export function backupDbError(error) {
    return {
        type: BACKUP_DB_ERROR,
        payload: error
    }
}

export function clearBackupDb() {
	return {
		type: BACKUP_DB,
		payload: ''
	}
}