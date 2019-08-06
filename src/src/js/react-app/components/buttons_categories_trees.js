import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterCategoriesTrees } from '../actions/globalTrees';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';
import { setUrlParams, flattenActiveObjArray } from '../lib/utils';

class CategoriesTreesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
		this.buttonHeight = 40;
	}

	onUpdateData(modifiedData) {
		//update the hash url with the selected categories
		let categorySlugs = flattenActiveObjArray(modifiedData, 'slug');
		setUrlParams('categories', categorySlugs);

		// dispatch action
		this.props.dispatch(filterCategoriesTrees(modifiedData));
	}

	render() {
		if (this.props.filterCats.length) {
			return (
			        <Dropdown
			          classProp=""
			          name='Plant Type'
			          height={this.buttonHeight * this.props.filterCats.length}
			        >
			         <ButtonList
			         	wrapperClass="single-col"
			         	classProp=""
			         	classPropButton="list-button check icon"
			         	buttonHeight={this.buttonHeight}
			         	buttonData={this.props.filterCats}
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
		filterCats: state.globalTrees.categoriesTrees,
	}
}

export default connect(mapStateToProps)(CategoriesTreesButtons);

