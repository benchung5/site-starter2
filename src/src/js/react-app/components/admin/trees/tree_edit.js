import React, { Component } from 'react';
import { reduxForm, Field, change, formValueSelector } from 'redux-form';
import { getTree, clearUpdateTree, updateTree } from '../../../actions/trees';
import { fetchTreeTables } from '../../../actions/treeTables';
import Sidebar from '../sidebar';
import { connect } from 'react-redux';
import renderHiddenField from '../parts/field_hidden';
import UploadedImages from '../parts/uploaded_images';
import ImgFieldCrop from '../parts/image_field_crop';
import { createImgFormData, formatOutFormFields } from '../../../lib/form_utils';
import RequireAuth from '../auth/require_auth';
import clone from 'lodash/clone';
import TreeFields from './tree_fields';



class EditTree extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            imagesToDelete: [],
            selectedItem: ''
        }
    }

    componentWillMount() {
        this.props.fetchTreeTables();
        //get initial data to populate the form
        this.props.getTree(this.props.match.params.treeId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.treeData && (prevProps.treeData !== this.props.treeData)) {
            this.handleInitialize();
        }
    }

    componentWillUnmount() {
      //clear messages when navigating away
      this.clearMessages();
    }

    clearMessages() {
      this.props.clearUpdateTree();
    }

    handleInitialize() {
        let images = clone(this.props.treeData.images);

        //store initial images for comparison later
        this.setState({ images });
        //init images on UploadedImages component
        this.refs.UploadedImages.initImages(images, 'trees');

        // set tree values for the fields
        const formData = {
            //still must keep this for the id eventhough it isn't rendered
            'tree_id': this.props.treeData.id,
            'common_name': this.props.treeData.common_name,
            'other_common_names': this.props.treeData.other_common_names,
            'slug': this.props.treeData.slug,
            'specific_epithet': this.props.treeData.specific_epithet,
            'other_species': this.props.treeData.other_species,
            'subspecies': this.props.treeData.subspecies,
            'variety': this.props.treeData.variety,
            'cultivar': this.props.treeData.cultivar,
            'body': this.props.treeData.body,
            'genus_id': this.props.treeData.genus_id,
            'trees_category_id': this.props.treeData.trees_category_id,
            'zone_id': this.props.treeData.zone_id,
            'reproduction_type_id': this.props.treeData.reproduction_type_id,
            'height_min': this.props.treeData.height_min,
            'height_max': this.props.treeData.height_max,
            'width_min': this.props.treeData.width_min,
            'width_max': this.props.treeData.width_max,
            'growth_rate': this.props.treeData.growth_rate,
            'lifespan_min': this.props.treeData.lifespan_min,
            'lifespan_max': this.props.treeData.lifespan_max,
            //multiselects
            'origins': this.formatToMultiselect(this.props.treeData.origins),
            'eco_benefits': this.formatToMultiselect(this.props.treeData.eco_benefits),
            'native_to': this.formatToMultiselect(this.props.treeData.native_to),
            'shapes': this.formatToMultiselect(this.props.treeData.shapes),
            'light': this.formatToMultiselect(this.props.treeData.light),
            'soil': this.formatToMultiselect(this.props.treeData.soil),
            'natural_habitat': this.formatToMultiselect(this.props.treeData.natural_habitat),
            'common_uses': this.formatToMultiselect(this.props.treeData.common_uses),
            'transplanting': this.formatToMultiselect(this.props.treeData.transplanting),
            'unique_attractions': this.formatToMultiselect(this.props.treeData.unique_attractions),
            'tolerances': this.formatToMultiselect(this.props.treeData.tolerances),
            'insects': this.formatToMultiselect(this.props.treeData.insects),
            'diseases': this.formatToMultiselect(this.props.treeData.diseases),
        };

        this.props.initialize(formData);
    }

    // if form isn't valid redux form will not call this function
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
        this.props.updateTree(createImgFormData('new_images', formpropsClone));
        //clear deleted images
        this.props.change('deleted_images', '');
    }

    formatToMultiselect(inArray) {
        return inArray.map((item) => {
            return { value: item.id, label: item.name }
        });
    }

    renderUpdated() {
        if(this.props.treeUpdated) {
            return (
                <div className="submission-message">
                    <span>Tree: {this.props.treeUpdated.common_name}<br/>successfully updated.</span>
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
                        <h3>Edit Plant</h3>

                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <TreeFields
                                treeId={this.props.treeData.id}
                                onInputChange={this.onInputChange.bind(this)}
                                treeTables={this.props.treeTables}
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
                                label="New Images"
                                classNameLabel="file-input-label"
                                onChange={this.onInputChange.bind(this)}
                                tags={this.props.treeTables.tags}
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
    if (!formProps.common_name) {
        errors.common_name = 'Please enter a common name';
    }

    if (!formProps.slug) {
        errors.slug = 'Please enter a slug';
    }

    // if (!formProps.trees_category_id) {
    //   errors.trees_category_id = 'Please enter a category';
    // }

    // if (formProps.origins) {
    //     if (formProps.origins.length === 0) {
    //         errors.origins = 'Please enter at least one origin';
    //     }
    // }
    
    return errors;
}

function mapStateToProps(state, ownProps) {
    const selector = formValueSelector('tree-add');
    return {
        treeUpdated: state.tree.treeUpdated,
        treeData: state.tree.treeSingle,
        treeTables: state.treeTables.all,
    };
}

export default RequireAuth(reduxForm({
    validate,
    form: 'tree-add',
    fields: ['common_name', 'slug', 'body'],
})(
    connect(mapStateToProps, { getTree, clearUpdateTree, updateTree, fetchTreeTables })(EditTree)
    ));



