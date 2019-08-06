import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Loader extends Component {

  constructor(props) {
    super(props);
      this.state = {
      };
  }

  render() {
    return (
        <div className={`preload-wrapper`}>
          <div className={`preload initial-loader ${this.props.isLoading ? '' : 'loaded'}`}>
            <div className="preload-logo"></div>
          </div>
        </div> 
      )
  }
}

function mapStateToProps(state) {
  return {
    //redux state
    isLoading: state.initialLoad.isLoading
  }
}

      
export default connect(mapStateToProps)(Loader);
