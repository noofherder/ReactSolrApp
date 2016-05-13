import React from 'react';
import QueryInput from './queryinput';
import Stats from './stats';
import Results from './results';
import FacetList from './facetlist';
import Pager from './pager';

const sourceFacets = [
  { label: "The Guardian", filter: "a1", selected: false },
  { label: "The Independent", filter: "a2", selected: false },
  { label: "Prospect", filter: "a3" , selected: true }
];

const publishedFacets = [
  { label: "Last week", filter: "b1" , selected: false },
  { label: "Last month", filter: "b2", selected: true },
  { label: "Last year", filter: "b3", selected: false },
  { label: "Last five years", filter: "b4", selected: false }
];

const wordcountFacets = [
  { label: "1-100", filter: "c1", selected: false },
  { label: "100-1000", filter: "c2", selected: false },
  { label: "1000-any", filter: "c3", selected: false }
];

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
        <FacetList multiselect={true} facets={sourceFacets} />

        <h5 className="app_vsp15">Published:</h5>
        <FacetList facets={publishedFacets}/>

        <h5 className="app_vsp15">Word count:</h5>
        <FacetList facets={wordcountFacets} />
      </div>
    </div>

    <div className="row app_vsp05">
      <div className="col-sm-8">
        <Pager/>
      </div>
    </div>
  </div>;

export default SearchApp;
