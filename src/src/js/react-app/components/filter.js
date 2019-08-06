import React, { Component } from 'react';
import ShowMenuButton from './button_show_menu';

class Filter extends Component {

	render() {
		const { classProp } = this.props;

		return (
			<div className="filter">
				<ShowMenuButton/>
			</div>
		);
	}
}


export default Filter;