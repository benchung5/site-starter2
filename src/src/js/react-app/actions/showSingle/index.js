import { SHOW_SINGLE, SHOW_SINGLE_SLUG } from '../types';

export function showSingle(showSingle) {
	//if slug, show single article single mode based on article slug
	return {
		type: SHOW_SINGLE,
		payload: showSingle
	}
}

export function showSingleSlug(slug) {
	//if slug, show single article single mode based on article slug
	return {
		type: SHOW_SINGLE_SLUG,
		payload: slug
	}
}
