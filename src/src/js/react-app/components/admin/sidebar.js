import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import cloneDeep from 'lodash/cloneDeep';
import { globals } from '../../config.js';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkList: [
                { title: 'Website', link: '/', active: false },
                { title: 'Logout', link: '/'+globals.ADMIN_URL+'/signout', active: false },
                { title: 'Dashboard', link: '/'+globals.ADMIN_URL+'', active: false },
                { title: 'View Articles', link: '/'+globals.ADMIN_URL+'/articles-list', active: false },
                { title: 'Add Articles', link: '/'+globals.ADMIN_URL+'/article-add', active: false },
                { title: 'View Plants', link: '/'+globals.ADMIN_URL+'/trees-list', active: false },
                { title: 'Add Plants', link: '/'+globals.ADMIN_URL+'/tree-add', active: false },
                { title: 'View Users', link: '/'+globals.ADMIN_URL+'/users-list', active: false },
                { title: 'Add User', link: '/'+globals.ADMIN_URL+'/signup', active: false },
                { title: 'View Categories', link: '/'+globals.ADMIN_URL+'/category-list', active: false },
                { title: 'Add Category', link: '/'+globals.ADMIN_URL+'/category-add', active: false },
                { title: 'Backup', link: '/'+globals.ADMIN_URL+'/backup', active: false },
            ]
        }
    }


    componentDidMount() {
        //check url and highlight accordingly
        let linkListClone = cloneDeep(this.state.linkList);
        linkListClone.forEach((item, index) => {

            //set all to inactive at first
            if (item.active) {
                item.active = false;
            }
            //if url path equals link, activate it
            if (item.link === window.location.pathname) {
                item.active = true;
            }
        });
        this.setState({ linkList: linkListClone });
    }

    onLinkClick(e) {
    }

    renderButtons() {
        return this.state.linkList.map((item, index) => {
            //title to lowercase, replace slashes with dashes
            return (
                    <li key={index} className={`${item.active ? 'active' : ''}`}>
                        <Link onClick={this.onLinkClick.bind(this)}  className={`nav-link`} to={item.link} data-id={index}>{item.title}</Link>
                    </li>
                )
        });
    }

    render() {
        return (
            <div className="columns small-12 large-3 admin-sidebar">
                <ul className="vertical menu admin-side-menu">
                    {this.renderButtons()}
                </ul>
            </div>
        )
    }

}

export default SideMenu;