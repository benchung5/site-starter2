import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addTree, addTreeError, clearTree } from '../../../actions/trees';
import { fetchTreeTables } from '../../../actions/treeTables';
import Sidebar from '../sidebar';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData, formatOutFormFields } from '../../../lib/form_utils';
import RequireAuth from '../auth/require_auth';
import TreeFields from './tree_fields';

class AddTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // store the most recent value 
      // since theme turns to undefined after first form submit
      recentValue: ''
    }
  }

  componentWillMount() {
    this.props.fetchTreeTables();
  }

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('tree-add');
      //clear messages
      this.clearMessages();
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.treeAdded && (prevProps.treeAdded !== this.props.treeAdded)) {
      this.props.addTreeError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    this.clearMessages();
  }

  clearMessages() {
    this.props.clearTree();
    this.props.addTreeError('');
  }

  // if form isn't valit redux form will not call this function
  handleFormSubmit(formProps) {
    let formpropsClone = [];
    formpropsClone = formatOutFormFields(formProps, [
                'origins', 
                'eco_benefits', 
                'native_to',
                'shapes', 
                'light', 
                'soil', 
                'natural_habitat', 
                'common_uses', 
                'transplanting', 
                'unique_attractions', 
                'tolerances',
                'insects',
                'diseases',
            ]);

    // call action to submit edited
    this.props.addTree(createImgFormData('images', formpropsClone));
  }

  renderAdded() {
    //only render if there's no error message
    if(this.props.treeAdded && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>Tree: {this.props.treeAdded.common_name}<br/>successfully added. </span>
        </div>
        )
    }
  }

  renderError() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
        );
    }
    if (this.customError) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.customError}
        </div>
        );
    }
  }

  onInputChange() {
      this.clearMessages();
  }
    
  render() {
      const { handleSubmit } = this.props;
      return (
        <div className="admin-main">
          <div className="row">
            <Sidebar/>
            <div className="main-window columns small-12 large-9">
              <h3>Add Plant</h3>
              <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <TreeFields
                    onInputChange={this.onInputChange.bind(this)}
                    treeTables={this.props.treeTables}
                />

                <ImgFieldCrop
                  name="images"
                  classNameLabel="file-input-label"
                  onChange={this.onInputChange.bind(this)}
                  tags={this.props.treeTables.tags}
                />
                <button action="submit" className="btn btn-primary">Submit</button>
              </form>
              {this.renderAdded()}
              {this.renderError()}
            </div>
          </div>
        </div>
      );
  }

}


function validate(formProps) {
  let errors = {};

  //todo: use the map or foreach to shorten this code
  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  }

  // if (!formProps.genus_id) {
  //   errors.genus_id = 'Please enter a genus';
  // }

  // if (!formProps.specific_epithet) {
  //   errors.specific_epithet = 'Please enter a specific epithet';
  // }

  // if (!formProps.trees_category_id) {
  //   errors.trees_category_id = 'Please enter a tree category';
  // }

  // if (!formProps.origins) {
  //    errors.origins = 'Please enter at least one origin';
  // }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    treeAdded: state.tree.treeAdded,
    errorMessage: state.tree.addTreeError,
    treeTables: state.treeTables.all,
  };
}


export default RequireAuth(reduxForm({
  validate,
  form: 'tree-add',
  fields: ['name', 'slug', 'files'],
})(
connect(mapStateToProps, { addTree, clearTree, addTreeError, fetchTreeTables, reset })(AddTree)
));



