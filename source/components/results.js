import React, { PropTypes }  from 'react';

/*
 * A component implementing a simple results list.
 *
 * props are:
 *  results: an array of objects holding data for each result
 */

const Results = (props) => {

  const results = props.searchResults.map((hit) => {
    const sample = { __html: hit.sample };
    return <div key={hit.id} className="app_hit">
      <div><strong><a href="#">{hit.title}</a></strong></div>
      <div className="app_vsp03" dangerouslySetInnerHTML={sample}></div>
      <div className="text-muted app_vsp03">
        Source: <em>{hit.source}</em>
        &nbsp;&nbsp;Published: <em>{hit.published}</em>
        &nbsp;&nbsp;Wordcount: <em>{hit.wordcount}</em>
      </div>
    </div>;
  });

  return <div className="col-sm-8">
    {results}
  </div>;
};

Results.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Results;
