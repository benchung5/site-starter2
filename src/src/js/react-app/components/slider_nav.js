import React, { Component } from 'react';
import { connect } from 'react-redux';
//utilities
import SliderNavButton from './slider_nav_button';
import cloneDeep from 'lodash/cloneDeep';
// import * as Hammer from 'hammerjs';
import Hammer from 'hammerjs';


class sliderNav extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
    this.xDown = null;                                                        
    this.yDown = null;
    this.main = null; 
    this.hammer = null;
    this.enableAutoSlide = true;
  }
  
  componentDidMount() { 
    //setup touch drag
    this.setupDrag();
    this.autoSlide();
  }

  changeNav(index) {
    let itemsClone = cloneDeep(this.props.navItems);
    //reset all items first
    itemsClone.forEach((item) => {
      item.isSet = false;
    });
   itemsClone[index].isSet = true;
   this.props.updateSlidesData(itemsClone);
  }

  //-----------------------------------------------------------------------------// 
  // handle nav
  //-----------------------------------------------------------------------------//

  updateNavDirection(prevPage, toPage) {
    let pagesCopy =  cloneDeep(this.props.navItems);
    let pageDir = (prevPage < toPage) ? 'forward' : 'back';

    //send nav direction to slider
    this.props.updateNavDir(pageDir);
  }

  onNavItemClick(index) {
    this.enableAutoSlide = false;
    this.changeSlide(index);
  }

  changeSlide(index) {
    //if selected the current page again, do nothing
    if(this.props.currentSlides[1] !== index) {
      
      //greater than total slides
      if((index + 1) > this.props.navItems.length) {
        //go back to 0
        index = 0;
      }

      if(index >= 0) {
        //set the nav item
        this.changeNav(index);
        //update the nav direction (prev-page, to-page)
        this.updateNavDirection(this.props.currentSlides[1], index);
        //update the current page
        this.props.changeCurrentPage(index);
        //store the current index locally (for touch swipe)
        this.setState({ currentIndex: index });
      }
    }
  }


  //-----------------------------------------------------------------------------// 
  // touch dragging
  //-----------------------------------------------------------------------------//

  //uncomment later...
  setupDrag() {
    this.hammer = Hammer(this.refs.swipeArea);
    this.hammer.on('swipeleft', this.onSwipeLeft.bind(this));    // remove ()
    this.hammer.on('swiperight', this.onSwipeRight.bind(this));   // remove ()
  }                                                 

  onDragStart(evt) {
    //evt.preventDefault();
    this.xDown = evt.touches[0].clientX;                                     
    this.yDown = evt.touches[0].clientY;
  }

  onSwipeLeft() {
    this.enableAutoSlide = false;
    //advance index
    let index = this.state.currentIndex + 1;
    this.changeSlide(index);
  }

  onSwipeRight() {
    this.enableAutoSlide = false;
    //reduce index
    let index = this.state.currentIndex - 1;
    this.changeSlide(index);
  }

  //-----------------------------------------------------------------------------// 
  // auto slide
  //-----------------------------------------------------------------------------//

  autoSlide() {
    setInterval(function() {
      if(this.enableAutoSlide) {
        //advance index
        let index = this.state.currentIndex + 1;
        this.changeSlide(index);
      }

    }.bind(this), 3500);
  }

  //-----------------------------------------------------------------------------// 
  // render
  //-----------------------------------------------------------------------------//

  renderButtons() {
    let that = this;
    //only render if more than on slide
    if(this.props.navItems.length > 1) {
      let buttonList = this.props.navItems.map((item, index) => {
        return(
                <SliderNavButton
                  key={index}
                  name={item.name} 
                  onClickProp={that.onNavItemClick.bind(that, index)}
                  isActive={item.isSet ? 'active' : ''}
                />
          );
      });
      return buttonList;
    }
  }

  render() {
    return (
      <div>
        <div ref="swipeArea" className="swipe-area"></div>
        <div className="nav-wrapper">
          <nav className="nav" role="navigation">
            {this.renderButtons()}
          </nav>
        </div>
      </div>
    );
  }
}

export default sliderNav;