import React from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetLists from './facetlists';
import Pager from './pager';

const SearchApp = (props) =>
  <div className="container">

    <div className="row">
      <QueryInput/>
    </div>

    <div className="row app_vsp05">
      <Stats/>
      <div className="col-sm-4">
        <strong>Refine search</strong>
      </div>
    </div>

    <div className="row app_vsp15">
      <Results/>
      <FacetLists/>
    </div>

    <div className="row app_vsp05">
      <div className="col-sm-8">
        <Pager/>
      </div>
    </div>
  </div>;

export default SearchApp;
