import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterOrigins } from '../actions/globalTrees';
// import { isLoading } from '../actions/internalLoad';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

class ButtonsOrigins extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	onUpdateData(modifiedData) {
		//update the has url with the selected origins
		let originSlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('ecoregions', originSlugs);

		this.props.dispatch(filterOrigins(modifiedData));
	}

	render() {
		if (this.props.filteredOrigins.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Ecoregions'
			          height={this.buttonHeight  * this.props.filteredOrigins.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button check"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredOrigins}
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
		filteredOrigins: state.globalTrees.origins,
	}
}

export default connect(mapStateToProps)(ButtonsOrigins);

