import React, { Component } from 'react';
import ButtonComponent from './button_component';
import Transition from 'react-transition-group/Transition';

//for transition
const duration = 0;
const defaultBodyStyle = {
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


class DropdownSelect extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// active means open
			active: false,
			// for transition 
			bodyTransitionStyles: {},
			selectedItem: ''
		}
	}

	componentDidMount() {
		if(this.props.height) {
			this.setState({
				bodyTransitionStyles: {
				  entering: { visibility: 'visible' },
				  entered: { visibility: 'visible' },
				  exiting: { visibility: 'visible' },
				  exited: { visibility: 'hidden' },
				}
			});
		}

		//show current selection on load
		let that = this;
		this.props.buttonData.map((item, index) => {
			let isActive = false;
			if (item.active) {
				that.setState({selectedItem: item.name});
			}
		});
	}

	onDropdownClick(event) {
		event.preventDefault();
		if(!this.state.active) {
			this.setState({ active: true });
		} else {
			this.setState({ active: false });
		}
	}

	onItemClick(event) {
		event.preventDefault();
		let id = event.target.getAttribute('data-id');

	    let modifiedData = this.props.buttonData.map((item, index) => {
	    	//make all inactive first

	    	//set current active to the opposite of what it was (toggle);

	    	//let isActive = (item.id === id) ? !item.active : item.active;
	    	let isActive = false;
	    	if (item.id === id) {
	    		isActive = !item.active
	    		this.setState({selectedItem: item.name});
	    	} else {
	    		isActive = false;
	    	}

	    	return { id: item.id, name: item.name, slug: item.slug, icon: item.icon, active: isActive };
	    });

	    this.setState({ active: false });
	    this.props.updateData(modifiedData);
	}

	renderButtons() {
		return this.props.buttonData.map((item, index) => {
			//name to lowercase, replace slashes with dashes
			return (
					<div  className={this.props.wrapperClass} key={item.id}>
				        <ButtonComponent 
				    	    classProp={`list-button ${this.props.classPropButton} ${item.name.toLowerCase().replace(/\//g, '-')}`}
				    	    height={this.props.buttonHeight}
				    	    isActive={item.active} 
				    	    id={item.id}
				    	    name={item.name} 
				    	    onClickProp={this.onItemClick.bind(this)}
				        >
				        	<i className={`fas fa-${item.icon}`}></i>
				        	<div className='check' onClick={this.onItemClick.bind(this)}></div>
				    	    <span onClick={this.onItemClick.bind(this)} data-id={item.id} className="name">{item.name}</span>
				        </ButtonComponent>						
					</div>
				)
		});
	}

	render() {
		const { name, isDisabled, classProp, id, children } = this.props;
	    return (
	    	<Transition in={this.state.active} timeout={duration}>
	    	{(state) => (
		       <div className={`dropdown-toggle dropdown-select ${classProp ? classProp : ""}`}>
			       <a
				       href="#"
				       className={`dropdownselect-button ${isDisabled ? "disabled" : ""}`}
				       onClick={this.onDropdownClick.bind(this)}
				       data-id={id}
				       data-is-active={this.state.active}
				       data-is-disabled={isDisabled}
				       alt={name}
				       >
				       	<span className="item-label">{this.state.selectedItem}</span>
			       </a>
			       <div ref="body" className="dropdown-body dropdown-select-body" style={{...defaultBodyStyle, ...this.state.bodyTransitionStyles[state]}}>
			       	<div className={`button-list ${this.props.classProp}`}>
			       		{this.renderButtons()}
			       	</div>
			       </div>
		       </div>
	       )}
	       </Transition>
	    );
	}

}

export default DropdownSelect;