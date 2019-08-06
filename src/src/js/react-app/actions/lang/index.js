import {
	LANGUAGE,
} from '../types';


export function changeLanguage(lang) {
	return {
		type: LANGUAGE,
		payload: lang
	}
}