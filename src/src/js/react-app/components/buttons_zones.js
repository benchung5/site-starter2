import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterZones } from '../actions/globalTrees';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import DropdownSelect from './parts/dropdown_select';
import labels from '../data/labels';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

class ButtonsZones extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	onUpdateData(modifiedData) {
		//update the has url with the selected zones
		let zoneSlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('zones', zoneSlugs);

		this.props.dispatch(filterZones(modifiedData));
	}

	render() {
		if (this.props.filteredZones.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Hardiness Zone'
			          height={40}
			        >
			         <DropdownSelect
			         	name='Hardiness zone'
			         	height={this.buttonHeight  * this.props.filteredZones.length}
			         	wrapperClass="single-col"
			         	defaultSelect="0"
			         	classProp=""
			         	classPropButton=""
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredZones}
			         	updateData={this.onUpdateData.bind(this)}
			         />
			        </Dropdown>
				)
		} else {
			return null;
		}
	}
}

function mapStateToProps(state) {
	return {
		filteredZones: state.globalTrees.zones,
	}
}

export default connect(mapStateToProps)(ButtonsZones);

