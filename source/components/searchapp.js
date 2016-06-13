import update from 'react-addons-update';
import React, { Component, PropTypes } from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import Pager from './pager';
import { SET_FILTER_ACTION,
         CLEAR_FILTERS_ACTION,
         SET_QUERY_ACTION,
         SET_PAGE_ACTION } from "../actions";


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
             handleActions={this.handleActions.bind(this)}
             fieldname="manu_id_s" />

            <h5 className="app_vsp15">Category:</h5>
            <FacetList multiselect={true} facets={sr.facets.category}
             handleActions={this.handleActions.bind(this)}
             fieldname="cat" />

            <h5 className="app_vsp15">Price range:</h5>
            <FacetList facets={sr.facets.price_range}
             handleActions={this.handleActions.bind(this)}
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
                handleActions={this.handleActions.bind(this)}
                pageSize={sr.pageSize} />
            </div>
          </div>;
        }
      }
    }

    const busy = this.props.busy ? <h4>searching...</h4> : null;

    return <div className="container">
      <div className="row">
        <QueryInput initialQuery={qp.query} handleActions={this.handleActions.bind(this)}/>
      </div>
      {row2} {row3} {row4}
      {busy}
    </div>;
  }

  handleActions(actions) {
    let queryParams = this.props.queryParams;

    actions.forEach(act => {
      if (act.type === SET_FILTER_ACTION) {
        const f = queryParams.filters || [];    // default empty array
        queryParams = update(queryParams, {
          filters: { $set: act.apply ?
            f.concat([act.filter]) :            // add the new filter
            f.filter(x => x != act.filter)      // or remove it
        }});
      }
      else if (act.type === CLEAR_FILTERS_ACTION) {
        if (queryParams.filters) {
          const prefix = act.fieldname + ":";
          const filters = queryParams.filters.filter(x =>
            !x.startsWith(prefix));
          queryParams = update(queryParams, { filters: { $set: filters }});
        }
      }
      else if (act.type === SET_QUERY_ACTION) {
        queryParams = update(queryParams, { query: { $set: act.query }});
      }
      else if (act.type === SET_PAGE_ACTION) {
        queryParams = update(queryParams, { page: { $set: act.page }});
      }
    });

    // now queryParams is fully mutated, set it
    this.props.setQueryParams(queryParams);
  }

  // set or unset a single filter
  // setFilter(filter, apply) {
  //
  //   // clone any existing filters into a new array
  //   let filters = this.props.queryParams.filters ?
  //                 this.props.queryParams.filters.slice(0) : [];
  //
  //   if (apply && !filters.includes(filter)) {
  //     // add the new filter
  //     filters.push(filter);
  //   }
  //   else if (!apply) {
  //     // or remove it
  //     filters = filters.filter(y => y != filter);
  //   }
  //
  //   this.props.setQueryParams(
  //     update(this.props.queryParams, { filters: { $set: filters }})
  //   );
  // }
  //
}

SearchApp.propTypes = {
  queryParams: PropTypes.object,
  searchResults: PropTypes.object,
  busy: PropTypes.bool,
  setQueryParams: PropTypes.func.isRequired
};

export default SearchApp;
