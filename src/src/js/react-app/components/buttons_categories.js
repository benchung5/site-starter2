import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateCategoriesFilter, filterCategories } from '../actions/global';
// import { isLoading } from '../actions/internalLoad';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, getUrlParams, flattenActiveObjArray } from '../lib/utils';

class CategoriesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	componentWillMount() {
		let selectedCategories = getUrlParams('categories');
		//populate the filter with initial data
		this.props.dispatch(populateCategoriesFilter(selectedCategories));
	}

	onUpdateData(modifiedData) {
		//update the hash url with the selected categories
		let categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);

		this.props.dispatch(filterCategories(modifiedData));
	}

	render() {
		if (this.props.filteredCategories.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Categories'
			          height={this.buttonHeight  * this.props.filteredCategories.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button check"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filteredCategories}
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
		filteredCategories: state.global.categories,
	}
}

export default connect(mapStateToProps)(CategoriesButtons);

