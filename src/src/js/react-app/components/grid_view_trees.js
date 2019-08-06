import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/globalTrees';
import LoaderInternal from './loader_internal';
import FilterTitle from './filter-title';
import PaginationTrees from './parts/pagination_trees';
import SideMenuTrees from './side_menu_trees';

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, TREES_UPLOADS_PATH } = require('../config')[env];

import { imgName } from '../lib/stringUtils';


class GridView extends Component {
    // goes above picture element to add magnifine glass
    // <div className="img-info"></div>
    renderItems() {
     return this.props.results.trees.map((item) => {
         return (
            <a href={`/plants/view/${item.slug}`} className="product-card" alt={item.common_name} key={item.id} data-slug={item.slug}>
                <div className="inner">
                    <div className="image">
                        { item.images ?
                        <picture>
                            <source srcSet={ROOT_URL + TREES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')} media="(max-width: 1275px)"/>
                            <source srcSet={ROOT_URL + TREES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}/>
                            <img alt={item.image_descriptions.split(',')[0]} src={ROOT_URL + TREES_UPLOADS_PATH + imgName(item.images.split(',')[0], 'medium')}/> 
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
                        <div className="info-detail">{item.common_name}</div>
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
    //         <div className='list-item-thumb' style={{ backgroundImage: `url(${ROOT_URL + UPLOADS_PATH + imgName(item.images.split(',')[0], 'small')})` }} ></div>
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
                        <SideMenuTrees />
                    </div>
                    <div className="right">
                        <div className="cards-container">
                          {this.renderItems()}
                        </div>
                        <PaginationTrees/>
                    </div>
                </div>
            </LoaderInternal>
        );
    }
}


function mapStateToProps(state) {
    return {
        results: state.trees.searchResults,
    };
}

export default connect(mapStateToProps)(GridView);