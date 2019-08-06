import React, { Component } from 'react';

class NavComponentButton extends Component {

	componentDidMount() {
		//add click event (safari)
		// this.refs.navComponent.addEventListener('click', this.onClick.bind(this));
		
		//add enter key press event
		//this.refs.navComponent.addEventListener("keyup", this.onKeyUp.bind(this));
	}
	
	// onKeyUp(e) {
	// 	e.preventDefault();
	//    if (e.keyCode == 13) {
	// 		//console.log('enter pressed');
	// 		this.props.onClickProp();
	//    }
	// }

	// componentWillUnmount() {
	//   //remove
	//   this.refs.navComponent.removeEventListener('click', this.onOptionClick.bind(this));
	// }
	
	
	 onClick(e) {
	 	this.props.onClickProp();
	 }

	 render() {
	 	return (
	 		<a ref="navComponent" onClick={this.onClick.bind(this)} tabIndex="0" className={`dot ${this.props.isActive}`} ><span>{this.props.name}</span></a>
	 		);
	 }

}

export default NavComponentButton;