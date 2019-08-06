import { SHOW_MENU } from '../types';

export function showMenu(showMenu) {
	//if slug, show single article single mode based on article slug
	return {
		type: SHOW_MENU,
		payload: showMenu
	}
}