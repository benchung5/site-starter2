import {
	GET_LOCATION
} from '../types';

export function getLocation() {
	return function(dispatch) {
		const geolocation = navigator.geolocation;

		const location = new Promise((resolve, reject) => {
		  if (!geolocation) {
		    reject(new Error('Not Supported'));
		  }
		  
		  geolocation.getCurrentPosition((position) => {
		    resolve(position);
		  }, () => {
		    reject (new Error('Permission denied'));
		  });
		});

		location.then((position) => {
			let posCoords = [position.coords.longitude, position.coords.latitude]
			dispatch({
				type: GET_LOCATION,
				payload: posCoords
			})
		}).catch((err) => {
			console.log('Error getting geolocation: ', err);
		});
	}
};