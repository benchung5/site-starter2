import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
//import * as actions from '../../actions/articles';
import { getArticle, clearUpdateArticle, updateArticle } from '../../../actions/articles';
import { fetchCategories } from '../../../actions/categories';
import { fetchTags } from '../../../actions/tags';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import ArticleFields from './article_fields';
import renderHiddenField from '../parts/field_hidden';
import UploadedImages from '../parts/uploaded_images';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData, formatOutFormFields } from '../../../lib/form_utils';
import { flattenObjArray } from '../../../lib/utils';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';


class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imagesToDelete: [],
            selectedItem: ''
        }
    }

    componentWillMount() {
        this.props.fetchCategories();
        this.props.fetchTags();
        //get initial data to populate the form
        this.props.getArticle(this.props.match.params.articleId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.articleData && (prevProps.articleData !== this.props.articleData)) {
            this.handleInitialize();
        }
    }

    componentWillUnmount() {
      //clear messages when navigating away
      this.clearMessages();
    }

    clearMessages() {
      this.props.clearUpdateArticle();
    }

    handleInitialize() {

        // //convert to an array
        // let images = [];
        // Object.keys(this.props.articleData.images).forEach((key) => {
        //     images[key] = this.props.articleData.images[key].name;
        // })

        let images = clone(this.props.articleData.images);

        //store initial images for comparison later
        this.setState({ images });
        //init images on UploadedImages component
        this.refs.UploadedImages.initImages(images, 'articles');

        const formData = {
            'name': this.props.articleData.name,
            //still must keep this for the id eventhough it isn't rendered
            'slug': this.props.articleData.slug,
            'category': this.props.articleData.category_id,
            'categories': this.formatToMultiselect(this.props.articleData.categories),
            'tags': this.formatToMultiselect(this.props.articleData.tags),
            'body': this.props.articleData.body,
        };

        this.props.initialize(formData);
    }

    // if form isn't valid redux form will not call this function
    handleFormSubmit(formProps) {
        let formpropsClone = [];
        formpropsClone = formatOutFormFields(formProps, [
                  'categories',
                  'tags'
                ]);

        // call action to submit edited
        this.props.updateArticle(createImgFormData('new_images', formpropsClone));
        //clear deleted images
        this.props.change('deleted_images', '');
    }

    formatToMultiselect(inArray) {
        return inArray.map((item) => {
            return { value: item.id, label: item.name }
        });
    }

    renderUpdated() {
        if(this.props.articleUpdated) {
            return (
                <div className="submission-message">
                    <span>Article: {this.props.articleUpdated.name}<br/>successfully updated.</span>
                </div>
            )
        }
    }

    updatedImages(images, deletedImages) {
        let delImages = [];
        Object.keys(deletedImages).forEach((key) => {
            delImages[key] = deletedImages[key].name;
        })
        this.props.change('deleted_images', delImages.toString());

        // update updated_images field with the upated images in string form
        this.props.change('updated_images', images.toString());
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
                        <h3>Edit Article</h3>

                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <ArticleFields
                                onInputChange={this.onInputChange.bind(this)}
                                treeTables={this.props.treeTables}
                                categories={this.props.categories}
                                tags={this.props.tags}
                            />
                            <UploadedImages
                                ref="UploadedImages"
                                updateImages={this.updatedImages.bind(this)}
                                onChange={this.onInputChange.bind(this)}
                            />
                            <Field
                                name="deleted_images"
                                component={renderHiddenField}
                            />
                            <Field
                                name="updated_images"
                                component={renderHiddenField}
                            />
                            <ImgFieldCrop
                                name="new_images"
                                label="New Images:"
                                classNameLabel="file-input-label"
                                onChange={this.onInputChange.bind(this)}
                                tags={[{id: "1", name: "test tag"}]}
                            />
                            <button action="submit" className="btn btn-primary">Submit</button>
                        </form>
                        {this.renderUpdated()}
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
      errors.category = 'Please enter a type';
    }

    if (formProps.categories) {
        if (formProps.categories.length === 0) {
            errors.categories = 'Please enter at least one category';
        }
    }
    
    return errors;
}

function mapStateToProps(state, ownProps) {
    return { 
        articleUpdated: state.article.articleUpdated,
        articleData: state.article.articleSingle,
        categories: state.categories.all,
        tags: state.tags.all,
    };
}

export default RequireAuth(reduxForm({
    validate,
    form: 'article-add',
    fields: ['name', 'slug'],
})(
    connect(mapStateToProps, { getArticle, clearUpdateArticle, updateArticle, fetchTags, fetchCategories })(EditArticle)
    ));



