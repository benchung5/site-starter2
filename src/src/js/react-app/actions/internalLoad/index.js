import {
	INTERNAL_LOAD,
} from '../types';

export function isLoading(isLoading) {
	return {
		type: INTERNAL_LOAD,
		payload: isLoading
	}
}