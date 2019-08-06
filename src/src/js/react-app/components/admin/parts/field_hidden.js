import React from 'react';

function renderHiddenField(field) {
	return (
		<input type="hidden" className="form-control" {...field.input} />
		)
}

export default renderHiddenField;


