import React, { Component } from 'react';

class Socials extends Component {

	render() {
		const {input, classProp } = this.props;

		return (
			<div className="socials">
				<a href="https://www.facebook.com/" target="_blank" className="social facebook"></a>
				<a href="https://twitter.com/" target="_blank" className="social twitter"></a>
				<a href="https://www.instagram.com/" target="_blank" className="social instagram"></a>
			</div>
		);
	}
}


export default Socials;