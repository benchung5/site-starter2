import React, { Component } from 'react';
import {connect} from 'react-redux';
import Search from './search';
import ItemList from './item_list';
import ArtPiece from './art_piece';
import Transition from 'react-transition-group/Transition';
import prefix from 'react-prefixer';

//for transition (must animate in top and bottom panel separately 
//because top is fixed position (can't have a parent with a transform) )
const duration = 600;
const defaultStyle = prefix({
          transition: `transform ${duration}ms ease-in-out`,
          transform: `translateX(100%)`,
        });
const transitionStyles = prefix({
          entering: { transform: 'translateX(0)' },
          entered:  { transform: 'translateX(0)' },
          // exiting: { transform: 'translateX(100%)' },
          // exited: { transform: 'translateX(100%)' },
        });

class ListPanel extends Component {

    render() {
        return (
            <Transition in={(this.props.view == 'open') ? true : false} timeout={duration}>
                {(state) => (
                    <div>
                        <div className={`panel-top ${this.props.view}`} style={{...defaultStyle, ...transitionStyles[state]}} >
                            <Search/>
                        </div>
                        <div ref="listPanel" className={`list-panel ${this.props.view}`} style={{...defaultStyle, ...transitionStyles[state]}}>
                                <div>
                                    <div className={`list-view`}>
                                        <div ref="panelBottom" className="panel-bottom">
                                            <ItemList/>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    
                )}
            </Transition>
        );
    }
}

function mapStateToProps(state) {
    return {
        view: state.views.view,
        slug: state.showSingle.slug,
    };
}

export default connect(mapStateToProps)(ListPanel);