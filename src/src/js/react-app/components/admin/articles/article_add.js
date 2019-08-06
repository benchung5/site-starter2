import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { addArticle, addArticleError, clearArticle } from '../../../actions/articles';
import { fetchCategories } from '../../../actions/categories';
import { fetchTags } from '../../../actions/tags';
import Sidebar from '../sidebar';
import ArticleFields from './article_fields';
import ImgFieldCrop from '../parts/image_field_crop';
import { flattenObjArray } from '../../../lib/utils';
import { createImgFormData, formatOutFormFields } from '../../../lib/form_utils';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';

class AddArticle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // store the most recent value 
      // since category turns to undefined after first form submit
      recentValue: ''
    }
  }

  componentWillMount() {
    this.props.fetchCategories();
    this.props.fetchTags();
  }

  componentWillReceiveProps(nextProps) {
    // if newly navigated from the router link...
    if(nextProps.location !== this.props.location) {
      //clear the form fields
      this.props.reset('article-add');
      //clear messages
      this.clearMessages();
    }
  }

  componentDidUpdate(prevProps) {
    //clear out error messsages if any
    if (this.props.articleAdded && (prevProps.articleAdded !== this.props.articleAdded)) {
      this.props.addArticleError('');
    }
  }

  componentWillUnmount() {
    //clear messages when navigating away
    this.clearMessages();
  }

  clearMessages() {
    this.props.clearArticle();
    this.props.addArticleError('');
  }

  // if form isn't valit redux form will not call this function
  handleFormSubmit(formProps) {
    let formpropsClone = [];
    formpropsClone = formatOutFormFields(formProps, [
              'categories',
              'tags'
            ]);

    // call action to submit edited
    this.props.addArticle(createImgFormData('images', formpropsClone));
  }


  renderAdded() {
    //only render if there's no error message
    if(this.props.articleAdded && !this.props.errorMessage) {
      return (
        <div className="submission-message">
          <span>Article: {this.props.articleAdded.name}<br/>successfully added. </span>
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
              <h3>Add Article</h3>
              <form  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <ArticleFields
                    onInputChange={this.onInputChange.bind(this)}
                    treeTables={this.props.treeTables}
                    categories={this.props.categories}
                    tags={this.props.tags}
                />
                <ImgFieldCrop
                  name="images"
                  classNameLabel="file-input-label"
                  onChange={this.onInputChange.bind(this)}
                  tags={this.props.tags}
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
  const errors = {};

  //todo: use the map or foreach to shorten this code
  if (!formProps.name) {
    errors.name = 'Please enter a name';
  }

  if (!formProps.slug) {
    errors.slug = 'Please enter a slug';
  }

  if (!formProps.category) {
    errors.category = 'Please enter a category';
  }

  if (!formProps.categories) {
    errors.categories = 'Please enter at least one category';
  }
  
  return errors;
}

function mapStateToProps(state) {
  return { 
    articleAdded: state.article.articleAdded,
    errorMessage: state.article.addArticleError,
    categories: state.categories.all,
    tags: state.tags.all,
  };
}


export default RequireAuth(reduxForm({
  validate,
  form: 'article-add',
  fields: ['name', 'slug', 'files'],
})(
connect(mapStateToProps, { addArticle, clearArticle, addArticleError, fetchCategories, fetchTags, reset })(AddArticle)
));



