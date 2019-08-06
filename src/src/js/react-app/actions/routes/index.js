import {
	ROUTES_FILTER,
} from '../types';


export function filterRoutes(filteredRoutes) {
	return {
		type: ROUTES_FILTER,
		payload: filteredRoutes
	}
}