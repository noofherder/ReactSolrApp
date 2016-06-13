import React, { Component, PropTypes }  from 'react';
import { makeSetQueryAction } from "../actions";

/*
 * A component implementing a simple query input
 *
 * props are:
 *  initialQuery: the initial query, which may be edited by the user
 *  handleActions: handle one or more actions
 */

class QueryInput extends Component {
  /*
   * Set the initial query
   */
  constructor(props) {
    super(props);
    this.state = { query: props.initialQuery || '' };
  }

  /*
   * User has clicked the search button or hit Return. Pass the current query up
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.handleActions([makeSetQueryAction(this.state.query)]);
  }

  onChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return <form className="navbar-form"
            role="search" onSubmit={this.onSubmit.bind(this)}>
      <div className="input-group col-sm-8">
        <input type="text" className="form-control" placeholder="Search"
          value={this.state.query} onChange={this.onChange.bind(this)} />
        <div className="input-group-btn">
          <button className="btn btn-primary" type="submit"><i className="glyphicon glyphicon-search"></i></button>
        </div>
      </div>
    </form>;
  }
}

QueryInput.propTypes = {
  initialQuery: PropTypes.string,
  handleActions: PropTypes.func
};

export default QueryInput;
