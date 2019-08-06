import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewsToggle } from '../actions/views';
import ButtonComponent from './parts/button_component';
import { bindActionCreators } from 'redux';
import { showMenu } from '../actions/sideMenu';
import { globals } from '../config';

class SideMenuHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	onItemClick(event) {
		event.preventDefault();
	    this.props.viewsToggle(this.updateButtons());
	}

	updateButtons() {
		let viewsVal = '';
		if(this.props.view === 'open') {
			viewsVal = 'close';
		} else {
			//open the item list panel
			viewsVal = 'open';
			//close the side menu when list panel is open
			if(window.innerWidth < globals.HIDE_MENU_THRESHOLD ) {
				this.props.showMenu('close');	
			}
		}
		return viewsVal;
	}

	render() {
		return (
			<div className="menu-item-halves view-toggle">
				<ButtonComponent classProp={`menu-item-half ${this.props.view}`} name="List View" id='list' onClickProp={this.onItemClick.bind(this)} />
				<ButtonComponent classProp={`menu-item-half ${this.props.view}`} name="Map View" id='map' onClickProp={this.onItemClick.bind(this)} />
			</div>
			)
	}

}

function mapStateToProps(state) {
	return {
		view: state.views.view
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ 
  	viewsToggle: viewsToggle,
  	showMenu: showMenu,

  },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuHeader);

