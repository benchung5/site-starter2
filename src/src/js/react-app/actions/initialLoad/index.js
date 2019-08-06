import {
	INITIAL_LOAD,
} from '../types';

export function isInitialLoading(isLoading) {
	return {
		type: INITIAL_LOAD,
		payload: isLoading
	}
}