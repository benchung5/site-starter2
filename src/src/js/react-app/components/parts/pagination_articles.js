
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { globals } from '../../config.js';
import * as actions from '../../actions/global';
import { getUrlParams, setUrlParams, flattenActiveObjArray } from '../../lib/utils';

class PaginationArticles extends Component {

  componentWillMount() {
    let offset = getUrlParams('offset');
    if (offset) {
      // set offset from url
      this.props.dispatch(actions.filterOffsetArticles(parseInt(offset[0])));
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
    const { search, categories, offset} = this.props.globalFilterData;

    // set the new offset in the global fields
    this.props.dispatch(actions.filterOffsetArticles(newOffset));

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
        searchResults: state.articles.searchResults,
        globalFilterData: state.global,
    };
}

export default connect(mapStateToProps)(PaginationArticles);



// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { globals } from '../../../config.js';

// class Paginator extends Component {
//   back() {
//     const { offset, limit } = this.props.sourceData;
//     if (offset === 0 ) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset - globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }

//   advance() {
//     const { offset, limit, count } = this.props.sourceData;
//     if ((offset + limit) > count) { return; }
//     //todo: get this.props.search to pull from stored search if any
//     this.props.searchAction({ search: this.props.search, offset: offset + globals.ADMIN_ENTRIES_PER_PAGE, limit: limit });
//   }

//   left() {
//     const { offset } = this.props.sourceData;
//     return (
//       <div className={`paginate-previous ${offset === 0 ? 'disabled' : ''}`}>
//         <a aria-label="Previous page" onClick={this.back.bind(this)}>
//           Previous
//         </a>
//       </div>
//     );
//   }

//   right() {
//     const { offset, limit, count } = this.props.sourceData;
//     const end = ((offset + limit) >= count) ? true : false;
//     return (
//       <div className={`paginate-next ${end ? 'disabled' : ''}`}>
//         <a aria-label="Next page" onClick={this.advance.bind(this)}>
//           Next
//         </a>
//       </div>
//     );
//   }

//   render() {
//     const { offset, count } = this.props.sourceData;
//     return (
//       <div className="paginate-wrapper">
//         <div className="paginate" role="navigation" aria-label="Pagination">
//           {this.left()}
//           <div>Page {offset / globals.ADMIN_ENTRIES_PER_PAGE + 1}</div>
//           {this.right()}
//         </div>
//         <div className="records-count">({count} records total)</div>
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//     return {
//         //articlesResults: state.articles.searchResultsAdmin
//     };
// }

// export default connect(mapStateToProps)(Paginator);