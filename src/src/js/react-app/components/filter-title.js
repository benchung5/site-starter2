import React, { Component } from 'react';
import { connect } from 'react-redux';

class GridView extends Component {
    renderCommaList(type, filter) {
        return filter.map((item, index) => {
            return (
                <span key={item.id} className={`${type}-title`}>{item.name}{((filter.length - 1) !== index) && `, `}</span>
            );
        });
    }

    render() {
        return (
            <div className="filter-title">
                <h1>{this.renderCommaList('category', this.props.filterCats)}</h1>
                <h2>{this.renderCommaList('theme', this.props.filterThemes)}</h2>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filterCats: state.global.categories,
        filterThemes: state.global.themes
    };
}

export default connect(mapStateToProps)(GridView);