import { connect } from 'react-redux';
import React, { Component } from 'react';
import ButtonComponent from './parts/button_component';
import { viewsToggle } from '../actions/views';
import { showMenu } from '../actions/sideMenu';


class ListPanelButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
 
	onItemClick(event) {
		event.preventDefault();
		if(this.props.view === 'open') {
			this.props.dispatch(viewsToggle('close'));
		} else {
			this.props.dispatch(viewsToggle('open'));
			//close the side menu when list panel is open
			this.props.dispatch(showMenu('close'));
		}
	}

	render() {
		return (
			<ButtonComponent
			  classProp={`list-menu-btn map-button 
			  	${this.props.view}`}
			  id={'side-menu-toggle'}
			  name="Side Menu"
			  onClickProp={this.onItemClick.bind(this)}
			>
			</ButtonComponent>
			)
	}
}

function mapStateToProps(state) {
  return {
    view: state.views.view
  }
}

export default connect(mapStateToProps)(ListPanelButton);