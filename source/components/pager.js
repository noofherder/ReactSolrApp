import React, { PropTypes } from 'react';

/*
 * A component implementing a simple pager.
 *
 * props are:
 *  pageSize: integer (max results per page)
 *  numFound: total number of results found
 *  start: the offset of the first result on this page
 *  len: the number of results on this page
 */

const Pager = ({start, numFound, pageSize=10}) => {
  const thisPage = Math.floor(start / pageSize);
  const lastPage = Math.ceil(numFound / pageSize) - 1;
  const fromPage = Math.max(thisPage - 1, 0);
  const lastNumberedPage = Math.min(fromPage + 2, lastPage);
  let pages = [];

  if (fromPage > 0) {
    pages.push(<span key={0}><a href={"#page-0"}>{"1"}</a>{" "}</span>);
  }
  if (fromPage > 1) {
    const label = fromPage == 2 ? "2" : "<";
    pages.push(<span key={fromPage - 1}>
      <a href={"#page-" + (fromPage - 1)}>{label}</a>{" "}</span>);
  }

  for (var i = fromPage; i <= lastNumberedPage; i++) {
    if (i == thisPage) {
      pages.push(<span key={i}><strong>{"" + (i + 1)}</strong>{" "}</span>);
    } else {
      pages.push(<span key={i}><a href={"#page-" + i}>{"" + (i + 1)}</a>{" "}</span>);
    }
  }

  if (lastPage > lastNumberedPage) {
    const nextPage = lastNumberedPage + 1;
    pages.push(<a key={nextPage} href={"#page-" + nextPage}>{">"}</a>);
  }

  return <div className="app_pager">
    Page: {pages}
  </div>;
};

Pager.propTypes = {
  numFound: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default Pager;
