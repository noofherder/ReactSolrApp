import React, { Component, PropTypes } from 'react';
import { makeSetPageAction } from "../actions";

/*
 * A component implementing a simple pager.
 *
 * props are:
 *  pageSize: integer (max results per page)
 *  numFound: total number of results found
 *  start: the offset of the first result on this page
 *  len: the number of results on this page
 *  handleActions: handle one or more actions
 */

class Pager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const thisPage = Math.floor(this.props.start / this.props.pageSize);
    const lastPage = Math.ceil(this.props.numFound / this.props.pageSize) - 1;
    const fromPage = Math.max(thisPage - 1, 0);
    const lastNumberedPage = Math.min(fromPage + 2, lastPage);
    let pages = [];

    // convenience function for links below
    const setter = (n) => (e) => {
      e.preventDefault();
      this.setPage(n);
    };

    if (fromPage > 0) {
      pages.push(<span key={0}>
        <a onClick={setter(0)} href="#">{"1"}</a>{" "}
      </span>);
    }
    if (fromPage > 1) {
      const label = fromPage == 2 ? "2" : "<";
      pages.push(<span key={fromPage - 1}>
        <a onClick={setter(fromPage - 1)} href="#">{label}</a>{" "}
      </span>);
    }

    for (var i = fromPage; i <= lastNumberedPage; i++) {
      if (i == thisPage) {
        pages.push(<span key={i}><strong>{"" + (i + 1)}</strong>{" "}</span>);
      } else {
        pages.push(<span key={i}>
          <a onClick={setter(i)} href="#">
            {"" + (i + 1)}</a>{" "}
          </span>);
      }
    }

    if (lastPage > lastNumberedPage) {
      const nextPage = lastNumberedPage + 1;
      pages.push(<a key={nextPage} href="#"
        onClick={setter(nextPage)}>{">"}</a>);
    }

    return <div className="app_pager">
      Page: {pages}
    </div>;
  }

  setPage(newPage) {
    this.props.handleActions([
      makeSetPageAction(newPage)
    ]);
  }

};

Pager.propTypes = {
  numFound: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  handleActions: PropTypes.func
};

export default Pager;
