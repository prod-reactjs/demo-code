import React from 'react';
import ReactPaginate from 'react-paginate';
import { browserHistory } from 'react-router';

class Pagination extends React.Component {
  handlePageClick = (e) => {
    const { route, category } = this.props;
    browserHistory.push(category ? `/${category}${route(e.selected + 1)}` : route(e.selected + 1));
  }
  render() {
    const { pagination } = this.props;
    return pagination.total_page ? (
      <ReactPaginate
        pageCount={pagination.total_page}
        pageRangeDisplayed={7}
        marginPagesDisplayed={3}
        onPageChange={this.handlePageClick}
        containerClassName="juvoPagination"
        activeClassName="activePage"
        previousClassName="previousPage"
        nextClassName="nextPage"
        pageClassName="juvoPage"
        initialPage={pagination.current_page - 1 || 0}
        disableInitialCallback
      />
    ) : null;
  }
}

Pagination.propTypes = {
  route: React.PropTypes.func.isRequired,
  pagination: React.PropTypes.object.isRequired,
  category: React.PropTypes.string,
};

export default Pagination;
