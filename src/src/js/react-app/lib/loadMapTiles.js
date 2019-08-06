import axios from 'axios';

export function loadMapTiles() {
	let tiles = [

	//zoom level1

	'11/569/749',
	'11/569/750',
	'11/569/751',
	'11/569/752',
	'11/569/753',
	'11/569/754',

	'11/570/749',
	'11/570/750',
	'11/570/751',
	'11/570/752',
	'11/570/753',
	'11/570/754',

	'11/571/749',
	'11/571/750',
	'11/571/751',
	'11/571/752',
	'11/571/753',
	'11/571/754',

	'11/572/749',
	'11/572/750',
	'11/572/751',
	'11/572/752',
	'11/572/753',
	'11/572/754',

	'11/573/749',
	'11/573/750',
	'11/573/751',
	'11/573/752',
	'11/573/753',
	'11/573/754',

	'11/574/749',
	'11/574/750',
	'11/574/751',
	'11/574/752',
	'11/574/753',
	'11/574/754',

	'11/575/749',
	'11/575/750',
	'11/575/751',
	'11/575/752',
	'11/575/753',
	'11/575/754',

	'11/576/749',
	'11/576/750',
	'11/576/751',
	'11/576/752',
	'11/576/753',
	'11/576/754',

	//zoom level2
	
	'12/1139/1499',
	'12/1139/1501',
	'12/1139/1503',
	'12/1139/1507',

	'12/1140/1498',
	'12/1140/1500',
	'12/1140/1502',
	'12/1140/1504',
	'12/1140/1506',
	'12/1140/1508',

	'12/1141/1499',
	'12/1141/1501',
	'12/1141/1503',
	'12/1141/1505',
	'12/1141/1507',

	'12/1142/1498',
	'12/1142/1498',
	'12/1142/1500',
	'12/1142/1502',
	'12/1142/1504',
	'12/1142/1506',
	'12/1142/1508',

	'12/1143/1499',
	'12/1143/1501',
	'12/1143/1503',
	'12/1143/1505',
	'12/1143/1507',
	'12/1143/1507',

	'12/1144/1498',

	]

	//preload the map tiles to be cached by sw-toolbox
	//let it wait a bit to let sw register (can't be a lambda function)
	setTimeout(() => {
		// we add index param here, starts with 0
		tiles.forEach(function(item, index) { 
	        setTimeout(function() {
	        	axios.get(`https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7,formandaffect.cj6fdjytd2k232wplywn2cx20-07e2e/11/${item}.vector.pbf?access_token=${process.env.MapboxAccessToken}`)
	        	.then((response) => {
	        		console.log('loaded tile');
	        	}).catch((err) => {
	        		console.log('error fetching tiles: ', err);
	        	});
	        }, 100*(index))
		});
	}, 5000);

}



//https://b.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7,formandaffect.cj6fdjytd2k232wplywn2cx20-07e2e/11/570/751.vector.pbf?access_token=pk.eyJ1IjoiZm9ybWFuZGFmZmVjdCIsImEiOiJjaXVqeTkxbXgwMTBrMnpvMDR2eWd3bXRsIn0.jQOrnZlTmd3kVfHIQVRr6A