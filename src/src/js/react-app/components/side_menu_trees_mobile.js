import { connect } from 'react-redux';
import React, { Component } from 'react';
import SideMenuHeader from './side_menu_header';
import Categories from './buttons_categories';
import ButtonsCategoriesTrees from './buttons_categories_trees';
//import ButtonsOrigins from './buttons_origins';
import SearchTreesComponent from './search_trees';
// import OffLineMessage from './offline_message';
import Socials from './parts/socials';
import Transition from 'react-transition-group/Transition';
import prefix from 'react-prefixer';

//for transition
const duration = 600;
const defaultStyle = prefix({
          transition: `transform ${duration}ms ease-in-out`,
          transform: `translateX(-100%)`,
        });
const transitionStyles = prefix({
          entering: { transform: 'translateX(0)' },
          entered:  { transform: 'translateX(0)' },
          // exiting: { transform: 'translateX(-100%)' },
          // exited: { transform: 'translateX(-100%)' },
        });

class SideMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Transition in={(this.props.showMenu == 'open') ? true : false} timeout={duration}>
        {(state) => (
          <div className={`side-menu-mobile ${this.props.showMenu}`} style={{...defaultStyle, ...transitionStyles[state]}}>
            <SideMenuHeader isClose={true}>
              <SearchTreesComponent
                placeholder="Search Tree Name"
                hasButton={true}
              />
            </SideMenuHeader>
            <ButtonsCategoriesTrees/>
            <div className="bottom">
            </div>
          </div>
        )}
      </Transition>
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