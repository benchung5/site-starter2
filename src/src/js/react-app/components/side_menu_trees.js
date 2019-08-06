import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideMenuHeader from './side_menu_header';
import ButtonsCategoriesTrees from './buttons_categories_trees';
//import ButtonsOrigins from './buttons_origins';
// import ButtonsZones from './buttons_zones';
import SearchTreesComponent from './search_trees';
// import OffLineMessage from './offline_message';
import Socials from './parts/socials';
import Transition from 'react-transition-group/Transition';
import prefix from 'react-prefixer';
import { getUrlParams } from '../lib/utils';
import { populateTreesFilter } from '../actions/globalTrees';

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    let selectedOrigines = getUrlParams('ecoregions');
    let selectedCategories = getUrlParams('categories');
    let selectedZones = getUrlParams('zones');
    //set default to zone zero if none selected
    if (!selectedZones) {
      selectedZones = ['0'];
    }
    //populate the filter with initial data
    this.props.dispatch(populateTreesFilter({
      //selectedTreesOrigines: selectedOrigines,
      selectedTreesCategories: selectedCategories,
      selectedTreesZones: selectedZones
    }));
  }

  render() {
    return (
          <div className={`side-menu ${this.props.showMenu}`}>
            <SideMenuHeader>
              <SearchTreesComponent
                placeholder="Search Tree Name"
                hasButton={true}
              />
            </SideMenuHeader>
            <ButtonsCategoriesTrees/>
            <div className="bottom">
            </div>
          </div>
    );
  }
}


//<ButtonsZones/>

function mapStateToProps(state) {
  return {
    showMenu: state.showMenu.showMenu
  }
}

export default connect(mapStateToProps)(SideMenu);