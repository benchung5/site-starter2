import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderInternal from './loader_internal';
import FilterTitle from './filter-title';
import SideMenu from './sideMenu';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, ARTICLES_UPLOADS_PATH } = require('../config')[env];

import { imgName } from '../lib/stringUtils';


class GridView extends Component {
    // goes above picture element to add magnifine glass
    // <div className="img-info"></div>
    renderItems() {
     return this.props.results.articles.map((item) => {
        console.log(item);
         return (
            <a href={`/articles/${item.categories.split(',')[0]}/${item.slug}`} className="product-card" alt={item.name} key={item.id} data-slug={item.slug}>
                <div className="inner">
                    <div className="image">
                        { item.images ?
                        <picture>
                            <source srcSet={ARTICLES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')} media="(max-width: 1275px)"/>
                            <source srcSet={ARTICLES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}/>
                            <img alt={item.image_descriptions.split(',')[0]} src={ARTICLES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}/> 
                        </picture>
                        :
                        <picture>
                            <source srcSet="/assets/img/placeholder-images/placeholder-img.png" media="(max-width: 1275px)"/>
                            <source srcSet="/assets/img/placeholder-images/placeholder-img.png"/>
                            <img src="/assets/img/placeholder-images/placeholder-img.png"/> 
                        </picture>
                        }
                    </div>
                    <div className="info">
                        <div className="info-detail">{item.name}</div>
                    </div>
                </div>
            </a>
         );
     });   
    }

    // <div className="product-card boxed" key={item.id}>
    //     <a href={`#${item.slug}`} alt={item.name} className={`left active installation`} onClick={this.onItemClick.bind(this, item.slug)} data-slug={item.slug}>
    //         <div className="icon"></div>
    //         { item.images ?
    //         <div className='list-item-thumb' style={{ backgroundImage: `url(${UPLOADS_PATH + imgName(item.images.split(',')[0], 'small')})` }} ></div>
    //         :
    //         <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL}/assets/img/placeholder-images/placeholder-img-sml.jpg)` }} ></div>
    //         }
    //     </a>
    // </div>
    
    // LoaderInternal is controlled by the action 'isLoading' 
    // (set in global > index.js action)
    render() {
        return (
            <LoaderInternal>
                <div className="row">
                    <div className="small-12 columns">
                        {/*<FilterTitle/>*/}
                    </div>
                </div>
                <div className="row grid-view-inner">
                    <div className="left show-for-large">
                        <SideMenu />
                    </div>
                    <div className="right">
                        <div className="cards-container">
                          {this.renderItems()}
                        </div>
                    </div>
                </div>
            </LoaderInternal>
        );
    }
}


function mapStateToProps(state) {
    return {
        results: state.articles.searchResults,
    };
}

export default connect(mapStateToProps)(GridView);