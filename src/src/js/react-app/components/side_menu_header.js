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
	    this.props.showMenu('close');	
	}

	render() {
		return (
			<div className="menu-header">
				{this.props.children}
				{this.props.isClose &&
					<div className="right">
						<ButtonComponent classProp="menu-close" name="Close" onClickProp={this.onItemClick.bind(this)} />
					</div>
				}
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

