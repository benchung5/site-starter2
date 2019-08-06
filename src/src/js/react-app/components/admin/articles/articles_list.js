import React, { Component } from 'react';
import {connect} from 'react-redux';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import * as actions from '../../../actions/global';
import { deleteArticle } from '../../../actions/articles';
import RequireAuth from '../auth/require_auth';
import SearchArticles from '../../search_articles';
import PaginationArticles from '../../parts/pagination_articles';
import { globals } from '../../../config.js';

//config
const env = process.env.NODE_ENV || "development";
var { SERVER_URL } = require('../../../config')[env];

class ArticlesIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.searchArticles();
    }

    // componentWillReceiveProps(nextProps) {
    //   // if newly navigated from the router link...
    //   if((nextProps.location !== this.props.location) && nextProps.location.key) {
    //     this.resetArticlesList();
    //   }
    // }

    // resetArticlesList() {
    //     this.props.searchArticles(this.props.globalFilterData);
    // }

    searchArticles() {
        this.props.searchArticles(this.props.globalFilterData);
    }

    onDeleteArticleClick(event) {
        let slug = event.target.getAttribute("data-slug");
        let id = event.target.getAttribute("data-id");
        const { offset, limit } = this.props.articles;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.dispatch(deleteArticle({id: parseInt(id), slug: slug}, [], offset, limit));
    }

    onDuplicateArticleClick(event) {
        let slug = event.target.getAttribute("data-slug");
        const { offset, limit } = this.props.articles;
        //slug, search, offset, limit
        //todo: get [] to use real stored search if any
        this.props.duplicateArticle(slug, [], offset, limit);
    }

    componentDidUpdate(prevProps) {
        //fire the updated globalFilterData to the search action whenever the themes or categores get updated
        if(this.props.globalFilterData && (prevProps.globalFilterData !==  this.props.globalFilterData)) {
            this.searchArticles();
        }
    }
    
    renderArticles() {
        return this.props.articles.articles.map((article) => {
            return (
                <li className="list-group-item" key={article.id}>
                    <span>{article.name}</span>
                    <a href="#" data-id={article.id} data-slug={article.slug} onClick={this.onDeleteArticleClick.bind(this)}>Delete</a>
                    <a href="#" data-id={article.id} data-slug={article.slug} onClick={this.onDuplicateArticleClick.bind(this)}>Duplicate</a>
                    <Link to={`/${globals.ADMIN_URL}/articles-list/${article.slug}`}>edit</Link>
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
                        <h3>Articles</h3>
                        <SearchArticles
                            placeholder="search"
                            hasButton={false}
                        />
                        <ul className="list-group item-list">
                            {this.renderArticles()}
                        </ul>
                        <PaginationArticles />
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        articles: state.articles.searchResults,
        articleDeleted: state.article.articleDeleted,
        globalFilterData: state.global,
    };
}

export default RequireAuth(connect(mapStateToProps, actions)(ArticlesIndex));