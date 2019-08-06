import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nearMeToggle, nearMeSearch } from '../actions/nearMe';
import { showMenu } from '../actions/sideMenu';
import { searchArticles } from '../actions/global';
import ButtonComponent from './parts/button_component';
import labels from '../data/labels';
//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL } = require('../config')[env];

class NearMeButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			//near me distance
			distance: 10000,
			isActive: false
		}
	}

	onItemClick(event) {
		event.preventDefault();
		//only if geolocation is already found
		if (this.props.location[0] !== 0) {
			//toggle button state
			if (!(this.state.isDisabled)) {
				if(!this.state.isActive) {
					//close the side menu if mobile
					if(window.innerWidth < 768) {
						this.props.dispatch(showMenu('close'));
					}
					//dispatch to update near me state as well as search articles
					let nearMeVal = { lat: this.props.location[1], lng: this.props.location[0], distance: this.state.distance, active: true };
					this.props.dispatch(nearMeSearch(nearMeVal));
					this.props.dispatch(nearMeToggle(nearMeVal));
					this.setState({ isActive: true });
				} else {
					//fire the latest stored filtered values instead of nearMeSearch and just update nearMeToggle
					this.props.dispatch(searchArticles(this.props.globalFilterData));
					this.setState({ isActive: false });
				}
			}
		}
	}

	//button automatically disabled if no geolocation
	render() {
		return (
			<ButtonComponent 
				classProp="toggle-btn menu-item near-me" 
				isActive={this.state.isActive} 
				isDisabled={(this.props.location[0] === 0) ? true : false} 
				name="Near Me"
				id='false' 
				onClickProp={this.onItemClick.bind(this)}>
				<div className="left">
					<img className="icon-near-me" src={`${ROOT_URL}/assets/img/icons/explore.svg`} />
				</div>
				<div className="center">
				 <span className="item-label">
				 {labels[this.props.lang].nearMeTitle}
				 </span>
				 <span className="item-label item-label-sml">
				 {labels[this.props.lang].nearMeSubtitle}
				 </span>
				</div>
				<div className="right">
					<img  className="icon-arrow" src={`${ROOT_URL}/assets/img/icons/arrow.svg`}/>
				</div>
			</ButtonComponent>
			)
	}

}

function mapStateToProps(state) {
	return {
		nearMe: state.nearMe.nearMe,
		location: state.map.location,
		globalFilterData: state.global,
		lang: state.language.lang,

	}
}

export default connect(mapStateToProps)(NearMeButton);