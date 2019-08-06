import React, { Component } from 'react';
import { getArticle } from '../actions/articles';
import { connect } from 'react-redux';
import Slider from './slider';
import SocialShare from './parts/social_share';
import { showSingle } from '../actions/showSingle';
import Transition from 'react-transition-group/Transition';
import { viewsToggle } from '../actions/views';
import ExpandableContent from './expandable_content';

//for transition
const duration = 300;
const defaultArtStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  visibility: 'hidden'
}
const transitionArtStyles = {
  entering: { opacity: 1, visibility: 'visible' },
  entered:  { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 0, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
};
const defaultListStyle = {
    display: 'none'
}
const transitionListStyles = {
    entering: { display: 'none' },
    entered: { display: 'none' },
    exiting: { display: 'none' },
    exited: { display: 'block' },
};

//config
const env = process.env.NODE_ENV || "development";
var { ROOT_URL, UPLOADS_PATH } = require('../config')[env];
import { imgName } from '../lib/stringUtils';


class ArtPiece extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        this.placeholderImg = '/assets/img/placeholder-images/placeholder-img.jpg';
        this.componentMounted = false;
    }

    componentDidUpdate(prevProps) {
        if (this.props.slug && (prevProps.slug !== this.props.slug)) {
            this.props.getArticle(this.props.slug);
        }
    }

    stringifyObjArray(inArray, key) {
        if(inArray) {
            //convert to regular array of strings
            let outString = inArray.map((item) => {
                return item[key];
            });
            //convert to comma string
            //return outString.toString();
            return this.stringDisplayFilter(outString.toString());
        } else {
            return null;
        }
    }

    close() {
        //turn off showSingle
        this.props.showSingle('');
        //artcle data gets cleared in onExited...
    }

    onEntered(node, isAppearing) {
        // isAppearing is supplied to indicate if the enter 
        // stage is occuring on the initial mount

        //hide list panel when art peice opened and finished animating
        //this.props.viewsToggle('initial');
    }

    onExited() {
        //clear the article data once faded out
        this.props.getArticle('');
    }

    renderThemes() {
        return this.props.articleData.themes.map((item) => {
            return (
                <div key={item.slug}>
                    {item.name}
                </div>
                )
        });
    }

    getFeaturedImg() {
        //for share buttons
        if(this.props.articleData.images && this.props.articleData.images.length !== 0) {
            return ROOT_URL + UPLOADS_PATH + (this.props.articleData.images ? imgName(this.props.articleData.images[0].name, 'large') : null);
        } else {
            return ROOT_URL + this.placeholderImg;
        }
    }

    renderFeatured() {
        if (this.props.articleData.images && this.props.articleData.images.length !== 0) {
            return <Slider slidesData={this.props.articleData.images} />
        } else if (this.props.articleData.images && this.props.articleData.images.length === 0) {
            return (
                <div className="slider-wrapper">
                  <img src={this.placeholderImg} />
                </div>
                );
        } else {
            //else we've cleared images intentionally with: null
            return <div className="slider-wrapper"></div>
        }
    }


    render() {
        return (
            <Transition in={this.props.slug ? true : false}  onEntered={this.onEntered.bind(this)} onExited={this.onExited.bind(this)} timeout={duration}>
            {(state) => (
                <div className={`art-piece`} style={{...defaultArtStyle, ...transitionArtStyles[state]}}>
                    <a href="#" className="close-btn" onClick={this.close.bind(this)}></a>
                    <div className={`active ${this.props.articleData.category_name ? this.props.articleData.category_name.toLowerCase().replace(/\//g, '-') : ''}`}>
                        <div className="type-icon icon"></div>
                    </div>
                    {this.renderFeatured()}
                    <div className="content">
                        <h1>{this.props.articleData.name}</h1>
                        <div className="title-group">
                            <div className="left">
                                <h2>placeholder text...</h2>     
                            </div>
                            <div className="right">
                                <SocialShare pageUrl={window.location.href} featuredImg={this.getFeaturedImg()} />
                            </div>
                        </div>
                        <div className="location-group">
                            <h4>placeholder text...</h4>
                        </div>
                        <ExpandableContent
                            body={'placeholder text...'}
                        />
                    </div>
                    <div className="bottom">
                        <a className="logo"></a>
                        <a className="logo-wide"></a>
                    </div>
                </div>
            )}
            </Transition>
        );
    }
}


function mapStateToProps(state) {
    return { 
        articleData: state.article.articleSingle,
        slug: state.showSingle.slug
    };
}

export default connect(mapStateToProps, { getArticle, showSingle, viewsToggle })(ArtPiece);



