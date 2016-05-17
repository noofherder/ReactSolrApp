import React, { PropTypes }  from 'react';

const Stats = (props) => {
  if (props.len > 0) {
    const first = props.start + 1;
    const last = props.start + props.len;
    const stime = props.qtime / 1000;
    return <div className="col-sm-8">
      {`${first}-${last} of ${props.numFound} found (search time ${stime}s)`}
      </div>;
    } else {
      return <div className="col-sm-8">No results found</div>;
    }
};

Stats.propTypes = {
  qtime: PropTypes.number.isRequired,
  numFound: PropTypes.number.isRequired,
  start: PropTypes.number.isRequired,
  len: PropTypes.number.isRequired
};

export default Stats;
