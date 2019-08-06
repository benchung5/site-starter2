import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideMenuMobile from './side_menu_mobile';
import Filter from './filter';
import GridView from './grid_view';
import { isOnline } from '../actions/isOnline';
import { showMenu } from '../actions/sideMenu';
import { isInitialLoading } from '../actions/initialLoad';
import { searchArticles } from '../actions/global';
// import OfflineMap from './offline_map';
// import Loader from './loader';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentWillMount() {
    // tell users that they are offline/online
    const that = this;
    window.addEventListener('load', function() {
      function updateOnlineStatus(event) {
        var condition = navigator.onLine ? "online" : "offline";

        if(condition == 'offline') {
         that.props.isOnline(false);
        } else {
         that.props.isOnline(true);
        }
      }

      window.addEventListener('online',  updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    });
  }

  componentDidMount() {
    this.props.isInitialLoading(false);
  }

  onMapClick() {
    //close the menu on map click
    if(window.innerWidth < 1150 ) {
      if(this.props.menuOpen === 'open') {
        this.props.showMenu('close');
      }
    }
  }

  componentDidUpdate(prevProps) {

    //fire the updated globalFilterData to the search action whenever the categories or categores get updated
    if(this.props.globalFilterData && (prevProps.globalFilterData !==  this.props.globalFilterData)) {
      //while filter initial populating, don't dispatch
      if((this.props.globalFilterData.categories.length === 0) || (this.props.globalFilterData.categories.length === 0)) {
      } else {
        this.props.searchArticles(this.props.globalFilterData);
      }
      
    }
  }

  // <MapComponent
  //   onMapClick={this.onMapClick.bind(this)}
  // />
  // <SearchButton/>
  // <Loader/>

  render() {
    return (
      <div className={`main-container ${this.props.lang}`}>
        <div className="row">
          <div className="filter-container hide-for-large">
            <Filter/>
          </div>
        </div>
        <SideMenuMobile/>
        <GridView/>
      </div>
    );
  }
}

//<OfflineMap/>

function mapStateToProps(state) {
  return {
    // location: state.map.location
    lang: state.language.lang,
    menuOpen: state.showMenu.showMenu,
    globalFilterData: state.global,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    isOnline: isOnline,
    showMenu: showMenu,
    isInitialLoading: isInitialLoading,
    searchArticles: searchArticles
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);