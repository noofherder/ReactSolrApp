import React, { PropTypes }  from 'react';

/*
 * A component implementing a simple results list.
 *
 * props are:
 *  results: an array of objects holding data for each result
 */

const Results = ({searchResults}) => {
  const results = searchResults.map((hit) => {
    const features = (hit.features && hit.features instanceof Array) ?
      hit.features.map((feat) => <div key={feat}>{feat}</div>) : hit.features;

    return <div key={hit.id} className="app_hit">
      <div><strong><a href="#">{hit.name || "no name, id=" + hit.id}</a></strong></div>
      <div className="app_vsp03">
        {features}
      </div>
      <div className="text-muted app_vsp03">
        Price: <em>£{hit.price}</em>
        &nbsp;&nbsp;In stock: <em>{hit.inStock ? "yes" : "no"}</em>
      </div>
    </div>;
  });

  return <div className="col-sm-8">
    {results}
  </div>;
};

Results.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Results;
