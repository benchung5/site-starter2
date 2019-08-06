import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globals } from '../../config.js';
import * as actions from '../../actions/globalTrees';
import { getUrlParams, setUrlParams, flattenActiveObjArray } from '../../lib/utils';

class PaginationTrees extends Component {

  componentWillMount() {
    let offset = getUrlParams('offset');
    if (offset) {
      // set offset from url
      this.props.dispatch(actions.filterOffsetTrees(parseInt(offset[0])));
    }
  }

  back() {
    const { offset } = this.props.globalFilterData;

    if (offset === 0 ) { return; }

    let newOffset = offset - globals.ADMIN_ENTRIES_PER_PAGE;
    this.updateOffset(newOffset);
  }

  advance() {
    const { count } = this.props.searchResults;
    const { offset } = this.props.globalFilterData;
    if ((offset + globals.ADMIN_ENTRIES_PER_PAGE) >= count) { return; }

    let newOffset = offset + globals.ADMIN_ENTRIES_PER_PAGE;
    this.updateOffset(newOffset);
  }

  updateOffset(newOffset) {
    const { count} = this.props.searchResults;
    const { search, categoriesTrees, origins, offset} = this.props.globalFilterData;

    // set the new offset in the global fields
    this.props.dispatch(actions.filterOffsetTrees(newOffset));

    setUrlParams('offset', newOffset);
  }

  left() {
    const { offset } = this.props.globalFilterData;
    return (
      <div className={`paginate-previous ${offset === 0 ? 'disabled' : ''}`}>
        <a aria-label="Previous page" onClick={this.back.bind(this)}>
          Previous
        </a>
      </div>
    );
  }

  right() {
    const { count } = this.props.searchResults;
    const { offset } = this.props.globalFilterData;
    const end = ((offset + globals.ADMIN_ENTRIES_PER_PAGE) >= count) ? true : false;
    return (
      <div className={`paginate-next ${end ? 'disabled' : ''}`}>
        <a aria-label="Next page" onClick={this.advance.bind(this)}>
          Next
        </a>
      </div>
    );
  }

  render() {
    const { count } = this.props.searchResults;
    const { offset } = this.props.globalFilterData;
    return (
      <div className="paginate-wrapper">
        <div className="paginate" role="navigation" aria-label="Pagination">
          {this.left()}
          <div>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</div>
          {this.right()}
        </div>
        <div className="records-count">({count} records total)</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        searchResults: state.trees.searchResults,
        globalFilterData: state.globalTrees,
    };
}

export default connect(mapStateToProps)(PaginationTrees);