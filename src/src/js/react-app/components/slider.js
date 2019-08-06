import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { removeClass, hasClass } from '../lib/utils';
import SliderNav from './slider_nav';
import cloneDeep from 'lodash/cloneDeep';
import Slide from './slider_slide';

class Slider extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      currentSlides: [1000,0],
      scrollPages: [],
      navDirection: '',
      isTransitioning: false,
      slidesData: []
    };
    this.scrollValue = 0;
    this.animating = false;
  }

  componentWillMount() {
    this.storeSliderData(this.props.slidesData);
  }

  componentWillUnmount() {
  }

  changeCurrentPage(toPage) {
    //get the current page and make it the prev. page
    this.setState({ currentSlides: [this.state.currentSlides[1], toPage] });
    this.setState({ isTransitioning: true });
  }

  whichAnimationEvent(){
    //this is just for testing what browser
    //you're using and producing the correct transitioned event name
    let t,
        el = document.createElement("fakeelement");

    let animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    };

    for(t in animations) {
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  }

  // return our event handler while capturing an argument in the closure
  onNavAnimated(that, el) {
    return function(e) {
      //animationend fires for each property animated so to prevent
      //having it pick up every time it fires...
      if (e.animationName == 'fadeIn') {

          //remove the animation classes
          removeClass(el, 'pt-page-moveToRight');
          removeClass(el, 'pt-page-moveToLeft');
          removeClass(el, 'pt-page-fadeIn');
          //if prev page, remove the pt-page-current class
          if(hasClass(el, 'prev-page')) {
            removeClass(el, 'pt-page-current');
          }

          //store, animation ended
          that.setState({isTransitioning: false});
      }
    };
  }

  updateNavDir(direction) {
    this.setState({ navDirection: direction });
  }

  updateSlidesData(newData) {
    this.setState({ slidesData: newData });
  }

  storeSliderData(articleData) {
      if(this.props.slidesData && this.props.slidesData.length !== 0) {
          let clonedImageData = cloneDeep(articleData);
          let slidesData = clonedImageData.map((item, index) => {
            //set the first one to active
            if(index === 0) {
              return { isSet: true };
            } else {
              return { isSet: false };
            }
              
          });
          //update the new state and set the current slide to the first slide
          this.setState({ slidesData: slidesData }, () => {});
      }
  }
 
  // componentDidUpdate(prevProps, prevState) {
  //   //reset slider if inactive
  //   if(prevProps.active !== this.props.active) {
  //     if(this.props.active === false) {
  //       this.reset();
  //     }
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    //update only the first time loaded
    if(this.props.slidesData && (nextProps.slidesData !== this.props.slidesData)) {
      //reset first
      this.reset();
      this.storeSliderData(this.props.slidesData);
    }
  }

  reset() {
    //reset slides data for the nav
    this.setState({ slidesData: [] });
    this.setState({ navDirection: '' });
    this.setState({ currentSlides: [1000,0] });
  }
  
  //css animation classes setup:
  //classes when navigating next:

  //prev component has:
  //pt-page-current
  //pt-page-moveToLeft
  //pt-page-ontop

  //to current component has:
  //pt-page-current
  //pt-page-fadeIn

  //classes when navigating prev:

  //prev component has:
  //pt-page-current
  //pt-page-moveToTBottom
  //pt-page-ontop

  //to current component has:
  //pt-page-current
  //pt-page-fadeIn

  //css classes that are removed on anim. complete
  //remove all but only on the current page:
  //pt-page-current

  renderSlides() {
    return this.props.slidesData.map((item, index) => {
      return (
        <Slide
          key={index}
          classProp={
            //regular scroll
            `pt-page ${(this.state.currentSlides[0] === index) ? 'pt-page-current prev-page pt-page-ontop' : ''} 
            ${((this.state.currentSlides[0] === index) && (this.state.navDirection === 'forward')) ? 'pt-page-moveToLeft' : ''} 
            ${((this.state.currentSlides[0] === index) && (this.state.navDirection === 'back')) ? 'pt-page-moveToRight' : ''}
            ${((this.state.currentSlides[1] === index) && (this.state.navDirection === 'forward')) ? 'pt-page-inFromRight' : ''}
            ${((this.state.currentSlides[1] === index) && (this.state.navDirection === 'back')) ? 'pt-page-inFromLeft' : ''}
            ${(this.state.currentSlides[1] === index) ? 'pt-page-current pt-page-ontop' : ''}`
          }
          imgSrc={item.source}
        />
      );
    });

    //fade in scroll
    // `pt-page ${(this.state.currentSlides[0] === index) ? 'pt-page-current prev-page' : ''} 
    // ${((this.state.currentSlides[0] === index) && (this.state.navDirection === 'forward')) ? 'pt-page-moveToLeft' : ''} 
    // ${((this.state.currentSlides[0] === index) && (this.state.navDirection === 'back')) ? 'pt-page-moveToRight' : ''} 
    // ${(this.state.currentSlides[1] === index) ? 'pt-page-current pt-page-fadeIn pt-page-ontop' : ''}`

  }

  render() {
    return (
        <div className="slider-wrapper">
          <SliderNav 
            updateNavDir={this.updateNavDir.bind(this)} 
            currentSlides={this.state.currentSlides} 
            navItems={this.state.slidesData} 
            changeCurrentPage={this.changeCurrentPage.bind(this)}
            updateSlidesData={this.updateSlidesData.bind(this)}
            />
          <div className="pt-perspective">
            {this.renderSlides()}
          </div>
        </div>
    );
  }
}
  
export default Slider;