import React, { Component } from 'react';

class ExpandableContent extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			bodyOpen: false,
			bodyHeight: '',
		};
		this.startHeight = '160'
	}

	componentDidUpdate(prevProps) {
	    if (prevProps.body !== this.props.body) {
	        this.calcBodySize();
	    }
	}

	calcBodySize() {
		//reset the toggle button
		this.setState({ bodyOpen: false });
		//get/set the height of content as if height were auto
	    let scrollHeight = this.refs.bodyWrapper.scrollHeight;
	    this.setState({ bodyHeight: scrollHeight });
	    //if height is below the start height, hide the read more button
	    this.toggleMoreButton(scrollHeight);
	}

	toggleMoreButton(height) {
		if(height <= this.startHeight) {
			this.refs.moreButton.style.display = 'none';
			this.refs.gradientOverlay.style.display = 'none';
		} else {
			this.refs.moreButton.style.display = 'block';
			this.refs.gradientOverlay.style.display = 'block';
		}
	}

	onMoreClick(e) {
	    e.preventDefault();
	    if(!this.state.bodyOpen) {
	        //lengthen the body
	        this.setState({ bodyOpen: true });
	    } else {
	        //shorten the body
	        this.setState({ bodyOpen: false });
	    }
	}

	render() {
		return (
			<div className="body-group" >
				<div ref="gradientOverlay" className="gradient-overlay" style={{ opacity: this.state.bodyOpen ? 0 : 1 }}></div>
			    <div ref="bodyWrapper" className="body-wrapper" style={{ height: this.state.bodyOpen ? this.state.bodyHeight : (this.startHeight + 'px') }}>
			        <p>{this.props.body}</p>
			    </div>
			    <div ref="moreButton" className="row more-button-row">
			        <div className="small-12 columns text-center">
			            <button onClick={this.onMoreClick.bind(this)} className="button-microsite solid more-button">{this.state.bodyOpen ? 'Read Less' : 'Read More'}</button>
			        </div>
			    </div>
			</div>
			);
	}

}

export default ExpandableContent;