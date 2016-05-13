import React from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
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
      <div className="col-sm-4 app_pink">
        <h5>Source:</h5>
        <FacetList multiselect={true}/>
        <h5 className="app_vsp15">Published:</h5>
        <FacetList/>
        <h5 className="app_vsp15">Word count:</h5>
        <FacetList/>
      </div>
    </div>

    <div className="row app_vsp05">
      <div className="col-sm-8">
        <Pager/>
      </div>
    </div>
  </div>;

export default SearchApp;
