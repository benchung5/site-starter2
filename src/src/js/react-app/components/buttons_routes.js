import React, { Component } from 'react';
import { connect } from 'react-redux';
import { populateRoutesFilter, filterRoutes } from '../actions/routes';
import ButtonComponent from './parts/button_component';
import Dropdown from './parts/dropdown';
import ButtonList from './parts/button_list';
import labels from '../data/labels';

class RoutesButtons extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	onUpdateData(modifiedData) {
		this.props.dispatch(filterRoutes(modifiedData));
	}

	render() {
		return (
		        <Dropdown
		          name={labels[this.props.lang].routesTitle}
		          height={148}
		        >
		         <ButtonList
		         	wrapperClass="three-col"
		         	classProp="routes circle-style"
		         	classPropButton="circle-button"
		         	buttonData={this.props.filteredRoutes}
		         	updateData={this.onUpdateData.bind(this)}
		         />
		        </Dropdown>
			)
	}

}

function mapStateToProps(state) {
	return {
		filteredRoutes: state.routes.route,
		lang: state.language.lang,
	}
}

export default connect(mapStateToProps)(RoutesButtons);