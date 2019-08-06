import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//this is a higher order component (HOC) that wraps the incomming component 
//and attaches additional functionality to it
export default function (ComposedComponent) {
    class Loader extends Component {

      constructor(props) {

        super(props);
          this.state = {
            loadedClass: ''
          };
      }

      onLoaded() {
        //console.log('component loaded!!');
        this.setState({loadedClass: 'loaded'});
      }

      render() {
              //pass this.state and this.props to the composed component
              //access them both as this.props in the compoesed component
              return (
                  <div className={`preload-wrapper`}>
                    <div className={`preload initial-loader ${this.state.loadedClass}`}>
                      <div className="preload-logo"></div>
                    </div>
                    <ComposedComponent onLoaded={this.onLoaded.bind(this)} {...this.props} {...this.state} />
                  </div> 
                )
            }
      }

      function mapStateToProps(state) {
        return {
          online: state.isOnline.online,
        }
      }
          
      return connect(mapStateToProps)(Loader);
}


//to use in our component..
//optional info to pass onto our Hoc


//utilities
// import HOCpage from './HOCpage';

// class MyComponent extends Component {

//   constructor(props) {
//     super(props);
//     this.state ={

//     }
//   }

//   render() {
//     return (
//         <div> 
//           hello
//         </div>
//       )
//   }

// }

// let compData = {

// };

// export default HocFlowComponent(MyComponent);