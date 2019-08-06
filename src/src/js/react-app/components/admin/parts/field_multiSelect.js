import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class MultiSelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// currentVal = []
		}
	}

	handleChange(val) {
		//must manually update this value for multiselect
	  	this.props.input.onChange(val);
	}

	renderSelectOptions() {
		return this.props.selectItems.map((item) => {
			return { value: item.id, label: item.name }
		});
	}

	render() {
		const { meta: { touched, error }, input, label } = this.props;
		const className = `form-group multiselect ${touched && error ? 'has-danger' : ''}`;
		return (

			<div className={className}>
				<label htmlFor={label}>{label}</label>
				<Select
				  name="form-field-name"
				  value={this.props.input.value}
				  options={this.renderSelectOptions()}
				  onChange={this.handleChange.bind(this)}
				  onBlur={() => input.onBlur(input.value)}
				  multi={true}
				  joinValues={true}
				/>

				<div className="error">
				  {touched ? error : ''}
				</div>
			</div>
			)
	}
}

export default MultiSelect;