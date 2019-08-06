import axios from 'axios';
//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../config')[env];
import { isLoading } from '../internalLoad';

import {
	CATEGORIES_FILTER,
	SEARCH_ARTICLES,
    OFFSET_FILTER,
    SEARCH_FILTER,
} from '../types';

//categories
export function filterCategories(filteredCategories) {
	return {
		type: CATEGORIES_FILTER,
		payload: filteredCategories
	}
}

export function filterOffset(offset) {
    return {
        type: OFFSET_FILTER,
        payload: offset
    }
}

export function filterSearchArticles(search) {
    return {
        type: SEARCH_FILTER,
        payload: search
    }
}

export function populateCategoriesFilter(selectedCategories) {
	return function(dispatch) {
		axios.get(`${SERVER_URL}/categories/all`)
		.then((response) => {
			var modifiedData = [];
			//add an active state to each returned object
			if (response.data) {
				modifiedData = response.data.map((item, index) => {
					let isActive = true;

                    // if url contains selected categories, just select those
                    if (selectedCategories) {
                        isActive = false;
                        if ((selectedCategories.length > 0) && (selectedCategories.indexOf(item.slug) > -1)) {
                            isActive = true;
                        }
                    }

					return { id: item.id, name: item.name, slug: item.slug, active: isActive };
				});
				dispatch({
					type: CATEGORIES_FILTER,
					payload: modifiedData
				});
			}
		}).catch((err) => {
			console.log('error fetching categories for filtering: ', err);
		});

	}
}

//perform the search
export function searchArticles(searchObj) {
    return function(dispatch) {
        dispatch(isLoading(true));
    	let query = buildQuery(searchObj);
    	//set the obj in the get request
        axios.get(`${SERVER_URL}/articles/search/`, { params: query })
        .then(response => {
            dispatch({
                type: SEARCH_ARTICLES,
                //payload: formatMarkerCoords(response.data)
                payload: response.data
             });
            dispatch(isLoading(false));
        })
        .catch((err) => {
            console.log('error searching articles: ', err);
        });
    }

    function buildQuery(inObj) {
    	const query = {};

        // just include search, offset and limit as is
        query.search = inObj.search;
        query.offset = inObj.offset;
        query.limit = inObj.limit;

    	//format categories, query only active ones
    	if (inObj.categories) {
    		//return a new array without undefined
    		let categoryArray = inObj.categories.reduce(function(result, item) {
    		  if(item.active) {
    		    result.push(item.id);
    		  }
    		  return result;
    		}, []);

    		query.categories = categoryArray;
    	}

    	return query;
    }


    function formatMarkerCoords(data) {
    	//version that only ransomizes duplicates but when markers change according to category buttons, this no longer works

    	let coordsClone = [];

    	data.forEach((item, index) => {
    		//clone and add an index to sort again later
    		var coords = [item.geometry.coordinates[0], item.geometry.coordinates[1], index];
    		coordsClone.push(coords);
    	});

    	//get array of just duplicate values
    	let duplicates = removeUnique(coordsClone);
    	//get array of just unique values
    	let unique = removeDuplicates(coordsClone);


    	//randomize the duplicates
    	let duplicatesRandomized = duplicates.map(function (item, index) {
    		//convert to random point within n meters of original point
    		//params: center, radius
    		return generateRandomPoint(item, 20);
    	});

    	//combine together again
    	let combined = duplicatesRandomized.concat(unique);
    	//sort by the index indicated int the third array value of each item
    	let sorted = combined.sort((a,b) => {
    		return a[2] - b[2];
    	});
    	//remove the third value for sorting as we no longer need it
    	let formatted = sorted.map((item) => {
    		return  [item[0], item[1]];
    	});

    	let output = data.map((item, index) => {
    		item.geometry.coordinates = formatted[index];
    		return item
    	});

    	//update theh state
    	return output;


    	//helper functions...

    	function removeUnique(arr) {
    		var newArr = [];
    		for (var i = 0; i < arr.length; i++) {
    			var count = 0;
    			for (var j = 0; j < arr.length; j++) {
    				if (arr[j][0] === arr[i][0]) {
    					count++;
    				}
    			}
    			if (count >= 2) {
    				newArr.push(arr[i]);
    			}
    		}
    	    return newArr;
    	}

    	function removeDuplicates(arr) {
    		var newArr = [];
    		for (var i = 0; i < arr.length; i++) {
    			var count = 0;
    			for (var j = 0; j < arr.length; j++) {
    				if (arr[j][0] === arr[i][0]) {
    					count++;
    				}
    			}
    			if (count === 1) {
    				newArr.push(arr[i]);
    			}
    		}
    	    return newArr;
    	}

    	//center: long/lat
    	function generateRandomPoint(center, radius) {
    	  //lon
    	  var y0 = center[0];
    	  //lat
    	  var x0 = center[1];

    	  // Convert Radius from meters to degrees.
    	  var rd = radius/111300;

    	  var u = Math.random();
    	  var v = Math.random();

    	  var w = rd * Math.sqrt(u);
    	  var t = 2 * Math.PI * v;
    	  var x = w * Math.cos(t);
    	  var y = w * Math.sin(t);

    	  var xp = x/Math.cos(y0);

    	  // Resulting point. [lon, lat]
    	  //just have a third value because we need to pass in the index in this case
    	  //return [y+y0, xp+x0];
    	  return [y+y0, xp+x0, center[2]];
    	}
    }

}

