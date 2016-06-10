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
            <h5>Manufacturer:</h5>
            <FacetList facets={sr.facets.manufacturer}
             onSetFilter={this.setFilter.bind(this)}
             onClearFilters={this.clearFilters.bind(this)}
             fieldname="manu_id_s" />

            <h5 className="app_vsp15">Category:</h5>
            <FacetList multiselect={true} facets={sr.facets.category}
             onSetFilter={this.setFilter.bind(this)}
             onClearFilters={this.clearFilters.bind(this)}
             fieldname="cat" />

            <h5 className="app_vsp15">Price range:</h5>
            <FacetList facets={sr.facets.price_range}
             onSetFilter={this.setFilter.bind(this)}
             onClearFilters={this.clearFilters.bind(this)}
             fieldname="price" />
          </div>
        </div>;

        // only show pager if required
        if (sr.start > 0 || sr.totalFound > sr.results.length) {
          row4 = <div className="row app_vsp05">
            <div className="col-sm-8">
              <Pager numFound={sr.totalFound}
                start={sr.start}
                len={sr.results.length}
                pageSize={sr.pageSize} />
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
      {row2} {row3} {row4}
      {busy}
    </div>;
  }

  setQuery(newQuery) {
    // use react-addons-update to merge with existing query params
    this.props.setQueryParams(
      update(this.props.queryParams, { query: { $set: newQuery }})
    );
  }

  // set or unset a single filter
  setFilter(filter, apply) {

    // clone any existing filters into a new array
    let filters = this.props.queryParams.filters ?
                  this.props.queryParams.filters.slice(0) : [];

    if (apply && !filters.includes(filter)) {
      // add the new filter
      filters.push(filter);
    }
    else if (!apply) {
      // or remove it
      filters = filters.filter(y => y != filter);
    }

    this.props.setQueryParams(
      update(this.props.queryParams, { filters: { $set: filters }})
    );
  }

  // remove all filters from the query params which have the supplied
  // fieldname. This breaks the abstraction of filters being opaque strings
  clearFilters(fieldname) {
    const pref = fieldname + ":";
    if (this.props.queryParams.filters) {
      const filters = this.props.queryParams.filters.filter(x =>
        !x.startsWith(pref));

      this.props.setQueryParams(
        update(this.props.queryParams, { filters: { $set: filters }})
      );
    }
  }
}

SearchApp.propTypes = {
  queryParams: PropTypes.object,
  searchResults: PropTypes.object,
  busy: PropTypes.bool,
  setQueryParams: PropTypes.func.isRequired
};

export default SearchApp;
