import clone from 'lodash/clone';
import { flattenObjArray } from './utils';

export  function createImgFormData(imgFieldName, formProps) {
    // convert to mulipart form data
    let formData = new FormData();

    // append regular fields to formData first
    Object.keys(formProps).forEach(( key ) => {
    	if(key !== imgFieldName) {
    		formData.append(key, formProps[key]);
    	}
    });

    Object.keys(formProps).forEach(( key ) => {
    	if(key === imgFieldName) {
        formProps[key].forEach((item, index) => {
              // append original image fields to formData
              formData.append('image'+'_'+index+'_original', item.originalFile);
              // append cropped image fields to formData
              formData.append('image'+'_'+index+'_cropped', item.croppedFile);
            });
      }
    });

    // append image info to formData
    Object.keys(formProps).forEach(( key ) => {
      if(key === imgFieldName) {
        formProps[key].forEach((item, index) => {
          formData.append('image'+'_'+index+'_info', [item.tag_id, item.description]);
        });
      }
    });

    // // Display the key/value pairs
    // for (var pair of formData.entries()) {
    //     console.log(pair[0]+ ', ' + pair[1]); 
    // }

    return formData;
}

export function formatOutFormFields(formProps, multiselectFields) {
    //prepare form data to be sent over the network prperly
    let formpropsClone = clone(formProps);

    //convert null values to empty strings
    Object.keys(formpropsClone).forEach((key) => {
      if (formpropsClone[key] == null) {
        formpropsClone[key]  = "";
      }
    });

    //convert arrays to comma separated strings
    multiselectFields.map((field) => {
      let arr = flattenObjArray(formpropsClone[field], 'value');
      if (arr) {
        formpropsClone[field] = arr.toString();
      }
    });
    return formpropsClone;
}