import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showSingle } from '../actions/showSingle';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, UPLOADS_PATH } = require('../config')[env];

import { imgName } from '../lib/stringUtils';


class ItemList extends Component {

    onItemClick(slug) {
        //e.preventDefault();
        this.props.dispatch(showSingle(slug));
    }

    //*****  temporary filter to remove N/A and undefined from display in entries. Remove later *****
    stringDisplayFilter(string) {
        let outString = ((string === 'N/A') || (string === 'n/a')) ? '' : string;
        return outString;
    }
    
    renderItems() {
         return this.props.results.articles.map((item) => {
             return (
                 <div className={`list-item`} key={item.id}>
                    <a href={`#${item.slug}`} className={`left active installation`} onClick={this.onItemClick.bind(this, item.slug)} data-slug={item.slug}>
                        <div className="icon"></div>
                        { item.images ?
                        <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL + UPLOADS_PATH + imgName(item.images.split(',')[0], 'small')})` }} ></div>
                        :
                        <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL}/assets/img/placeholder-images/placeholder-img-sml.jpg)` }} ></div>
                        }
                    </a>
                    
                    <div className="right">
                        <div className="v-inner">
                            <a href={`#${item.slug}`} onClick={this.onItemClick.bind(this, item.slug)} data-slug={item.slug}><span className="title">{item.name}</span></a>
                            <span className="artists">text...</span>
                            <span className="location">text...</span>
                        </div>
                     </div>
                 </div>
             );
         });   
    }
    
    render() {
        return (
            <div className="articles-list">
                {this.renderItems()}
            </div>

        );
    }
}


function mapStateToProps(state) {
    return {
        results: state.articles.searchResults,
        lang: state.language.lang
    };
}

export default connect(mapStateToProps)(ItemList);