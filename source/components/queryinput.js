import React from 'react';

const QueryInput = (props) =>
  <form className="navbar-form" role="search">
    <div className="input-group col-sm-8">
      <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"/>
      <div className="input-group-btn">
        <button className="btn btn-primary" type="submit"><i className="glyphicon glyphicon-search"></i></button>
      </div>
    </div>
  </form>;

export default QueryInput;
