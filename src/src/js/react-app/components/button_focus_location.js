import { connect } from 'react-redux';
import React, { Component } from 'react';
import ButtonComponent from './parts/button_component';
import { focusLocation } from '../actions/nearMe';

class FocusLocation extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	onItemClick(event) {
		//only if geolocation is already found
		if (this.props.location[0] !== 0) {
			//just have it toggle true and false eventhough
			//clicking always focuses. It's because we need to have isFocus
			//change it's state for it be picked up by other components
			this.props.isFocus ? this.props.dispatch(focusLocation(false)) : this.props.dispatch(focusLocation(true));
		}
	}

	render() {
		return (
			<ButtonComponent
			  classProp={`location-btn map-button 
			  	${(this.props.isFocus) ? 'focused' : 'unfocused'}`}
			  id={'focus-location'}
			  name="Focus Location"
			  onClickProp={this.onItemClick.bind(this)}
			>
			</ButtonComponent>
			)
	}
}

function mapStateToProps(state) {
  return {
    isFocus: state.nearMe.isFocus,
    location: state.map.location,
  }
}

export default connect(mapStateToProps)(FocusLocation);