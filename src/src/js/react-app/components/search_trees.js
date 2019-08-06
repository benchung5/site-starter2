import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions/globalTrees';
import renderSearch from './parts/field_search';
import { formatSearchString } from '../lib/stringUtils';
import { getUrlParams, setUrlParams } from '../lib/utils';
import { viewsToggle } from '../actions/views';
import { globals } from '../config.js';


class SearchForm extends Component {

	componentWillMount() {
	  let search = getUrlParams('search');
	  if (search) {
	    //update the global filter and search
	    this.props.dispatch(actions.filterSearchTrees(search[0]));
	    
	    //fill in the search box with the value
	    this.props.dispatch(change('search-form', 'search', search[0]));
	  }
	}

	handleFormSubmit(formProps) {
		//call action for data (send the text along with the global data)
		// if empty search, make it empty
		if (Object.keys(formProps).length === 0 && formProps.constructor === Object) {
			this.props.dispatch(actions.filterSearchTrees(null));
			//this.props.dispatch(actions.searchTrees(this.props.globalFilterData));
		} else {
			//else, update the global filter and search
			let search = formatSearchString(formProps.search);
			this.props.dispatch(actions.filterSearchTrees(search));
			
			//store in the url
			setUrlParams('search', search);
		}
	}

	componentDidUpdate(prevProps) {
	  if(this.props.globalFilterData && (prevProps.globalFilterData.search !== this.props.globalFilterData.search)) {
	    this.props.dispatch(actions.searchTrees(this.props.globalFilterData));
	  }
	}

	render() {
		const { handleSubmit } = this.props;
		return (
				<form ref="form" className="search-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					{this.props.hasButton &&
						<button type="submit" className="search-button"/>
					}
					
					<Field
						name="search"
						component={renderSearch}
						placeholder={this.props.placeholder}
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
		globalFilterData: state.globalTrees,
	}
}

export default reduxForm({
	form: 'search-form',
	validate
})(
connect(mapStateToProps, { viewsToggle })(SearchForm)
);