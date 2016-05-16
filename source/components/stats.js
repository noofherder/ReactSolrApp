import React, { PropTypes }  from 'react';

const Stats = (props) => {
  if (props.searchStats.len > 0) {
    const first = props.searchStats.start + 1;
    const last = props.searchStats.start + props.searchStats.len;
    const stime = props.searchStats.qtime / 1000;
    return <div className="col-sm-8">
      {`${first}-${last} of ${props.searchStats.numFound} found (search time ${stime}s)`}
      </div>;
    } else {
      return <div className="col-sm-8">No results found</div>;
    }
};

Stats.propTypes = {
  searchStats: PropTypes.shape({
    qtime: PropTypes.number,
    numFound: PropTypes.number,
    start: PropTypes.number,
    len: PropTypes.number
  })
};

export default Stats;
