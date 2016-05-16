import React, { PropTypes } from 'react';

const Pager = (props) => {
  const thisPage = Math.floor(props.searchStats.start / props.pageSize);
  const lastPage = Math.ceil(props.searchStats.numFound / props.pageSize) - 1;
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
  searchStats: PropTypes.shape({
    qtime: PropTypes.number,
    numFound: PropTypes.number,
    start: PropTypes.number,
    len: PropTypes.number
  }),
  pageSize: PropTypes.number
};

export default Pager;
