import React, { Component, PropTypes } from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import Pager from './pager';

import update from 'react-addons-update';

class SearchApp extends Component {
  render() {
    let row2 = null;
    let row3 = null;
    let row4 = null;

    const qp = this.props.queryParams;
    const sr = this.props.searchResults;

    if (sr) {
      row2 = <div className="row app_vsp05">
        <Stats qtime={sr.queryTime}
          numFound={sr.totalFound}
          start={sr.start}
          len={sr.results.length} />
        <div className="col-sm-4">
          <strong>Refine search</strong>
        </div>
      </div>;

      if (sr.results) {
        row3 = <div className="row app_vsp15">
          <Results searchResults={sr.results}/>
          <div className="col-sm-4">
            <h5>Source:</h5>
            <FacetList multiselect={true} facets={sr.facets.source}
             onSetFilter={this.setFilter.bind(this)} />

            <h5 className="app_vsp15">Published:</h5>
            <FacetList facets={sr.facets.published}
             onSetFilter={this.setFilter.bind(this)} />

            <h5 className="app_vsp15">Word count:</h5>
            <FacetList facets={sr.facets.wordcount}
             onSetFilter={this.setFilter.bind(this)} />
          </div>
        </div>;

        // only show pager if required
        if (sr.start > 0 || sr.totalFound > sr.results.length) {
          row4 = <div className="row app_vsp05">
            <div className="col-sm-8">
              <Pager numFound={sr.totalFound}
                start={sr.start}
                len={sr.results.length}
                pageSize={10} />
            </div>
          </div>;
        }
      }
    }

    const busy = this.props.busy ? <h4>searching...</h4> : null;
    
    return <div className="container">
      <div className="row">
        <QueryInput initialQuery={qp.query} onQuerySubmit={this.setQuery.bind(this)}/>
      </div>
      {busy}
      {row2} {row3} {row4}
    </div>;
  }

  setQuery(newQuery) {
    // use react-addons-update to merge with existing query params
    this.props.setQueryParams(
      update(this.props.queryParams, { query: { $set: newQuery }})
    );
  }

  setFilter(newFilter, apply) {
    // clone any existing filters into a new array
    let filters = [];
    if (this.props.queryParams.filters) {
      filters = this.props.queryParams.filters.slice(0);
    }

    if (apply && !filters.includes(newFilter)) {
      // add the new filter
      filters.push(newFilter);
    }
    else if (!apply) {
      // or remove it
      filters = filters.filter(x => x != newFilter);
    }

    this.props.setQueryParams(
      update(this.props.queryParams, { filters: { $set: filters }})
    );
  }
}

SearchApp.propTypes = {
  queryParams: PropTypes.object,
  searchResults: PropTypes.object,
  busy: PropTypes.bool,
  setQueryParams: PropTypes.func.isRequired
};

export default SearchApp;
