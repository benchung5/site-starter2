import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideMenuHeader from './side_menu_header';
import Categories from './buttons_categories';
import Search from './search';
// import Routes from './buttons_routes';
// import NearMe from './button_near_me';
// import OffLineMessage from './offline_message';
import { searchArticles } from '../actions/global';
import Socials from './parts/socials';

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  // componentDidUpdate(prevProps) {
  //   //fire the updated globalFilterData to the search action whenever the categories or categores get updated
  //   if(this.props.globalFilterData && (prevProps.globalFilterData !==  this.props.globalFilterData)) {
  //     //while filter initial populating, don't dispatch
  //     if((this.props.globalFilterData.categories.length === 0) || (this.props.globalFilterData.categories.length === 0)) {
  //     } else {
  //       this.props.dispatch(searchArticles(this.props.globalFilterData));
  //     }
      
  //   }
  // }

  // <NearMe className="right near-me"/>
  // <OffLineMessage/>

  render() {
    return (
          <div className={`side-menu ${this.props.showMenu}`}>
            <SideMenuHeader>
              <Search/>
            </SideMenuHeader>
            <Categories/>
            <div className="bottom">
            </div>
          </div>
    );
  }
}

//<Routes/>

function mapStateToProps(state) {
  return {
    // globalFilterData: state.global,
    showMenu: state.showMenu.showMenu
  }
}

export default connect(mapStateToProps)(SideMenu);