import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

//for transition
const duration = 200;
const defaultBodyStyle = {
		  transition: `height ${duration}ms ease-in-out`,
		  height: 0,
		  visibility: 'hidden',
		}
const defaultArrowStyle = {
		transition: `transform ${duration}ms ease-in-out`,
		transform: 'rotate(0deg)',
}
const arrowTransitionStyles = {
		  entering: { transform: 'rotate(-90deg)' },
		  entered:  { transform: 'rotate(-90deg)' },
		}

class Dropdown extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// active means open
			active: true,
			// for transition 
			bodyTransitionStyles: {
			  entering: { height: '250px' },
			  entered:  { height: '250px' },
			}
		}
	}

	onDropdownClick(event) {
		event.preventDefault();
		if(!this.state.active) {
			this.setState({ active: true });
		} else {
			this.setState({ active: false });
		}
	}

	componentDidMount() {
		if(this.props.height) {
			this.setState({
				//must keep overflow y visible when open to allow for embedded dropdown select
				bodyTransitionStyles: {
				  entering: { height: this.props.height + 'px', visibility: 'visible', overflowY: 'hidden' },
				  entered: { height: this.props.height + 'px', visibility: 'visible', overflowY: 'visible' },
				  exiting: { height: 0, visibility: 'visible', overflowY: 'hidden' },
				  exited: { height: 0, visibility: 'hidden', overflowY: 'hidden' },
				}
			});
		}
	}

	render() {
		const { name, isDisabled, classProp, id, children } = this.props;
	    return (
	    	<Transition in={this.state.active} timeout={duration}>
	    	{(state) => (
		       <div className={`dropdown-toggle ${classProp ? classProp : ""}`}>
			       <a
				       href="#"
				       className={`dropdown-button menu-item ${isDisabled ? "disabled" : ""}`}
				       onClick={this.onDropdownClick.bind(this)}
				       data-id={id}
				       data-is-active={this.state.active}
				       data-is-disabled={isDisabled}
				       alt={name}
				       >
				        <img 
				        style={{...defaultArrowStyle, ...arrowTransitionStyles[state]}}
				        className="icon-arrow" src={`/assets/img/icons/arrow.svg`}
				        />
				       	<span className="item-label">{name}</span>
			       </a>
			       <div ref="body" className="dropdown-body" style={{...defaultBodyStyle, ...this.state.bodyTransitionStyles[state]}}>
			       	{children}
			       </div>
		       </div>
	       )}
	       </Transition>
	    );
	}

}

export default Dropdown;