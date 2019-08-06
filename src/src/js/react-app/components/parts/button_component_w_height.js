import React, { Component } from 'react';

// equivalent to:
// props.name, props.isChecked
//onClickProp takes the onClick event from the parent element
class ButtonComponent extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}

		// set the ref
		this.button = null;
		this.setButtontRef = element => {
		  this.button = element;
		};
	}

	componentDidMount() {
		if (this.props.getButtonHeight) {
			this.props.getButtonHeight(this.button.offsetHeight);
		}
	} 
	
	render() {
		const { name, isActive, isDisabled, onClickProp, classProp, id, children } = this.props;
		    return (

		       <a
		       	   ref={this.setButtontRef} 
			       href="#"
			       className={`${classProp ? classProp : ""} ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
			       onClick={onClickProp}
			       data-id={id}
			       data-is-active={isActive}
			       data-is-disabled={isDisabled}
			       alt={name}
			       disabled={isDisabled}
			       >
			       {children}
		       </a>

		    );
	}

};

export default ButtonComponent;