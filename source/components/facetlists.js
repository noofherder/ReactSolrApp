import React from 'react';

const FacetLists = (props) =>
  <div className="col-sm-4 app_pink">
    <h5>Source:</h5>
    <div><input type="checkbox"/> This thing</div>
    <div><input type="checkbox"/> That thing</div>
    <div><em>any</em></div>

    <h5 className="app_vsp15">Published:</h5>
    <div><a href="#">This week</a></div>
    <div>This month</div>
    <div>This year</div>
    <div>Past five years</div>
    <div><em>any</em></div>

    <h5 className="app_vsp15">Wordcount:</h5>
    <div>0-100</div>
    <div>101-500</div>
    <div>501-1000</div>
    <div>1001-5000</div>
    <div>5001-</div>
    <div><em>any</em></div>
  </div>;

  export default FacetLists;
