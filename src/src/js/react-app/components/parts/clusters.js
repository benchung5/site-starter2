import React, { Component } from 'react';
import { Cluster, Marker } from "react-mapbox-gl";
import { connect } from 'react-redux';
import prefix from 'react-prefixer';
import { hasClass } from '../../lib/utils';

//config
const env = process.env.NODE_ENV || "development";
var { UPLOADS_PATH } = require('../../config')[env];
import { imgName } from '../../lib/stringUtils';

const styles: { [key: string]: React.CSSProperties } = prefix({
	artMarker: {
	  width: 30,
	  height: 47,
	  cursor: 'pointer',
	},
	clusterMarker: {
	  width: 30,
	  height: 30,
	  borderRadius: '50%',
	  backgroundColor: '#EE2E62',
	  display: 'flex',
	  justifyContent: 'center',
	  alignItems: 'center',
	  boxShadow: '0 0 0 2px #fff, 0 0 0 6px rgba(238,46,98,0.5)',
	  fontSize: '16px',
	  color: '#fff',
	  fontFamily: 'lato',
	  fontWeight: '600',
	  cursor: 'pointer',
	},
});

class MapClusters extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	//for updating the class on marker click
	  	currentMarer: '',
	  	//for comparing the recent marker clicked to current one
	  	prevMarkerLoc: [0,0],
	  };
	}

	onMarkerClick(item) {
		//see if this location (within 3 decimals) has already been clicked 
		//(accomodate for the random applied in the action for incoming data)
		let clickedSameLoc = false;
		if((this.state.prevMarkerLoc[0].toFixed(3) === item.geometry.coordinates[0].toFixed(3)) && (this.state.prevMarkerLoc[1].toFixed(3) === item.geometry.coordinates[1].toFixed(3))) {
			// console.log('same location clicked already');
			clickedSameLoc = true;
		}
		//update prev. current markers
		this.setState({ prevMarkerLoc: [item.geometry.coordinates[0], item.geometry.coordinates[1]] });


		//for css animation
		this.setState({ currentMarer: item.slug });
		//to remove the animation class after a bit
		setTimeout(() => {
			this.setState({ currentMarer: '' });
		}, 1500);
	  	//send callback to parent
		this.props.onMarkerClick(item, clickedSameLoc);
	}

	//this is the cluster
	clusterMarker(coordinates, pointCount) {
	  return (
	    <Marker 
	    key={coordinates[0]}
	    coordinates={coordinates} 
	    style={styles.clusterMarker}
	    onClick={this.props.onClusterClick.bind(this, coordinates)}
	    >
	    {pointCount}
	    </Marker>
	    )
	}

	renderClusterChildren() {
	    return this.props.data.map((item, i) => {
	    	return (
    			 //this is the markers within the cluster
    		    <Marker
    		   	    key={i}
    		   	    className={(this.state.currentMarer === item.slug) ? `animate-marker` : ``}
    		   	    coordinates={item.geometry.coordinates}
    		        anchor="bottom"
    		        style={{...styles.artMarker, ...this.state.markerSelectStyle}}
    		        onClick={this.onMarkerClick.bind(this, item)}
    		        // onMouseEnter={this.props.onHover.bind(this, item)} 
    		        // onMouseLeave={this.props.onHoverLeave.bind(this)}
    		        >
    		        <div className={`art-marker ${item.category.slug}`}></div>
    		    	{/* use the below hidden images only to precache all marker popup images */}
    		        { item.images[0] &&
    		        	<img style={{ display: 'none' }} src={UPLOADS_PATH + imgName(item.images[0].source, 'small')} />
    		        }
    		    </Marker>
    		)
	    });
	}

	render() {
		return (
			  <Cluster
			  	ClusterMarkerFactory={this.clusterMarker.bind(this)}
			  	zoomOnClick={true}
			  >
			    {
			      this.renderClusterChildren()
			    }
			  </Cluster>

			);
	}
}

function mapStateToProps(state) {
	return {
		data: state.articles.searchResults,
	}
}

export default connect(mapStateToProps)(MapClusters);