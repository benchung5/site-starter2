import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/categories';
import RequireAuth from '../auth/require_auth';
import { globals } from '../../../config.js';

class ThemeIndex extends Component {

	componentWillMount() {
		this.props.fetchCategories();
	}

	onDeleteCategoryClick(event) {
		let slug = event.target.getAttribute('data-slug');
		this.props.deleteCategory({ slug });
	}

	rendercategories() {
		return this.props.categories.map((item, index) => {
			return (
				<li className="list-group-item" key={item.slug}>
				    <span>{item.name}</span>
				    <a href="#" data-id={item._id} data-slug={item.slug} onClick={this.onDeleteCategoryClick.bind(this)}>Delete</a>
				    <Link to={`/${globals.ADMIN_URL}/category-list/${item.slug}`}>edit</Link>
				</li>
				)
		});
	}

	render() {
		return (
			<div className="admin-main">
			<div className="row">
			    <Sidebar/>
			    <div className="main-window columns small-12 large-9">
			        <h3>categories</h3>
			        <ul className="list-group item-list">
			            {this.rendercategories()}
			        </ul>
			    </div>
			</div>
			</div>
			)
	}

}

function mapStateToProps(state) {
	return {
		categories: state.categories.all,
		categoriesDeleted: state.category.categoryDeleted
	}
}

export default RequireAuth(connect(mapStateToProps, actions)(ThemeIndex));

