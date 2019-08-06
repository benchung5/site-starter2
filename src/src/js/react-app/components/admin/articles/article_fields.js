import React, { Component } from 'react';
import { Field } from 'redux-form';
import renderField from '../parts/form_fields';
import editBox from '../parts/edit_box';
//import renderDropdownSelect from '../parts/field_dropdownSelect';
import renderMultiSelect from '../parts/field_multiSelect';

class ArticleFields extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            <Field
                type="input"
                label="name:"
                name="name"
                component={renderField}
                onChange={this.props.onInputChange}
                onFocus={this.props.onInputChange}
            />
            <Field
              label="slug:"
              name="slug"
              component={renderField}
              onChange={this.props.onInputChange}
              onFocus={this.props.onInputChange}
            />
            <Field
                name="categories"
                label="categories"
                component={renderMultiSelect}
                selectItems={this.props.categories}
                onChange={this.props.onInputChange}
                onFocus={this.props.onInputChange}
            />
            <Field
              name="tags"
              label="tags"
              component={renderMultiSelect}
              selectItems={this.props.tags}
              onChange={this.props.onInputChange}
              onFocus={this.props.onInputChange}
            />
            <Field
                type="textarea"
                label="body"
                name="body"
                component={editBox}
                onChange={this.props.onInputChange}
                onFocus={this.props.onInputChange}
            />
        </div>
      );
  }

}

export default ArticleFields;