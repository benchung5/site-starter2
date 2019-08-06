import { connect } from 'react-redux';
import React, { Component } from 'react';
import ButtonComponent from './parts/button_component';
import { toggleMapStyle } from '../actions/mapStyle';

class MapStyleButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	onItemClick(event) {
		event.preventDefault();
		// this.props.dispatch(toggleMapStyle('mapbox://styles/mapbox/satellite-v9'));
		// if(this.props.mapStyle === 'mapbox://styles/mapbox/satellite-v9') {
		// 	this.props.dispatch(toggleMapStyle('mapbox://styles/mapbox/streets-v9'));
		// } else {
		// 	this.props.dispatch(toggleMapStyle('mapbox://styles/mapbox/satellite-v9'));
		// }

		if(this.props.mapStyle === 'mapbox://styles/mapbox/satellite-v9') {
			this.props.dispatch(toggleMapStyle('mapbox://styles/formandaffect/cj6fdqrxi2epj2slfnsm97t5j'));
		} else {
			this.props.dispatch(toggleMapStyle('mapbox://styles/mapbox/satellite-v9'));
		}
	}

	render() {
		return (
			<ButtonComponent
			  classProp={`map-style-btn map-button 
			  	${(this.props.mapStyle === 'mapbox://styles/mapbox/satellite-v9') ? 'street' : 'satellite'}
			  	`}
			  id={this.props.mapStyle} 
			  name="Map Style"
			  onClickProp={this.onItemClick.bind(this)}
			>
			</ButtonComponent>
			)
	}
}

function mapStateToProps(state) {
  return {
    // mapPointData: state.articles.all,
    // location: state.map.location
    mapStyle: state.mapStyle.mapStyle
  }
}

export default connect(mapStateToProps)(MapStyleButton);