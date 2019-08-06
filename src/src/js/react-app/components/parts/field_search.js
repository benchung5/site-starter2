import React, { Component } from 'react';

class renderField extends Component {

	render() {
		const {input, classProp, placeholder } = this.props;

		return (
		    <input
		      className={`form-control ${classProp}`}
		      type="text"
		      placeholder={placeholder}
		      {...input}
		    />
		);
	}
}

export default renderField;