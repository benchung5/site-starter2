import React from 'react';

// equivalent to:
// props.name, props.isChecked
//onClickProp takes the onClick event from the parent element
const ButtonComponent = ({ name, isActive, isDisabled, onClickProp, classProp, id, children, height }) => {  
	let style = {
		height: height
	}

    return (
       <a
	       href="#"
	       className={`${classProp ? classProp : ""} ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
	       onClick={onClickProp}
	       data-id={id}
	       data-is-active={isActive}
	       data-is-disabled={isDisabled}
	       alt={name}
	       disabled={isDisabled}
	       style={style}
	       >
	       {children}
       </a>

    );
};

export default ButtonComponent;