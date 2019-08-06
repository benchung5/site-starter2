import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions/global';
import renderSearch from './parts/field_search';
import { formatSearchString } from '../lib/stringUtils';
import { viewsToggle } from '../actions/views';
import { globals } from '../config.js';


class SearchForm extends Component {

	handleFormSubmit(formProps) {
		//call action for data (send the text along with the global data)
		// if empty search, just search with the existing global filter
		if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
			this.props.dispatch(actions.searchArticles(this.props.articlesGlobal));
		} else {
			//else, query it using keywords
			this.props.dispatch(actions.searchArticles({ 
				search: formatSearchString(formProps.search), 
				categories: this.props.articlesGlobal.categories,
				themes: this.props.articlesGlobal.themes,
				offset: 0,
				limit: globals.ADMIN_ENTRIES_PER_PAGE
			}));
		}
	}

	// onCloseClick(e) {
	// 	//set the list view to off and map view to on
	// 	this.props.viewsToggle('close');
	// }

	// <div onClick={this.onCloseClick.bind(this)} className="search-clear"></div>

	render() {
		const { handleSubmit } = this.props;
		return (
				<form ref="form" className="search-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<button type="submit" className="search-button"/>
					<Field
						name="search"
						component={renderSearch}
					/>
					
				</form>
			)
	}

}

function validate(formProps) {
	const errors = {};

	//validation...

	return errors;
}

function mapStateToProps(state) {
	return {
		articlesGlobal: state.global
	}
}

export default reduxForm({
	form: 'search-form',
	validate
})(
connect(mapStateToProps, { viewsToggle })(SearchForm)
);