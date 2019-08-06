import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Field } from 'redux-form';
import cloneDeep from 'lodash/cloneDeep';
import Modal from './modal';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import sanitizeFilename from 'sanitize-filename';

class FileField extends Component {

  constructor(props) {
   super(props)
   this.state = {
     accepted: [],
     rejected: [],
     croppedOut: [],
     previews: [],
       // usedFileNames: [],
       errors: [],
       imgSrc: null,
       tag_id: '',
       description: ''
     }
     isSubmitting: false;
     this.maxDropCount = 10;
     //the final full size image dimensions 
     //(we're only applying the crop to the med image version)
     this.finalcropWidth = 400;
     this.finalcropHeight = 400;
     //the display size for the cropper box
     this.aspectRatio = 200 / 200;
     this.cropBoxWidth = 200;
     this.cropBoxHeight = 200;

   }

  componentDidMount() {
    //polyfill to <canvasElement>.toBlob for safari, ie
    if (!HTMLCanvasElement.prototype.toBlob) {
     Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {

        var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++ ) {
         arr[i] = binStr.charCodeAt(i);
        }

        callback( new Blob( [arr], {type: type || 'image/jpeg'} ) );
      }
     });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //detect that the form has been cleared and clear the images
    if(prevProps.input.value !== this.props.input.value) {
      if(this.props.input.value === '') {
        this.clearImages();
      }
    }
  }

  componentWillUnmount() {
    //do this to avoid memory leaks
    if(this.state.accepted.length > 0) {
      this.state.accepted.map((file) => {
        window.URL.revokeObjectURL(file.preview);
      });
    }
  }

  clearImages() {
    //clear croppedOut
    this.setState({ croppedOut: [] });
    //clear the previews
    this.setState({ previews: [] });
  }

  validateFileName(fileName) {
    //validate file name
    let validatedName = sanitizeFilename(fileName);
    //replace spaces with dashes
    let spacesReplaced = validatedName.replace(/\ +/g, '-');
    //remove these characters: ()';
    let bracketsReplaced = spacesReplaced.replace(/(\(|\)|'|;)+/g, '');
    //append date
    // var date = new Date().getTime();
    // let finalName = bracketsReplaced.replace(/(\.[\w\d_-]+)$/i, '-' + date + '$1');
    let finalName = bracketsReplaced;

    return finalName;
  }

  blobToFile(blob) {
    //currently only works for chrome, ff and safari 10.1+
    let file = new File([blob], this.validateFileName(this.state.accepted[0].name));
    return file;
  }

  onDrop(accepted, rejected) {
    //callback updated
    this.props.input.onChange();
    //ondrop is called before onDropRejected
    //clear errors first
    this.setState({ errors: [] });

    //drop accepted but too many files
    if (accepted.length > this.maxDropCount) {
      accepted = [];
      this.setState({ errors: 
        ['cannot upload more than ' + this.maxDropCount + ' image at a time'] }, () => {
          console.log(this.state.errors);
        });
    } else if (rejected.length  > 0) {
      //keep this here but let onDropRejected handle it.
    } else {
      // pass image source from react drag and drop to react image crop
      this.setState({imgSrc: accepted[0].preview}, () => {
        this.forceUpdate();
        this.refs.modal.openModal();
      })
    }
    //update state
    this.setState({ accepted, rejected });
  }

  onDropRejected() {
    this.setState({ errors: ['wrong file type'] });
  }

  onDeleteClick(index) {
    //remove it from accepted at it's index
    let croppedOut = cloneDeep(this.state.croppedOut);
    croppedOut.splice(index, 1);
    this.setState({ croppedOut: croppedOut }, () => {
      //update the final input value
      this.props.input.onChange(this.state.croppedOut);
    });

    //update the previews
    let previews = cloneDeep(this.state.previews);
    previews.splice(index, 1);
    this.setState({ previews: previews });
  }

  onCropSubmit (e) {
    e.preventDefault();
    //debounce so can't submit two crops while modal is fading off
    if(!this.state.isSubmitting) {
      this.submitCrop();
      this.setState({ isSubmitting: true });
      setTimeout(() => {
        this.setState({ isSubmitting: false });
      }, 1000)
    }
  }

  submitCrop() {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    let canvasEl = this.refs.cropper.getCroppedCanvas({
      // resize the cropped area
      width: this.finalcropWidth, 
      height: this.finalcropHeight
    });

    // toBlob(callback, mimeType, qualityArgument);
    canvasEl.toBlob((blob) => {
      // var formData = new FormData();
      // formData.append('croppedImage', blob);

      //update the final input value
      let croppedOut = cloneDeep(this.state.croppedOut);
      croppedOut.push({
        croppedFile: this.blobToFile(blob, this.state.accepted[0].name),
        originalFile: this.state.accepted[0],
        tag_id: this.state.tag_id,
        description: this.state.description,
      });
      this.setState({ croppedOut: croppedOut }, () => {
        //update the input value for this field
        this.props.input.onChange(this.state.croppedOut);
        //close the modal
        this.refs.modal.close();
      });
      //update the preview
      let previews = cloneDeep(this.state.previews);
      previews.push(this.refs.cropper.getCroppedCanvas().toDataURL('image/jpeg'));
      this.setState({previews: previews});

    }, 'image/jpeg', 0.95);
  }

  onCropCancel(e) {
    e.preventDefault();
    //close the modal
    this.refs.modal.close();
  }

  onTagChange(inputValue) {
    this.setState({tag_id: inputValue});
  }

  onDescChange(inputValue) {
    this.setState({description: inputValue});
  }

  renderPreview() {
    return (
      <div className="drop-preview-wrapper">
      {this.state.croppedOut.map((img, index) => {
        return (
          <div key={img.croppedFile.name + index} className="drop-preview">
          <a href="#" data-id={img.croppedFile.name} className="close-btn" onClick={this.onDeleteClick.bind(this, index)}></a>
          <img className="drop-img-preview" src={this.state.previews[index]} />
          <div className="desc">
            {/*{img.croppedFile.name} - {img.croppedFile.size} bytes - {img.croppedFile.dimensions}*/}
            {'tag_id: ' + img.tag_id}
          </div>
        </div>
        )
      })}
      </div>
      )
  }

  renderErrors() {
    if(this.state.errors.length > 0) {
      return (
        this.state.errors.map((item, index) => {
          return <span key={index}>{item}</span>
        })
        )
    }
  }

  renderSelectOptions() {
    return this.props.tags.map((item) => {
      return <option key={item.id} value={ item.id }>{ item.name }</option>
    });
  }

  render() {
    const { className, input: { onChange }, dropzone_options, meta: { error, touched }, 
    classNameLabel, children, name, cbFunction } = this.props;

    return (
      <div>
        <Dropzone
        className="dropzone"
          name={name}
          onDrop={this.onDrop.bind(this)}
          onDropRejected={this.onDropRejected.bind(this)}
          accept="image/jpeg"
          //500k allowable upload size
          // maxSize={500000}
        >
        <div className="instructions">
        Drop files here, or click to select files to upload.<br/>
        (Only jpeg images will be accepted)
        </div>
        </Dropzone>

        <Modal 
          ref='modal' 
          >
          <Cropper
            className="cropper"
            ref="cropper"
            src={this.state.imgSrc}
            style={{width: this.cropBoxWidth, height: this.cropBoxHeight}}
            // Cropper.js options
            aspectRatio={this.aspectRatio}
            zoomable={false}
            guides={false}
            preview=".img-preview"
            autoCropArea={1}
            //to force crop to image bounds:
            viewMode={2}
           />

           <select className="dropdown-select" onChange={(e) => this.onTagChange(e.target.value)} name="tag_id">
            {this.renderSelectOptions()}
           </select>
           <input type="text" onChange={(e) => this.onDescChange(e.target.value)} placeholder="description" name="description"/>

            <div className="cropper-buttons">
              <button className="btn" onClick={this.onCropSubmit.bind(this)}>crop</button>
              <button className="btn" onClick={this.onCropCancel.bind(this)}>cancel</button>
            </div>
        </Modal>
          
        {this.renderErrors()}
        {this.renderPreview()}
      </div>
    );
  }
}


//this just has to be wrapped in a redux-form Field first before export
export default props => <Field name="images" {...props} component={FileField} />;