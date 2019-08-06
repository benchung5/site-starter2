import React, { Component } from 'react';

class EditBox extends Component {

  constructor(props) {
     super(props)
     this.state = {
    }
  }

  onTextAreaChange(inputValue) {
    this.updateRedux(inputValue);
  }

  onSecHeadingClick(e) {
   e.stopPropagation();
   e.preventDefault();

   this.wrapTextInElement('h3');
  }

  onParagraphClick(e) {
    e.stopPropagation();
    e.preventDefault();

    this.wrapTextInElement('p');
  }

  onUlClick(e) {
    e.stopPropagation();
    e.preventDefault();

    if (this.props.input.value) {
       //get the current highlighted text
       let selObj = window.getSelection(); 
       let selectedText = selObj.toString();

       //insert <li> elements at beginning of lines
       let wrappedText = ' <li>' + selectedText.replace(/(?:\n|\r)/g, '\n <li>');
       //insert </li> elements at line breaks
       wrappedText = wrappedText.replace(/(?:\n|\r)/g, '</li>\n') + '</li>\n';
       //remove the last \n
       wrappedText = wrappedText.replace(/(?:\n)$/g, '');
       //wrap it all in a ul
       wrappedText = '<ul>\n'+wrappedText+'\n</ul>';

       //get the character index of the selected text
       this.refs.textBox.selectionStart

       String.prototype.replaceAt=function(index, replacement) {
         return this.substr(0, index) + replacement + this.substr(index + selectedText.length);
       }

       let fieldValue = this.props.input.value.slice();
       let replacedBodyText = fieldValue.replaceAt(this.refs.textBox.selectionStart, wrappedText);

       this.updateRedux(replacedBodyText);
    }
  }

  wrapTextInElement(element) {
    if (this.props.input.value) {
       //get the current highlighted text
       let selObj = window.getSelection(); 
       let selectedText = selObj.toString();
       let wrappedText = '<'+element+'>'+selectedText+'</'+element+'>';

       //get the character index of the selected text
       this.refs.textBox.selectionStart

       String.prototype.replaceAt=function(index, replacement) {
         return this.substr(0, index) + replacement + this.substr(index + selectedText.length);
       }

       let fieldValue = this.props.input.value.slice();
       let replacedBodyText = fieldValue.replaceAt(this.refs.textBox.selectionStart, wrappedText);

       this.updateRedux(replacedBodyText);
    }
  }

  updateRedux(newValue) {
    //must update the value this way for redux form to pick up on it when submitting
    //it will also then re-propogate the value through to this.props.input.value
    this.props.input.onChange(newValue);
  }



  render() {
     return (
       <div className={this.props.className}>
       <label>{this.props.input.label}</label>
       <button onClick={this.onSecHeadingClick.bind(this)}>h3</button>
       <button onClick={this.onParagraphClick.bind(this)}>p</button>
       <button onClick={this.onUlClick.bind(this)}>ul</button>
       <textarea
       ref="textBox"
       className="form-control"
       rows="12" 
       cols="50"
       name={this.props.input.name}
       value={this.props.input.value}
       onChange={(e) => this.onTextAreaChange(e.target.value)}
       >
       </textarea>
       </div>
     );
  }
}

export default EditBox;