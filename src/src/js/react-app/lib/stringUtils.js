import escapeHtml from 'html-escape';

//for saving and resizing images
export function imgName(imgName, size) {
    switch(size) {
        case 'medium' :
            return imgName ? imgName.replace(/(\.[\w\d_-]+)$/i, '-med$1') : '';
        case 'small' :
            return imgName ? imgName.replace(/(\.[\w\d_-]+)$/i, '-sml$1') : '';
        default :
            ''
    }
}

export function formatSearchString(searchTxt) {
    if(searchTxt) {
        let outText = '';

        // //remove ._:;, make lowercase
        // let formatted = searchTxt.replace(/([\.\_\'\:\;])+/gi, ' ').toLowerCase();

        // let sanitized = escapeHtml(formatted);

        let sanitized = sanitizeInputString(searchTxt);

        //split separate words into array (filter out all blank strings)
        outText = sanitized.split(' ').filter(function(i){return i});

        //converti it back into a comma string
        outText = outText.toString();

        return outText;
    } else {
        return [];
    }
}

export function copyStringToClipboard (str, isPaste) {
   // Create new element
   var el = document.createElement('textarea');
   // Set value (string to be copied)
   el.value = str;
   // Set non-editable to avoid focus and move outside of view
   el.setAttribute('readonly', '');
   el.style = {position: 'absolute', left: '-9999px'};
   document.body.appendChild(el);
   // Select text inside element
   el.select();
   // Copy text to clipboard
   document.execCommand('copy');

   if(isPaste) {
    document.execCommand('paste');
   }
   
   // Remove temporary element
   document.body.removeChild(el);
}

export function sanitizeInputString(str) {
    //remove ._:;, make lowercase
    let formatted = str.replace(/([\.\_\'\:\;])+/gi, ' ').toLowerCase();
    let sanitized = escapeHtml(formatted);

    return sanitized;
}