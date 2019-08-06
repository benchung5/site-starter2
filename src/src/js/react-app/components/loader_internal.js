import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Transition from 'react-transition-group/Transition';

const duration = 150;
const intLoaderStyle = {
          transition: `all ${duration}ms ease-in-out`,
          opacity: 0,
          visibility: 'hidden',
        }
const transitionIntLoaderStyle = {
          entering: { opacity: 1, visibility: 'visible'},
          entered:  { opacity: 1, visibility: 'visible'},
          exiting: { opacity: 0, visibility: 'visible'},
          exited:  { opacity: 0, visibility: 'hidden'},
        }

class LoaderInternal extends Component {

  constructor(props) {
    super(props);
      this.state = {
        isLoading: false,
        lockLoad: false,
      };
  }

  componentDidUpdate(prevProps, prevState) {
    //if changed from not loading to loading state
    if((prevProps.isLoading !== this.props.isLoading) && this.props.isLoading === true) {
      this.setLoading();
    }
    //if changed from loading to not loading state
    if((prevProps.isLoading !== this.props.isLoading) && this.props.isLoading === false) {
      //if not currently doing minimum load
      if(!this.state.lockLoad) {
        this.setState({ isLoading: false });
      }
    }
  }

  setLoading() {
    //apply a minimum load
    this.setState({ isLoading: true });
    this.setState({ lockLoad: true });
    setTimeout(() => {
      if(!this.props.isLoading) {
        this.setState({ isLoading: false });
      }
      this.setState({ lockLoad: false });
    }, 150);
  }

  render() {
          //onStartLoadInternal & onLoadedInternal are optional for child components but not actually used in this case
          return (
            <Transition in={this.state.isLoading ? true : false} timeout={duration}>
              {(state) => (
                <div className={`preload-wrapper`}>
                  <div 
                  className={`preload-internal ${this.state.isLoading ? 'loading' : 'loaded'}`}
                  style={{...intLoaderStyle, ...transitionIntLoaderStyle[state]}}
                  >
                    <svg className="circular" viewBox="25 25 50 50">
                      <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                    </svg>
                  </div>
                  {this.props.children}
                </div> 
                )}
            </Transition>
            )     
        }
  }

  function mapStateToProps(state) {
    return {
      //redux state
      isLoading: state.internalLoad.isLoading
    }
  }
      
  export default connect(mapStateToProps)(LoaderInternal); 
