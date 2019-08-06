import React, { Component } from 'react';
//config
const env = process.env.NODE_ENV || "development";
var { UPLOADS_PATH } = require('../config')[env];
import { imgName } from '../lib/stringUtils';

class SliderSlide extends Component {

	constructor(props) {
	  super(props);
	  this.state = { 
	    isActive: false,
	  };
	}

	 onClick(e) {
	 	this.props.onClickProp();
	 }

	 render() {
	 	return (
	 			<div className={`slide`}>
	 			  <div className={this.props.classProp}>
	 			    <img src={UPLOADS_PATH + imgName(this.props.imgSrc, 'large')} />
	 			  </div>
	 			</div>
	 		);
	 }

}

export default SliderSlide;