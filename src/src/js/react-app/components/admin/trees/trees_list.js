import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/trees';
import RequireAuth from '../auth/require_auth';
import SearchTrees from '../../search_trees';
import PaginationTrees from '../../parts/pagination_trees';
import { globals } from '../../../config.js';
import { searchTrees } from '../../../actions/globalTrees';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../../config')[env];

class TreesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.searchTrees();
    }

    // componentWillReceiveProps(nextProps) {
    //   // if newly navigated from the router link...
    //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
    //     this.searchTrees();
    //   }
    // }

    searchTrees() {
        this.props.dispatch(searchTrees(this.props.globalFilterData));
    }

    onDeleteTreeClick(event) {
        let slug = event.target.getAttribute("data-slug");
        let id = event.target.getAttribute("data-id");
        const { offset, limit } = this.props.searchResults;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.dispatch(actions.deleteTree({id: parseInt(id), slug: slug}, [], offset, limit));
    }

    componentDidUpdate(prevProps) {
        //fire the updated globalFilterData to the search action whenever the themes or categores get updated
        if(this.props.globalFilterData && (prevProps.globalFilterData !==  this.props.globalFilterData)) {
            this.searchTrees();
        }
    }
    
    renderTrees() {
        return this.props.searchResults.trees.map((tree) => {
            return (
                <li className="list-group-item" key={tree.id}>
                    <span>{tree.common_name}</span>
                    <a href="#" data-id={tree.id} data-slug={tree.slug} onClick={this.onDeleteTreeClick.bind(this)}>Delete</a>
                    <Link to={`/${globals.ADMIN_URL}/trees-list/${tree.slug}`}>edit</Link>
                </li>
            );
        });
    }
    
    render() {
        return (
            <div className="admin-main">
                <div className="row">
                    <Sidebar/>
                    <div className="main-window columns small-12 large-9">
                        <h3>Trees</h3>
                        <SearchTrees
                            placeholder="search"
                            hasButton={false}
                        />
                        <ul className="list-group item-list">
                            {this.renderTrees()}
                        </ul>
                        <PaginationTrees />
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        searchResults: state.trees.searchResults,
        globalFilterData: state.globalTrees,
        treeDeleted: state.tree.treeDeleted,
    };
}

export default RequireAuth(connect(mapStateToProps)(TreesIndex));