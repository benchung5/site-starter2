import React, { Component } from 'react';
import clone from 'lodash/clone';
import { imgName, copyStringToClipboard } from '../../../lib/stringUtils'
//config
const env = process.env.NODE_ENV || "development";
var { UPLOADS_PATH } = require('../../../config')[env];

class UploadedImages extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			deletedImages: []
		}
		this.refType = '';
	}

	onDeleteClick(index) {
		//callback updated
		this.props.onChange();
		//remove image at index
		let updatedImages = clone(this.state.images);
		updatedImages.splice(index, 1);

		let deletedImages = clone(this.state.deletedImages);
		let imageDeleted = clone(this.state.images[index]);
		deletedImages.push(imageDeleted);

		//update local state
		this.setState({ images: updatedImages });
		this.setState({ deletedImages });

		//update parent
		this.props.updateImages(updatedImages, deletedImages);
	}

	onCopyClick(item) {
		let imgStr = '<img alt="' + item.description + '" src="/uploads/' + this.refType + '/' + item.name + '" />';
		copyStringToClipboard(imgStr);
	}

	initImages(images, ref_type) {
		//console.log(images);
		this.refType = ref_type;
		this.setState({ images: images }, () => {
			//sent initial state back to parent to avoid it 
			//being empty if one doesn't delete
			this.props.updateImages(images, []);
		});
	}

	renderImages() {
		return (
			<div className="drop-preview-wrapper">
				{this.state.images.map((item, index) => {
					return (
						<div key={index} className="drop-preview">
							<a href="#" className="close-btn" onClick={this.onDeleteClick.bind(this, index)}></a>
							<button className="copy-btn" onClick={this.onCopyClick.bind(this, item)}>copy</button>
							<img className="drop-img-preview" src={'/uploads/' + this.refType + '/' + imgName(item.name, 'small')} />
							<div className="desc">
							  {item.name}
							  <br/>
							  {item.tag_name && 'tag: ' + item.tag_name}
							</div>
						</div>
						
						)
				})}
			</div>
		)
	}

	render() {
		return (
			<div>
				{this.renderImages()}
			</div>
		)
	}
}

export default UploadedImages;


