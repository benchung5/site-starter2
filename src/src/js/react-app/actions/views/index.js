import {
	VIEWS_TOGGLE,
} from '../types';

//views

export function viewsToggle(items) {
	return {
		type: VIEWS_TOGGLE,
		payload: items
	}
}